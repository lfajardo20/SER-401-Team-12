package com.capstoneproject.arrivalnotification;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.Toast;

import com.capstoneproject.arrivalnotification.Notification.NotificationActivity;
import com.capstoneproject.arrivalnotification.calendar.CalendarActivity;
import com.capstoneproject.arrivalnotification.calendar.CalendarDayAdapter;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class month_view extends AppCompatActivity {

    private RecyclerView recyclerView;
    private RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    public String date;
    public CalendarView dateHighlighted;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_month_view);

        Button dateSelected = findViewById(R.id.daySelected_b);
        dateSelected.setOnClickListener(this::onClick);
        dateHighlighted = findViewById(R.id.calendarView);

        BottomNavigationView.OnNavigationItemSelectedListener selectedListener = (MenuItem item) -> {
            switch (item.getItemId()) {
                case R.id.navigation_calendarDay:
                    startCalendar(item);
                    return true;
                case R.id.navigation_calendarMonth:
                    return true;
                case R.id.navigation_notifications:
                    startNotifications(item);
                    return true;
                default:
                    return false;
            }
        };

        //Gets the highlighted date and puts it into date var.
        dateHighlighted.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(@NonNull CalendarView calendarView, int year, int month, int day) {
                date = month + "/" + (day + 1) + "/" + year;
            }
        });

        BottomNavigationView bottomNavigation = findViewById(R.id.navigationView);
        bottomNavigation.setOnNavigationItemSelectedListener(selectedListener);

        createNotificationChannel();
    }

    public void onClick(View view){
        if (view.getId() == R.id.daySelected_b){
            Toast.makeText(this, "Going to date " + date + ".", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(this, CalendarActivity.class);
            startActivity(intent);
        }
    }

    public void startNotifications(MenuItem item) {
        Intent intent = new Intent(this, NotificationActivity.class);
        //intent.putExtra(EXTRA_MESSAGE, "hello notifications");
        startActivity(intent);
    }

    //Starts the day view
    public void startCalendar(MenuItem menu) {
        Intent intent = new Intent(this, CalendarActivity.class);
        //TextView textView = (TextView) findViewById(R.id.textView);
        // String message = textView.getText().toString();
        //intent.putExtra(EXTRA_MESSAGE, "hi");
        startActivity(intent);
    }

    //Starts the month view
    public void startMonthView(MenuItem menu){
        Intent intent = new Intent(this, month_view.class);
        startActivity(intent);
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
}
