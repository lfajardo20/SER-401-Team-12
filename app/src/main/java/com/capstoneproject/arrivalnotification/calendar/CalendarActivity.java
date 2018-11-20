package com.capstoneproject.arrivalnotification.calendar;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;

import com.capstoneproject.arrivalnotification.MainActivity;
import com.capstoneproject.arrivalnotification.Notification.NotificationActivity;
import com.capstoneproject.arrivalnotification.R;

public class CalendarActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";





    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);

         BottomNavigationView.OnNavigationItemSelectedListener selectedListener = (MenuItem item) -> {
            switch (item.getItemId()) {
                case R.id.navigation_calendar:
                    return true;
                case R.id.navigation_barcode:
                    startScanning(item);
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

    public void startScanning(MenuItem menu) {
        Intent intent = new Intent(this, MainActivity.class);
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
