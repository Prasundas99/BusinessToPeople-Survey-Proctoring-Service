package com.kripton.b2papk;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.textfield.TextInputEditText;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class Login extends AppCompatActivity {
    TextInputEditText username,password;
    Button login;
    ProgressBar pbar_login;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        getSupportActionBar().hide();
        username = findViewById(R.id.username);
        password = findViewById(R.id.password);
        login = findViewById(R.id.login);
        pbar_login = findViewById(R.id.pbar_login);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String unm = username.getText().toString();
                String pass = password.getText().toString();
                if (!TextUtils.isEmpty(unm))
                {
                    if (!TextUtils.isEmpty(pass))
                    {
                        pbar_login.setVisibility(View.VISIBLE);
                        login.setVisibility(View.GONE);
                        RequestQueue queue = Volley.newRequestQueue(Login.this);
                        JSONObject object = new JSONObject();
                        try {
                            object.put("name",unm);
                            object.put("password",pass);
                            JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, getString(R.string.base_url) + "/user/login/worker", object, new Response.Listener<JSONObject>() {
                                @Override
                                public void onResponse(JSONObject response) {
                                    pbar_login.setVisibility(View.GONE);
                                    login.setVisibility(View.VISIBLE);
                                    try {
                                        Toast.makeText(Login.this, response.getString("message"), Toast.LENGTH_SHORT).show();
                                        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
                                        SharedPreferences.Editor editor = preferences.edit();
                                        editor.putString("token",response.getString("token"));
                                        editor.apply();
                                        Intent intent = new Intent(Login.this,MainDashedBoard.class);
                                        startActivity(intent);
                                        finish();
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }
                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    pbar_login.setVisibility(View.GONE);
                                    login.setVisibility(View.VISIBLE);

                                    try {

                                        if (error.networkResponse.data!=null) {
                                            String res = new String(error.networkResponse.data, "utf-8");
                                            JSONObject obj = new JSONObject(res);
                                            Toast.makeText(Login.this, obj.getString("message"), Toast.LENGTH_SHORT).show();
                                        }
                                        else
                                        {
                                            Toast.makeText(Login.this, "Some error occurred", Toast.LENGTH_SHORT).show();
                                        }
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    } catch (UnsupportedEncodingException e) {
                                        e.printStackTrace();
                                    }
                                }
                            });
                            queue.add(request);
                        }catch (Exception e)
                        {
                            pbar_login.setVisibility(View.GONE);
                            login.setVisibility(View.VISIBLE);
                            Toast.makeText(Login.this, "Some error occur", Toast.LENGTH_SHORT).show();
                        }
                    }
                    else
                    {
                        password.setError("Enter password");
                    }
                }
                else
                {
                    username.setError("enter username");
                }
            }
        });
    }
}