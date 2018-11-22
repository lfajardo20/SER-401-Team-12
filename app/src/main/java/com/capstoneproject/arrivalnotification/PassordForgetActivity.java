package com.capstoneproject.arrivalnotification;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class PassordForgetActivity extends AppCompatActivity {

    private Button btn_send_email;
    private TextView txt_email;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_passord_forget);

        btn_send_email = (Button) findViewById(R.id.btn_sendEmail);
        txt_email = (TextView) findViewById(R.id.etxt_email);
/*
        final RequestQueue queue = Volley.newRequestQueue(this);
        final String url = "http://localhost:8008/postdata"; // your URL

        queue.start();*/

        btn_send_email.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                //get request to server, gennerate token and send email to user
                /*
                HashMap<String, String> params = new HashMap<String,String>();
                params.put("data", DataField.getText().toString()); // the entered data as the JSON body.

                JsonObjectRequest jsObjRequest = new
                        JsonObjectRequest(Request.Method.POST,
                        url,
                        new JSONObject(params),
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                try {
                                    DisplayText.setText(response.getString("message"));
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        DisplayText.setText("That didn't work!");
                    }
                });
                queue.add(jsObjRequest);*/
            }
        });
    }
}
