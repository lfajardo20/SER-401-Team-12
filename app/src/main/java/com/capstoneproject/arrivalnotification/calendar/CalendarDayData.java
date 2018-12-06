package com.capstoneproject.arrivalnotification.calendar;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

public class CalendarDayData {
    public LocalDateTime date;
    public ArrayList<CalendarItemData> dataSet;

    public CalendarDayData(LocalDateTime date, CalendarItemData[] data) {
        this.date = date;
        this.dataSet = new ArrayList<>(Arrays.asList(data));
    }
}
