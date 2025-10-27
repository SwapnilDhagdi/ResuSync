package com.ResuSync.App.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ResuSync.App.DOT.UserRequest;

import com.ResuSync.App.Objects.Files;
import com.ResuSync.App.Services.AIComparison;
import com.ResuSync.App.Services.PDFService;
import com.ResuSync.App.Services.userService;
import com.ResuSync.App.Services.AIComparison.AIComparisonResult;


import java.io.IOException;
import java.util.List;
import com.ResuSync.App.Objects.Users;


@RestController
@RequestMapping("/api")
public class Controller {


    @Autowired
    private userService userServ ;
    @Autowired
    private PDFService pdfService;
    @Autowired
    private AIComparison aiComparison;

    @GetMapping("")
    public String Greet(){
        return "Hello";
    }
   
    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody UserRequest user){
  
        Users u=new Users(user.getName(), user.getEmail(), user.getPassword());
        userServ.saveUser(u);
        return ResponseEntity.ok("Profile Created");
    }

    @GetMapping("/getUser")
    public List<Users> getUser() {

        return userServ.findAllUsers();
    }

    
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("resume") MultipartFile resume,@RequestParam("JD") MultipartFile JD,@AuthenticationPrincipal Users user){
   
        if(user==null){

            return ResponseEntity.status(401).body("Unauthorized");
        }
        try{
            Files newFile=new Files();
             newFile.setFileName(resume.getOriginalFilename());
             newFile.setFileType(resume.getContentType());
             newFile.setFileData(resume.getBytes());
             newFile.setUser(user);
             newFile.setJDFileName(JD.getOriginalFilename());
             newFile.setJDFileType(JD.getContentType());
             newFile.setJDFileData(JD.getBytes());
      
           userServ.saveFile(newFile);
            return ResponseEntity.ok("File Uploaded successfully");
        }catch(Exception e){
            return ResponseEntity.status(500).body("File upload failed");
        }
        
    }
    @GetMapping("/analyse")
    public ResponseEntity<?> getAnalysis(@AuthenticationPrincipal Users user,@RequestParam Long id){
     
        
        if(user==null){
       
            return ResponseEntity.ok("User not authenticated");
        }
        if(id==-1){

            try{
                AIComparisonResult aiComparisonResult= aiComparison.CompareResumeAndJD(user);
   
                return ResponseEntity.ok(aiComparisonResult);
            }catch(IOException e){
            
            }
        }
        else{
            AIComparisonResult aiComparisonResult=aiComparison.getAnalysisData(id);
            return ResponseEntity.ok(aiComparisonResult);
        }
        return ResponseEntity.ok("Got the request");
    }
    @GetMapping("/filedata")
    public ResponseEntity<?> getFileData(@AuthenticationPrincipal Users user){
        if(user==null){
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok( pdfService.getFileData());
    }
    @GetMapping("/getImprovement")
    public String getImprovement(){
        String s="";
        try{
            s=aiComparison.generateImporovmentPlan();
        }catch(IOException e){
       
        }
        return s;
    }
    @GetMapping("/debug")
    public Users getUser(@AuthenticationPrincipal Users user) {

    return user;
    }

    @GetMapping("/getFiles")
    public List<Files> getFiles(@AuthenticationPrincipal Users user){
        return aiComparison.getFiles(user.getUid());
    }

    @GetMapping("/deleteProfile")
    public ResponseEntity<?> deleteProfile(@AuthenticationPrincipal Users user,@RequestParam Long id){
        userServ.deleteProfile(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

}
