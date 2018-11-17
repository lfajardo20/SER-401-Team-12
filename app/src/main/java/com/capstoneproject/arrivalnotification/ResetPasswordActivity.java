package com.capstoneproject.arrivalnotification;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ResetPasswordActivity extends AppCompatActivity {

    private Button btn_reset;
    private Button btn_cancel;
    private TextView txt_token;
    private TextView txt_pwd;
    private TextView txt_comfirm_pwd;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reset_password);

        txt_token = (TextView) findViewById(R.id.etxt_token);
        txt_pwd = (TextView) findViewById(R.id.etxt_password);
        txt_comfirm_pwd = (TextView) findViewById(R.id.etxt_confirm);
        btn_reset = (Button) findViewById(R.id.btn_reset);
        btn_cancel = (Button) findViewById(R.id.btn_cancel);

        btn_reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //send post request to server to reset password
            }
        });
        btn_cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //cancel the current form
            }
        });
    }
}
