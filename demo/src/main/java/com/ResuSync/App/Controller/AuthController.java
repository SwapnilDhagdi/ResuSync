package com.ResuSync.App.Controller;
import com.ResuSync.App.DOT.UserRequest;
import com.ResuSync.App.Objects.Users;
import com.ResuSync.App.Services.EmailService;
import com.ResuSync.App.Services.userService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import net.smartcosmos.cluster.userdetails.dto.UserDetailsResponse;

import com.ResuSync.App.DOT.UserInfoResponse;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    userService UserService;

    @Autowired
    EmailService emailService;
    

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public AuthController(AuthenticationManager authenticationManager){
        this.authenticationManager=authenticationManager;
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request,HttpServletResponse response){
        try{
            request.getSession().invalidate();
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Logged out successfully");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed");
        }
    }

    @GetMapping("/sendEmail")
    public ResponseEntity<Integer> getVerificationCode(@RequestParam String email,@RequestParam String username){
        Users user =UserService.getProfile(email);
        if(user!=null){
            return ResponseEntity.ok(-1);
        }
        int verificationCode=UserService.sendVerificationCode();
        try{

            String message="""
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Your Verification Code</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                    background-color: #f4f4f4;
                                }
                                .container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    padding-bottom: 20px;
                                    border-bottom: 1px solid #eeeeee;
                                }
                                .header h1 {
                                    color: #333333;
                                    font-size: 24px;
                                }
                                .content {
                                    padding: 20px 0;
                                    text-align: center;
                                }
                                .code-box {
                                    background-color: #eaf6ff; /* Light Blue */
                                    border: 1px solid #cceeff;
                                    padding: 15px 25px;
                                    display: inline-block;
                                    margin: 20px 0;
                                    border-radius: 6px;
                                }
                                .verification-code {
                                    font-size: 32px;
                                    font-weight: bold;
                                    color: #007bff; /* Primary Blue */
                                    letter-spacing: 5px;
                                    margin: 0;
                                }
                                .footer {
                                    text-align: center;
                                    padding-top: 20px;
                                    border-top: 1px solid #eeeeee;
                                    color: #999999;
                                    font-size: 12px;
                                }
                                    </style>
                                </head>
                                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Verification Required</h1>
                        </div>

                        <div class="content">
                            <p style="font-size: 16px; color: #555555;">
                                Hello,
                            </p>
                            <p style="font-size: 16px; color: #555555;">
                                To complete your verification, please use the following one-time code:
                            </p>

                            <div class="code-box">
                                <p class="verification-code">
                                    %d
                                </p>
                            </div>

                            <p style="font-size: 14px; color: #777777;">
                                This code is valid for 10Minutes.
                            </p>
                            <p style="font-size: 14px; color: #777777;">
                                If you did not request this, you can safely ignore this email.
                            </p>
                        </div>

                        <div class="footer">
                            <p>&copy; 2025 Swapnil Dhagdi. All rights reserved.</p>
                        </div>
                    </div>
                    </body>
                </html>
                """;
            String body=message.replace("%d",String.valueOf(verificationCode));

        emailService.sendSimpleEmail(email, "Your Verification Code", body);
        return ResponseEntity.ok(verificationCode);
        }catch(Exception e){
            return ResponseEntity.ok(0);
        }
    }
    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody UserRequest userRequest,HttpServletRequest request){
        Authentication authenticationToken=new UsernamePasswordAuthenticationToken(userRequest.getEmail(), userRequest.getPassword());
        try{

            
            Authentication authentication =authenticationManager.authenticate(authenticationToken);
            SecurityContext securityContext=SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);

            HttpSession session =request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);


            UserDetails userDetails =(UserDetails) authentication.getPrincipal();
            UserInfoResponse userInforResponse=UserService.getUserInfoResponse(userRequest.getEmail(),userDetails.getAuthorities());
            return ResponseEntity.ok(userInforResponse);

        }catch(Exception e){
 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invaild credintial");
        }
        finally{
 
        }
        
    }
    @GetMapping("/user")
    public ResponseEntity<UserInfoResponse> getCurrentUser(Authentication authentication){
        if(authentication ==null || !authentication.isAuthenticated()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserDetails userDetails=(UserDetails) authentication.getPrincipal();
        UserInfoResponse userInforResponse=UserService.getUserInfoResponse(userDetails.getUsername(),userDetails.getAuthorities());
        return ResponseEntity.ok(userInforResponse);
    }
}
