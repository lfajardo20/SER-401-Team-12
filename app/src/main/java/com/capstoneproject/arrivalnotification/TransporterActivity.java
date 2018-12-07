package com.capstoneproject.arrivalnotification;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.location.Location;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

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

public class TransporterActivity extends AppCompatActivity {
        public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";

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

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //Set layout to transporter
        setContentView(R.layout.activity_transporter);

        requestPermission();

        bar_scanner = this.findViewById(R.id.scanning_view);
        btn_camera = this.findViewById(R.id.btn_camera);
        lastKnownLocation = LocationServices.getFusedLocationProviderClient(this);

        btn_camera.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v)
            {
                if (ActivityCompat.checkSelfPermission(TransporterActivity.this, ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

                    return;
                }
                lastKnownLocation.getLastLocation().addOnSuccessListener(TransporterActivity.this, new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        if (location != null) {
                            latitude = "Latitude: " + location.getLatitude();
                            longitude = "Longitude: " + location.getLongitude();
                        }
                    }
                });
                cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
                context = TransporterActivity.this.getApplicationContext();
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
    }

    protected void onRestart()
    {
        super.onRestart();
        Intent Pin = new Intent(this, lockScreen.class);
        //Uncomment for lockscreen
        //startActivity(Pin);
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
            } else {
                callAPI(res.getContents(), latitude, longitude);
                //updateText(res.getContents() + "\n" + latitude + "\n" + longitude);
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

            String json = "{\n  \"id\" : " + "\"" + dataStr + "\" \n}";
            Log.v("SENT", json);
            Log.i("JSON", json);

            StringEntity params = new StringEntity(json);

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

            updateText(lat + "\n" + longi);
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

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION}, 1);
    }
}
