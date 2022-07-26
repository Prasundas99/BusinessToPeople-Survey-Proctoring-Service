package com.kripton.b2papk;

import android.app.Activity;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class QuestionSetAdapter extends RecyclerView.Adapter<QuestionSetAdapter.ViewHolder> {
    List<QuestionSetModel> list;
    Activity activity;

    public QuestionSetAdapter(List<QuestionSetModel> list, Activity activity) {
        this.list = list;
        this.activity = activity;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.questionsetlayout,parent,false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        String id = list.get(position).getId();
        String name  = list.get(position).getName();
        holder.setData(id,name,activity);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView nm;
        View view;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            view = itemView;
            nm = itemView.findViewById(R.id.textView2);
        }
        public void setData(String id,String name,Activity act)
        {
            nm.setText(name);
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent i = new Intent(act,FormUploadData.class);
                    i.putExtra("id",id);
                    act.startActivity(i);
                }
            });
        }
    }
}
