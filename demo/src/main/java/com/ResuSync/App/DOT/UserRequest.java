package com.ResuSync.App.DOT; 

public class UserRequest {

    public String name;
    public String email;
    public String password;

    public UserRequest(){}
    public UserRequest(String name,String email,String password){
        this.name=name;
        this.email=email;
        this.password=password;
    }   
    public UserRequest(String email,String password){
        this.name="";
        this.email=email;
        this.password=password;
    }
    public String getEmail(){
        return this.email;
    }
    public String getName(){
        return this.name;
    }
    public String getPassword(){
        return this.password;
    }
}
