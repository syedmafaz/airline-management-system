package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.bean.Flight;
import com.AmsSpringBoot.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/flight")
public class FlightController {

    @Autowired
    private FlightService service;

    @PostMapping("/add")
    public ResponseEntity<?> addFlight(@RequestBody Flight flight) {
        boolean success = service.addFlight(flight);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Flight added successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to add flight"));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateFlight(@RequestBody Flight flight) {
        boolean success = service.updateFlight(flight);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Flight updated successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to update flight"));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFlight(@PathVariable int id) {
        boolean success = service.deleteFlight(id);
        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Flight deleted successfully"));
        } else {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Failed to delete flight"));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Flight>> listFlights() {
        return ResponseEntity.ok(service.getAllFlights());
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> getFlightById(@PathVariable int id) {
        Flight flight = service.getFlightById(id);
        if (flight != null) {
            return ResponseEntity.ok(flight);
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "Flight not found"));
        }
    }
    
    @PostMapping("/bulk/{carrierId}")
    public ResponseEntity<?> bulkValidate(
        @PathVariable int carrierId,
        @RequestBody List<Flight> flights) throws SQLException {
        
        List<Flight> existing = service.getFlightsByCarrierId(carrierId);
        List<Flight> duplicates = new ArrayList<>();
        List<Flight> valid = new ArrayList<>();

        for (Flight f : flights) {
            boolean dup = existing.stream()
                .anyMatch(e -> e.getOrigin().equalsIgnoreCase(f.getOrigin())
                    && e.getDestination().equalsIgnoreCase(f.getDestination()));
            if (dup) duplicates.add(f);
            else valid.add(f);
        }

        return ResponseEntity.ok(Map.of("duplicates", duplicates, "valid", valid));
    }

    @PostMapping("/bulk/insert/{carrierId}")
    public ResponseEntity<?> bulkInsert(
        @PathVariable int carrierId,
        @RequestBody List<Flight> validFlights) {
        
        // Set carrierId for all flights
        validFlights.forEach(f -> f.setCarrierId(carrierId));
        int success = service.addFlights(validFlights);
        return ResponseEntity.ok(Map.of("inserted", success));
    }
    
    @GetMapping("/carrier/{carrierId}")
    public ResponseEntity<List<Flight>> getFlightsByCarrier(@PathVariable int carrierId) throws SQLException {
        List<Flight> flights = service.getFlightsByCarrierId(carrierId);
        return ResponseEntity.ok(flights);
    }
    
    
    
}
