package com.capstoneproject.arrivalnotification;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface IPassword {
    @POST("/")
    Call<ServerResponse> serverResponse(@Body ServerResponse res);
}
