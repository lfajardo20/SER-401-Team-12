package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class login extends AppCompatActivity {

    public void loginUser (View view) {

        EditText usr = (EditText) findViewById(R.id.usernameEdit);
        EditText pwd = (EditText) findViewById(R.id.passwordEdit);
        Intent changeActivity;

        if (usr.getText().toString().matches("admin") && pwd.getText().toString().matches("password")) {
            //After user logs in, it will default to the barcode scanner activity.
            changeActivity = new Intent(this, MainActivity.class);
            startActivity(changeActivity);
        } else {
            Toast.makeText(this, "Username or password is incorrect", Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }
}
