package com.ResuSync.App.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ResuSync.App.DOT.UserInfoResponse;
import com.ResuSync.App.Objects.Files;
import com.ResuSync.App.Objects.Users;
import com.ResuSync.App.Repository.FileRepository;
import com.ResuSync.App.Repository.UserRepository;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;

@Service
public class userService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private FileRepository fileRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    public userService(UserRepository userRepo){
        this.userRepo=userRepo;
    }
    public userService(FileRepository fileRepository){
        this.fileRepository=fileRepository;
    }
    public List<Users> findAllUsers(){
        return userRepo.findAll();
    }
    public Users getProfile(String email){
        return userRepo.findByEmail(email);
    }
    public List<Users> findById(int id){
        List li=new ArrayList<>();
        li.add(id);
        return userRepo.findAllById(li);
    }
    public UserInfoResponse getUserInfoResponse(String email,Collection<? extends GrantedAuthority> authorities){
        Users user =userRepo.findByEmail(email);
        UserInfoResponse userInfoResponse=new UserInfoResponse(user.getUid(), user.getName(), email, authorities);
        return userInfoResponse;
    }
    public boolean saveUser(Users user){
        List<Users> li=userRepo.findAll();
        for (Users users : li) {
            if(users.getEmail().equals(user.getEmail())){
                return false;
            }
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return true;
    }
    public ResponseEntity<?> saveFile(Files file){
        try{
           Files resFile=fileRepository.save(file);
           return ResponseEntity.status(HttpStatus.CREATED).body(resFile);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save file"+e.getMessage());
        }
    }

    @Transactional
    public Files getAnalysis(){
        Files file=fileRepository.getRecentFile();
        return file;
    }

    public ResponseEntity<?> deleteProfile(Long id){
        try{
            userRepo.deleteById(id);
        }catch(Exception e){
            return ResponseEntity.ok("Profile not deleted");
        }
        return ResponseEntity.ok("Profile deleted");
    }

    public int sendVerificationCode(){
        Random random= new Random();
        int num=0;

        for(int i=0;i<4;i++){
            num=(num*10)+random.nextInt(10);
        }
        return num;
    }
    // public boolean validateUser(UserRequest userRequest){

  
    //     users user=userRepo.findByEmail(userRequest.getEmail());
    //     if(user==null){
    //         return false;
    //     }

    //     String storedHashedPassword=user.getPassword();
    //     return passwordEncoder.matches(userRequest.getPassword(), storedHashedPassword);
    // }
}
