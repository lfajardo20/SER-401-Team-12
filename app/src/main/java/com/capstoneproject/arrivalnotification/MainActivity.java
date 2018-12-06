package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.capstoneproject.arrivalnotification.Notification.NotificationActivity;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;

public class MainActivity extends AppCompatActivity {

    private Context context;
    private String cameraId;
    private CameraManager cameraManager;
    private static final int REQUEST_CAMERA_PERMISSION = 200;
    private CameraCharacteristics cameraCharacteristics;
    private final Activity actitvity = this;
    private TextView bar_scanner;
    private Button btn_camera;
    private FusedLocationProviderClient lastKnownLocation;
    private String latitude, longitude;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        requestPermission();

        bar_scanner = this.findViewById(R.id.scanning_view);
        btn_camera = this.findViewById(R.id.btn_camera);
        lastKnownLocation = LocationServices.getFusedLocationProviderClient(this);

        btn_camera.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                if (ActivityCompat.checkSelfPermission(MainActivity.this, ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

                    return;
                }
                lastKnownLocation.getLastLocation().addOnSuccessListener(MainActivity.this, new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        if (location != null) {
                            latitude = "Latitude: " + location.getLatitude();
                            longitude = "Longitude: " + location.getLongitude();
                        }
                    }
                });
                startActivity(new Intent(MainActivity.this, PassordForgetActivity.class));
                cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
                context = MainActivity.this.getApplicationContext();
                openCamera();
                IntentIntegrator intentIntegrator = new IntentIntegrator(actitvity);
                intentIntegrator.setDesiredBarcodeFormats(IntentIntegrator.PRODUCT_CODE_TYPES);
                intentIntegrator.setPrompt("scan");
                intentIntegrator.setCameraId(Integer.parseInt(cameraId));
                intentIntegrator.setBeepEnabled(true);
                intentIntegrator.setBarcodeImageEnabled(false);
                intentIntegrator.setOrientationLocked(true);
                intentIntegrator.initiateScan();
            }
        });

        BottomNavigationView.OnNavigationItemSelectedListener selectedListener = (MenuItem item) -> {
            switch (item.getItemId()) {
                case R.id.navigation_barcode:
                    return true;
                case R.id.navigation_calendar:
                    startCalendar(item);
                    return true;
                case R.id.navigation_notifications:
                    startNotifications(item);
                    return true;
                default:
                    return false;
            }
        };

        BottomNavigationView bottomNavigation = findViewById(R.id.navigationView);
        bottomNavigation.setOnNavigationItemSelectedListener(selectedListener);
        bottomNavigation.setSelectedItemId(R.id.navigation_barcode);

        //Notification registration initialized in mainactivity to assure that it always runs
        createNotificationChannel();
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION}, 1);
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.channel_name);
            String description = getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;

            String temp = Integer.toString(R.string.CHANNEL_ID);
            NotificationChannel channel = new NotificationChannel(temp, name, importance);
            channel.setDescription(description);
            channel.setImportance(NotificationManager.IMPORTANCE_DEFAULT);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
    }

    @Override
    protected void onActivityResult( int reqCode, int resCode, Intent data){

        IntentResult res = IntentIntegrator.parseActivityResult(reqCode, resCode, data);

        if (res != null) {
            if (res.getContents() == null) {
                Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG);
            } else
                {
                    callAPI(res.getContents(), latitude, longitude);
                    updateText(res.getContents() + "\n" + latitude + "\n" + longitude);
            }
        } else {
            super.onActivityResult(reqCode, resCode, data);
        }
    }

    private void callAPI(String data, String lat, String longi)
    {

        try {

            //FORCING NETWORK CALLS ON MAIN THREAD FIX LATER
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);

            String url = "https://k634ch08g9.execute-api.us-west-1.amazonaws.com/test";
            String dataStr = removeLeadingZeros(data);

            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost(url);

            String jsonString = "{\r\n  \"id\" :" + "\"" + dataStr + "\", \r\n" +
                    "{\r\n  \"lat\" :" + "\"" + lat + "\", \r\n" +
                    "{\r\n  \"long\" :" + "\"" + longi + "\" \r\n}";
            Log.v("SENT", jsonString);


            StringEntity params = new StringEntity(jsonString);

            post.setEntity(params);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = client.execute(post);

            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));

            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null)
            {
                Log.d("line",line);
                result.append(line);
            }

            updateText(result.toString());
        }
        catch(Exception e)
        {
            Log.d("ERROR", e.toString());
        }
    }

    private String removeLeadingZeros(String str)
    {
        char zero = '0';
        for(int i = 0; i < str.length(); i++)
        {
            if(str.charAt(i) != zero)
            {
                return(str.substring(i, str.length() - 1));
            }
        }
        return str;
    }

    private void updateText(String getCode){
        bar_scanner.setText(getCode);
    }

    public void startCalendar(MenuItem menu) {
        Intent intent = new Intent(this, CalendarActivity.class);
        //TextView textView = (TextView) findViewById(R.id.textView);
        // String message = textView.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, "hi");
        startActivity(intent);
    }

    public void startNotifications(MenuItem item) {
        Intent intent = new Intent(this, NotificationActivity.class);
        intent.putExtra(EXTRA_MESSAGE, "hello notifications");
        startActivity(intent);
    }
}
