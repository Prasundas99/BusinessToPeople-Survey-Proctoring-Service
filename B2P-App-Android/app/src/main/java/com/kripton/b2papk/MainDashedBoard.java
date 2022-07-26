package com.kripton.b2papk;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MainDashedBoard extends AppCompatActivity {
    ConstraintLayout new_form_button,sync_data_button,logout_button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_dashed_board);
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        new_form_button = findViewById(R.id.new_form_button);
        sync_data_button = findViewById(R.id.sync_data_button);
        logout_button = findViewById(R.id.logout_button);
        logout_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                editor.clear();
                editor.apply();
                Intent intent = new Intent(MainDashedBoard.this, Login.class);
                startActivity(intent);
                finish();
            }
        });
        new_form_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(MainDashedBoard.this, QuestionSetDashboard.class);
                startActivity(intent);
//                finish();
            }
        });
        sync_data_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainDashedBoard.this, AsyncData.class);
                startActivity(intent);
//                finish();

            }
        });
    }
}