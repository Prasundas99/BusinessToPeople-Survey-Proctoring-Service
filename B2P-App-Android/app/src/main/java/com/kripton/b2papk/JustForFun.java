package com.kripton.b2papk;

import androidx.annotation.Nullable;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpStack;

public class JustForFun  extends Request<String>{


    public JustForFun(String url, Response.ErrorListener errorListener) {
        super(url, errorListener);
    }

    public JustForFun(int method, String url, @Nullable Response.ErrorListener errorListener) {
        super(method, url, errorListener);
    }

    @Override
    protected Response<String> parseNetworkResponse(NetworkResponse response) {
        return null;
    }

    @Override
    protected void deliverResponse(String response) {

    }
}
