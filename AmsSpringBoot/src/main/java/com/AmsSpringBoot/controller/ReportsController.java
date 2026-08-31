//// ReportsController.java
//package com.AmsSpringBoot.controller;
//
//import com.AmsSpringBoot.service.ReportsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(originPatterns = "*")
//@RequestMapping("/api/reports")
//public class ReportsController {
//
//    @Autowired
//    private ReportsService reportsService;
//
////    @GetMapping("/carrier/{carrierId}/bookings")
////    public List<Map<String, Object>> getBookingsByCarrier(@PathVariable int carrierId) {
////        try {
////            return reportsService.getBookingsByCarrier(carrierId);
////        } catch (Exception e) {
////            e.printStackTrace();
////            return null;
////        }
////    }
////
////    @GetMapping("/flight/{flightId}/bookings")
////    public List<Map<String, Object>> getBookingsByFlight(@PathVariable int flightId) {
////        try {
////            return reportsService.getBookingsByFlight(flightId);
////        } catch (Exception e) {
////            e.printStackTrace();
////            return null;
////        }
////    }
////
////    @GetMapping("/schedule/{scheduleId}/bookings")
////    public List<Map<String, Object>> getBookingsBySchedule(@PathVariable int scheduleId) {
////        try {
////            return reportsService.getBookingsBySchedule(scheduleId);
////        } catch (Exception e) {
////            e.printStackTrace();
////            return null;
////        }
////    }
//
//    @GetMapping("/summary")
//    public Map<String, Object> getReportSummary(
//            @RequestParam(required = false) Integer carrierId,
//            @RequestParam(required = false) Integer flightId) {
//        try {
//            return reportsService.getReportSummary(carrierId, flightId);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @GetMapping("/all-bookings")
//    public List<Map<String, Object>> getAllBookings() {
//        try {
//            return reportsService.getAllBookings();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @GetMapping("/export/csv")
//    public ResponseEntity<byte[]> exportBookingsToCSV(
//            @RequestParam(required = false) Integer carrierId,
//            @RequestParam(required = false) Integer flightId) {
//        try {
//            byte[] csvBytes = reportsService.exportBookingsToCSV(carrierId, flightId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.parseMediaType("text/csv"));
//            headers.setContentDispositionFormData("attachment", "bookings-report.csv");
//            return ResponseEntity.ok().headers(headers).body(csvBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//    
//    @GetMapping("/schedule/{scheduleId}/bookings")
//    public List<Map<String, Object>> getBookingsBySchedule(@PathVariable int scheduleId) {
//        try {
//            return reportsService.getBookingsBySchedule(scheduleId);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @GetMapping("/flight/{flightId}/bookings")
//    public List<Map<String, Object>> getBookingsByFlight(@PathVariable int flightId) {
//        try {
//            return reportsService.getBookingsByFlight(flightId);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @GetMapping("/carrier/{carrierId}/bookings")
//    public List<Map<String, Object>> getBookingsByCarrier(@PathVariable int carrierId) {
//        try {
//            return reportsService.getBookingsByCarrier(carrierId);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//}



package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    private ReportsService reportsService;

    @GetMapping("/schedule/{scheduleId}/bookings")
    public List<Map<String, Object>> getBookingsBySchedule(@PathVariable int scheduleId) {
        try {
            List<Map<String, Object>> bookings = reportsService.getBookingsBySchedule(scheduleId);
            System.out.println("Found " + bookings.size() + " bookings for schedule " + scheduleId);
            return bookings;
        } catch (Exception e) {
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }

    @GetMapping("/flight/{flightId}/bookings")
    public List<Map<String, Object>> getBookingsByFlight(@PathVariable int flightId) {
        try {
            return reportsService.getBookingsByFlight(flightId);
        } catch (Exception e) {
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }

    @GetMapping("/carrier/{carrierId}/bookings")
    public List<Map<String, Object>> getBookingsByCarrier(@PathVariable int carrierId) {
        try {
            return reportsService.getBookingsByCarrier(carrierId);
        } catch (Exception e) {
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }
}
