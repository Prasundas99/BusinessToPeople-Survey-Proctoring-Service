package com.kripton.b2papk;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.RequestFuture;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.github.dhaval2404.imagepicker.ImagePicker;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class MainActivity extends AppCompatActivity {
    LinearLayout scrollview;
    EditText eText[];
    ImageView img[];
    HashMap<String,Integer> emap;
    HashMap<Integer,String> imgp;
    HashMap<Integer,Integer> imgstore;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        scrollview = findViewById(R.id.scrollview);
        new MyThread().execute("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzAzODUyNzE2YWE0NTc5Y2ExOTViMSIsImlhdCI6MTYzOTk4OTQ4MiwiZXhwIjoxNjQyNTgxNDgyfQ.Ts-Lc8ZsjL2NRAr3KSMaI4uRTw1PZMcLXjQ6kuymit0");

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Toast.makeText(MainActivity.this, imgp.get(requestCode), Toast.LENGTH_SHORT).show();



    }
    private class MyThread extends AsyncTask<String,Void,String>
    {
        @Override
        protected void onPreExecute() {
            emap = new HashMap<>();
            imgp = new HashMap<>();
            imgstore = new HashMap<>();
            scrollview = findViewById(R.id.scrollview);
            super.onPreExecute();
            Toast.makeText(MainActivity.this, "Please wait!!!", Toast.LENGTH_SHORT).show();
        }

        @Override
        protected String doInBackground(String... strings) {
            String res="";
            String url = "https://b2p-app-backend.herokuapp.com/question-set";
            RequestQueue queue = Volley.newRequestQueue(MainActivity.this);
            RequestFuture<String> future = RequestFuture.newFuture();
            StringRequest request = new StringRequest(Request.Method.GET, url, future, future){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String,String> map = new HashMap<>();
                    map.put("Authorization","Bearer "+strings[0]);
                    return map;
                }
            };
            queue.add(request);
            try {
                res = future.get();


            } catch (Exception e) {
                e.printStackTrace();
            }
            return res;
        }

        @Override
        protected void onPostExecute(String res) {
            super.onPostExecute(res);
            JSONArray query;
            Toast.makeText(MainActivity.this, "Now Start Uploading", Toast.LENGTH_SHORT).show();
            Log.d("data",res);
            try {
                JSONObject object = new JSONObject(res);
                JSONArray array = object.getJSONArray("body");
                JSONObject new_obj = array.getJSONObject(0);
                query = new_obj.getJSONArray("querry");
                int i,j=0,k=1;
                Log.d("Querry",String.valueOf(query));
                eText = new EditText[query.length()];
                img = new ImageView[query.length()];
                Log.d("QuerryLen",query.length()+"");

                    for (i=0;i<query.length();i++)
                    {
                        JSONObject jsonObject = query.getJSONObject(i);
                        TextView tv = new TextView(MainActivity.this);
                        String q = jsonObject.getString("question");
                        if (jsonObject.getBoolean("mandatory"))
                        {
                            q+="*";
                        }
                        tv.setText(q);
                        tv.setTextSize(16);
                        tv.setTextColor(Color.parseColor("#000000"));
                        float scale =MainActivity.this.getResources().getDisplayMetrics().density;
                        if (jsonObject.getString("dataType").equalsIgnoreCase("text"))
                        {
                            int h = (int) (50*scale+0.5f);
                            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,h);
                            params.setMargins(0,5,0,0);//ltrb
                            eText[j] = new EditText(MainActivity.this);
                            eText[j].setHintTextColor(Color.parseColor("#000000"));
                            eText[j].setTextSize(18);
                            eText[j].setLayoutParams(params);
                            eText[j].setBackground(getDrawable(R.drawable.strock_bordettv));
                            emap.put(jsonObject.getString("_id"),j);
                            scrollview.addView(tv);
                            scrollview.addView(eText[j]);
                            j++;
                        }
                        else if (jsonObject.getString("dataType").equalsIgnoreCase("file"))
                        {
                            scrollview.addView(tv);
                            img[k-1]= new ImageView(MainActivity.this);
                            img[k-1].setMinimumWidth(200);
                            img[k-1].setMinimumHeight(300);
                            img[k-1].setImageDrawable(getDrawable(R.drawable.ic_baseline_add_24));
                            img[k-1].setBackground(getDrawable(R.drawable.image_background));
                            imgp.put(k,jsonObject.getString("_id"));
                            int m = k;
                            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
                            params.setMargins(0,20,0,10);
                            img[k-1].setLayoutParams(params);
                            img[k-1].setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    ImagePicker.with(MainActivity.this)
                                            .cameraOnly()
                                            .compress(1024)
                                            .maxResultSize(1080, 1080)
                                            .start(m);

                                }
                            });
                            scrollview.addView(img[k-1]);
                            k++;
                        }
                    }
                Button send = new Button(MainActivity.this);
                    send.setText("Submit");
                    send.setBackgroundColor(Color.parseColor("#ff0000"));
                    send.setTextColor(Color.parseColor("#ffffff"));
                    send.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            for (int i=0;i<query.length();i++)
                            {
                                try {
                                    JSONObject jsonObject = query.getJSONObject(i);
                                    if (jsonObject.getString("dataType").equalsIgnoreCase("text"))
                                    {
                                        int id = emap.get(jsonObject.getString("_id"));
                                        Log.d("TAG", id+"");
                                        if (eText[id].getText().toString().isEmpty()&&jsonObject.getBoolean("mandatory"))
                                        {
                                            eText[id].setError("Enter this field");
                                        }
                                    }

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    });
                scrollview.addView(send);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}