package com.capstoneproject.arrivalnotification.calendar;

import java.time.LocalDateTime;

/**
 * POJO class that stores the variables for an item in a schedule/calendar
 * may need to have location changed to a geolocation depending on how the backend works
 */
public class CalendarItemData {
    public String type, name, location;
    public LocalDateTime date;

    public CalendarItemData(String type, String name, String location, LocalDateTime date) {
        this.type = type;
        this.name = name;
        this.location = location;
        this.date = date;
    }
}
