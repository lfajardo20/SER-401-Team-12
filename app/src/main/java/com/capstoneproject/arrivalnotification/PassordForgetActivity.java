package com.capstoneproject.arrivalnotification;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.util.List;
import org.json.JSONException;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class PassordForgetActivity extends AppCompatActivity {

    private TextView txt_email;
    private Button send;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_passord_forget);

        txt_email = (TextView) findViewById(R.id.txt_email);
        send = (Button) findViewById(R.id.btn_send);
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(txt_email.getText() == null || txt_email.getText() == ""){
                    Toast.makeText(PassordForgetActivity.this,"please input your email!",Toast.LENGTH_LONG).show();
                }
                String json = "{" + "\"email\":" + "\"" + txt_email.getText().toString() + "\"" + "}";
                String localhost = "http://192.168.1.11:8008";

                Retrofit.Builder builder = new Retrofit.Builder()
                                .baseUrl(localhost)
                                .addConverterFactory(GsonConverterFactory.create());
                Retrofit retrofit = builder.build();
                IPassword response = retrofit.create(IPassword.class);
                System.out.println("=================already in =====3=============");

                try {
                    JSONObject obj = new JSONObject(json);
                    //System.out.println("====json string is=====");
                    Call<ServerResponse> call = response.serverResponse(new ServerResponse(txt_email.getText().toString()));
                    System.out.println("=================already in =====4=============");
                    call.enqueue(new Callback<ServerResponse>() {
                        @Override
                        public void onResponse(Call<ServerResponse> call, Response<ServerResponse> response) {
                            ServerResponse res = response.body();
                            if(response.isSuccessful() && response.code() == 200){
                                Toast.makeText(PassordForgetActivity.this,res.getResult() + "please check your email box!",Toast.LENGTH_LONG).show();
                            }else if(response.isSuccessful() && response.code() != 200){
                                Toast.makeText(PassordForgetActivity.this,res.getResult() + "email failed to send!",Toast.LENGTH_LONG).show();
                            }
                            System.out.println("=======" + response.isSuccessful()+ ", " + response.body().getResult()+"=============");
                        }
                        @Override
                        public void onFailure(Call<ServerResponse> call, Throwable t) {
                            Toast.makeText(PassordForgetActivity.this,"error(:"+t.getMessage(),Toast.LENGTH_LONG).show();
                        }
                    });
                }catch (Throwable tx){
                    Log.e("My App", "Could not parse malformed JSON: " + json);
                }
            }
        });
    }
    /*
    public static JSONObject getJSONObjectFromURL(String urlString) throws IOException, JSONException {
        HttpURLConnection urlConnection = null;
        URL url = new URL(urlString);
        urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setReadTimeout(10000 );
        urlConnection.setConnectTimeout(15000 );
        urlConnection.setDoOutput(true);
        urlConnection.connect();

        BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
        StringBuilder sb = new StringBuilder();

        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line + "\n");
        }
        br.close();

        String jsonString = sb.toString();
        System.out.println("JSON: " + jsonString);

        return new JSONObject(jsonString);
    }*/
}
