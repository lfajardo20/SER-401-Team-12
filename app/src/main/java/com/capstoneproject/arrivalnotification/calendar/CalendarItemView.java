package com.capstoneproject.arrivalnotification.calendar;

import android.content.Context;
import android.content.res.TypedArray;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.annotation.StyleableRes;
import android.util.AttributeSet;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.capstoneproject.arrivalnotification.R;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

//adapting tutorial from https://medium.com/@otoloye/creating-custom-components-in-android-3d24a2bdaebd
public class CalendarItemView extends LinearLayout {

    //resource value indices for XML created views
    @StyleableRes
    int index0 = 0;
    @StyleableRes
    int index1 = 1;
    @StyleableRes
    int index2 = 2;

    protected TextView detailsText;
    protected TextView timeText;
    protected Button dismissButton;

    //closest to default constructor
    //
    public CalendarItemView(Context context) {
        super(context);
        inflate(context, R.layout.calendar_item_view, this);
        initComponents();
    }

    //constructor and initialization function for XML created views
    public CalendarItemView(Context context, AttributeSet attrs) {
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

        detailsText.setText(artist);
        dismissButton.setText(buyButton);
    }

    //constructor/init combo for programmatic (java) creation of this view item
    //currently unused since recyclerview items are constructed before they have dataSet
    public CalendarItemView(Context context, CalendarItemData dataset) {
        super(context);
        init(context, dataset);
    }

    private void init(Context context, CalendarItemData item) {
        inflate(context, R.layout.calendar_item_view, this);
        initComponents();

        /* TODO change component attributes based on the dataSet item
        String detailDisplay = (item.name + ": " + item.type
                + " \nLocation: " + item.location);

        // String timeDisplay = (item.date.getTime() + "\n" + item.date.getDate());
*/

        //detailsText.setText(detailDisplay);
        timeText.setText("init is being called");
        dismissButton.setText("Dismiss");
    }

    private void initComponents() {
        detailsText = findViewById(R.id.details_Text);
        timeText = findViewById(R.id.time_Text);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void setData(CalendarItemData item) {

        //translates the information of each surgery calendarDay into text
        String detailDisplay = (item.name + ": " + item.type
                + " \nLocation: " + item.location);
        LocalDateTime date = item.date;
        String timeDisplay = date.format(DateTimeFormatter.ofPattern("d/m/Y \n H:m"));

        detailsText.setText(detailDisplay);
        timeText.setText(timeDisplay);

    }
}