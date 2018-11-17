package com.capstoneproject.arrivalnotification.Notification;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * TODO: document your custom view class.
 */
public class NotificationView extends View {

    protected ImageView dismissalButton;
    protected TextView text;


    public NotificationView(Context context) {
        super(context);
        text = new TextView(context);
    }

    public NotificationView(Context context, AttributeSet attrs) {
        super(context, attrs);
        text = new TextView(context);
    }

    public NotificationView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        text = new TextView(context);
    }
}
