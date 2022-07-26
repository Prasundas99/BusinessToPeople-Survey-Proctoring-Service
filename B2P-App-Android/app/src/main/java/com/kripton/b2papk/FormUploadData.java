package com.kripton.b2papk;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.BitmapDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.github.dhaval2404.imagepicker.ImagePicker;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FormUploadData extends AppCompatActivity{
    interface VolleyCallback
    {
        void onSuccess(String url,String qid);
    }
    List<DataModelClass> list;
    LinearLayout layout_form;
    ProgressDialog progressDialog;
    HashMap<Integer,Integer> for_edit_txt,for_imgs;
    HashMap<Integer,String > questionSet;
    EditText[] editText;
    Button[] btn;
    JSONArray picarray;
    ImageView[] pics;
    int e,f,b,img;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form_upload_data);
        layout_form = findViewById(R.id.layout_form);
        questionSet = new HashMap<>();
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        list = new ArrayList<>();
        picarray = new JSONArray();
        progressDialog = new ProgressDialog(FormUploadData.this);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Loading Questions....");
        progressDialog.setCancelable(false);
        progressDialog.show();
//        String qid = getIntent().getStringExtra("id");
        String qid = "6224f9f54d36adb0e84755bc";
        String token = preferences.getString("token","null");
        Log.d("Token",token);
        if (preferences.getString("question","null").equalsIgnoreCase("null")) {
            RequestQueue queue = Volley.newRequestQueue(FormUploadData.this);
            JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, getString(R.string.base_url) + "/question-set/"+qid, null, response -> {
                SharedPreferences.Editor editor = preferences.edit();
                editor.putString("question", response.toString());
                editor.apply();
                setQuestion(response);
            }, error -> {

            }) {
                @Override
                public Map<String, String> getHeaders() {
                    HashMap<String, String> map = new HashMap<>();
                    map.put("Authorization", "Bearer " + token);
                    return map;
                }
            };
            queue.add(request);
        }else
        {
            try {
                JSONObject object=new JSONObject(preferences.getString("question",null));
                setQuestion(object);
            } catch (JSONException jsonException) {
                Toast.makeText(FormUploadData.this, "Some error occur re-login", Toast.LENGTH_SHORT).show();
                jsonException.printStackTrace();
            }
        }
    }
    public void setQuestion(JSONObject response)
    {
//        Log.d("Question",response.toString());
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        String token = preferences.getString("token","null");
        float dp =FormUploadData.this.getResources().getDisplayMetrics().density;
        int scale = (int)dp;
        e=0;
        f=0;
        b=0;
        img = 0;
        for_imgs = new HashMap<>();
        for_edit_txt = new HashMap<>();
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.setMargins(scale*32,scale*10,scale*32,0);//LTRB
        LinearLayout.LayoutParams edittext_params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, scale*50);
        edittext_params.setMargins(scale*32,scale*10,scale*32,0);//LTRB
        Typeface typeface = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            typeface = getResources().getFont(R.font.ic_nanumgothic_regular);
        }
        Typeface finalTypeface = typeface;
        try {
            JSONObject body = response.getJSONObject("body");
            JSONArray query = body.getJSONArray("querry");
            Log.d("Query",query.toString());
            for (int i = 0; i < query.length(); i++) {
                JSONObject q = query.getJSONObject(i);
                list.add(new DataModelClass(q.getString("question"),q.getString("answer"),q.getString("_id"),q.getString("dataType"),q.getBoolean("mandatory")));
            }
            editText = new EditText[list.size()];
            btn = new Button[list.size()];
            pics = new ImageView[list.size()];
            progressDialog.hide();
            progressDialog.dismiss();
            for (int i = 0; i < list.size(); i++) {
                TextView textView = new TextView(FormUploadData.this);
                textView.setTextColor(Color.parseColor("#ffffff"));
                textView.setTextSize(18);
                textView.setLayoutParams(params);
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    textView.setTypeface(finalTypeface);
                }
                if (list.get(i).isRequire())
                {
                    textView.setText(list.get(i).getQuestion()+" *");
                }else {
                    textView.setText(list.get(i).getQuestion());
                }
                layout_form.addView(textView);
                if (list.get(i).getType().equalsIgnoreCase("text")) {
                    editText[e] = new EditText(FormUploadData.this);
                    editText[e].setTextColor(Color.parseColor("#ffffff"));
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                        editText[e].setTypeface(finalTypeface);
                    }
                    editText[e].setPaddingRelative(scale * 10, scale * 5, scale * 10, scale * 5);
                    editText[e].setLayoutParams(edittext_params);
                    editText[e].setBackground(getDrawable(R.drawable.textbox_drawable));
                    layout_form.addView(editText[e]);
                    for_edit_txt.put(e,i);
                    e++;
                }
                else
                {

                    pics[img] = new ImageView(FormUploadData.this);
                    btn[b] = new Button(FormUploadData.this);
                    btn[b].setText("Upload Picture");
                    int RQ = (b+1)*100;
                    btn[b].setOnClickListener(click-> ImagePicker.with(FormUploadData.this)
                            .cameraOnly()
                            .start(RQ));
                    layout_form.addView(pics[b]);
                    layout_form.addView(btn[b]);
                    for_imgs.put(b,i);
                    b++;
                    img++;
                }
                questionSet.put(i,list.get(i).get_id());
            }
            Button submit = new Button(FormUploadData.this);
            submit.setText("Submit");
            submit.setLayoutParams(params);
            submit.setTextColor(Color.parseColor("#ffffff"));
            submit.setBackground(getDrawable(R.drawable.button_drawable));
            layout_form.addView(submit);
            submit.setOnClickListener(view -> {
                Log.d("Hello","open");
              boolean check =  checker();
              Log.d("Hello",check+"");
                Log.d("Hello","close");
                if (check)
                {
                    try {
                        submit();
                    } catch (JSONException jsonException) {
                        jsonException.printStackTrace();
                    }
                }
                else
                {
                    Toast.makeText(this, "Fill all the fields...", Toast.LENGTH_SHORT).show();
                }



            });
        } catch (JSONException e) {
            progressDialog.hide();
            progressDialog.dismiss();
            e.printStackTrace();
        }
    }
    private synchronized void submit() throws JSONException {
//        JSONArray array = new JSONArray();
//        for (int i = 0; i < for_edit_txt.size() ; i++) {
//            DataModelClass modelClass = list.get(for_edit_txt.get(i));
//            Log.d("Hello","ok");
//            String ans = editText[i].getText().toString();
//            JSONArray ar = new JSONArray();
//            ar.put(ans);
//            String qsid = list.get(for_edit_txt.get(i)).get_id();
//            JSONObject ob = new JSONObject();
//            ob.put("questionId",qsid);
//            ob.put("answerBody",ar);
//            JSONArray cord = new JSONArray();
//            cord.put(0);//lat
//            cord.put(0);//lon
//            ob.put("coordinates",cord);
//            array.put(ob);
//        }
//        Log.d("Answers",array.toString());
        Thread t1 = new Thread(new Runnable() {
            final Handler handler = new Handler();
            @Override
            public void run() {
                handler.post(() -> uploadPics());
            }
        });
        Thread t2 = new Thread(new Runnable() {
            final Handler m =new Handler();
            @Override
            public void run() {
                m.post(() -> Toast.makeText(FormUploadData.this, "dones...", Toast.LENGTH_SHORT).show());
            }
        });
        t1.start();
        try {
            t1.join();
        } catch (InterruptedException interruptedException) {
            interruptedException.printStackTrace();
        }
        t2.start();
//        HashMap<String,String > st =   uploadPics();
    }
    private synchronized void uploadPics()
    {
        HashMap<String,String> data = new HashMap<>();
        synchronized (this)
        {
            for (int i = 0; i <img; i++) {
                if (pics[i]!=null)
                {
                    BitmapDrawable drawable = (BitmapDrawable) pics[i].getDrawable();
                    if (drawable != null) {
                        Bitmap bitmap = drawable.getBitmap();
                        uploadBitmap(bitmap, i, data::put);
                        Toast.makeText(this, "done "+ i, Toast.LENGTH_SHORT).show();
                    }
                }
            }

        }
//        Toast.makeText(this, "done...", Toast.LENGTH_SHORT).show();
    }
    private synchronized boolean checker()
    {
        boolean taker= true;
//        Toast.makeText(this, ""+for_edit_txt.size(), Toast.LENGTH_SHORT).show();
        for (int i = 0; i < for_edit_txt.size() ; i++) {
            DataModelClass modelClass = list.get(for_edit_txt.get(i));
            Log.d("Hello","ok");
            if (modelClass.isRequire()&&TextUtils.isEmpty(editText[i].getText().toString()))
            {
                editText[i].setError("Fill this field");
                taker = false;
            }
        }
        return taker;
    }

    private boolean isconnected() {
        ConnectivityManager connectivityManager = (ConnectivityManager) this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo wifi = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        NetworkInfo data = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
        return wifi != null && wifi.isConnected() || data != null && data.isConnected();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        int code = (requestCode/100)-1;
        if (resultCode == Activity.RESULT_OK) {
            assert data != null;
            Uri uri = data.getData();
            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(),uri);
//                    profile_pic.setImageBitmap(bitmap);
                float dp =FormUploadData.this.getResources().getDisplayMetrics().density;
                int scale = (int)dp;
                LinearLayout.LayoutParams params1 = new LinearLayout.LayoutParams(scale*250,scale*300);
                pics[code].setLayoutParams(params1);
                pics[code].setAdjustViewBounds(true);
                pics[code].setImageBitmap(bitmap);
                btn[code].setText("Change Picture");
            } catch (IOException e) {
                e.printStackTrace();
            }

        } else if (resultCode == ImagePicker.RESULT_ERROR) {
            Toast.makeText(this, ImagePicker.getError(data), Toast.LENGTH_SHORT).show();
        }

    }
    public byte[] getFileDataFromDrawable(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 80, byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private  void uploadBitmap(final Bitmap bitmap,int n,VolleyCallback callback) {
        Log.d("Count",""+n);
        ProgressDialog progress = new ProgressDialog(FormUploadData.this);
        progress.setMessage("Updating your profile pic...");
        progress.setIndeterminate(true);
        progress.show();
        SharedPreferences preferences = getSharedPreferences("user",MODE_PRIVATE);
        String token = preferences.getString("token","null");
            VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST, getString(R.string.base_url)+"/common/fileUpload",
                    response -> {
                        progress.hide();
                        progress.dismiss();
                        String res;
                        try {
                            if (response.data != null) {
                                res = new String(response.data, StandardCharsets.UTF_8);
                                JSONObject object = new JSONObject(res);
                                int num = for_imgs.get(n);
                                String qid = questionSet.get(num);
                                Log.d("Filedata",object.getString("fileLink")+" ::: "+qid);
                                callback.onSuccess(object.getString("fileLink"),qid);
//                                JSONObject ob = new JSONObject();
//                                ob.put("questionId",qid);
//
//                                JSONArray ans = new JSONArray();
//                                ans.put(object.getString("fileLink"));
//                                ob.put("answerBody",ans);
//                                JSONArray cord = new JSONArray();
//                                cord.put(0);//lat
//                                cord.put(0);//lon
//                                ob.put("coordinates",cord);
//
//                                Log.d("PicsUpload",ob.toString());
//                                Toast.makeText(FormUploadData.this, qid, Toast.LENGTH_SHORT).show();
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }


                    },
                    error -> {
                        progress.hide();
                        progress.dismiss();
                        try {
                            String res;
                            if (error.networkResponse!=null) {
                                    res = new String(error.networkResponse.data, StandardCharsets.UTF_8);
                                    JSONObject object = new JSONObject(res);
                                    Toast.makeText(FormUploadData.this, object.getString("msg"), Toast.LENGTH_SHORT).show();

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }) {
                @Override
                public Map<String, String> getHeaders() {
                    HashMap<String,String> map = new HashMap<>();
                    map.put("Authorization","Bearer "+token);
                    return map;
                }

                @Override
                protected Map<String, DataPart> getByteData() {
                    Map<String, DataPart> params = new HashMap<>();
                    long imagename = System.currentTimeMillis();
                    params.put("file", new DataPart(imagename + ".png", getFileDataFromDrawable(bitmap)));
                    return params;
                }
            };
            Volley.newRequestQueue(FormUploadData.this).add(volleyMultipartRequest);
    }
    }
