package com.capstoneproject.arrivalnotification;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
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
    final private String url = "http://192.168.1.11:8008";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_passord_forget);

        txt_email = (TextView) findViewById(R.id.txt_email);
        send = (Button) findViewById(R.id.btn_send);
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) { /*empty check*/
                if(txt_email.getText() == null || txt_email.getText() == ""){
                    Toast.makeText(PassordForgetActivity.this,"please input your email!",Toast.LENGTH_LONG).show();
                    return;
                }

                if(!isValidEmail(txt_email.getText())){/*format check*/
                    Toast.makeText(PassordForgetActivity.this,"email format is invalid!",Toast.LENGTH_LONG).show();
                    return;
                }
                //String json = "{" + "\"email\":" + "\"" + txt_email.getText().toString() + "\"" + "}";
                //connect to remote host by using retrofit
                //String localhost = "http://192.168.1.11:8008";

                Retrofit.Builder builder = new Retrofit.Builder()
                                .baseUrl(url)//load url
                                .addConverterFactory(GsonConverterFactory.create());//parse response by using gson

                Retrofit retrofit = builder.build();//retrofit instance
                IPassword response = retrofit.create(IPassword.class);

                Call<ServerResponse> call = response.serverResponse(new ServerResponse(txt_email.getText().toString()));

                call.enqueue(new Callback<ServerResponse>() {//async
                    @Override
                    public void onResponse(Call<ServerResponse> call, Response<ServerResponse> response) {//get response
                        ServerResponse res = response.body();
                        if(response.isSuccessful() && response.code() == 200) {
                            Toast.makeText(PassordForgetActivity.this,res.getResult() + "please check your email box!",Toast.LENGTH_LONG).show();
                        } else if(response.isSuccessful() && response.code() != 200){/*get response successfully*/
                                Toast.makeText(PassordForgetActivity.this,res.getResult() + "email failed to send!",Toast.LENGTH_LONG).show();
                        }
                        System.out.println("=======" + response.isSuccessful()+ ", " + response.body().getResult()+"=============");
                    }
                    @Override
                    public void onFailure(Call<ServerResponse> call, Throwable t) {/*failed to receive response*/
                        Toast.makeText(PassordForgetActivity.this,"error(:"+t.getMessage(),Toast.LENGTH_LONG).show();
                    }
                });
            }
        });
    }
    boolean isValidEmail(CharSequence email){
        return Patterns.EMAIL_ADDRESS.matcher(email).matches();
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
