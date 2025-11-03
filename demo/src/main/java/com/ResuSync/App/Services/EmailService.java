package com.ResuSync.App.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService{
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.password}")
    String pass;

    public void sendSimpleEmail(String toEmail,String subject,String body){

        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();

        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,"UTF-8");
        
       
        // try{
        //     simpleMailMessage.setFrom("swapnildhagdi@gmail.com");
        //     simpleMailMessage.setText(body);
        //     simpleMailMessage.setTo(toEmail);
        //     simpleMailMessage.setSubject(subject);

        //     javaMailSender.send(simpleMailMessage);
        // } 

         try{
            mimeMessageHelper.setFrom("swapnildhagdi@gmail.com");
            mimeMessageHelper.setTo(toEmail);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(body,true);
            javaMailSender.send(mimeMessage);  
        }
        catch(MailException e){
            System.out.println(e.getMessage());  
        }
        // catch(MailAuthenticationException e){
        //     return ResponseEntity.ok(e.getMessage());
        // }
        catch(Exception e){

        }
    }
}