package com.capstoneproject.arrivalnotification.Notification;

import android.support.v7.widget.RecyclerView;
import android.view.ViewGroup;
import android.widget.TextView;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.MyViewHolder> {
    private NotificationData[] data;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView text;

        public MyViewHolder(TextView v) {
            super(v);
            text = v;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public NotificationAdapter(NotificationData[] myDataset) {
        data = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public NotificationAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                               int viewType) {
        // create a new view
        TextView v = new TextView(parent.getContext());
        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        NotificationData item = data[position];
        String display = (item.name + ": " + item.type
                + " \nLocation: " + item.location);
        holder.text.setText(display);
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return data.length;
    }
}