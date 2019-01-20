package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;

import javax.net.ssl.HttpsURLConnection;

public class login extends AppCompatActivity {

    //private Button btn_forget_pwd;
    //private String currentUser;
    private boolean isDoctor;
    private boolean isTransporter;

    public void loginUser (View view) {

        EditText usr = (EditText) findViewById(R.id.usernameEdit);
        EditText pwd = (EditText) findViewById(R.id.passwordEdit);
        Intent changeActivity;

        String url = "https://awk4q8rl4b.execute-api.us-west-1.amazonaws.com/test";
        String json = "{"
                        + "\"userName\":" + "\"" + usr.getText().toString().trim() + "\","
                        + "\"password\":" + "\"" + pwd.getText().toString().trim() + "\""
                        +"}";
        try {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);

            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost(url);

            Log.v("SENT", json);

            StringEntity params = new StringEntity(json);

            post.setEntity(params);
            post.setHeader("Content-type", "application/json");
            HttpResponse response = client.execute(post);

            BufferedReader br = new BufferedReader(
                    new InputStreamReader(response.getEntity().getContent()));
            StringBuffer res = new StringBuffer();
            String line = "";
            while ((line = br.readLine()) != null){
                Log.d("line", line);
                res.append(line);
            }

            //Login authentication.
            String user = res.toString().replace("\"", "");
            if (user.equalsIgnoreCase("doctor")){
                isDoctor = true;
            } else if (user.equalsIgnoreCase("transporter")){
                isTransporter = true;
            }
            else {
                Toast.makeText(this, "Username or password is incorrect", Toast.LENGTH_SHORT).show();
            }

            //Display activity of user
            if(isDoctor) {
                Intent Doctor = new Intent(this, DoctorActivity.class);
                startActivity(Doctor);
                super.finish();
            } else if(isTransporter) {
            Intent Transporter = new Intent(this, TransporterActivity.class);
            startActivity(Transporter);
            super.finish();
            }


        }catch (Exception e){
            e.printStackTrace();
        }

    }

    public void onClick(View view){
        if (view.getId() == R.id.changeLoginMode){
            Intent Signup = new Intent(this, signup.class);
            startActivity(Signup);
            super.finish();
        }
        else if (view.getId() == R.id.btn_forgetPwd){
            startActivity(new Intent(getApplicationContext(),PassordForgetActivity.class));
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button btn_forget_pwd = findViewById(R.id.btn_forgetPwd);
        TextView changeLoginMode = findViewById(R.id.changeLoginMode);

        btn_forget_pwd.setOnClickListener(this::onClick);
        changeLoginMode.setOnClickListener(this::onClick);
    }
}
