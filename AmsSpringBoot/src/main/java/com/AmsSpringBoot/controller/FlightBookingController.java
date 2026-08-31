//package com.AmsSpringBoot.controller;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.service.FlightBookingService;
//
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.SQLException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(originPatterns = "*")
//@RequestMapping("/api/flightbooking")
//public class FlightBookingController {
//
//    FlightBookingService service = new FlightBookingService();
//
////    @PostMapping("/book")
////    public String bookFlight(@RequestBody FlightBooking booking) {
////        try {
////            return service.bookFlight(booking);
////        } catch (SQLException e) {
////            e.printStackTrace();
////            return "Error while booking: " + e.getMessage();
////        }
////    }
//
////    @PutMapping("/cancel/{id}")
////    public String cancelBooking(@PathVariable int id) {
////        try {
////            return service.cancelBooking(id);
////        } catch (SQLException e) {
////            e.printStackTrace();
////            return "Error while cancelling: " + e.getMessage();
////        }
////    }
//
//    @GetMapping("/list")
//    public List<FlightBooking> getAllBookings() {
//        try {
//            return service.getAllBookings();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//    
//    @GetMapping("/user/{userId}")
//    public List<FlightBooking> getBookingsByUser(@PathVariable int userId) {
//        try {
//            return service.getBookingsByUserId(userId);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//    
//    
//    @PostMapping("/book")
//    public Map<String, Object> bookFlight(@RequestBody FlightBooking booking) {
//        Map<String, Object> response = new HashMap<>();
//        try {
//            int bookingId = service.bookFlight(booking);
//            if (bookingId > 0) {
//                response.put("success", true);
//                response.put("message", "Flight booked successfully");
//                response.put("bookingId", bookingId);
//            } else {
//                response.put("success", false);
//                response.put("message", "Booking failed");
//            }
//        } catch (SQLException e) {
//            response.put("success", false);
//            response.put("message", "Error while booking: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @GetMapping("/calculate-price")
//    public Map<String, Object> calculatePrice(
//            @RequestParam int scheduleId,
//            @RequestParam String seatCategory,
//            @RequestParam int numberOfTickets,
//            @RequestParam String travelDate) {
//        try {
//            return service.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//        } catch (SQLException e) {
//            Map<String, Object> error = new HashMap<>();
//            error.put("error", "Failed to calculate price");
//            return error;
//        }
//    }
//
//    @GetMapping("/download-ticket/{bookingId}")
//    public ResponseEntity<byte[]> downloadTicket(@PathVariable int bookingId) {
//        try {
//            byte[] pdfBytes = service.generateTicketPDF(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_PDF);
//            headers.setContentDispositionFormData("attachment", "ticket-" + bookingId + ".pdf");
//            return ResponseEntity.ok().headers(headers).body(pdfBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @GetMapping("/download-refund/{bookingId}")
//    public ResponseEntity<byte[]> downloadRefund(@PathVariable int bookingId) {
//        try {
//            byte[] pdfBytes = service.generateRefundPDF(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_PDF);
//            headers.setContentDispositionFormData("attachment", "refund-" + bookingId + ".pdf");
//            return ResponseEntity.ok().headers(headers).body(pdfBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @PutMapping("/cancel/{id}")
//    public Map<String, Object> cancelBooking(@PathVariable int id) {
//        Map<String, Object> response = new HashMap<>();
//        try {
//            Map<String, Object> result = service.cancelBookingWithRefund(id);
//            response.putAll(result);
//        } catch (SQLException e) {
//            response.put("success", false);
//            response.put("message", "Error while cancelling: " + e.getMessage());
//        }
//        return response;
//    }
//}



//package com.AmsSpringBoot.controller;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.service.FlightBookingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.SQLException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(originPatterns = "*")
//@RequestMapping("/api/flightbooking")
//public class FlightBookingController {
//
//    @Autowired
//    FlightBookingService service;
//
//    @PostMapping("/book")
//    public Map<String, Object> bookFlight(@RequestBody FlightBooking booking) {
//        Map<String, Object> response = new HashMap<>();
//        try {
//            int bookingId = service.bookFlight(booking);
//            if (bookingId > 0) {
//                response.put("success", true);
//                response.put("message", "Flight booked successfully");
//                response.put("bookingId", bookingId);
//            } else {
//                response.put("success", false);
//                response.put("message", "Booking failed");
//            }
//        } catch (SQLException e) {
//            response.put("success", false);
//            response.put("message", "Error while booking: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @GetMapping("/calculate-price")
//    public Map<String, Object> calculatePrice(
//            @RequestParam int scheduleId,
//            @RequestParam String seatCategory,
//            @RequestParam int numberOfTickets,
//            @RequestParam String travelDate) {
//        try {
//            return service.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//        } catch (SQLException e) {
//            Map<String, Object> error = new HashMap<>();
//            error.put("error", "Failed to calculate price: " + e.getMessage());
//            return error;
//        }
//    }
//
//    @GetMapping("/download-ticket/{bookingId}")
//    public ResponseEntity<byte[]> downloadTicket(@PathVariable int bookingId) {
//        try {
//            byte[] htmlBytes = service.generateTicketPDF(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.TEXT_HTML);
//            headers.setContentDispositionFormData("attachment", "ticket-" + bookingId + ".html");
//            return ResponseEntity.ok().headers(headers).body(htmlBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @GetMapping("/download-refund/{bookingId}")
//    public ResponseEntity<byte[]> downloadRefund(@PathVariable int bookingId) {
//        try {
//            byte[] htmlBytes = service.generateRefundPDF(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.TEXT_HTML);
//            headers.setContentDispositionFormData("attachment", "refund-" + bookingId + ".html");
//            return ResponseEntity.ok().headers(headers).body(htmlBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @PutMapping("/cancel/{id}")
//    public Map<String, Object> cancelBooking(@PathVariable int id) {
//        Map<String, Object> response = new HashMap<>();
//        try {
//            Map<String, Object> result = service.cancelBookingWithRefund(id);
//            response.putAll(result);
//        } catch (SQLException e) {
//            response.put("success", false);
//            response.put("message", "Error while cancelling: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @GetMapping("/list")
//    public List<FlightBooking> getAllBookings() {
//        try {
//            return service.getAllBookings();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//    
//    @GetMapping("/user/{userId}")
//    public List<FlightBooking> getBookingsByUser(@PathVariable int userId) {
//        try {
//            return service.getBookingsByUserId(userId);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//}




//package com.AmsSpringBoot.controller;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.service.FlightBookingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.SQLException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(originPatterns = "*")
//@RequestMapping("/api/flightbooking")
//public class FlightBookingController {
//
//    @Autowired
//    FlightBookingService service;
//
//    @PostMapping("/book")
//    public Map<String, Object> bookFlight(@RequestBody FlightBooking booking) {
//        Map<String, Object> response = new HashMap<>();
//        System.out.println("Controller: Received booking request for user " + booking.getUserId());
//        
//        try {
//            int bookingId = service.bookFlight(booking);
//            System.out.println("Controller: Service returned booking ID: " + bookingId);
//            
//            if (bookingId > 0) {
//                response.put("success", true);
//                response.put("message", "Flight booked successfully");
//                response.put("bookingId", bookingId);
//                System.out.println("Controller: Booking successful with ID: " + bookingId);
//            } else {
//                response.put("success", false);
//                response.put("message", "Booking failed - could not save to database");
//                System.out.println("Controller: Booking failed - no ID returned");
//            }
//        } catch (SQLException e) {
//            response.put("success", false);
//            response.put("message", "Error while booking: " + e.getMessage());
//            System.err.println("Controller: SQL Exception: " + e.getMessage());
//            e.printStackTrace();
//        } catch (Exception e) {
//            response.put("success", false);
//            response.put("message", "Unexpected error: " + e.getMessage());
//            System.err.println("Controller: Unexpected Exception: " + e.getMessage());
//            e.printStackTrace();
//        }
//        
//        System.out.println("Controller: Returning response: " + response);
//        return response;
//    }
//
//    @GetMapping("/calculate-price")
//    public Map<String, Object> calculatePrice(
//            @RequestParam int scheduleId,
//            @RequestParam String seatCategory,
//            @RequestParam int numberOfTickets,
//            @RequestParam String travelDate) {
//        try {
//            return service.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//        } catch (SQLException e) {
//            Map<String, Object> error = new HashMap<>();
//            error.put("error", "Failed to calculate price: " + e.getMessage());
//            return error;
//        }
//    }
//
//    @GetMapping("/download-ticket/{bookingId}")
//    public ResponseEntity<byte[]> downloadTicket(@PathVariable int bookingId) {
//        try {
//            System.out.println("Generating ticket for booking ID: " + bookingId);
//            byte[] htmlBytes = service.generateTicketPDF(bookingId);
//            
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.TEXT_HTML);
//            headers.setContentDispositionFormData("attachment", "ticket-" + bookingId + ".html");
//            
//            System.out.println("Ticket generated successfully for booking: " + bookingId);
//            return ResponseEntity.ok().headers(headers).body(htmlBytes);
//        } catch (Exception e) {
//            System.err.println("Failed to generate ticket: " + e.getMessage());
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @GetMapping("/download-refund/{bookingId}")
//    public ResponseEntity<byte[]> downloadRefund(@PathVariable int bookingId) {
//        try {
//            byte[] htmlBytes = service.generateRefundPDF(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.TEXT_HTML);
//            headers.setContentDispositionFormData("attachment", "refund-" + bookingId + ".html");
//            return ResponseEntity.ok().headers(headers).body(htmlBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @PutMapping("/cancel/{id}")
//    public Map<String, Object> cancelBooking(@PathVariable int id) {
//        Map<String, Object> response = new HashMap<>();
//        try {
//            Map<String, Object> result = service.cancelBookingWithRefund(id);
//            response.putAll(result);
//        } catch (SQLException e) {
//            response.put("success", false);
//            response.put("message", "Error while cancelling: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @GetMapping("/list")
//    public List<FlightBooking> getAllBookings() {
//        try {
//            return service.getAllBookings();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//    
//    @GetMapping("/user/{userId}")
//    public List<FlightBooking> getBookingsByUser(@PathVariable int userId) {
//        try {
//            return service.getBookingsByUserId(userId);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//}



package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.bean.FlightBooking;
import com.AmsSpringBoot.service.FlightBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/flightbooking")
public class FlightBookingController {

    @Autowired
    FlightBookingService service;

    @PostMapping("/book")
    public Map<String, Object> bookFlight(@RequestBody FlightBooking booking) {
        Map<String, Object> response = new HashMap<>();
        try {
            int bookingId = service.bookFlight(booking);
            if (bookingId > 0) {
                response.put("success", true);
                response.put("message", "Flight booked successfully");
                response.put("bookingId", bookingId);
            } else {
                response.put("success", false);
                response.put("message", "Booking failed");
            }
        } catch (SQLException e) {
            response.put("success", false);
            response.put("message", "Error while booking: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("/calculate-price")
    public Map<String, Object> calculatePrice(
            @RequestParam int scheduleId,
            @RequestParam String seatCategory,
            @RequestParam int numberOfTickets,
            @RequestParam String travelDate) {
        try {
            return service.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
        } catch (SQLException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Failed to calculate price: " + e.getMessage());
            return error;
        }
    }

//    @GetMapping("/download-ticket/{bookingId}")
//    public ResponseEntity<byte[]> downloadTicket(@PathVariable int bookingId) {
//        try {
//            byte[] htmlBytes = service.generateTicketHTML(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.TEXT_HTML);
//            headers.setContentDispositionFormData("attachment", "ticket-" + bookingId + ".html");
//            return ResponseEntity.ok().headers(headers).body(htmlBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//
//    @GetMapping("/download-refund/{bookingId}")
//    public ResponseEntity<byte[]> downloadRefund(@PathVariable int bookingId) {
//        try {
//            byte[] htmlBytes = service.generateRefundHTML(bookingId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.TEXT_HTML);
//            headers.setContentDispositionFormData("attachment", "refund-" + bookingId + ".html");
//            return ResponseEntity.ok().headers(headers).body(htmlBytes);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
    
    
    @GetMapping("/download-ticket/{bookingId}")
    public ResponseEntity<byte[]> downloadTicket(@PathVariable int bookingId) {
        try {
            byte[] pdfBytes = service.generateTicketHTML(bookingId); // This now returns PDF
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF); // Changed to PDF
            headers.setContentDispositionFormData("attachment", "flight-ticket-" + bookingId + ".pdf");
            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/download-refund/{bookingId}")
    public ResponseEntity<byte[]> downloadRefund(@PathVariable int bookingId) {
        try {
            byte[] pdfBytes = service.generateRefundHTML(bookingId); // This now returns PDF
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF); // Changed to PDF
            headers.setContentDispositionFormData("attachment", "refund-receipt-" + bookingId + ".pdf");
            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/cancel/{id}")
    public Map<String, Object> cancelBooking(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> result = service.cancelBookingWithRefund(id);
            response.putAll(result);
        } catch (SQLException e) {
            response.put("success", false);
            response.put("message", "Error while cancelling: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("/user/{userId}")
    public List<FlightBooking> getBookingsByUser(@PathVariable int userId) {
        try {
            return service.getBookingsByUserId(userId);
        } catch (SQLException e) {
            return null;
        }
    }
}
