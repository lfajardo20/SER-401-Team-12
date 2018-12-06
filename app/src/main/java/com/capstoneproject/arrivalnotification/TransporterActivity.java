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
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

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
                updateText(res.getContents() + "\n" + latitude + "\n" + longitude);
            }
        } else {
            super.onActivityResult(reqCode, resCode, data);
        }
    }

    private void updateText(String getCode){
        bar_scanner.setText(getCode);
    }

    private void requestPermission() {
        ActivityCompat.requestPermissions(this, new String[]{ACCESS_FINE_LOCATION}, 1);
    }
}
