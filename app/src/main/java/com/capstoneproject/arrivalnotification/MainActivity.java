package com.capstoneproject.arrivalnotification;


import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
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
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.entity.StringEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;



public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";

    private Context context;
    private String cameraId;
    private CameraManager cameraManager;
    private static final int REQUEST_CAMERA_PERMISSION = 200;
    private CameraCharacteristics cameraCharacteristics;
    private final Activity actitvity = this;
    private TextView bar_scanner;
    private Button btn_camera;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bar_scanner = this.findViewById(R.id.scanning_view);
        btn_camera = this.findViewById(R.id.btn_camera);

        btn_camera.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
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


        //Notification registration initialized in mainactivity to assure that it always runs
        createNotificationChannel();
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
    }

    private void openCamera(){
        try{
            cameraId = cameraManager.getCameraIdList()[0];//get camera 1
            cameraCharacteristics = cameraManager.getCameraCharacteristics(cameraId);
            if(ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{
                        Manifest.permission.CAMERA,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQUEST_CAMERA_PERMISSION);
                return;
            }
            //new IntentIntegrator(this).initiateScan();
        }catch(CameraAccessException e){
            e.printStackTrace();
        }
    }

    @Override
    protected void onActivityResult( int reqCode, int resCode, Intent data){

        IntentResult res = IntentIntegrator.parseActivityResult(reqCode, resCode, data);

        if (res != null) {
            if (res.getContents() == null) {
                Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG);
            } else
                {
                callAPI(res.getContents());
            }
        } else {
            super.onActivityResult(reqCode, resCode, data);
        }
    }

    private void callAPI(String data)
    {

        try {

            //FORCING NETWORK CALLS ON MAIN THREAD FIX LATER
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);

            String url = "https://k634ch08g9.execute-api.us-west-1.amazonaws.com/test";
            String dataStr = removeLeadingZeros(data);

            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost(url);

            String jsonString = "{\r\n  \"id\" :" + "\"" + dataStr + "\" \r\n}";
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
