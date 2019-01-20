package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class signup extends AppCompatActivity {

    private String fname;
    private String lname;
    private String email;
    private String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        Button signup_button = findViewById(R.id.signup_button);

        signup_button.setOnClickListener(this::onClick);
    }

    public void onClick(View view) {
        if (view.getId() == R.id.signup_button){
            //Still need to check for empty spots
            Toast.makeText(this, "Account created!", Toast.LENGTH_SHORT).show();
            Intent login = new Intent(this, login.class);
            startActivity(login);
            super.finish();
        }
    }
}
