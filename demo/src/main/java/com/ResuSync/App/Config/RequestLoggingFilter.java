package com.ResuSync.App.Config;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestLoggingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        System.out.println("=== REQUEST RECEIVED ===");
        System.out.println("Method: " + httpRequest.getMethod());
        System.out.println("URI: " + httpRequest.getRequestURI());
        System.out.println("Origin: " + httpRequest.getHeader("Origin"));
        System.out.println("Content-Type: " + httpRequest.getHeader("Content-Type"));
        System.out.println("Cookies: " + httpRequest.getHeader("Cookie"));
        
        chain.doFilter(request, response);
        
        System.out.println("=== RESPONSE SENT ===");
        System.out.println("Status: " + httpResponse.getStatus());
        System.out.println("========================\n");
    }
}