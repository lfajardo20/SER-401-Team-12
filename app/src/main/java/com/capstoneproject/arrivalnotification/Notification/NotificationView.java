package com.capstoneproject.arrivalnotification.Notification;

import android.content.Context;
import android.content.res.TypedArray;
import android.support.annotation.StyleableRes;
import android.util.AttributeSet;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.capstoneproject.arrivalnotification.R;

//adapting tutorial from https://medium.com/@otoloye/creating-custom-components-in-android-3d24a2bdaebd
public class NotificationView extends LinearLayout {

    @StyleableRes
    int index0 = 0;
    @StyleableRes
    int index1 = 1;
    @StyleableRes
    int index2 = 2;

    protected TextView notificationText;
    protected Button dismissButton;

    public NotificationView(Context context) {
        super(context);
        inflate(context, R.layout.custom_view, this);
        initComponents();
    }

    public NotificationView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        inflate(context, R.layout.custom_view, this);

        int[] sets = {R.attr.artistText, R.attr.trackText, R.attr.buyButton};
        TypedArray typedArray = context.obtainStyledAttributes(attrs, sets);
        CharSequence artist = typedArray.getText(index0);
        CharSequence buyButton = typedArray.getText(index2);
        typedArray.recycle();

        initComponents();

        notificationText.setText(artist);
        dismissButton.setText(buyButton);
    }

    public NotificationView(Context context, NotificationData dataset) {
        super(context);
        init(context, dataset);
    }

    private void init(Context context, NotificationData item) {
        inflate(context, R.layout.custom_view, this);
        initComponents();

        String display = (item.name + ": " + item.type
                + " \nLocation: " + item.location);

        notificationText.setText(display);
        dismissButton.setText("Dismiss");
    }

    private void initComponents() {
        notificationText = findViewById(R.id.notification_Text);
        dismissButton = findViewById(R.id.dismiss_Button);
    }

    public void setData(NotificationData item) {
        String display = (item.name + ": " + item.type
                + " \nLocation: " + item.location);

        notificationText.setText(display);
        dismissButton.setText("Dismiss");
    }
}