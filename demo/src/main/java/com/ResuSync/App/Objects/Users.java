package com.ResuSync.App.Objects;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.Collections;



import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
@Entity
@Table(name="users")
public class Users implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    private String name;

    private String email;

    private String password;
    public Users(){}
   public Users(String name,String email,String password){
    this.name=name;
    this.email=email;
    this.password=password;
   }
   public Long getUid(){
    return this.uid;
    }
    public String getPassword(){
        return this.password;
    }
    public void setPassword(String password){
        this.password=password;
    }
    public String getName(){
        return this.name;
    }
    public String getEmail(){
        return this.email;
    }
    public void setName(String name){
        this.name=name;
    }
    public void setEmail(String email){
        this.email=email;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
    @Override
    public String getUsername() {
     return this.email;  
    }
    public Exception orElseThrow(Object object) {
        return new RuntimeException("User not found");
    }
    @Override
public boolean isAccountNonExpired() {
    return true;
}

@Override
public boolean isAccountNonLocked() {
    return true;
}

@Override
public boolean isCredentialsNonExpired() {
    return true;
}

@Override
public boolean isEnabled() {
    return true;
}

}
