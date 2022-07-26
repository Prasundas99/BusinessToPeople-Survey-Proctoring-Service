package com.kripton.b2papk;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QuestionSetDashboard extends AppCompatActivity {
    RecyclerView recyclerView;
    List<QuestionSetModel> models;
    QuestionSetAdapter adapter;
    ProgressDialog progressDialog;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question_set_dashboard);
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        String token = preferences.getString("token","null");
        Log.d("Token",token);

        progressDialog = new ProgressDialog(QuestionSetDashboard.this);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Loading Questions set....");
        progressDialog.setCancelable(false);
        progressDialog.show();
        models = new ArrayList<>();
        adapter = new QuestionSetAdapter(models,QuestionSetDashboard.this);

        recyclerView = findViewById(R.id.recyclerView);

        LinearLayoutManager manager = new LinearLayoutManager(QuestionSetDashboard.this);
        manager.setOrientation(RecyclerView.VERTICAL);
        recyclerView.setLayoutManager(manager);
        recyclerView.setAdapter(adapter);
        RequestQueue queue = Volley.newRequestQueue(QuestionSetDashboard.this);
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET,getString(R.string.base_url)+"/question-set",null,listner->{
            try {
                JSONArray array = listner.getJSONArray("body");
                Log.d("Result",array.toString());
                for (int i = 0; i < array.length(); i++) {
                    JSONObject obj = array.getJSONObject(i);
                    models.add(new QuestionSetModel(obj.getString("_id"),obj.getString("setName")));
                }
                adapter.notifyDataSetChanged();
                progressDialog.cancel();
                progressDialog.hide();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        },error->{}) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                HashMap<String, String> map = new HashMap<>();
                map.put("Authorization", "Bearer " + token);
                return map;
            }
        };
        queue.add(request);

    }
}