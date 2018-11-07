package com.capstoneproject.arrivalnotification;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private Context context;
    private CameraDevice cameraDevice;
    private String cameraId;
    //private Handler cameraHandler = new Handler();
    private CameraCharacteristics cameraCharacteristics;
    //private ImageReader jpgReader;
    //Bitmap bitmap;
    //private Handler imgHandler = new Handler();
    //private CameraCaptureSession mSession;
    private CameraManager cameraManager;
    private static final int REQUEST_CAMERA_PERMISSION = 200;
    CameraDevice.StateCallback stateCallback = new CameraDevice.StateCallback(){
        @Override
        public void onOpened(@NonNull CameraDevice camera){
            cameraDevice = camera;
        }
        @Override
        public void onDisconnected(@NonNull CameraDevice camera){
            camera.close();
        }
        @Override
        public void onError(@NonNull CameraDevice camera, int i){
            camera.close();
            camera = null;
        }
    };
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button btn_camera = (Button) findViewById(R.id.btn_camera);
        btn_camera.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
                context = MainActivity.this.getApplicationContext();
                openCamera();
                Log.e("myE", "onClick: e was here");
            }
        });
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
            cameraManager.openCamera(cameraId,stateCallback,null);
            Log.e("success", "openCamera: camera was opened: " + cameraId );
        }catch(CameraAccessException e){
            e.printStackTrace();
        }
    }
}
