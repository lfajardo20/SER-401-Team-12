package com.capstoneproject.arrivalnotification.Notification;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.Arrays;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.MyViewHolder> {
    private ArrayList<NotificationData> data;

    //each viewholder encapsulates a custom view component and is managed internally by
    //the recyclerview
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public NotificationView notification;

        public MyViewHolder(NotificationView v) {
            super(v);
            notification = v;
        }
    }

    //provides the new adapter with a dataSet set that will determine each item's appearance
    public NotificationAdapter(NotificationData[] myDataset) {
        data = new ArrayList<>(Arrays.asList(myDataset));
    }

    // Create new views (invoked by the layout manager)
    @Override
    public NotificationAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // create a new view
        NotificationView v = new NotificationView(parent.getContext());
        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        NotificationData item = data.get(position);
        holder.notification.setData(item);

        //removes this item from the list and then notifies the list that it needs to redraw
        //TODO once backend is up, may need to send a request dismissing this on the server side
        holder.notification.setOnClick((View v) -> {
                    int index = data.indexOf(item);
                    data.remove(index);
                    this.notifyItemRemoved(index);
                }
        );
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return data.size();
    }
}