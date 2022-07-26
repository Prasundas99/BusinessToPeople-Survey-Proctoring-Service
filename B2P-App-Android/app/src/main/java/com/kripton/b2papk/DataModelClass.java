package com.kripton.b2papk;

public class DataModelClass {
    String question,answer,_id,type;
    boolean require;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isRequire() {
        return require;
    }

    public void setRequire(boolean require) {
        this.require = require;
    }

    public DataModelClass(String question, String answer, String _id, String type, boolean require) {
        this.question = question;
        this.answer = answer;
        this._id = _id;
        this.type = type;
        this.require = require;
    }
}
