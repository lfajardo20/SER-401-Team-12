package com.capstoneproject.arrivalnotification.calendar;

import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.widget.RecyclerView;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.Arrays;

public class CalendarDayAdapter extends RecyclerView.Adapter<CalendarDayAdapter.MyViewHolder> {
    private ArrayList<CalendarDayData> data;

    //each viewholder encapsulates a custom view component and is managed internally by
    //the recyclerview
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public CalendarDayView calendarDay;

        public MyViewHolder(CalendarDayView v) {
            super(v);
            calendarDay = v;
        }
    }

    //provides the new adapter with a dataSet set that will determine each item's appearance
    public CalendarDayAdapter(CalendarDayData[] myDataset) {
        data = new ArrayList<>(Arrays.asList(myDataset));
    }

    // Create new views (invoked by the layout manager)
    @Override
    public CalendarDayAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // create a new view
        CalendarDayView v = new CalendarDayView(parent.getContext());
        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        CalendarDayData item = data.get(position);
        //holder.calendarDay.ini
        holder.calendarDay.setData(item);
    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return data.size();
    }
}