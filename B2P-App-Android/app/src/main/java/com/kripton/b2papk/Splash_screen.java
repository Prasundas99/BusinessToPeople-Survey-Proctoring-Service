package com.kripton.b2papk;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.SystemClock;

public class Splash_screen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        SystemClock.sleep(1000);
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        if (preferences.getString("token","null").equalsIgnoreCase("null")) {
            Intent intent = new Intent(this, Login.class);
            startActivity(intent);
            finish();
        }
        else
        {
            Intent intent = new Intent(this, MainDashedBoard.class);
            startActivity(intent);
            finish();
        }
    }
}