package com.capstoneproject.arrivalnotification.calendar;

import android.content.Context;
import android.content.res.TypedArray;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.annotation.StyleableRes;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.capstoneproject.arrivalnotification.R;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

//adapting tutorial from https://medium.com/@otoloye/creating-custom-components-in-android-3d24a2bdaebd
public class CalendarDayView extends LinearLayout {

    //resource value indices for XML created views
    @StyleableRes
    int index0 = 0;
    @StyleableRes
    int index1 = 1;
    @StyleableRes
    int index2 = 2;

    protected TextView dayText;
    protected RecyclerView recyclerView;
    private RecyclerView.LayoutManager layoutManager;

    //closest to default constructor
    //
    public CalendarDayView(Context context) {
        super(context);
        inflate(context, R.layout.calendar_day_view, this);
        initComponents();
    }

    //constructor and initialization function for XML created views
    public CalendarDayView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        inflate(context, R.layout.calendar_item_view, this);

        int[] sets = {R.attr.artistText, R.attr.trackText, R.attr.buyButton};
        TypedArray typedArray = context.obtainStyledAttributes(attrs, sets);
        CharSequence artist = typedArray.getText(index0);
        CharSequence buyButton = typedArray.getText(index2);
        typedArray.recycle();

        initComponents();
    }

    //constructor/init combo for programmatic (java) creation of this view item
    //currently unused since recyclerview items are constructed before they have dataSet
    @RequiresApi(api = Build.VERSION_CODES.O)
    public CalendarDayView(Context context, CalendarDayData dataset) {
        super(context);
        init(context, dataset);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void init(Context context, CalendarDayData item) {
        inflate(context, R.layout.calendar_day_view, this);
        initComponents();

        LocalDateTime date = item.date;
        String dateDisplay = date.format(DateTimeFormatter.ofPattern("d/m/Y \n H:m"));
        dayText.setText("Hello");
        // dayText.setText(dateDisplay);
    }

    private void initComponents() {
        dayText = findViewById(R.id.day_Text);
        recyclerView = findViewById(R.id.day_Recycler);

        layoutManager = new LinearLayoutManager(this.getContext());
        recyclerView.setLayoutManager(layoutManager);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void setData(CalendarDayData item) {
        LocalDateTime date = item.date;
        String dateDisplay = date.format(DateTimeFormatter.ofPattern("E L/d/u"));
        dayText.setText(dateDisplay);
        // dayText.setText(dateDisplay);

        ArrayList<CalendarItemData> dataSet = item.dataSet;
        CalendarItemAdapter adapter = new CalendarItemAdapter(dataSet);

        recyclerView.setAdapter(adapter);
    }
}