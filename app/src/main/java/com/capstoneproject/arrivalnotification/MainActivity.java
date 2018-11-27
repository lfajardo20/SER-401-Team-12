package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    //Used for testing, Will be used By Login when implemented.
    private boolean isDoctor = true;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Starts Activity Based off isDoctor bool.
        if(isDoctor)
        {
            Intent Doctor = new Intent(this, DoctorActivity.class);
            startActivity(Doctor);
            super.finish();
        }
        else if(!isDoctor)
        {
            Intent Transporter = new Intent(this, TransporterActivity.class);
            startActivity(Transporter);
            super.finish();
        }
    }
}
