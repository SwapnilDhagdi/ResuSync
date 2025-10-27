package com.ResuSync.App.Services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.*;
import com.ResuSync.App.Objects.Users;

import com.ResuSync.App.Repository.UserRepository;

@Service
public class Authorize implements UserDetailsService{
    @Autowired
    UserRepository userRepo;
    @Autowired
    public Authorize(UserRepository userRepo) {
    this.userRepo = userRepo;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Users user= userRepo.findByEmail(email);
        if(user==null){
      
            throw new UsernameNotFoundException("User not found"+email);
        }

        return user;
    }
}
