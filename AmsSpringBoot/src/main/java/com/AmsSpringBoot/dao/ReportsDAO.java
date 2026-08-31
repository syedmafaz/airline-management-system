//// ReportsDAO.java
//package com.AmsSpringBoot.dao;
//
//import com.AmsSpringBoot.util.DBUtil;
//
//import java.io.UnsupportedEncodingException;
//import java.sql.*;
//import java.util.*;
//
//public class ReportsDAO {
//
////    public static List<Map<String, Object>> getBookingsByCarrier(int carrierId) throws SQLException {
////        Connection conn = DBUtil.createConnection();
////        String sql = """
////            SELECT fb.*, fs.*, f.*, c.*, u.UserName, u.Email
////            FROM FlightBooking fb
////            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
////            JOIN Flight f ON fs.FlightID = f.FlightID
////            JOIN Carrier c ON f.CarrierID = c.CarrierID
////            LEFT JOIN Users u ON fb.UserID = u.UserID
////            WHERE c.CarrierID = ?
////            ORDER BY fb.BookingDate DESC
////        """;
////        
////        PreparedStatement pstmt = conn.prepareStatement(sql);
////        pstmt.setInt(1, carrierId);
////        ResultSet rs = pstmt.executeQuery();
////        
////        List<Map<String, Object>> bookings = new ArrayList<>();
////        while (rs.next()) {
////            Map<String, Object> booking = new HashMap<>();
////            booking.put("bookingId", rs.getInt("BookingID"));
////            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
////            booking.put("userId", rs.getInt("UserID"));
////            booking.put("userName", rs.getString("UserName"));
////            booking.put("userEmail", rs.getString("Email"));
////            booking.put("seatCategory", rs.getString("SeatCategory"));
////            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
////            booking.put("totalAmount", rs.getInt("TotalAmount"));
////            booking.put("baseFare", rs.getInt("BaseFare"));
////            booking.put("discountAmount", rs.getInt("DiscountAmount"));
////            booking.put("refundAmount", rs.getInt("RefundAmount"));
////            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
////            booking.put("bookingStatus", rs.getString("BookingStatus"));
////            booking.put("bookingDate", rs.getDate("BookingDate"));
////            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
////            booking.put("departureTime", rs.getString("DepartureTime"));
////            booking.put("arrivalTime", rs.getString("ArrivalTime"));
////            booking.put("flightNumber", rs.getInt("FlightID"));
////            booking.put("origin", rs.getString("Origin"));
////            booking.put("destination", rs.getString("Destination"));
////            booking.put("carrierName", rs.getString("CarrierName"));
////            bookings.add(booking);
////        }
////        
////        conn.close();
////        return bookings;
////    }
////
////    public static List<Map<String, Object>> getBookingsByFlight(int flightId) throws SQLException {
////        Connection conn = DBUtil.createConnection();
////        String sql = """
////            SELECT fb.*, fs.*, f.*, c.*, u.UserName, u.Email
////            FROM FlightBooking fb
////            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
////            JOIN Flight f ON fs.FlightID = f.FlightID
////            JOIN Carrier c ON f.CarrierID = c.CarrierID
////            LEFT JOIN Users u ON fb.UserID = u.UserID
////            WHERE f.FlightID = ?
////            ORDER BY fb.BookingDate DESC
////        """;
////        
////        PreparedStatement pstmt = conn.prepareStatement(sql);
////        pstmt.setInt(1, flightId);
////        ResultSet rs = pstmt.executeQuery();
////        
////        List<Map<String, Object>> bookings = new ArrayList<>();
////        while (rs.next()) {
////            Map<String, Object> booking = new HashMap<>();
////            // Same mapping as above
////            bookings.add(booking);
////        }
////        
////        conn.close();
////        return bookings;
////    }
////
////    public static List<Map<String, Object>> getBookingsBySchedule(int scheduleId) throws SQLException {
////        Connection conn = DBUtil.createConnection();
////        String sql = """
////            SELECT fb.*, fs.*, f.*, c.*, u.UserName, u.Email
////            FROM FlightBooking fb
////            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
////            JOIN Flight f ON fs.FlightID = f.FlightID
////            JOIN Carrier c ON f.CarrierID = c.CarrierID
////            LEFT JOIN Users u ON fb.UserID = u.UserID
////            WHERE fs.FlightScheduleID = ?
////            ORDER BY fb.BookingDate DESC
////        """;
////        
////        PreparedStatement pstmt = conn.prepareStatement(sql);
////        pstmt.setInt(1, scheduleId);
////        ResultSet rs = pstmt.executeQuery();
////        
////        List<Map<String, Object>> bookings = new ArrayList<>();
////        while (rs.next()) {
////            Map<String, Object> booking = new HashMap<>();
////            // Same mapping as above
////            bookings.add(booking);
////        }
////        
////        conn.close();
////        return bookings;
////    }
//
//    public static Map<String, Object> getReportSummary(Integer carrierId, Integer flightId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        StringBuilder sql = new StringBuilder();
//        sql.append("SELECT ");
//        sql.append("COUNT(*) as totalBookings, ");
//        sql.append("SUM(CASE WHEN fb.BookingStatus = 'booked' THEN fb.TotalAmount ELSE 0 END) as totalRevenue, ");
//        sql.append("SUM(CASE WHEN fb.BookingStatus = 'cancelled' THEN fb.RefundAmount ELSE 0 END) as totalRefunds, ");
//        sql.append("COUNT(CASE WHEN fb.BookingStatus = 'booked' THEN 1 END) as activeBookings, ");
//        sql.append("COUNT(CASE WHEN fb.BookingStatus = 'cancelled' THEN 1 END) as cancelledBookings, ");
//        sql.append("SUM(fb.NumberOfTickets) as totalPassengers ");
//        sql.append("FROM FlightBooking fb ");
//        sql.append("JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID ");
//        sql.append("JOIN Flight f ON fs.FlightID = f.FlightID ");
//        
//        List<Object> params = new ArrayList<>();
//        if (carrierId != null) {
//            sql.append("WHERE f.CarrierID = ? ");
//            params.add(carrierId);
//        }
//        if (flightId != null) {
//            sql.append(carrierId != null ? "AND " : "WHERE ");
//            sql.append("f.FlightID = ? ");
//            params.add(flightId);
//        }
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql.toString());
//        for (int i = 0; i < params.size(); i++) {
//            pstmt.setObject(i + 1, params.get(i));
//        }
//        
//        ResultSet rs = pstmt.executeQuery();
//        Map<String, Object> summary = new HashMap<>();
//        
//        if (rs.next()) {
//            summary.put("totalBookings", rs.getInt("totalBookings"));
//            summary.put("totalRevenue", rs.getInt("totalRevenue"));
//            summary.put("totalRefunds", rs.getInt("totalRefunds"));
//            summary.put("activeBookings", rs.getInt("activeBookings"));
//            summary.put("cancelledBookings", rs.getInt("cancelledBookings"));
//            summary.put("totalPassengers", rs.getInt("totalPassengers"));
//        }
//        
//        conn.close();
//        return summary;
//    }
//
//    public static List<Map<String, Object>> getAllBookings() throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.*, fs.*, f.*, c.*, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        Statement stmt = conn.createStatement();
//        ResultSet rs = stmt.executeQuery(sql);
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            Map<String, Object> booking = new HashMap<>();
//            // Same mapping as above
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        return bookings;
//    }
//
//    public static byte[] exportBookingsToCSV(Integer carrierId, Integer flightId) throws SQLException, UnsupportedEncodingException {
//        List<Map<String, Object>> bookings;
//        
//        if (carrierId != null) {
//            bookings = getBookingsByCarrier(carrierId);
//        } else if (flightId != null) {
//            bookings = getBookingsByFlight(flightId);
//        } else {
//            bookings = getAllBookings();
//        }
//        
//        StringBuilder csv = new StringBuilder();
//        csv.append("Booking ID,User Name,User Email,Flight,Route,Travel Date,Seat Category,Tickets,Total Amount,Status,Passengers\n");
//        
//        for (Map<String, Object> booking : bookings) {
//            csv.append(booking.get("bookingId")).append(",");
//            csv.append(booking.get("userName") != null ? booking.get("userName") : "").append(",");
//            csv.append(booking.get("userEmail") != null ? booking.get("userEmail") : "").append(",");
//            csv.append(booking.get("flightNumber")).append(",");
//            csv.append(booking.get("origin")).append("-").append(booking.get("destination")).append(",");
//            csv.append(booking.get("dateOfTravel")).append(",");
//            csv.append(booking.get("seatCategory")).append(",");
//            csv.append(booking.get("numberOfTickets")).append(",");
//            csv.append(booking.get("totalAmount")).append(",");
//            csv.append(booking.get("bookingStatus")).append(",");
//            csv.append("\"").append(booking.get("passengerDetailsJson")).append("\"");
//            csv.append("\n");
//        }
//        
//        return csv.toString().getBytes("UTF-8");
//    }
//    
//    public static List<Map<String, Object>> getBookingsBySchedule(int scheduleId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.*, fs.DateOfTravel, fs.DepartureTime, fs.ArrivalTime,
//                   f.Origin, f.Destination, c.CarrierName, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            WHERE fs.FlightScheduleID = ?
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, scheduleId);
//        ResultSet rs = pstmt.executeQuery();
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            Map<String, Object> booking = new HashMap<>();
//            booking.put("bookingId", rs.getInt("BookingID"));
//            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
//            booking.put("userId", rs.getInt("UserID"));
//            booking.put("userName", rs.getString("UserName"));
//            booking.put("userEmail", rs.getString("Email"));
//            booking.put("seatCategory", rs.getString("SeatCategory"));
//            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
//            booking.put("totalAmount", rs.getInt("TotalAmount"));
//            booking.put("baseFare", rs.getInt("BaseFare"));
//            booking.put("discountAmount", rs.getInt("DiscountAmount"));
//            booking.put("refundAmount", rs.getInt("RefundAmount"));
//            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
//            booking.put("bookingStatus", rs.getString("BookingStatus"));
//            booking.put("bookingDate", rs.getDate("BookingDate"));
//            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
//            booking.put("departureTime", rs.getString("DepartureTime"));
//            booking.put("arrivalTime", rs.getString("ArrivalTime"));
//            booking.put("origin", rs.getString("Origin"));
//            booking.put("destination", rs.getString("Destination"));
//            booking.put("carrierName", rs.getString("CarrierName"));
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        return bookings;
//    }
//
//    public static List<Map<String, Object>> getBookingsByFlight(int flightId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.*, fs.DateOfTravel, fs.DepartureTime, fs.ArrivalTime,
//                   f.Origin, f.Destination, c.CarrierName, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            WHERE f.FlightID = ?
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, flightId);
//        ResultSet rs = pstmt.executeQuery();
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            // Same mapping as above
//            Map<String, Object> booking = new HashMap<>();
//            // ... (copy the same mapping code from above)
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        return bookings;
//    }
//
//    public static List<Map<String, Object>> getBookingsByCarrier(int carrierId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.*, fs.DateOfTravel, fs.DepartureTime, fs.ArrivalTime,
//                   f.Origin, f.Destination, c.CarrierName, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            WHERE c.CarrierID = ?
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, carrierId);
//        ResultSet rs = pstmt.executeQuery();
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            // Same mapping as above
//            Map<String, Object> booking = new HashMap<>();
//            // ... (copy the same mapping code from above)
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        return bookings;
//    }
//    
//}
//
//
//



//package com.AmsSpringBoot.dao;
//
//import com.AmsSpringBoot.util.DBUtil;
//
//import java.io.UnsupportedEncodingException;
//import java.sql.*;
//import java.util.*;
//
//public class ReportsDAO {
//
//    public static List<Map<String, Object>> getBookingsBySchedule(int scheduleId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.BookingID, fb.FlightScheduleID, fb.UserID, fb.SeatCategory, 
//                   fb.NumberOfTickets, fb.TotalAmount, fb.BaseFare, fb.DiscountAmount,
//                   fb.RefundAmount, fb.PassengerDetailsJson, fb.BookingStatus, fb.BookingDate,
//                   fs.DateOfTravel, fs.DepartureTime, fs.ArrivalTime,
//                   f.Origin, f.Destination, f.FlightID,
//                   c.CarrierName, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            WHERE fs.FlightScheduleID = ?
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, scheduleId);
//        ResultSet rs = pstmt.executeQuery();
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            Map<String, Object> booking = new HashMap<>();
//            booking.put("bookingId", rs.getInt("BookingID"));
//            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
//            booking.put("userId", rs.getInt("UserID"));
//            booking.put("userName", rs.getString("UserName"));
//            booking.put("userEmail", rs.getString("Email"));
//            booking.put("seatCategory", rs.getString("SeatCategory"));
//            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
//            booking.put("totalAmount", rs.getInt("TotalAmount"));
//            booking.put("baseFare", rs.getInt("BaseFare"));
//            booking.put("discountAmount", rs.getInt("DiscountAmount"));
//            booking.put("refundAmount", rs.getInt("RefundAmount"));
//            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
//            booking.put("bookingStatus", rs.getString("BookingStatus"));
//            booking.put("bookingDate", rs.getDate("BookingDate"));
//            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
//            booking.put("departureTime", rs.getString("DepartureTime"));
//            booking.put("arrivalTime", rs.getString("ArrivalTime"));
//            booking.put("origin", rs.getString("Origin"));
//            booking.put("destination", rs.getString("Destination"));
//            booking.put("flightNumber", rs.getInt("FlightID"));
//            booking.put("carrierName", rs.getString("CarrierName"));
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        System.out.println("DAO: Found " + bookings.size() + " bookings for schedule " + scheduleId);
//        return bookings;
//    }
//
//    public static List<Map<String, Object>> getBookingsByFlight(int flightId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.BookingID, fb.FlightScheduleID, fb.UserID, fb.SeatCategory, 
//                   fb.NumberOfTickets, fb.TotalAmount, fb.BaseFare, fb.DiscountAmount,
//                   fb.RefundAmount, fb.PassengerDetailsJson, fb.BookingStatus, fb.BookingDate,
//                   fs.DateOfTravel, fs.DepartureTime, fs.ArrivalTime,
//                   f.Origin, f.Destination, f.FlightID,
//                   c.CarrierName, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            WHERE f.FlightID = ?
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, flightId);
//        ResultSet rs = pstmt.executeQuery();
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            Map<String, Object> booking = new HashMap<>();
//            // Same mapping as above
//            booking.put("bookingId", rs.getInt("BookingID"));
//            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
//            booking.put("userId", rs.getInt("UserID"));
//            booking.put("userName", rs.getString("UserName"));
//            booking.put("userEmail", rs.getString("Email"));
//            booking.put("seatCategory", rs.getString("SeatCategory"));
//            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
//            booking.put("totalAmount", rs.getInt("TotalAmount"));
//            booking.put("baseFare", rs.getInt("BaseFare"));
//            booking.put("discountAmount", rs.getInt("DiscountAmount"));
//            booking.put("refundAmount", rs.getInt("RefundAmount"));
//            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
//            booking.put("bookingStatus", rs.getString("BookingStatus"));
//            booking.put("bookingDate", rs.getDate("BookingDate"));
//            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
//            booking.put("departureTime", rs.getString("DepartureTime"));
//            booking.put("arrivalTime", rs.getString("ArrivalTime"));
//            booking.put("origin", rs.getString("Origin"));
//            booking.put("destination", rs.getString("Destination"));
//            booking.put("flightNumber", rs.getInt("FlightID"));
//            booking.put("carrierName", rs.getString("CarrierName"));
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        return bookings;
//    }
//
//    public static List<Map<String, Object>> getBookingsByCarrier(int carrierId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = """
//            SELECT fb.BookingID, fb.FlightScheduleID, fb.UserID, fb.SeatCategory, 
//                   fb.NumberOfTickets, fb.TotalAmount, fb.BaseFare, fb.DiscountAmount,
//                   fb.RefundAmount, fb.PassengerDetailsJson, fb.BookingStatus, fb.BookingDate,
//                   fs.DateOfTravel, fs.DepartureTime, fs.ArrivalTime,
//                   f.Origin, f.Destination, f.FlightID,
//                   c.CarrierName, u.UserName, u.Email
//            FROM FlightBooking fb
//            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//            JOIN Flight f ON fs.FlightID = f.FlightID
//            JOIN Carrier c ON f.CarrierID = c.CarrierID
//            LEFT JOIN Users u ON fb.UserID = u.UserID
//            WHERE c.CarrierID = ?
//            ORDER BY fb.BookingDate DESC
//        """;
//        
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, carrierId);
//        ResultSet rs = pstmt.executeQuery();
//        
//        List<Map<String, Object>> bookings = new ArrayList<>();
//        while (rs.next()) {
//            Map<String, Object> booking = new HashMap<>();
//            // Same mapping as above
//            booking.put("bookingId", rs.getInt("BookingID"));
//            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
//            booking.put("userId", rs.getInt("UserID"));
//            booking.put("userName", rs.getString("UserName"));
//            booking.put("userEmail", rs.getString("Email"));
//            booking.put("seatCategory", rs.getString("SeatCategory"));
//            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
//            booking.put("totalAmount", rs.getInt("TotalAmount"));
//            booking.put("baseFare", rs.getInt("BaseFare"));
//            booking.put("discountAmount", rs.getInt("DiscountAmount"));
//            booking.put("refundAmount", rs.getInt("RefundAmount"));
//            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
//            booking.put("bookingStatus", rs.getString("BookingStatus"));
//            booking.put("bookingDate", rs.getDate("BookingDate"));
//            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
//            booking.put("departureTime", rs.getString("DepartureTime"));
//            booking.put("arrivalTime", rs.getString("ArrivalTime"));
//            booking.put("origin", rs.getString("Origin"));
//            booking.put("destination", rs.getString("Destination"));
//            booking.put("flightNumber", rs.getInt("FlightID"));
//            booking.put("carrierName", rs.getString("CarrierName"));
//            bookings.add(booking);
//        }
//        
//        conn.close();
//        return bookings;
//    }
//    
//    
//    
//  public static Map<String, Object> getReportSummary(Integer carrierId, Integer flightId) throws SQLException {
//  Connection conn = DBUtil.createConnection();
//  StringBuilder sql = new StringBuilder();
//  sql.append("SELECT ");
//  sql.append("COUNT(*) as totalBookings, ");
//  sql.append("SUM(CASE WHEN fb.BookingStatus = 'booked' THEN fb.TotalAmount ELSE 0 END) as totalRevenue, ");
//  sql.append("SUM(CASE WHEN fb.BookingStatus = 'cancelled' THEN fb.RefundAmount ELSE 0 END) as totalRefunds, ");
//  sql.append("COUNT(CASE WHEN fb.BookingStatus = 'booked' THEN 1 END) as activeBookings, ");
//  sql.append("COUNT(CASE WHEN fb.BookingStatus = 'cancelled' THEN 1 END) as cancelledBookings, ");
//  sql.append("SUM(fb.NumberOfTickets) as totalPassengers ");
//  sql.append("FROM FlightBooking fb ");
//  sql.append("JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID ");
//  sql.append("JOIN Flight f ON fs.FlightID = f.FlightID ");
//  
//  List<Object> params = new ArrayList<>();
//  if (carrierId != null) {
//      sql.append("WHERE f.CarrierID = ? ");
//      params.add(carrierId);
//  }
//  if (flightId != null) {
//      sql.append(carrierId != null ? "AND " : "WHERE ");
//      sql.append("f.FlightID = ? ");
//      params.add(flightId);
//  }
//  
//  PreparedStatement pstmt = conn.prepareStatement(sql.toString());
//  for (int i = 0; i < params.size(); i++) {
//      pstmt.setObject(i + 1, params.get(i));
//  }
//  
//  ResultSet rs = pstmt.executeQuery();
//  Map<String, Object> summary = new HashMap<>();
//  
//  if (rs.next()) {
//      summary.put("totalBookings", rs.getInt("totalBookings"));
//      summary.put("totalRevenue", rs.getInt("totalRevenue"));
//      summary.put("totalRefunds", rs.getInt("totalRefunds"));
//      summary.put("activeBookings", rs.getInt("activeBookings"));
//      summary.put("cancelledBookings", rs.getInt("cancelledBookings"));
//      summary.put("totalPassengers", rs.getInt("totalPassengers"));
//  }
//  
//  conn.close();
//  return summary;
//}
//
//public static List<Map<String, Object>> getAllBookings() throws SQLException {
//  Connection conn = DBUtil.createConnection();
//  String sql = """
//      SELECT fb.*, fs.*, f.*, c.*, u.UserName, u.Email
//      FROM FlightBooking fb
//      JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
//      JOIN Flight f ON fs.FlightID = f.FlightID
//      JOIN Carrier c ON f.CarrierID = c.CarrierID
//      LEFT JOIN Users u ON fb.UserID = u.UserID
//      ORDER BY fb.BookingDate DESC
//  """;
//  
//  Statement stmt = conn.createStatement();
//  ResultSet rs = stmt.executeQuery(sql);
//  
//  List<Map<String, Object>> bookings = new ArrayList<>();
//  while (rs.next()) {
//      Map<String, Object> booking = new HashMap<>();
//      // Same mapping as above
//      bookings.add(booking);
//  }
//  
//  conn.close();
//  return bookings;
//}
//
//public static byte[] exportBookingsToCSV(Integer carrierId, Integer flightId) throws SQLException, UnsupportedEncodingException {
//  List<Map<String, Object>> bookings;
//  
//  if (carrierId != null) {
//      bookings = getBookingsByCarrier(carrierId);
//  } else if (flightId != null) {
//      bookings = getBookingsByFlight(flightId);
//  } else {
//      bookings = getAllBookings();
//  }
//  
//  StringBuilder csv = new StringBuilder();
//  csv.append("Booking ID,User Name,User Email,Flight,Route,Travel Date,Seat Category,Tickets,Total Amount,Status,Passengers\n");
//  
//  for (Map<String, Object> booking : bookings) {
//      csv.append(booking.get("bookingId")).append(",");
//      csv.append(booking.get("userName") != null ? booking.get("userName") : "").append(",");
//      csv.append(booking.get("userEmail") != null ? booking.get("userEmail") : "").append(",");
//      csv.append(booking.get("flightNumber")).append(",");
//      csv.append(booking.get("origin")).append("-").append(booking.get("destination")).append(",");
//      csv.append(booking.get("dateOfTravel")).append(",");
//      csv.append(booking.get("seatCategory")).append(",");
//      csv.append(booking.get("numberOfTickets")).append(",");
//      csv.append(booking.get("totalAmount")).append(",");
//      csv.append(booking.get("bookingStatus")).append(",");
//      csv.append("\"").append(booking.get("passengerDetailsJson")).append("\"");
//      csv.append("\n");
//  }
//  
//  return csv.toString().getBytes("UTF-8");
//}
//}
//



package com.AmsSpringBoot.dao;

import com.AmsSpringBoot.util.DBUtil;

import java.sql.*;
import java.util.*;

public class ReportsDAO {

    public static List<Map<String, Object>> getBookingsBySchedule(int scheduleId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        
        // First, let's try a simpler query to test the basic join
        String sql = """
            SELECT fb.BookingID, fb.FlightScheduleID, fb.UserID, fb.SeatCategory, 
                   fb.NumberOfTickets, fb.TotalAmount, fb.BaseFare, fb.DiscountAmount,
                   fb.RefundAmount, fb.PassengerDetailsJson, fb.BookingStatus, fb.BookingDate,
                   fs.DateOfTravel,
                   f.Origin, f.Destination, f.FlightID,
                   c.CarrierName, u.UserName, u.EmailId
            FROM FlightBooking fb
            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
            JOIN Flight f ON fs.FlightID = f.FlightID
            JOIN Carrier c ON f.CarrierID = c.CarrierID
            LEFT JOIN Users u ON fb.UserID = u.UserID
            WHERE fs.FlightScheduleID = ?
            ORDER BY fb.BookingDate DESC
        """;
        
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, scheduleId);
        ResultSet rs = pstmt.executeQuery();
        
        List<Map<String, Object>> bookings = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> booking = new HashMap<>();
            booking.put("bookingId", rs.getInt("BookingID"));
            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
            booking.put("userId", rs.getInt("UserID"));
            booking.put("userName", rs.getString("UserName"));
            booking.put("userEmail", rs.getString("EmailId"));
            booking.put("seatCategory", rs.getString("SeatCategory"));
            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
            booking.put("totalAmount", rs.getInt("TotalAmount"));
            booking.put("baseFare", rs.getInt("BaseFare"));
            booking.put("discountAmount", rs.getInt("DiscountAmount"));
            booking.put("refundAmount", rs.getInt("RefundAmount"));
            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
            booking.put("bookingStatus", rs.getString("BookingStatus"));
            booking.put("bookingDate", rs.getDate("BookingDate"));
            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
            
            // These might not exist in your FlightSchedule table
            booking.put("departureTime", getStringSafely(rs, "DepartureTime", "N/A"));
            booking.put("arrivalTime", getStringSafely(rs, "ArrivalTime", "N/A"));
            
            booking.put("origin", rs.getString("Origin"));
            booking.put("destination", rs.getString("Destination"));
            booking.put("flightNumber", rs.getInt("FlightID"));
            booking.put("carrierName", rs.getString("CarrierName"));
            bookings.add(booking);
        }
        
        conn.close();
        System.out.println("DAO: Found " + bookings.size() + " bookings for schedule " + scheduleId);
        return bookings;
    }

    public static List<Map<String, Object>> getBookingsByFlight(int flightId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = """
            SELECT fb.BookingID, fb.FlightScheduleID, fb.UserID, fb.SeatCategory, 
                   fb.NumberOfTickets, fb.TotalAmount, fb.BaseFare, fb.DiscountAmount,
                   fb.RefundAmount, fb.PassengerDetailsJson, fb.BookingStatus, fb.BookingDate,
                   fs.DateOfTravel,
                   f.Origin, f.Destination, f.FlightID,
                   c.CarrierName, u.UserName, u.EmailId
            FROM FlightBooking fb
            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
            JOIN Flight f ON fs.FlightID = f.FlightID
            JOIN Carrier c ON f.CarrierID = c.CarrierID
            LEFT JOIN Users u ON fb.UserID = u.UserID
            WHERE f.FlightID = ?
            ORDER BY fb.BookingDate DESC
        """;
        
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, flightId);
        ResultSet rs = pstmt.executeQuery();
        
        List<Map<String, Object>> bookings = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> booking = new HashMap<>();
            booking.put("bookingId", rs.getInt("BookingID"));
            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
            booking.put("userId", rs.getInt("UserID"));
            booking.put("userName", rs.getString("UserName"));
            booking.put("userEmail", rs.getString("EmailId"));
            booking.put("seatCategory", rs.getString("SeatCategory"));
            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
            booking.put("totalAmount", rs.getInt("TotalAmount"));
            booking.put("baseFare", rs.getInt("BaseFare"));
            booking.put("discountAmount", rs.getInt("DiscountAmount"));
            booking.put("refundAmount", rs.getInt("RefundAmount"));
            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
            booking.put("bookingStatus", rs.getString("BookingStatus"));
            booking.put("bookingDate", rs.getDate("BookingDate"));
            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
            booking.put("departureTime", getStringSafely(rs, "DepartureTime", "N/A"));
            booking.put("arrivalTime", getStringSafely(rs, "ArrivalTime", "N/A"));
            booking.put("origin", rs.getString("Origin"));
            booking.put("destination", rs.getString("Destination"));
            booking.put("flightNumber", rs.getInt("FlightID"));
            booking.put("carrierName", rs.getString("CarrierName"));
            bookings.add(booking);
        }
        
        conn.close();
        return bookings;
    }

    public static List<Map<String, Object>> getBookingsByCarrier(int carrierId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = """
            SELECT fb.BookingID, fb.FlightScheduleID, fb.UserID, fb.SeatCategory, 
                   fb.NumberOfTickets, fb.TotalAmount, fb.BaseFare, fb.DiscountAmount,
                   fb.RefundAmount, fb.PassengerDetailsJson, fb.BookingStatus, fb.BookingDate,
                   fs.DateOfTravel,
                   f.Origin, f.Destination, f.FlightID,
                   c.CarrierName, u.UserName, u.EmailId
            FROM FlightBooking fb
            JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID
            JOIN Flight f ON fs.FlightID = f.FlightID
            JOIN Carrier c ON f.CarrierID = c.CarrierID
            LEFT JOIN Users u ON fb.UserID = u.UserID
            WHERE c.CarrierID = ?
            ORDER BY fb.BookingDate DESC
        """;
        
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, carrierId);
        ResultSet rs = pstmt.executeQuery();
        
        List<Map<String, Object>> bookings = new ArrayList<>();
        while (rs.next()) {
            Map<String, Object> booking = new HashMap<>();
            booking.put("bookingId", rs.getInt("BookingID"));
            booking.put("flightScheduleId", rs.getInt("FlightScheduleID"));
            booking.put("userId", rs.getInt("UserID"));
            booking.put("userName", rs.getString("UserName"));
            booking.put("userEmail", rs.getString("EmailId"));
            booking.put("seatCategory", rs.getString("SeatCategory"));
            booking.put("numberOfTickets", rs.getInt("NumberOfTickets"));
            booking.put("totalAmount", rs.getInt("TotalAmount"));
            booking.put("baseFare", rs.getInt("BaseFare"));
            booking.put("discountAmount", rs.getInt("DiscountAmount"));
            booking.put("refundAmount", rs.getInt("RefundAmount"));
            booking.put("passengerDetailsJson", rs.getString("PassengerDetailsJson"));
            booking.put("bookingStatus", rs.getString("BookingStatus"));
            booking.put("bookingDate", rs.getDate("BookingDate"));
            booking.put("dateOfTravel", rs.getDate("DateOfTravel"));
            booking.put("departureTime", getStringSafely(rs, "DepartureTime", "N/A"));
            booking.put("arrivalTime", getStringSafely(rs, "ArrivalTime", "N/A"));
            booking.put("origin", rs.getString("Origin"));
            booking.put("destination", rs.getString("Destination"));
            booking.put("flightNumber", rs.getInt("FlightID"));
            booking.put("carrierName", rs.getString("CarrierName"));
            bookings.add(booking);
        }
        
        conn.close();
        return bookings;
    }
    
    // Helper method to safely get string values
    private static String getStringSafely(ResultSet rs, String columnName, String defaultValue) {
        try {
            String value = rs.getString(columnName);
            return value != null ? value : defaultValue;
        } catch (SQLException e) {
            return defaultValue;
        }
    }
    
    // Helper method to safely get integer values
    private static int getIntSafely(ResultSet rs, String columnName, int defaultValue) {
        try {
            return rs.getInt(columnName);
        } catch (SQLException e) {
            return defaultValue;
        }
    }
}
