package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    //Used for testing, Will be used By Login when implemented.
    private boolean isDoctor = false;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Starts Activity Based off isDoctor bool.
        if(!isDoctor) //All camera stuff
        {
            Intent Doctor = new Intent(this, TransporterActivity.class);
            startActivity(Doctor);
        }
        else if(isDoctor) //all notification and schedule stuff
        {
            Intent Transporter = new Intent(this, DoctorActivity.class);
            startActivity(Transporter);
        }
    }
}
