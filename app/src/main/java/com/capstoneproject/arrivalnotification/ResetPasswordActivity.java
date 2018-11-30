package com.capstoneproject.arrivalnotification;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

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

        String email = getIntent().getStringExtra("email");
        System.out.println("=====user email" + email + "======");

        btn_reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //send post request to server to reset password
                String token = txt_token.getText().toString().trim();
                String pwd = txt_pwd.getText().toString();
                String con_pwd = txt_comfirm_pwd.getText().toString();
                if(token.isEmpty()){
                    Toast.makeText(ResetPasswordActivity.this,"token can't be empty!",Toast.LENGTH_LONG).show();
                    return;
                }
                if(pwd.isEmpty()){
                    Toast.makeText(ResetPasswordActivity.this,"password can't be empty!",Toast.LENGTH_LONG).show();
                    return;
                }
                //check pwd and con_pwd is matched or not
                if(!pwd.matches(con_pwd)){
                    Toast.makeText(ResetPasswordActivity.this,"confirm password and confirm password do not match!",Toast.LENGTH_LONG).show();
                    return;
                }
                //send post request to server to reset password
            }
        });
        btn_cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //cancel the current activity
                startActivity(new Intent(ResetPasswordActivity.this,login.class));
                finish();
            }
        });
    }
}
