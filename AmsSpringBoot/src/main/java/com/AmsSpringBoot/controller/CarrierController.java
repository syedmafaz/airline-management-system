package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.bean.Carrier;
import com.AmsSpringBoot.service.CarrierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/carrier")
public class CarrierController {

    @Autowired
    private CarrierService service;

    @PostMapping("/add")
    public ResponseEntity<?> addCarrier(@RequestBody Carrier carrier) {
        boolean success = service.addCarrier(carrier);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Carrier added successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to add carrier"));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCarrier(@RequestBody Carrier carrier) {
        boolean success = service.updateCarrier(carrier);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Carrier updated successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to update carrier"));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCarrier(@PathVariable int id) {
        boolean success = service.deleteCarrier(id);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Carrier deleted successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to delete carrier"));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Carrier>> listCarriers() {
        return ResponseEntity.ok(service.getAllCarriers());
    }
    
    @GetMapping("/search/{id}")
    public ResponseEntity<?> getCarrierById(@PathVariable int id) {
        Carrier carrier = service.getCarrierById(id);
        if (carrier != null) {
            return ResponseEntity.ok(carrier);
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "Carrier not found"));
        }
    }
    
    
    @PostMapping("/bulk")
    public ResponseEntity<?> bulkValidate(@RequestBody List<Carrier> carriers) {
        List<Carrier> existing = service.getAllCarriers();
        List<Carrier> duplicates = new ArrayList<>();
        List<Carrier> valid = new ArrayList<>();

        for (Carrier c : carriers) {
            boolean dup = existing.stream()
                .anyMatch(e -> e.getCarrierName().equalsIgnoreCase(c.getCarrierName()));
            if (dup) duplicates.add(c);
            else valid.add(c);
        }

        return ResponseEntity.ok(Map.of("duplicates", duplicates, "valid", valid));
    }

    // 2️⃣ Insert carriers (only valid ones)
    @PostMapping("/bulk/insert")
    public ResponseEntity<?> bulkInsert(@RequestBody List<Carrier> validCarriers) {
        int success = service.addCarriers(validCarriers);
        return ResponseEntity.ok(Map.of("inserted", success));
    }
}

