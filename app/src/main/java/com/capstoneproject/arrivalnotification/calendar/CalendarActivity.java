package com.capstoneproject.arrivalnotification.calendar;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.widget.Button;

import com.capstoneproject.arrivalnotification.MainActivity;
import com.capstoneproject.arrivalnotification.Notification.NotificationActivity;
import com.capstoneproject.arrivalnotification.R;

import java.time.LocalDateTime;

public class CalendarActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private Button button;

    @RequiresApi(api = Build.VERSION_CODES.O)
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

        recyclerView = findViewById(R.id.calendar_recycler);

        // use a linear layout manager
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        LocalDateTime time = LocalDateTime.now();
        //TODO use backend fetches instead of hard coding
        CalendarItemData[] day1 = {
                new CalendarItemData("Appendectomy", "John Doe", "OP206", time),
                new CalendarItemData("Other Surgery", "Jane Doe", "OP201", time),
        };
        CalendarItemData[] day2 = {
                new CalendarItemData("Appendectomy", "John Doe", "OP206", time),
        };

        CalendarDayData[] data = {
                new CalendarDayData(time, day1),
                new CalendarDayData(time.plusDays(4), day2),
        };

        adapter = new CalendarDayAdapter(data);
        recyclerView.setAdapter(adapter);
    }

    public void startScanning(MenuItem menu) {
        Intent intent = new Intent(this, MainActivity.class);
        //TextView textView = (TextView) findViewById(R.id.textView);
        // String message = textView.getText().toString();
        startActivity(intent);
    }

    public void startNotifications(MenuItem item) {
        Intent intent = new Intent(this, NotificationActivity.class);
        startActivity(intent);
    }

}
