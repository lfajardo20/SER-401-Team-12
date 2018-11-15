package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;

public class NotificationActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notifications);

        BottomNavigationView.OnNavigationItemSelectedListener selectedListener = (MenuItem item) -> {
            switch (item.getItemId()) {
                case R.id.navigation_notifications:
                    return true;
                case R.id.navigation_barcode:
                    startBarcode(item);
                    return true;
                case R.id.navigation_calendar:
                    startCalendar(item);
                    return true;
                default:
                    return false;
            }
        };

        BottomNavigationView bottomNavigation = findViewById(R.id.navigationView);
        bottomNavigation.setOnNavigationItemSelectedListener(selectedListener);

        recyclerView = findViewById(R.id.notification_recycler);

        // use a linear layout manager
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        String[] data = {"hi", "hello",};
        adapter = new NotificationAdapter(data);
        recyclerView.setAdapter(adapter);
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
