package com.capstoneproject.arrivalnotification.Notification;

import android.content.Context;
import android.content.res.TypedArray;
import android.support.annotation.StyleableRes;
import android.util.AttributeSet;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.capstoneproject.arrivalnotification.R;

public class CustomView extends LinearLayout {

    @StyleableRes
    int index0 = 0;
    @StyleableRes
    int index1 = 1;
    @StyleableRes
    int index2 = 2;

    protected TextView notificationText;
    protected Button dismissButton;

    public CustomView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs);
    }

    private void init(Context context, AttributeSet attrs) {
        inflate(context, R.layout.custom_view, this);

        int[] sets = {R.attr.artistText, R.attr.trackText, R.attr.buyButton};
        TypedArray typedArray = context.obtainStyledAttributes(attrs, sets);
        CharSequence artist = typedArray.getText(index0);
        CharSequence track = typedArray.getText(index1);
        CharSequence buyButton = typedArray.getText(index2);
        typedArray.recycle();

        initComponents();

        notificationText.setText(artist);
        dismissButton.setText(buyButton);
    }

    private void initComponents() {
        notificationText = findViewById(R.id.notification_Text);
        dismissButton = findViewById(R.id.dismiss_Button);
    }
}