package com.kripton.b2papk;

public class QuestionSetModel {
    String id,name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public QuestionSetModel(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
