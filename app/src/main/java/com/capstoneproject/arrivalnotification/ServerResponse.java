package com.capstoneproject.arrivalnotification;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ServerResponse {
    @SerializedName("value")
    @Expose
    private String result;

    public ServerResponse(String result){
        this.result = result;
    }

    public String getResult() {
        return result;
    }
}
