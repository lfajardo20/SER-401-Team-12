package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void startCalendar(View view) {
        Intent intent = new Intent(this, Calendar.class);
        //TextView textView = (TextView) findViewById(R.id.textView);
        // String message = textView.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, "hi");
        startActivity(intent);
    }

    public void startNotifications(View view) {
        Intent intent = new Intent(this, Notifications.class);
        intent.putExtra(EXTRA_MESSAGE, "hello notifications");
        startActivity(intent);
    }

}
