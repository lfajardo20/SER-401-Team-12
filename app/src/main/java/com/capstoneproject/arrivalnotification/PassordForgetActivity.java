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

        btn_send_email.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //get request to server, gennerate token and send email to user
            }
        });
    }
}
