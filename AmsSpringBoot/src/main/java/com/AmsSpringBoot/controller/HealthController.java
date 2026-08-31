package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.util.DBUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "message", "Application is running"));
    }

    @GetMapping("/db-check")
    public ResponseEntity<?> dbCheck() {
        Map<String, Object> result = new HashMap<>();
        try (Connection conn = DBUtil.createConnection()) {
            if (conn == null) {
                result.put("dbConnected", false);
                result.put("error", "Connection returned null");
                return ResponseEntity.status(500).body(result);
            }
            result.put("dbConnected", true);
            result.put("driver", conn.getMetaData().getDriverName());
            result.put("url", conn.getMetaData().getURL());

            try (Statement stmt = conn.createStatement()) {
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM Users");
                if (rs.next()) {
                    result.put("usersCount", rs.getInt(1));
                }
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("dbConnected", false);
            result.put("error", e.getMessage());
            result.put("exceptionClass", e.getClass().getName());
            return ResponseEntity.status(500).body(result);
        }
    }
}
