package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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

    private Button btn_forget_pwd;

    public void loginUser (View view) {

        EditText usr = (EditText) findViewById(R.id.usernameEdit);
        EditText pwd = (EditText) findViewById(R.id.passwordEdit);
        Intent changeActivity;
        JSONObject obj;
        String url = "https://awk4q8rl4b.execute-api.us-west-1.amazonaws.com/test";
//        HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
//        try {
//            InputStream in = new BufferedInputStream(urlConnection.getInputStream());
//            readStream(in);
//        } finally {
//            urlConnection.disconnect();
//        }
        String json = "{"
                        + "\"userName\":" + "\"" + usr.getText().toString().trim() + "\","
                        + "\"password\":" + "\"" + pwd.getText().toString().trim() + "\""
                        +"}";
        try {
            //obj = new JSONObject(json);
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

            Log.i("YESH", res.toString());

//            Toast.makeText(this,"json string is: usrname = " + obj.getString("userName") + ",pwd = " + obj.getString("password"),
//                    Toast.LENGTH_LONG).show();
        }catch (Exception e){
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
