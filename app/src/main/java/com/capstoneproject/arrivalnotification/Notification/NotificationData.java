package com.capstoneproject.arrivalnotification.Notification;

/**
 * POJO class that stores the variables for an in-app notification
 * may need to have location changed to a geolocation depending on how the backend works
 */
public class NotificationData {
    public String type, name, location;

    public NotificationData(String type, String name, String location) {
        this.type = type;
        this.name = name;
        this.location = location;
    }
}
