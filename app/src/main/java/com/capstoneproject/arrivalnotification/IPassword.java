package com.capstoneproject.arrivalnotification;

import retrofit2.Call;
import retrofit2.http.GET;

public interface IPassword {
    @GET("/sendEmail")
    Call<ServerResponse> serverResponse(String email);
}
