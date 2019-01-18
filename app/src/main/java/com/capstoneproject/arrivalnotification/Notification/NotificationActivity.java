package com.capstoneproject.arrivalnotification.Notification;

import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import com.capstoneproject.arrivalnotification.calendar.CalendarActivity;
import com.capstoneproject.arrivalnotification.MainActivity;
import com.capstoneproject.arrivalnotification.R;

import java.time.LocalDateTime;

public class NotificationActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private Button button;

    private final int NOTIFICATION_ID = 307589173;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notifications);

        BottomNavigationView.OnNavigationItemSelectedListener selectedListener = (MenuItem item) -> {
            switch (item.getItemId()) {
                case R.id.navigation_notifications:
                    return true;
                case R.id.navigation_calendarDay:
                    startCalendar(item);
                    return true;
                case R.id.navigation_calendarMonth:
                    startCalendar(item);
                    return true;
                default:
                    return false;
            }
        };

        BottomNavigationView bottomNavigation = findViewById(R.id.navigationView);
        bottomNavigation.setOnNavigationItemSelectedListener(selectedListener);
        bottomNavigation.setSelectedItemId(R.id.navigation_notifications);

        recyclerView = findViewById(R.id.notification_recycler);

        // use a linear layout manager
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        LocalDateTime time =  LocalDateTime.now();
        //TODO use backend fetches instead of hard coding
        NotificationData[] data = {
                new NotificationData("Appendectomy", "John Doe", "OP206", time),
        };
        adapter = new NotificationAdapter(data);
        recyclerView.setAdapter(adapter);

        button = findViewById(R.id.notifyButton);
        Button.OnClickListener buttonListener = (View v) -> {
            createNotification();
        };

        button.setOnClickListener(buttonListener);
    }


    public void createNotification() {
        // Create an explicit intent for an Activity in your app
        Intent intent = new Intent(this, NotificationActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);

        String temp = Integer.toString(R.string.CHANNEL_ID);
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this, temp)
                .setSmallIcon(R.drawable.ic_barcode)
                .setContentTitle("My notification")
                .setContentText("Hello World!")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                // Set the intent that will fire when the user taps the notification
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);


        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);

        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(NOTIFICATION_ID, mBuilder.build());
    }

    public void startBarcode(MenuItem menu) {
        Intent intent = new Intent(this, MainActivity.class);
        //TextView textView = (TextView) findViewById(R.id.textView);
        // String message = textView.getText().toString();
        startActivity(intent);
    }

    public void startCalendar(MenuItem item) {
        Intent intent = new Intent(this, CalendarActivity.class);
        startActivity(intent);
    }

}
