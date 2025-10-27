package com.ResuSync.App.DOT; 

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

public class UserInfoResponse {
    private Long id; 
    private String username;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;

   
    public UserInfoResponse(Long id, String username, String email, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.authorities = authorities;
    }

  
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) { this.authorities = authorities; }
}