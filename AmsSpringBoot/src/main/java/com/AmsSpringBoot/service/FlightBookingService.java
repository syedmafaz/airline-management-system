//package com.AmsSpringBoot.service;
//
//import java.awt.Font;
//import java.io.ByteArrayOutputStream;
//import java.sql.SQLException;
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Map;
//
//
//
//import org.apache.catalina.filters.ExpiresFilter.XPrintWriter;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.dao.FlightBookingDAO;
//
//public class FlightBookingService {
//
////    public String bookFlight(FlightBooking booking) throws SQLException {
////        boolean success = FlightBookingDAO.bookFlight(booking);
////        return success ? "Booking Successful" : "Booking Failed";
////    }
//
//    public String cancelBooking(int bookingId) throws SQLException {
//        boolean success = FlightBookingDAO.cancelBooking(bookingId);
//        return success ? "Booking Cancelled Successfully" : "Cancellation Failed";
//    }
//
//    public List<FlightBooking> getAllBookings() throws SQLException {
//        return FlightBookingDAO.getAllBookings();
//    }
//    
//    public List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        return FlightBookingDAO.getBookingsByUserId(userId);
//    }
//    
//    
//    public int bookFlight(FlightBooking booking) throws SQLException {
//        return FlightBookingDAO.bookFlight(booking);
//    }
//
//    public Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
//                                                         int numberOfTickets, String travelDate) throws SQLException {
//        return FlightBookingDAO.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//    }
//
//    public Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
//        return FlightBookingDAO.cancelBookingWithRefund(bookingId);
//    }
//
//    public byte[] generateTicketPDF(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found");
//        }
//
//        Document document = new Document();
//        ByteArrayOutputStream baos = new ByteArrayOutputStream();
//        PrintWriter.getInstance(document, baos);
//        
//        document.open();
//        
//        // Add title
//        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLUE);
//        Paragraph title = new Paragraph("FLIGHT TICKET", titleFont);
//        title.setAlignment(Element.ALIGN_CENTER);
//        document.add(title);
//        
//        document.add(new Paragraph("\n"));
//        
//        // Add booking details
//        document.add(new Paragraph("Booking ID: " + booking.getBookingId()));
//        document.add(new Paragraph("Passenger Details: " + booking.getPassengerDetailsJson()));
//        document.add(new Paragraph("Seat Category: " + booking.getSeatCategory()));
//        document.add(new Paragraph("Number of Tickets: " + booking.getNumberOfTickets()));
//        document.add(new Paragraph("Base Fare: ₹" + booking.getBaseFare()));
//        document.add(new Paragraph("Discount: ₹" + booking.getDiscountAmount()));
//        document.add(new Paragraph("Total Amount: ₹" + booking.getTotalAmount()));
//        document.add(new Paragraph("Status: " + booking.getBookingStatus()));
//        
//        document.close();
//        return baos.toByteArray();
//    }
//
//    public byte[] generateRefundPDF(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found");
//        }
//
//        Document document = new Document();
//        ByteArrayOutputStream baos = new ByteArrayOutputStream();
//        PdfWriter.getInstance(document, baos);
//        
//        document.open();
//        
//        // Add title
//        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.RED);
//        Paragraph title = new Paragraph("REFUND RECEIPT", titleFont);
//        title.setAlignment(Element.ALIGN_CENTER);
//        document.add(title);
//        
//        document.add(new Paragraph("\n"));
//        
//        // Add refund details
//        document.add(new Paragraph("Booking ID: " + booking.getBookingId()));
//        document.add(new Paragraph("Original Amount: ₹" + booking.getTotalAmount()));
//        document.add(new Paragraph("Refund Amount: ₹" + booking.getRefundAmount()));
//        document.add(new Paragraph("Status: " + booking.getBookingStatus()));
//        document.add(new Paragraph("Cancellation Date: " + LocalDate.now()));
//        
//        document.close();
//        return baos.toByteArray();
//    }
//}



//package com.AmsSpringBoot.service;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.dao.FlightBookingDAO;
//import org.springframework.stereotype.Service;
//
//import java.sql.SQLException;
//import java.util.List;
//import java.util.Map;
//import java.util.HashMap;
//
//@Service
//public class FlightBookingService {
//
//    public int bookFlight(FlightBooking booking) throws SQLException {
//        return FlightBookingDAO.bookFlight(booking);
//    }
//
//    public Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
//                                                         int numberOfTickets, String travelDate) throws SQLException {
//        return FlightBookingDAO.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//    }
//
//    public Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
//        return FlightBookingDAO.cancelBookingWithRefund(bookingId);
//    }
//
//    public String cancelBooking(int bookingId) throws SQLException {
//        boolean success = FlightBookingDAO.cancelBooking(bookingId);
//        return success ? "Booking Cancelled Successfully" : "Cancellation Failed";
//    }
//
//    public List<FlightBooking> getAllBookings() throws SQLException {
//        return FlightBookingDAO.getAllBookings();
//    }
//    
//    public List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        return FlightBookingDAO.getBookingsByUserId(userId);
//    }
//
//    public FlightBooking getBookingById(int bookingId) throws SQLException {
//        return FlightBookingDAO.getBookingById(bookingId);
//    }
//
//    // Simple PDF generation without iText (using basic HTML to PDF approach)
//    public byte[] generateTicketPDF(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found");
//        }
//
//        // Create HTML content for ticket
//        String htmlContent = generateTicketHTML(booking);
//        
//        // For now, return HTML as bytes - you can integrate proper PDF library later
//        return htmlContent.getBytes("UTF-8");
//    }
//
//    public byte[] generateRefundPDF(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found");
//        }
//
//        // Create HTML content for refund receipt
//        String htmlContent = generateRefundHTML(booking);
//        
//        return htmlContent.getBytes("UTF-8");
//    }
//
//    private String generateTicketHTML(FlightBooking booking) {
//        StringBuilder html = new StringBuilder();
//        html.append("<!DOCTYPE html>");
//        html.append("<html><head><title>Flight Ticket</title>");
//        html.append("<style>body{font-family:Arial;padding:20px;} .header{color:#007bff;text-align:center;}</style>");
//        html.append("</head><body>");
//        html.append("<h1 class='header'>FLIGHT TICKET</h1>");
//        html.append("<p><strong>Booking ID:</strong> ").append(booking.getBookingId()).append("</p>");
//        html.append("<p><strong>Passenger Details:</strong> ").append(booking.getPassengerDetailsJson()).append("</p>");
//        html.append("<p><strong>Seat Category:</strong> ").append(booking.getSeatCategory()).append("</p>");
//        html.append("<p><strong>Number of Tickets:</strong> ").append(booking.getNumberOfTickets()).append("</p>");
//        html.append("<p><strong>Base Fare:</strong> ₹").append(booking.getBaseFare()).append("</p>");
//        html.append("<p><strong>Discount:</strong> ₹").append(booking.getDiscountAmount()).append("</p>");
//        html.append("<p><strong>Total Amount:</strong> ₹").append(booking.getTotalAmount()).append("</p>");
//        html.append("<p><strong>Status:</strong> ").append(booking.getBookingStatus()).append("</p>");
//        html.append("</body></html>");
//        return html.toString();
//    }
//
//    private String generateRefundHTML(FlightBooking booking) {
//        StringBuilder html = new StringBuilder();
//        html.append("<!DOCTYPE html>");
//        html.append("<html><head><title>Refund Receipt</title>");
//        html.append("<style>body{font-family:Arial;padding:20px;} .header{color:#dc3545;text-align:center;}</style>");
//        html.append("</head><body>");
//        html.append("<h1 class='header'>REFUND RECEIPT</h1>");
//        html.append("<p><strong>Booking ID:</strong> ").append(booking.getBookingId()).append("</p>");
//        html.append("<p><strong>Original Amount:</strong> ₹").append(booking.getTotalAmount()).append("</p>");
//        html.append("<p><strong>Refund Amount:</strong> ₹").append(booking.getRefundAmount()).append("</p>");
//        html.append("<p><strong>Status:</strong> ").append(booking.getBookingStatus()).append("</p>");
//        html.append("<p><strong>Cancellation Date:</strong> ").append(java.time.LocalDate.now()).append("</p>");
//        html.append("</body></html>");
//        return html.toString();
//    }
//}



//package com.AmsSpringBoot.service;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.dao.FlightBookingDAO;
//import org.springframework.stereotype.Service;
//
//import java.sql.SQLException;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class FlightBookingService {
//
//    public int bookFlight(FlightBooking booking) throws SQLException {
//        System.out.println("Service: Attempting to book flight for user " + booking.getUserId());
//        return FlightBookingDAO.bookFlight(booking);
//    }
//
//    public Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
//                                                         int numberOfTickets, String travelDate) throws SQLException {
//        return FlightBookingDAO.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//    }
//
//    public FlightBooking getBookingById(int bookingId) throws SQLException {
//        return FlightBookingDAO.getBookingById(bookingId);
//    }
//
//    public byte[] generateTicketPDF(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found with ID: " + bookingId);
//        }
//
//        String htmlContent = generateTicketHTML(booking);
//        return htmlContent.getBytes("UTF-8");
//    }
//
//    public byte[] generateRefundPDF(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found with ID: " + bookingId);
//        }
//
//        String htmlContent = generateRefundHTML(booking);
//        return htmlContent.getBytes("UTF-8");
//    }
//
//    private String generateTicketHTML(FlightBooking booking) {
//        StringBuilder html = new StringBuilder();
//        html.append("<!DOCTYPE html>");
//        html.append("<html><head><title>Flight Ticket</title>");
//        html.append("<style>");
//        html.append("body { font-family: Arial, sans-serif; margin: 20px; }");
//        html.append(".header { background: #007bff; color: white; padding: 20px; text-align: center; }");
//        html.append(".content { padding: 20px; border: 2px solid #007bff; }");
//        html.append(".row { margin: 10px 0; }");
//        html.append(".label { font-weight: bold; display: inline-block; width: 150px; }");
//        html.append("</style>");
//        html.append("</head><body>");
//        
//        html.append("<div class='header'>");
//        html.append("<h1>FLIGHT TICKET</h1>");
//        html.append("<p>EasyGo Airlines</p>");
//        html.append("</div>");
//        
//        html.append("<div class='content'>");
//        html.append("<div class='row'><span class='label'>Booking ID:</span> ").append(booking.getBookingId()).append("</div>");
//        html.append("<div class='row'><span class='label'>Flight Schedule:</span> ").append(booking.getFlightScheduleId()).append("</div>");
//        html.append("<div class='row'><span class='label'>Passenger Details:</span> ").append(booking.getPassengerDetailsJson()).append("</div>");
//        html.append("<div class='row'><span class='label'>Seat Category:</span> ").append(booking.getSeatCategory().toUpperCase()).append("</div>");
//        html.append("<div class='row'><span class='label'>Number of Tickets:</span> ").append(booking.getNumberOfTickets()).append("</div>");
//        html.append("<div class='row'><span class='label'>Base Fare:</span> ₹").append(booking.getBaseFare()).append("</div>");
//        html.append("<div class='row'><span class='label'>Discount:</span> ₹").append(booking.getDiscountAmount()).append("</div>");
//        html.append("<div class='row'><span class='label'>Total Amount:</span> ₹").append(booking.getTotalAmount()).append("</div>");
//        html.append("<div class='row'><span class='label'>Status:</span> ").append(booking.getBookingStatus().toUpperCase()).append("</div>");
//        html.append("<div class='row'><span class='label'>Booking Date:</span> ").append(booking.getBookingDate()).append("</div>");
//        html.append("</div>");
//        
//        html.append("</body></html>");
//        return html.toString();
//    }
//
//    private String generateRefundHTML(FlightBooking booking) {
//        StringBuilder html = new StringBuilder();
//        html.append("<!DOCTYPE html>");
//        html.append("<html><head><title>Refund Receipt</title>");
//        html.append("<style>");
//        html.append("body { font-family: Arial, sans-serif; margin: 20px; }");
//        html.append(".header { background: #dc3545; color: white; padding: 20px; text-align: center; }");
//        html.append(".content { padding: 20px; border: 2px solid #dc3545; }");
//        html.append(".row { margin: 10px 0; }");
//        html.append(".label { font-weight: bold; display: inline-block; width: 150px; }");
//        html.append("</style>");
//        html.append("</head><body>");
//        
//        html.append("<div class='header'>");
//        html.append("<h1>REFUND RECEIPT</h1>");
//        html.append("<p>EasyGo Airlines</p>");
//        html.append("</div>");
//        
//        html.append("<div class='content'>");
//        html.append("<div class='row'><span class='label'>Booking ID:</span> ").append(booking.getBookingId()).append("</div>");
//        html.append("<div class='row'><span class='label'>Original Amount:</span> ₹").append(booking.getTotalAmount()).append("</div>");
//        html.append("<div class='row'><span class='label'>Refund Amount:</span> ₹").append(booking.getRefundAmount()).append("</div>");
//        html.append("<div class='row'><span class='label'>Status:</span> ").append(booking.getBookingStatus().toUpperCase()).append("</div>");
//        html.append("<div class='row'><span class='label'>Date:</span> ").append(java.time.LocalDate.now()).append("</div>");
//        html.append("</div>");
//        
//        html.append("</body></html>");
//        return html.toString();
//    }
//
//    // Keep existing methods
//    public String cancelBooking(int bookingId) throws SQLException {
//        boolean success = FlightBookingDAO.cancelBooking(bookingId);
//        return success ? "Booking Cancelled Successfully" : "Cancellation Failed";
//    }
//
//    public Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
//        return FlightBookingDAO.cancelBookingWithRefund(bookingId);
//    }
//
//    public List<FlightBooking> getAllBookings() throws SQLException {
//        return FlightBookingDAO.getAllBookings();
//    }
//    
//    public List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        return FlightBookingDAO.getBookingsByUserId(userId);
//    }
//}
//



//package com.AmsSpringBoot.service;
//
//import com.AmsSpringBoot.bean.Flight;
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.bean.FlightSchedule;
//import com.AmsSpringBoot.dao.FlightBookingDAO;
//import com.AmsSpringBoot.util.DBUtil;
//
//import org.springframework.stereotype.Service;
//
//import com.AmsSpringBoot.bean.Carrier;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class FlightBookingService {
//
//    public int bookFlight(FlightBooking booking) throws SQLException {
//        return FlightBookingDAO.bookFlight(booking);
//    }
//
//    public Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
//                                                         int numberOfTickets, String travelDate) throws SQLException {
//        return FlightBookingDAO.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
//    }
//
//    public Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
//        return FlightBookingDAO.cancelBookingWithRefund(bookingId);
//    }
//
//    public FlightBooking getBookingById(int bookingId) throws SQLException {
//        return FlightBookingDAO.getBookingById(bookingId);
//    }
//
//    public List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        return FlightBookingDAO.getBookingsByUserId(userId);
//    }
//
//    public byte[] generateTicketHTML(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found");
//        }
//
//        String htmlContent = generateTicketHTMLContent(booking);
//        return htmlContent.getBytes("UTF-8");
//    }
//
//    public byte[] generateRefundHTML(int bookingId) throws Exception {
//        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
//        if (booking == null) {
//            throw new Exception("Booking not found");
//        }
//
//        String htmlContent = generateRefundHTMLContent(booking);
//        return htmlContent.getBytes("UTF-8");
//    }
//
////    private String generateTicketHTMLContent(FlightBooking booking) {
////        StringBuilder html = new StringBuilder();
////        html.append("<!DOCTYPE html>");
////        html.append("<html><head><title>Flight Ticket</title>");
////        html.append("<style>");
////        html.append("body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }");
////        html.append(".ticket { background: white; border: 2px solid #007bff; border-radius: 10px; padding: 30px; max-width: 600px; margin: 0 auto; }");
////        html.append(".header { background: #007bff; color: white; padding: 20px; text-align: center; margin: -30px -30px 30px; border-radius: 8px 8px 0 0; }");
////        html.append(".row { margin: 15px 0; display: flex; justify-content: space-between; }");
////        html.append(".label { font-weight: bold; }");
////        html.append(".fare-breakdown { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }");
////        html.append("</style>");
////        html.append("</head><body>");
////        
////        html.append("<div class='ticket'>");
////        html.append("<div class='header'>");
////        html.append("<h1>🎫 FLIGHT TICKET</h1>");
////        html.append("<p>EasyGo Airlines</p>");
////        html.append("</div>");
////        
////        html.append("<div class='row'><span class='label'>Booking ID:</span> <span>").append(booking.getBookingId()).append("</span></div>");
////        html.append("<div class='row'><span class='label'>Flight Schedule:</span> <span>").append(booking.getFlightScheduleId()).append("</span></div>");
////        html.append("<div class='row'><span class='label'>Seat Category:</span> <span>").append(booking.getSeatCategory().toUpperCase()).append("</span></div>");
////        html.append("<div class='row'><span class='label'>Number of Tickets:</span> <span>").append(booking.getNumberOfTickets()).append("</span></div>");
////        
////        html.append("<div class='fare-breakdown'>");
////        html.append("<h3>💰 Fare Breakdown</h3>");
////        html.append("<div class='row'><span>Base Fare:</span> <span>₹").append(booking.getBaseFare()).append("</span></div>");
////        html.append("<div class='row'><span>Discount:</span> <span>-₹").append(booking.getDiscountAmount()).append("</span></div>");
////        html.append("<div class='row'><span class='label'>Total Amount:</span> <span class='label'>₹").append(booking.getTotalAmount()).append("</span></div>");
////        html.append("</div>");
////        
////        html.append("<div class='row'><span class='label'>Status:</span> <span>").append(booking.getBookingStatus().toUpperCase()).append("</span></div>");
////        html.append("<div class='row'><span class='label'>Booking Date:</span> <span>").append(booking.getBookingDate()).append("</span></div>");
////        
////        html.append("</div>");
////        html.append("</body></html>");
////        
////        return html.toString();
////    }
//
//    private String generateRefundHTMLContent(FlightBooking booking) {
//        StringBuilder html = new StringBuilder();
//        html.append("<!DOCTYPE html>");
//        html.append("<html><head><title>Refund Receipt</title>");
//        html.append("<style>");
//        html.append("body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }");
//        html.append(".receipt { background: white; border: 2px solid #dc3545; border-radius: 10px; padding: 30px; max-width: 600px; margin: 0 auto; }");
//        html.append(".header { background: #dc3545; color: white; padding: 20px; text-align: center; margin: -30px -30px 30px; border-radius: 8px 8px 0 0; }");
//        html.append(".row { margin: 15px 0; display: flex; justify-content: space-between; }");
//        html.append(".label { font-weight: bold; }");
//        html.append("</style>");
//        html.append("</head><body>");
//        
//        html.append("<div class='receipt'>");
//        html.append("<div class='header'>");
//        html.append("<h1>💸 REFUND RECEIPT</h1>");
//        html.append("<p>EasyGo Airlines</p>");
//        html.append("</div>");
//        
//        html.append("<div class='row'><span class='label'>Booking ID:</span> <span>").append(booking.getBookingId()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Original Amount:</span> <span>₹").append(booking.getTotalAmount()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Refund Amount:</span> <span>₹").append(booking.getRefundAmount()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Status:</span> <span>").append(booking.getBookingStatus().toUpperCase()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Date:</span> <span>").append(java.time.LocalDate.now()).append("</span></div>");
//        
//        html.append("</div>");
//        html.append("</body></html>");
//        
//        return html.toString();
//    }
//    
//    
//    private String generateTicketHTMLContent(FlightBooking booking) throws SQLException {
//        // Get additional details for comprehensive ticket
//        FlightSchedule schedule = null;
//        Flight flight = null;
//        Carrier carrier = null;
//        
//        try {
//            Connection conn = DBUtil.createConnection();
//            String sql = "SELECT fs.*, f.*, c.* FROM FlightBooking fb " +
//                        "JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID " +
//                        "JOIN Flight f ON fs.FlightID = f.FlightID " +
//                        "JOIN Carrier c ON f.CarrierID = c.CarrierID " +
//                        "WHERE fb.BookingID = ?";
//            PreparedStatement pstmt = conn.prepareStatement(sql);
//            pstmt.setInt(1, booking.getBookingId());
//            ResultSet rs = pstmt.executeQuery();
//            
//            if (rs.next()) {
//                // Extract schedule, flight, and carrier details from ResultSet
//                // (You'll need to implement this based on your exact table structure)
//            }
//            conn.close();
//        } catch (SQLException e) {
//            // Handle error
//        }
//
//        StringBuilder html = new StringBuilder();
//        html.append("<!DOCTYPE html>");
//        html.append("<html><head>");
//        html.append("<title>Flight Ticket - Booking #").append(booking.getBookingId()).append("</title>");
//        html.append("<style>");
//        html.append("body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }");
//        html.append(".ticket { background: white; border-radius: 15px; padding: 0; max-width: 800px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; }");
//        html.append(".header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; }");
//        html.append(".content { padding: 30px; }");
//        html.append(".section { margin: 25px 0; padding: 20px; border: 1px solid #e3e6f0; border-radius: 8px; background: #f8f9fa; }");
//        html.append(".row { display: flex; justify-content: space-between; margin: 12px 0; }");
//        html.append(".label { font-weight: bold; color: #5a5c69; }");
//        html.append(".value { color: #3a3b45; }");
//        html.append(".passenger-item { background: white; padding: 12px; margin: 8px 0; border-radius: 6px; border-left: 4px solid #007bff; }");
//        html.append(".fare-breakdown { background: #e3f2fd; padding: 15px; border-radius: 8px; }");
//        html.append(".barcode { text-align: center; font-family: 'Courier New'; font-size: 24px; letter-spacing: 2px; margin: 20px 0; }");
//        html.append("</style>");
//        html.append("</head><body>");
//        
//        html.append("<div class='ticket'>");
//        
//        // Header
//        html.append("<div class='header'>");
//        html.append("<h1>✈️ FLIGHT TICKET</h1>");
//        html.append("<h2>EasyGo Airlines</h2>");
//        html.append("<p>Booking Confirmation #").append(booking.getBookingId()).append("</p>");
//        html.append("</div>");
//        
//        html.append("<div class='content'>");
//        
//        // Flight Information Section
//        html.append("<div class='section'>");
//        html.append("<h3>🛫 Flight Information</h3>");
//        html.append("<div class='row'><span class='label'>Booking ID:</span> <span class='value'>#").append(booking.getBookingId()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Flight Schedule ID:</span> <span class='value'>").append(booking.getFlightScheduleId()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Seat Category:</span> <span class='value'>").append(booking.getSeatCategory().toUpperCase()).append(" CLASS</span></div>");
//        html.append("<div class='row'><span class='label'>Number of Tickets:</span> <span class='value'>").append(booking.getNumberOfTickets()).append("</span></div>");
//        html.append("</div>");
//        
//        // Passenger Details Section
//        html.append("<div class='section'>");
//        html.append("<h3>👥 Passenger Details</h3>");
//        
//        try {
//            // Parse passenger JSON
//            String passengerJson = booking.getPassengerDetailsJson();
//            if (passengerJson != null && !passengerJson.isEmpty()) {
//                // Simple JSON parsing (you might want to use a proper JSON library)
//                passengerJson = passengerJson.replace("[", "").replace("]", "");
//                String[] passengers = passengerJson.split("\\},\\{");
//                
//                for (int i = 0; i < passengers.length; i++) {
//                    String passenger = passengers[i].replace("{", "").replace("}", "");
//                    String[] details = passenger.split(",");
//                    
//                    html.append("<div class='passenger-item'>");
//                    html.append("<h4>Passenger ").append(i + 1).append("</h4>");
//                    
//                    for (String detail : details) {
//                        if (detail.contains("name")) {
//                            String name = detail.split(":")[1].replace("\"", "").trim();
//                            html.append("<div class='row'><span class='label'>Name:</span> <span class='value'>").append(name).append("</span></div>");
//                        } else if (detail.contains("age")) {
//                            String age = detail.split(":")[1].replace("\"", "").trim();
//                            html.append("<div class='row'><span class='label'>Age:</span> <span class='value'>").append(age).append(" years</span></div>");
//                        } else if (detail.contains("gender")) {
//                            String gender = detail.split(":")[1].replace("\"", "").trim();
//                            html.append("<div class='row'><span class='label'>Gender:</span> <span class='value'>").append(gender).append("</span></div>");
//                        }
//                    }
//                    html.append("</div>");
//                }
//            }
//        } catch (Exception e) {
//            html.append("<p>Passenger details: ").append(booking.getPassengerDetailsJson()).append("</p>");
//        }
//        
//        html.append("</div>");
//        
//        // Fare Breakdown Section
//        html.append("<div class='section fare-breakdown'>");
//        html.append("<h3>💰 Fare Breakdown</h3>");
//        html.append("<div class='row'><span class='label'>Base Fare:</span> <span class='value'>₹").append(booking.getBaseFare()).append("</span></div>");
//        if (booking.getDiscountAmount() > 0) {
//            html.append("<div class='row'><span class='label'>Discount:</span> <span class='value'>-₹").append(booking.getDiscountAmount()).append("</span></div>");
//        }
//        html.append("<div class='row'><span class='label'><strong>Total Amount:</strong></span> <span class='value'><strong>₹").append(booking.getTotalAmount()).append("</strong></span></div>");
//        html.append("</div>");
//        
//        // Booking Status Section
//        html.append("<div class='section'>");
//        html.append("<h3>📋 Booking Status</h3>");
//        html.append("<div class='row'><span class='label'>Status:</span> <span class='value'>").append(booking.getBookingStatus().toUpperCase()).append("</span></div>");
//        html.append("<div class='row'><span class='label'>Booking Date:</span> <span class='value'>").append(booking.getBookingDate() != null ? booking.getBookingDate() : "N/A").append("</span></div>");
//        html.append("</div>");
//        
//        // Barcode Section
//        html.append("<div class='barcode'>");
//        html.append("<p>|||| | |||| || ||| | ||| |||| | ||||</p>");
//        html.append("<p>Booking Reference: ").append(booking.getBookingId()).append("</p>");
//        html.append("</div>");
//        
//        html.append("<div style='text-align: center; color: #6c757d; font-size: 12px; margin-top: 30px;'>");
//        html.append("<p>Thank you for choosing EasyGo Airlines!</p>");
//        html.append("<p>Please arrive at the airport at least 2 hours before domestic flights.</p>");
//        html.append("</div>");
//        
//        html.append("</div>"); // content
//        html.append("</div>"); // ticket
//        html.append("</body></html>");
//        
//        return html.toString();
//    }
//
//}
//


package com.AmsSpringBoot.service;

import com.AmsSpringBoot.bean.Flight;
import com.AmsSpringBoot.bean.FlightBooking;
import com.AmsSpringBoot.bean.FlightSchedule;
import com.AmsSpringBoot.bean.Carrier;
import com.AmsSpringBoot.bean.User;
import com.AmsSpringBoot.dao.FlightBookingDAO;
import com.AmsSpringBoot.util.DBUtil;

import org.springframework.stereotype.Service;

// iText PDF imports
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.ByteArrayOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class FlightBookingService {

    public int bookFlight(FlightBooking booking) throws SQLException {
        return FlightBookingDAO.bookFlight(booking);
    }

    public Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
                                                         int numberOfTickets, String travelDate) throws SQLException {
        return FlightBookingDAO.calculatePriceWithDiscount(scheduleId, seatCategory, numberOfTickets, travelDate);
    }

    public Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
        return FlightBookingDAO.cancelBookingWithRefund(bookingId);
    }

    public FlightBooking getBookingById(int bookingId) throws SQLException {
        return FlightBookingDAO.getBookingById(bookingId);
    }

    public List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
        return FlightBookingDAO.getBookingsByUserId(userId);
    }

    // Updated method to generate PDF ticket
    public byte[] generateTicketHTML(int bookingId) throws Exception {
        return generateTicketPDF(bookingId);
    }

    // Updated method to generate PDF refund receipt
    public byte[] generateRefundHTML(int bookingId) throws Exception {
        return generateRefundPDF(bookingId);
    }

    // Generate PDF Ticket
    public byte[] generateTicketPDF(int bookingId) throws Exception {
        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
        if (booking == null) {
            throw new Exception("Booking not found");
        }

        // Get complete booking details
        BookingDetails details = getCompleteBookingDetails(bookingId);

        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(document, baos);

        document.open();

        // Define fonts
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.WHITE);
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLUE);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
        Font smallFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY);

        // Header with background color
        PdfPTable headerTable = new PdfPTable(1);
        headerTable.setWidthPercentage(100);
        PdfPCell headerCell = new PdfPCell();
        headerCell.setBackgroundColor(new BaseColor(0, 123, 255)); // Blue background
        headerCell.setPadding(20);
        headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        
        Paragraph headerPara = new Paragraph();
        headerPara.add(new Chunk("✈ FLIGHT TICKET", titleFont));
        headerPara.add(Chunk.NEWLINE);
        headerPara.add(new Chunk("EasyGo Airlines", FontFactory.getFont(FontFactory.HELVETICA, 14, BaseColor.WHITE)));
        headerPara.add(Chunk.NEWLINE);
        headerPara.add(new Chunk("Booking Confirmation #" + booking.getBookingId(), 
                              FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.WHITE)));
        headerPara.setAlignment(Element.ALIGN_CENTER);
        headerCell.addElement(headerPara);
        headerTable.addCell(headerCell);
        document.add(headerTable);

        document.add(new Paragraph(" ")); // Space

        // Flight Information Section
        document.add(new Paragraph("Flight Information", headerFont));
        document.add(new LineSeparator());
        document.add(new Paragraph(" "));

        PdfPTable flightInfoTable = new PdfPTable(2);
        flightInfoTable.setWidthPercentage(100);
        flightInfoTable.setWidths(new float[]{1, 2});

        addTableRow(flightInfoTable, "Booking ID:", "#" + booking.getBookingId(), boldFont, normalFont);
        addTableRow(flightInfoTable, "Flight Schedule:", details.scheduleInfo, boldFont, normalFont);
        addTableRow(flightInfoTable, "Route:", details.routeInfo, boldFont, normalFont);
        addTableRow(flightInfoTable, "Carrier:", details.carrierName, boldFont, normalFont);
        addTableRow(flightInfoTable, "Travel Date:", details.travelDate, boldFont, normalFont);
        addTableRow(flightInfoTable, "Departure:", details.departureInfo, boldFont, normalFont);
        addTableRow(flightInfoTable, "Arrival:", details.arrivalInfo, boldFont, normalFont);
        addTableRow(flightInfoTable, "Seat Category:", booking.getSeatCategory().toUpperCase() + " CLASS", boldFont, normalFont);
        addTableRow(flightInfoTable, "Number of Tickets:", String.valueOf(booking.getNumberOfTickets()), boldFont, normalFont);

        document.add(flightInfoTable);
        document.add(new Paragraph(" "));

        // Passenger Details Section
        document.add(new Paragraph("Passenger Details", headerFont));
        document.add(new LineSeparator());
        document.add(new Paragraph(" "));

        addPassengerDetails(document, booking.getPassengerDetailsJson(), normalFont, boldFont);

        document.add(new Paragraph(" "));

        // Fare Breakdown Section
        document.add(new Paragraph("Fare Breakdown", headerFont));
        document.add(new LineSeparator());
        document.add(new Paragraph(" "));

        PdfPTable fareTable = new PdfPTable(2);
        fareTable.setWidthPercentage(100);
        fareTable.setWidths(new float[]{1, 1});

        // Fare breakdown with background
        PdfPCell fareHeaderCell = new PdfPCell(new Phrase("Fare Details", boldFont));
        fareHeaderCell.setBackgroundColor(new BaseColor(227, 242, 253));
        fareHeaderCell.setPadding(10);
        fareHeaderCell.setColspan(2);
        fareTable.addCell(fareHeaderCell);

        addTableRow(fareTable, "Base Fare:", "₹" + booking.getBaseFare(), normalFont, normalFont);
        if (booking.getDiscountAmount() > 0) {
            addTableRow(fareTable, "Discount:", "-₹" + booking.getDiscountAmount(), normalFont, 
                       FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.GREEN));
        }
        
        // Total amount with emphasis
        PdfPCell totalLabelCell = new PdfPCell(new Phrase("Total Amount:", boldFont));
        totalLabelCell.setPadding(8);
        totalLabelCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        PdfPCell totalValueCell = new PdfPCell(new Phrase("₹" + booking.getTotalAmount(), 
                                              FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.RED)));
        totalValueCell.setPadding(8);
        totalValueCell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        fareTable.addCell(totalLabelCell);
        fareTable.addCell(totalValueCell);

        document.add(fareTable);
        document.add(new Paragraph(" "));

        // Booking Status Section
        document.add(new Paragraph("Booking Status", headerFont));
        document.add(new LineSeparator());
        document.add(new Paragraph(" "));

        PdfPTable statusTable = new PdfPTable(2);
        statusTable.setWidthPercentage(100);
        statusTable.setWidths(new float[]{1, 2});

        BaseColor statusColor = booking.getBookingStatus().equalsIgnoreCase("booked") ? 
                               BaseColor.GREEN : BaseColor.RED;
        addTableRow(statusTable, "Status:", booking.getBookingStatus().toUpperCase(), boldFont, 
                   FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, statusColor));
        addTableRow(statusTable, "Booking Date:", booking.getBookingDate() != null ? 
                   booking.getBookingDate() : "N/A", boldFont, normalFont);

        document.add(statusTable);
        document.add(new Paragraph(" "));

        // Barcode section
        document.add(new Paragraph(" "));
        Paragraph barcode = new Paragraph("|||| | |||| || ||| | ||| |||| | ||||", 
                                         FontFactory.getFont(FontFactory.COURIER_BOLD, 16));
        barcode.setAlignment(Element.ALIGN_CENTER);
        document.add(barcode);
        
        Paragraph barcodeRef = new Paragraph("Booking Reference: " + booking.getBookingId(), smallFont);
        barcodeRef.setAlignment(Element.ALIGN_CENTER);
        document.add(barcodeRef);

        document.add(new Paragraph(" "));

        // Footer
        Paragraph footer = new Paragraph("Thank you for choosing EasyGo Airlines!\n" +
                                       "Please arrive at the airport at least 2 hours before domestic flights.", 
                                       smallFont);
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();
        return baos.toByteArray();
    }

    // Generate PDF Refund Receipt
    public byte[] generateRefundPDF(int bookingId) throws Exception {
        FlightBooking booking = FlightBookingDAO.getBookingById(bookingId);
        if (booking == null) {
            throw new Exception("Booking not found");
        }

        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);

        document.open();

        // Define fonts
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, BaseColor.WHITE);
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.RED);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.BLACK);
        Font smallFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.GRAY);

        // Header with red background
        PdfPTable headerTable = new PdfPTable(1);
        headerTable.setWidthPercentage(100);
        PdfPCell headerCell = new PdfPCell();
        headerCell.setBackgroundColor(new BaseColor(220, 53, 69)); // Red background
        headerCell.setPadding(20);
        headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        
        Paragraph headerPara = new Paragraph();
        headerPara.add(new Chunk("💸 REFUND RECEIPT", titleFont));
        headerPara.add(Chunk.NEWLINE);
        headerPara.add(new Chunk("EasyGo Airlines", FontFactory.getFont(FontFactory.HELVETICA, 14, BaseColor.WHITE)));
        headerPara.add(Chunk.NEWLINE);
        headerPara.add(new Chunk("Refund Confirmation #" + booking.getBookingId(), 
                              FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.WHITE)));
        headerPara.setAlignment(Element.ALIGN_CENTER);
        headerCell.addElement(headerPara);
        headerTable.addCell(headerCell);
        document.add(headerTable);

        document.add(new Paragraph(" "));

        // Refund Details
        document.add(new Paragraph("Refund Details", headerFont));
        document.add(new LineSeparator());
        document.add(new Paragraph(" "));

        PdfPTable refundTable = new PdfPTable(2);
        refundTable.setWidthPercentage(100);
        refundTable.setWidths(new float[]{1, 2});

        addTableRow(refundTable, "Booking ID:", "#" + booking.getBookingId(), boldFont, normalFont);
        addTableRow(refundTable, "Original Amount:", "₹" + booking.getTotalAmount(), boldFont, normalFont);
        addTableRow(refundTable, "Refund Amount:", "₹" + booking.getRefundAmount(), boldFont, 
                   FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.GREEN));
        addTableRow(refundTable, "Status:", booking.getBookingStatus().toUpperCase(), boldFont, 
                   FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.RED));
        addTableRow(refundTable, "Cancellation Date:", java.time.LocalDate.now().toString(), boldFont, normalFont);

        document.add(refundTable);
        document.add(new Paragraph(" "));

        // Refund Policy Note
        Paragraph policyNote = new Paragraph("Note: Refund amount is calculated based on our cancellation policy. " +
                                           "The refunded amount will be credited to your original payment method within 5-7 business days.", 
                                           smallFont);
        policyNote.setAlignment(Element.ALIGN_JUSTIFIED);
        document.add(policyNote);

        document.add(new Paragraph(" "));

        // Footer
        Paragraph footer = new Paragraph("Thank you for choosing EasyGo Airlines!\n" +
                                       "For any queries regarding your refund, please contact our customer service.", 
                                       smallFont);
        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();
        return baos.toByteArray();
    }

    // Helper method to add table rows
    private void addTableRow(PdfPTable table, String label, String value, Font labelFont, Font valueFont) {
        PdfPCell labelCell = new PdfPCell(new Phrase(label, labelFont));
        labelCell.setPadding(8);
        labelCell.setBorder(Rectangle.BOTTOM);
        labelCell.setBorderColor(BaseColor.LIGHT_GRAY);
        
        PdfPCell valueCell = new PdfPCell(new Phrase(value, valueFont));
        valueCell.setPadding(8);
        valueCell.setBorder(Rectangle.BOTTOM);
        valueCell.setBorderColor(BaseColor.LIGHT_GRAY);
        
        table.addCell(labelCell);
        table.addCell(valueCell);
    }

    // Helper method to add passenger details
    private void addPassengerDetails(Document document, String passengerJson, Font normalFont, Font boldFont) 
            throws DocumentException {
        try {
            if (passengerJson != null && !passengerJson.isEmpty()) {
                passengerJson = passengerJson.replace("[", "").replace("]", "");
                String[] passengers = passengerJson.split("\\},\\{");
                
                for (int i = 0; i < passengers.length; i++) {
                    String passenger = passengers[i].replace("{", "").replace("}", "");
                    String[] details = passenger.split(",");
                    
                    // Create a table for each passenger
                    PdfPTable passengerTable = new PdfPTable(2);
                    passengerTable.setWidthPercentage(100);
                    passengerTable.setSpacingAfter(10);
                    
                    // Passenger header
                    PdfPCell passengerHeader = new PdfPCell(new Phrase("Passenger " + (i + 1), boldFont));
                    passengerHeader.setBackgroundColor(new BaseColor(240, 248, 255));
                    passengerHeader.setPadding(8);
                    passengerHeader.setColspan(2);
                    passengerTable.addCell(passengerHeader);
                    
                    for (String detail : details) {
                        if (detail.contains("name")) {
                            String name = detail.split(":")[1].replace("\"", "").trim();
                            addTableRow(passengerTable, "Name:", name, normalFont, normalFont);
                        } else if (detail.contains("age")) {
                            String age = detail.split(":")[1].replace("\"", "").trim();
                            addTableRow(passengerTable, "Age:", age + " years", normalFont, normalFont);
                        } else if (detail.contains("gender")) {
                            String gender = detail.split(":")[1].replace("\"", "").trim();
                            addTableRow(passengerTable, "Gender:", gender, normalFont, normalFont);
                        }
                    }
                    document.add(passengerTable);
                }
            }
        } catch (Exception e) {
            document.add(new Paragraph("Passenger details: " + passengerJson, normalFont));
        }
    }

    // Helper method to get complete booking details
    private BookingDetails getCompleteBookingDetails(int bookingId) throws SQLException {
        BookingDetails details = new BookingDetails();
        
        try {
            Connection conn = DBUtil.createConnection();
            String sql = "SELECT fb.*, fs.*, f.*, c.*, u.UserName " +
                        "FROM FlightBooking fb " +
                        "JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID " +
                        "JOIN Flight f ON fs.FlightID = f.FlightID " +
                        "JOIN Carrier c ON f.CarrierID = c.CarrierID " +
                        "LEFT JOIN Users u ON fb.UserID = u.UserID " +
                        "WHERE fb.BookingID = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, bookingId);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                details.scheduleInfo = "Schedule #" + rs.getInt("FlightScheduleID");
                details.routeInfo = rs.getString("Origin") + " → " + rs.getString("Destination");
                details.carrierName = rs.getString("CarrierName");
                details.travelDate = rs.getDate("DateOfTravel") != null ? 
                                   rs.getDate("DateOfTravel").toString() : "N/A";
                details.departureInfo = rs.getString("DepartureTime") + " on " + 
                                      (rs.getDate("DepartureDate") != null ? 
                                       rs.getDate("DepartureDate").toString() : "N/A");
                details.arrivalInfo = rs.getString("ArrivalTime") + " on " + 
                                    (rs.getDate("ArrivalDate") != null ? 
                                     rs.getDate("ArrivalDate").toString() : "N/A");
            }
            conn.close();
        } catch (SQLException e) {
            // Set default values if query fails
            details.scheduleInfo = "Schedule information unavailable";
            details.routeInfo = "Route information unavailable";
            details.carrierName = "Carrier information unavailable";
            details.travelDate = "N/A";
            details.departureInfo = "N/A";
            details.arrivalInfo = "N/A";
        }
        
        return details;
    }

    // Inner class to hold booking details
    private static class BookingDetails {
        String scheduleInfo;
        String routeInfo;
        String carrierName;
        String travelDate;
        String departureInfo;
        String arrivalInfo;
    }
}
