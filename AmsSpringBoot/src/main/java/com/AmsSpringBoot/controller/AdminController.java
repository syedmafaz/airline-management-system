package com.AmsSpringBoot.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.AmsSpringBoot.bean.Admin;
import com.AmsSpringBoot.service.AdminService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(originPatterns = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Admin admin) {
        boolean status = adminService.login(admin.getAdminId(), admin.getAdminPassword());

        Map<String, Object> response = new HashMap<>();
        if (status) {
            response.put("success", true);
            response.put("message", "Admin login successful");
            System.out.println("Admin login successful");
        } else {
            response.put("success", false);
            response.put("message", "Invalid admin credentials");
            System.out.println("Invalid admin credentials");
        }
        return response;
    }
}
