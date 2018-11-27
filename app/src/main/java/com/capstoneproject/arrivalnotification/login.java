package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

public class login extends AppCompatActivity {

    private Button btn_forget_pwd;

    public void loginUser (View view) {

        EditText usr = (EditText) findViewById(R.id.usernameEdit);
        EditText pwd = (EditText) findViewById(R.id.passwordEdit);
        Intent changeActivity;
        JSONObject obj;
        String json = "{"
                        + "\"userName\":" + "\"" + usr.getText().toString().trim() + "\","
                        + "\"password\":" + "\"" + pwd.getText().toString().trim() + "\""
                        +"}";
        try {
            obj = new JSONObject(json);
            Toast.makeText(this,"json string is: usrname = " + obj.getString("userName") + ",pwd = " + obj.getString("password"),
                    Toast.LENGTH_LONG).show();
        }catch (JSONException e){
            e.printStackTrace();
        }
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

        btn_forget_pwd = findViewById(R.id.btn_forgetPwd);
        btn_forget_pwd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(),PassordForgetActivity.class));
            }
        });
    }
}
