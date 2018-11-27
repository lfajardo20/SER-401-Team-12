package com.capstoneproject.arrivalnotification.calendar;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
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
import com.capstoneproject.arrivalnotification.common.DownloadCallback;
import com.capstoneproject.arrivalnotification.common.NetworkFragment;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDateTime;

@RequiresApi(api = Build.VERSION_CODES.O)
public class CalendarActivity extends AppCompatActivity implements DownloadCallback<String> {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter adapter;
    private RecyclerView.LayoutManager layoutManager;
    private Button button;

    //network members
    NetworkFragment networkFragment;
    boolean downloading = false;


    //sample/mockup data
    LocalDateTime time = LocalDateTime.now();
    CalendarItemData[] day1 = {
            new CalendarItemData("Loading", "", "", time),
            new CalendarItemData("Loading", "", "", time),
    };
    CalendarItemData[] day2 = {
            new CalendarItemData("Loading", "", "", time),
    };

    CalendarDayData[] data = {
            new CalendarDayData(time, day1),
            new CalendarDayData(time.plusDays(4), day2),
    };

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


        adapter = new CalendarDayAdapter(data);
        recyclerView.setAdapter(adapter);

        //TODO use backend fetches instead of hard coding
        networkFragment = NetworkFragment.getInstance(getSupportFragmentManager(),
                "https://ka388qldlb.execute-api.us-west-1.amazonaws.com/test");
        startDownload();
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

    //networking callbacks and methods
    private void startDownload() {
        if (!downloading && networkFragment != null) {
            // Execute the async download.
            networkFragment.startDownload(this);
            downloading = true;
        }
    }

    @Override
    public NetworkInfo getActiveNetworkInfo() {
        ConnectivityManager connectivityManager =
                (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        return networkInfo;
    }

    @Override
    public void finishDownloading() {
        downloading = false;
        if (networkFragment != null) {
            networkFragment.cancelDownload();
        }
    }

    @Override
    public void updateFromDownload(String result) {
        // Update your UI here based on result of download.
        JSONArray days;
        CalendarDayData[] newData = null;
        try {
            days = new JSONArray(result);
            newData = new CalendarDayData[days.length()];

            for (int ii = 0; ii < days.length(); ii++) {
                JSONObject day = days.getJSONObject(ii);
                //TODO implement actual date parsing
                String date = day.getString("date");

                JSONArray schedule = day.getJSONArray("schedule");
                CalendarItemData[] items = new CalendarItemData[schedule.length()];
                for (int jj = 0; jj < schedule.length(); jj++) {
                    JSONObject item = schedule.getJSONObject(jj);

                    String type = (String) item.get("type");
                    String name = (String) item.get("name");
                    String location = (String) item.get("location");
                    LocalDateTime itemDate = time;
                    //TODO date parsing
                    //String time = (String) item.get("time");

                    items[jj] = new CalendarItemData(type, name, location, itemDate);
                }
                newData[ii] = new CalendarDayData(time, items);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }

        this.data = newData;

        adapter = new CalendarDayAdapter(data);
        recyclerView.setAdapter(adapter);
    }

    @Override
    public void onProgressUpdate(int progressCode, int percentComplete) {
        switch (progressCode) {
            // You can add UI behavior for progress updates here.
            case Progress.ERROR:
                break;
            case Progress.CONNECT_SUCCESS:
                break;
            case Progress.GET_INPUT_STREAM_SUCCESS:
                break;
            case Progress.PROCESS_INPUT_STREAM_IN_PROGRESS:
                break;
            case Progress.PROCESS_INPUT_STREAM_SUCCESS:
                break;
        }
    }
}
