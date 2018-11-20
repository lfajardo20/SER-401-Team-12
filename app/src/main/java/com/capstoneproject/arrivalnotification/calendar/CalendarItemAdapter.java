package com.capstoneproject.arrivalnotification.calendar;

import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.widget.RecyclerView;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.Arrays;

public class CalendarItemAdapter extends RecyclerView.Adapter<CalendarItemAdapter.MyViewHolder> {
    private ArrayList<CalendarItemData> data;

    //each viewholder encapsulates a custom view component and is managed internally by
    //the recyclerview
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public CalendarItemView calendarItem;

        public MyViewHolder(CalendarItemView v) {
            super(v);
            calendarItem = v;
        }
    }

    //provides the new adapter with a dataSet set that will determine each item's appearance
    public CalendarItemAdapter(CalendarItemData[] myDataset) {
        data = new ArrayList<>(Arrays.asList(myDataset));
    }

    // Create new views (invoked by the layout manager)
    @Override
    public CalendarItemAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // create a new view
        CalendarItemView v = new CalendarItemView(parent.getContext());
        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        CalendarItemData item = data.get(position);
        holder.calendarItem.setData(item);
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return data.size();
    }
}