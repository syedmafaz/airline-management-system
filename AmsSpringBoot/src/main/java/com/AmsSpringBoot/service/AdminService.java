package com.AmsSpringBoot.service;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final String defaultAdminId = "admin";
    private final String defaultAdminPassword = "admin123";

    public boolean login(String adminId, String adminPassword) {
        return defaultAdminId.equals(adminId) && defaultAdminPassword.equals(adminPassword);
    }
}

