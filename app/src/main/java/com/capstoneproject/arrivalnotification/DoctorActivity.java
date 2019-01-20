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
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;


import com.capstoneproject.arrivalnotification.Notification.NotificationActivity;
import com.capstoneproject.arrivalnotification.calendar.CalendarActivity;

public class DoctorActivity extends AppCompatActivity
{

    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";
    //bool that decides if the current user is a doctor or a transporter

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
            super.onCreate(savedInstanceState);
            //set layout to doctor
            setContentView(R.layout.activity_calendar);

            BottomNavigationView.OnNavigationItemSelectedListener selectedListener = (MenuItem item) -> {
                switch (item.getItemId()) {
                    case R.id.navigation_calendarDay:
                        startCalendar(item);
                        return true;
                    case R.id.navigation_calendarMonth:
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

    protected void onRestart()
    {
        super.onRestart();
        Intent Pin = new Intent(this, lockScreen.class);
        //Uncomment for lockscreen
        //startActivity(Pin);
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
