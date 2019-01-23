package com.capstoneproject.arrivalnotification;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
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

public class TransporterActivity extends AppCompatActivity implements LocationListener {
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
        LocationManager locationManager;
        private double latitude, longitude;

    @SuppressLint("MissingPermission")
    @Override
    //remove Override when everything starts working.
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        //Set layout to transporter
        setContentView(R.layout.activity_transporter);

        requestPermission();

        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);

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
                            Log.d("Lat", Double.toString(latitude));
                            Log.d("Long", Double.toString(longitude));
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
                callConfirmAPI(res.getContents());
                //updateText(res.getContents() + "\n" + latitude + "\n" + longitude);
            }
        } else {
            super.onActivityResult(reqCode, resCode, data);
        }
    }

    @SuppressLint("MissingPermission")
    //Testing purposes again
    private void callConfirmAPI(String data)
    {

        try {

            Log.d("Lat", Double.toString(latitude));
            Log.d("Long", Double.toString(longitude));

            //FORCING NETWORK CALLS ON MAIN THREAD FIX LATER
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);

            String url = "https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test";
            String dataStr = removeLeadingZeros(data);

            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost(url);

            String json = "{\n  \"id\" : " + "\"" + dataStr + "\" \n}";

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

            //If exists continue
            if(result != null)
            {
                //Calls confimration layout but does not pass info from post
                setContentView(R.layout.activity_confirm);

                TextView PatientInfo = findViewById(R.id.patient_Info);

                String[] resultArray = result.toString().split(",");
                String fixedString = "";

                for(int i = 1; i < resultArray.length; i++)
                {
                    fixedString += resultArray[i].replace("]","").replace("}","").replace("[\\\\s\\\\-()]", "") + "\n";
                }

                PatientInfo.setText(fixedString);

                Button ConfirmButton = findViewById(R.id.confirm_button);
                ConfirmButton.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v)
                {
                    setContentView(R.layout.activity_transporter);
                    callAPI(result.toString());
                }
                    });

                Button DenyButton = findViewById(R.id.deny_Button);
                DenyButton.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v)
                    {
                        setContentView(R.layout.activity_transporter);
                    }
                });
            }

        }
        catch(Exception e)
        {
            //Log.d("ERROR", e.toString());
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

            String json = "{\n  \"id\" : " + "\"" + dataStr + "\" \n}";

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
                //Log.d("line",line);
                result.append(line);
            }

            //Needed for GPS
            //updateText(lat + "\n" + longi);
        }
        catch(Exception e)
        {
           // Log.d("ERROR", e.toString());
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

    public void onLocationChanged(Location location)
    {

        latitude = location.getLatitude();
        longitude = location.getLongitude();

    }

    //Add later for proper GPS implementation
    public void onProviderEnabled(String input) {}

    public void onProviderDisabled(String input){}

    public void onProviderChanged(String input){}

    public void onStatusChanged(String Changed,int newInput,Bundle newBundle){}
}
