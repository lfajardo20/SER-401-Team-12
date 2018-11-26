package com.capstoneproject.arrivalnotification;


import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

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

        bar_scanner = (TextView) this.findViewById(R.id.scanning_view);
        btn_camera = (Button) this.findViewById(R.id.btn_camera);

        btn_camera.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                startActivity(new Intent(MainActivity.this,PassordForgetActivity.class));
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
                updateText(res.getContents());
            }
        } else {
            super.onActivityResult(reqCode, resCode, data);
        }
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
