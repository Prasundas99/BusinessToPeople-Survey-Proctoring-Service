package com.kripton.b2papk;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.RequestFuture;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class AsyncData extends AppCompatActivity {
    TextView all_pending;
    Button push_all;
    ArrayList<Integer> list;
    ProgressDialog pd;
    int i;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_async_data);
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        all_pending = findViewById(R.id.all_pending);
        push_all = findViewById(R.id.push_all);
        list = new ArrayList<>();
        JSONArray ar = null;
        try {
            ar = new JSONArray(preferences.getString("answer","[]"));
            all_pending.setText(ar.length()+"");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        push_all.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (isconnected()) {

                    try {
                        JSONArray array = new JSONArray(preferences.getString("answer", "[]"));
                        all_pending.setText(array.length() + "");
//                        Upload.execute();
                        new Upload().execute(array);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                else
                {
                    Toast.makeText(AsyncData.this, "No Internet is connected!", Toast.LENGTH_SHORT).show();
//                    Log.d("ArrayData",)
                }
            }
        });
    }
    private boolean isconnected() {
        ConnectivityManager connectivityManager = (ConnectivityManager) this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo wifi = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        NetworkInfo data = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
        if (wifi!= null&&wifi.isConnected()||data!= null&&data.isConnected())
        {
            return true;
        }else
        {
            return false;
        }

    }
    class Upload extends AsyncTask<JSONArray,Void,Void>
    {
        ProgressDialog pd = new ProgressDialog(AsyncData.this);

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            pd.setCancelable(false);
            pd.setMessage("Uploading answer pls wait...");
            pd.setIndeterminate(false);
            pd.show();
        }

        @Override
        protected void onPostExecute(Void unused) {
            super.onPostExecute(unused);
            SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
            SharedPreferences.Editor editor = preferences.edit();
            editor.putString("answer","[]");
            editor.apply();
            all_pending.setText("0");
            pd.cancel();
            pd.hide();
            pd.dismiss();
            Toast.makeText(AsyncData.this, "Add done!", Toast.LENGTH_SHORT).show();
        }

        @Override
        protected Void doInBackground(JSONArray... array) {
            SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
            String qestion_id = preferences.getString("qid","");
            String token = preferences.getString("token","null");
            String url = getString(R.string.base_url)+"/question-set/answer/"+qestion_id;
            for (i = 0; i < array[0].length(); i++) {
                try {
                    JSONObject answerQuerry = array[0].getJSONObject(i);
                    RequestQueue que = Volley.newRequestQueue(AsyncData.this);
                    RequestFuture<JSONObject> future = RequestFuture.newFuture();
                    JsonObjectRequest objectRequest = new JsonObjectRequest(Request.Method.PUT, url, answerQuerry, future, future) {
                        @Override
                        public Map<String, String> getHeaders() throws AuthFailureError {
                            HashMap<String, String> map = new HashMap<>();
                            map.put("Authorization", "Bearer " + token);
                            return map;
                        }
                    };
                    que.add(objectRequest);
//                            que.add()
                    JSONObject response = future.get();
//                    Toast.makeText(AsyncData.this, response.getString("messgae"), Toast.LENGTH_SHORT).show();


                    Log.d("Resp",response.getString("messgae"));
                }
                catch (Exception e)
                {
//                    Toast.makeText(AsyncData.this, "Some error occoured", Toast.LENGTH_SHORT).show();
                }
            }

            return null;
        }
    }
}