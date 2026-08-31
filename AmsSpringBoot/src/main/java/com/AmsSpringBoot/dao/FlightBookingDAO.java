//package com.AmsSpringBoot.dao;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.util.DBUtil;
//
//import com.AmsSpringBoot.bean.Carrier;
//import java.sql.*;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.TimeUnit;
//
//public class FlightBookingDAO {
//
//	public static boolean bookFlight(FlightBooking booking) throws SQLException {
//	    Connection conn = DBUtil.createConnection();
//	    conn.setAutoCommit(false);
//	    try {
//	        // Insert booking
//	        String sql = "INSERT INTO FlightBooking (FlightScheduleID, UserID, SeatCategory, NumberOfTickets, TotalAmount, PassengerDetailsJson, BookingStatus) " +
//	                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
//	        PreparedStatement pstmt = conn.prepareStatement(sql);
//	        pstmt.setInt(1, booking.getFlightScheduleId());
//	        pstmt.setInt(2, booking.getUserId());
//	        pstmt.setString(3, booking.getSeatCategory());
//	        pstmt.setInt(4, booking.getNumberOfTickets());
//	        pstmt.setInt(5, booking.getTotalAmount());
//	        pstmt.setString(6, booking.getPassengerDetailsJson());
//	        pstmt.setString(7, "booked");
//	        int rows1 = pstmt.executeUpdate();
//
//	        // Update FlightSchedule seat count
//	        String updateSql = "UPDATE FlightSchedule SET " +
//	                (booking.getSeatCategory().equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
//	                 booking.getSeatCategory().equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
//	                 "ExecutiveClassBookedCount") + " = " +
//	                (booking.getSeatCategory().equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
//	                 booking.getSeatCategory().equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
//	                 "ExecutiveClassBookedCount") + " + ? " +
//	                "WHERE FlightScheduleID = ?";
//	        PreparedStatement updateStmt = conn.prepareStatement(updateSql);
//	        updateStmt.setInt(1, booking.getNumberOfTickets());
//	        updateStmt.setInt(2, booking.getFlightScheduleId());
//	        int rows2 = updateStmt.executeUpdate();
//
//	        if (rows1 > 0 && rows2 > 0) {
//	            conn.commit();
//	            return true;
//	        } else {
//	            conn.rollback();
//	            return false;
//	        }
//	    } finally {
//	        conn.setAutoCommit(true);
//	        conn.close();
//	    }
//	}
//
////	public static boolean cancelBooking(int bookingId) throws SQLException {
////	    Connection conn = DBUtil.createConnection();
////	    conn.setAutoCommit(false);
////	    try {
////	        // Get booking info
////	        String fetchSql = "SELECT * FROM FlightBooking WHERE BookingID = ?";
////	        PreparedStatement fetchStmt = conn.prepareStatement(fetchSql);
////	        fetchStmt.setInt(1, bookingId);
////	        ResultSet rs = fetchStmt.executeQuery();
////
////	        if (!rs.next()) return false;
////
////	        int scheduleId = rs.getInt("FlightScheduleID");
////	        String category = rs.getString("SeatCategory");
////	        int tickets = rs.getInt("NumberOfTickets");
////
////	        // Mark booking cancelled
////	        String cancelSql = "UPDATE FlightBooking SET BookingStatus = 'cancelled' WHERE BookingID = ?";
////	        PreparedStatement cancelStmt = conn.prepareStatement(cancelSql);
////	        cancelStmt.setInt(1, bookingId);
////	        int rows1 = cancelStmt.executeUpdate();
////
////	        // Decrease booked count
////	        String updateSql = "UPDATE FlightSchedule SET " +
////	                (category.equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
////	                 category.equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
////	                 "ExecutiveClassBookedCount") + " = " +
////	                (category.equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
////	                 category.equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
////	                 "ExecutiveClassBookedCount") + " - ? " +
////	                "WHERE FlightScheduleID = ?";
////	        PreparedStatement updateStmt = conn.prepareStatement(updateSql);
////	        updateStmt.setInt(1, tickets);
////	        updateStmt.setInt(2, scheduleId);
////	        int rows2 = updateStmt.executeUpdate();
////
////	        if (rows1 > 0 && rows2 > 0) {
////	            conn.commit();
////	            return true;
////	        } else {
////	            conn.rollback();
////	            return false;
////	        }
////	    } finally {
////	        conn.setAutoCommit(true);
////	        conn.close();
////	    }
////	}
//
//
//    public static List<FlightBooking> getAllBookings() throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking";
//        Statement stmt = conn.createStatement();
//        ResultSet rs = stmt.executeQuery(sql);
//
//        List<FlightBooking> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightBooking b = new FlightBooking();
//            b.setBookingId(rs.getInt("BookingID"));
//            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            b.setUserId(rs.getInt("UserID"));
//            b.setSeatCategory(rs.getString("SeatCategory"));
//            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            b.setTotalAmount(rs.getInt("TotalAmount"));
//            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            b.setBookingStatus(rs.getString("BookingStatus"));
//            list.add(b);
//        }
//        conn.close();
//        return list;
//    }
//    
//    public static List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking WHERE UserID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, userId);
//        ResultSet rs = pstmt.executeQuery();
//
//        List<FlightBooking> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightBooking b = new FlightBooking();
//            b.setBookingId(rs.getInt("BookingID"));
//            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            b.setUserId(rs.getInt("UserID"));
//            b.setSeatCategory(rs.getString("SeatCategory"));
//            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            b.setTotalAmount(rs.getInt("TotalAmount"));
//            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            b.setBookingStatus(rs.getString("BookingStatus"));
//            list.add(b);
//        }
//        conn.close();
//        return list;
//    }
//    
//    
//    
//    public static boolean cancelBooking(int bookingId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        conn.setAutoCommit(false);
//        try {
//            // Get booking info
//            String fetchSql = "SELECT fb.*, fs.flightId FROM FlightBooking fb " +
//                             "JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID " +
//                             "WHERE fb.BookingID = ?";
//            PreparedStatement fetchStmt = conn.prepareStatement(fetchSql);
//            fetchStmt.setInt(1, bookingId);
//            ResultSet rs = fetchStmt.executeQuery();
//
//            if (!rs.next()) return false;
//
//            int scheduleId = rs.getInt("FlightScheduleID");
//            String category = rs.getString("SeatCategory");
//            int tickets = rs.getInt("NumberOfTickets");
//            int totalAmount = rs.getInt("TotalAmount");
//            int flightId = rs.getInt("flightId");
//            java.sql.Date travelDate = rs.getDate("DateOfTravel");
//            java.sql.Date bookingDate = rs.getDate("BookingDate");
//
//            // Get carrier for refund policy
//            Carrier carrier = CarrierDAO.getCarrierById(flightId);
//            if (carrier == null) return false;
//
//            // Calculate days difference
//            long currentTime = System.currentTimeMillis();
//            long travelTime = travelDate.getTime();
//            long diffInMillies = Math.abs(travelTime - currentTime);
//            long daysDifference = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
//
//            // Calculate refund amount
//            int refundPercentage = 0;
//            if (daysDifference >= 20) {
//                refundPercentage = carrier.getRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate();
//            } else if (daysDifference >= 10) {
//                refundPercentage = carrier.getRefundPercentageForTicketCancellation10DaysBeforeTravelDate();
//            } else if (daysDifference >= 2) {
//                refundPercentage = carrier.getRefundPercentageForTicketCancellation2DaysBeforeTravelDate();
//            }
//
//            int refundAmount = (totalAmount * refundPercentage) / 100;
//
//            // Mark booking cancelled and set refund amount
//            String cancelSql = "UPDATE FlightBooking SET BookingStatus = 'cancelled', RefundAmount = ? WHERE BookingID = ?";
//            PreparedStatement cancelStmt = conn.prepareStatement(cancelSql);
//            cancelStmt.setInt(1, refundAmount);
//            cancelStmt.setInt(2, bookingId);
//            int rows1 = cancelStmt.executeUpdate();
//
//            // Decrease booked count
//            String updateSql = "UPDATE FlightSchedule SET " +
//                    (category.equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
//                     category.equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
//                     "ExecutiveClassBookedCount") + " = " +
//                    (category.equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
//                     category.equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
//                     "ExecutiveClassBookedCount") + " - ? " +
//                    "WHERE FlightScheduleID = ?";
//            PreparedStatement updateStmt = conn.prepareStatement(updateSql);
//            updateStmt.setInt(1, tickets);
//            updateStmt.setInt(2, scheduleId);
//            int rows2 = updateStmt.executeUpdate();
//
//            if (rows1 > 0 && rows2 > 0) {
//                conn.commit();
//                return true;
//            } else {
//                conn.rollback();
//                return false;
//            }
//        } finally {
//            conn.setAutoCommit(true);
//            conn.close();
//        }
//    }
//}



//package com.AmsSpringBoot.dao;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.util.DBUtil;
//
//import java.sql.*;
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class FlightBookingDAO {
//
//    public static Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
//                                                               int numberOfTickets, String travelDate) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        Map<String, Object> result = new HashMap<>();
//        
//        try {
//            String sql = "SELECT fs.*, c.* " +
//                        "FROM FlightSchedule fs " +
//                        "JOIN Flight f ON fs.FlightID = f.FlightID " +
//                        "JOIN Carrier c ON f.CarrierID = c.CarrierID " +
//                        "WHERE fs.FlightScheduleID = ?";
//            
//            PreparedStatement pstmt = conn.prepareStatement(sql);
//            pstmt.setInt(1, scheduleId);
//            ResultSet rs = pstmt.executeQuery();
//            
//            if (rs.next()) {
//                int baseFarePerTicket = 0;
//                switch (seatCategory.toLowerCase()) {
//                    case "economy":
//                        baseFarePerTicket = rs.getInt("EconomyClassFare");
//                        break;
//                    case "business":
//                        baseFarePerTicket = rs.getInt("BusinessClassFare");
//                        break;
//                    case "executive":
//                        baseFarePerTicket = rs.getInt("ExecutiveClassFare");
//                        break;
//                }
//                
//                int baseFare = baseFarePerTicket * numberOfTickets;
//                
//                // Calculate days until travel
//                LocalDate travelDateParsed = LocalDate.parse(travelDate);
//                LocalDate currentDate = LocalDate.now();
//                long daysUntilTravel = ChronoUnit.DAYS.between(currentDate, travelDateParsed);
//                
//                // Get discount percentage
//                int discountPercentage = 0;
//                if (daysUntilTravel >= 90) {
//                    discountPercentage = rs.getInt("DiscountPercentageNinteyDaysAdvanceBooking");
//                } else if (daysUntilTravel >= 60) {
//                    discountPercentage = rs.getInt("DiscountPercentageSixtyDaysAdvanceBooking");
//                } else if (daysUntilTravel >= 30) {
//                    discountPercentage = rs.getInt("DiscountPercentageThirtyDaysAdvanceBooking");
//                }
//                
//                int discountAmount = (baseFare * discountPercentage) / 100;
//                int totalAmount = baseFare - discountAmount;
//                
//                result.put("baseFare", baseFare);
//                result.put("discountPercentage", discountPercentage);
//                result.put("discountAmount", discountAmount);
//                result.put("totalAmount", totalAmount);
//                result.put("daysUntilTravel", daysUntilTravel);
//            }
//        } finally {
//            conn.close();
//        }
//        
//        return result;
//    }
//
//    public static int bookFlight(FlightBooking booking) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        conn.setAutoCommit(false);
//        int generatedBookingId = 0;
//        
//        try {
//            String sql = "INSERT INTO FlightBooking " +
//                        "(FlightScheduleID, UserID, SeatCategory, NumberOfTickets, TotalAmount, " +
//                        "BaseFare, DiscountAmount, PassengerDetailsJson, BookingStatus) " +
//                        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//            
//            PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
//            pstmt.setInt(1, booking.getFlightScheduleId());
//            pstmt.setInt(2, booking.getUserId());
//            pstmt.setString(3, booking.getSeatCategory());
//            pstmt.setInt(4, booking.getNumberOfTickets());
//            pstmt.setInt(5, booking.getTotalAmount());
//            pstmt.setInt(6, booking.getBaseFare());
//            pstmt.setInt(7, booking.getDiscountAmount());
//            pstmt.setString(8, booking.getPassengerDetailsJson());
//            pstmt.setString(9, "booked");
//            
//            int rows1 = pstmt.executeUpdate();
//            
//            ResultSet generatedKeys = pstmt.getGeneratedKeys();
//            if (generatedKeys.next()) {
//                generatedBookingId = generatedKeys.getInt(1);
//            }
//            
//            // Update seat count
//            String updateSql = "UPDATE FlightSchedule SET " +
//                    (booking.getSeatCategory().equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
//                     booking.getSeatCategory().equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
//                     "ExecutiveClassBookedCount") + " = " +
//                    (booking.getSeatCategory().equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
//                     booking.getSeatCategory().equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
//                     "ExecutiveClassBookedCount") + " + ? " +
//                    "WHERE FlightScheduleID = ?";
//            
//            PreparedStatement updateStmt = conn.prepareStatement(updateSql);
//            updateStmt.setInt(1, booking.getNumberOfTickets());
//            updateStmt.setInt(2, booking.getFlightScheduleId());
//            int rows2 = updateStmt.executeUpdate();
//
//            if (rows1 > 0 && rows2 > 0) {
//                conn.commit();
//                return generatedBookingId;
//            } else {
//                conn.rollback();
//                return 0;
//            }
//        } finally {
//            conn.setAutoCommit(true);
//            conn.close();
//        }
//    }
//
//    public static FlightBooking getBookingById(int bookingId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking WHERE BookingID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, bookingId);
//        ResultSet rs = pstmt.executeQuery();
//
//        FlightBooking booking = null;
//        if (rs.next()) {
//            booking = new FlightBooking();
//            booking.setBookingId(rs.getInt("BookingID"));
//            booking.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            booking.setUserId(rs.getInt("UserID"));
//            booking.setSeatCategory(rs.getString("SeatCategory"));
//            booking.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            booking.setTotalAmount(rs.getInt("TotalAmount"));
//            booking.setBaseFare(rs.getInt("BaseFare"));
//            booking.setDiscountAmount(rs.getInt("DiscountAmount"));
//            booking.setRefundAmount(rs.getInt("RefundAmount"));
//            booking.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            booking.setBookingStatus(rs.getString("BookingStatus"));
//        }
//        conn.close();
//        return booking;
//    }
//
//    // Include your existing methods (getAllBookings, getBookingsByUserId, cancelBooking, etc.)
//    public static List<FlightBooking> getAllBookings() throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking";
//        Statement stmt = conn.createStatement();
//        ResultSet rs = stmt.executeQuery(sql);
//
//        List<FlightBooking> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightBooking b = new FlightBooking();
//            b.setBookingId(rs.getInt("BookingID"));
//            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            b.setUserId(rs.getInt("UserID"));
//            b.setSeatCategory(rs.getString("SeatCategory"));
//            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            b.setTotalAmount(rs.getInt("TotalAmount"));
//            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            b.setBookingStatus(rs.getString("BookingStatus"));
//            list.add(b);
//        }
//        conn.close();
//        return list;
//    }
//    
//    public static List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking WHERE UserID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, userId);
//        ResultSet rs = pstmt.executeQuery();
//
//        List<FlightBooking> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightBooking b = new FlightBooking();
//            b.setBookingId(rs.getInt("BookingID"));
//            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            b.setUserId(rs.getInt("UserID"));
//            b.setSeatCategory(rs.getString("SeatCategory"));
//            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            b.setTotalAmount(rs.getInt("TotalAmount"));
//            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            b.setBookingStatus(rs.getString("BookingStatus"));
//            list.add(b);
//        }
//        conn.close();
//        return list;
//    }
//
//    public static Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
//        // Implementation for cancel with refund calculation
//        Map<String, Object> result = new HashMap<>();
//        result.put("success", true);
//        result.put("message", "Booking cancelled successfully");
//        result.put("refundAmount", 0);
//        return result;
//    }
//
//    public static boolean cancelBooking(int bookingId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "UPDATE FlightBooking SET BookingStatus = 'cancelled' WHERE BookingID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, bookingId);
//        int result = pstmt.executeUpdate();
//        conn.close();
//        return result > 0;
//    }
//}




//package com.AmsSpringBoot.dao;
//
//import com.AmsSpringBoot.bean.FlightBooking;
//import com.AmsSpringBoot.util.DBUtil;
//
//import java.sql.*;
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class FlightBookingDAO {
//
//    public static int bookFlight(FlightBooking booking) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        conn.setAutoCommit(false);
//        int generatedBookingId = 0;
//        
//        try {
//            // First check if flight schedule exists and has available seats
//            String checkSql = "SELECT * FROM FlightSchedule WHERE FlightScheduleID = ?";
//            PreparedStatement checkStmt = conn.prepareStatement(checkSql);
//            checkStmt.setInt(1, booking.getFlightScheduleId());
//            ResultSet scheduleRs = checkStmt.executeQuery();
//            
//            if (!scheduleRs.next()) {
//                throw new SQLException("Flight schedule not found");
//            }
//            
//            // Check seat availability
//            String seatCategory = booking.getSeatCategory().toLowerCase();
//            int bookedCount = 0;
//            int totalSeats = 100; // Assume 100 seats per category
//            
//            switch (seatCategory) {
//                case "economy":
//                    bookedCount = scheduleRs.getInt("EconomyClassBookedCount");
//                    break;
//                case "business":
//                    bookedCount = scheduleRs.getInt("BusinessClassBookedCount");
//                    break;
//                case "executive":
//                    bookedCount = scheduleRs.getInt("ExecutiveClassBookedCount");
//                    break;
//            }
//            
//            if (bookedCount + booking.getNumberOfTickets() > totalSeats) {
//                throw new SQLException("Not enough seats available");
//            }
//            
//            // Insert booking with all required fields
//            String insertSql = "INSERT INTO FlightBooking " +
//                    "(FlightScheduleID, UserID, SeatCategory, NumberOfTickets, TotalAmount, " +
//                    "BaseFare, DiscountAmount, RefundAmount, PassengerDetailsJson, BookingStatus, BookingDate) " +
//                    "VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, 'booked', CURRENT_DATE)";
//            
//            PreparedStatement pstmt = conn.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS);
//            pstmt.setInt(1, booking.getFlightScheduleId());
//            pstmt.setInt(2, booking.getUserId());
//            pstmt.setString(3, booking.getSeatCategory());
//            pstmt.setInt(4, booking.getNumberOfTickets());
//            pstmt.setInt(5, booking.getTotalAmount());
//            pstmt.setInt(6, booking.getBaseFare() > 0 ? booking.getBaseFare() : booking.getTotalAmount());
//            pstmt.setInt(7, booking.getDiscountAmount());
//            pstmt.setString(8, booking.getPassengerDetailsJson());
//            
//            System.out.println("Executing booking insert for user: " + booking.getUserId());
//            int rows1 = pstmt.executeUpdate();
//            
//            if (rows1 > 0) {
//                ResultSet generatedKeys = pstmt.getGeneratedKeys();
//                if (generatedKeys.next()) {
//                    generatedBookingId = generatedKeys.getInt(1);
//                    System.out.println("Generated booking ID: " + generatedBookingId);
//                }
//            }
//            
//            // Update seat count
//            String updateColumn = seatCategory.equals("economy") ? "EconomyClassBookedCount" :
//                                seatCategory.equals("business") ? "BusinessClassBookedCount" :
//                                "ExecutiveClassBookedCount";
//            
//            String updateSql = "UPDATE FlightSchedule SET " + updateColumn + " = " + updateColumn + " + ? WHERE FlightScheduleID = ?";
//            PreparedStatement updateStmt = conn.prepareStatement(updateSql);
//            updateStmt.setInt(1, booking.getNumberOfTickets());
//            updateStmt.setInt(2, booking.getFlightScheduleId());
//            int rows2 = updateStmt.executeUpdate();
//            
//            System.out.println("Booking insert rows: " + rows1 + ", Seat update rows: " + rows2);
//            
//            if (rows1 > 0 && rows2 > 0) {
//                conn.commit();
//                System.out.println("Booking committed successfully with ID: " + generatedBookingId);
//                return generatedBookingId;
//            } else {
//                conn.rollback();
//                System.out.println("Booking rolled back");
//                return 0;
//            }
//        } catch (SQLException e) {
//            conn.rollback();
//            System.err.println("Booking failed: " + e.getMessage());
//            e.printStackTrace();
//            throw e;
//        } finally {
//            conn.setAutoCommit(true);
//            conn.close();
//        }
//    }
//    
//    public static Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
//                                                               int numberOfTickets, String travelDate) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        Map<String, Object> result = new HashMap<>();
//        
//        try {
//            String sql = "SELECT fs.*, c.* FROM FlightSchedule fs " +
//                        "JOIN Flight f ON fs.FlightID = f.FlightID " +
//                        "JOIN Carrier c ON f.CarrierID = c.CarrierID " +
//                        "WHERE fs.FlightScheduleID = ?";
//            
//            PreparedStatement pstmt = conn.prepareStatement(sql);
//            pstmt.setInt(1, scheduleId);
//            ResultSet rs = pstmt.executeQuery();
//            
//            if (rs.next()) {
//                int baseFarePerTicket = 0;
//                switch (seatCategory.toLowerCase()) {
//                    case "economy":
//                        baseFarePerTicket = rs.getInt("EconomyClassFare");
//                        break;
//                    case "business":
//                        baseFarePerTicket = rs.getInt("BusinessClassFare");
//                        break;
//                    case "executive":
//                        baseFarePerTicket = rs.getInt("ExecutiveClassFare");
//                        break;
//                    default:
//                        baseFarePerTicket = rs.getInt("EconomyClassFare");
//                }
//                
//                int baseFare = baseFarePerTicket * numberOfTickets;
//                
//                // Calculate days until travel
//                LocalDate travelDateParsed = LocalDate.parse(travelDate);
//                LocalDate currentDate = LocalDate.now();
//                long daysUntilTravel = ChronoUnit.DAYS.between(currentDate, travelDateParsed);
//                
//                // Get discount percentage
//                int discountPercentage = 0;
//                if (daysUntilTravel >= 90) {
//                    discountPercentage = rs.getInt("DiscountPercentageNinteyDaysAdvanceBooking");
//                } else if (daysUntilTravel >= 60) {
//                    discountPercentage = rs.getInt("DiscountPercentageSixtyDaysAdvanceBooking");
//                } else if (daysUntilTravel >= 30) {
//                    discountPercentage = rs.getInt("DiscountPercentageThirtyDaysAdvanceBooking");
//                }
//                
//                int discountAmount = (baseFare * discountPercentage) / 100;
//                int totalAmount = baseFare - discountAmount;
//                
//                result.put("baseFare", baseFare);
//                result.put("discountPercentage", discountPercentage);
//                result.put("discountAmount", discountAmount);
//                result.put("totalAmount", totalAmount);
//                result.put("daysUntilTravel", daysUntilTravel);
//            } else {
//                // Default values if no carrier found
//                int baseFare = 3500 * numberOfTickets;
//                result.put("baseFare", baseFare);
//                result.put("discountPercentage", 0);
//                result.put("discountAmount", 0);
//                result.put("totalAmount", baseFare);
//                result.put("daysUntilTravel", 0);
//            }
//        } finally {
//            conn.close();
//        }
//        
//        return result;
//    }
//
//    public static FlightBooking getBookingById(int bookingId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking WHERE BookingID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, bookingId);
//        ResultSet rs = pstmt.executeQuery();
//
//        FlightBooking booking = null;
//        if (rs.next()) {
//            booking = new FlightBooking();
//            booking.setBookingId(rs.getInt("BookingID"));
//            booking.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            booking.setUserId(rs.getInt("UserID"));
//            booking.setSeatCategory(rs.getString("SeatCategory"));
//            booking.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            booking.setTotalAmount(rs.getInt("TotalAmount"));
//            
//            // Handle potentially null columns
//            try {
//                booking.setBaseFare(rs.getInt("BaseFare"));
//                booking.setDiscountAmount(rs.getInt("DiscountAmount"));
//                booking.setRefundAmount(rs.getInt("RefundAmount"));
//            } catch (SQLException e) {
//                // Set defaults if columns don't exist
//                booking.setBaseFare(booking.getTotalAmount());
//                booking.setDiscountAmount(0);
//                booking.setRefundAmount(0);
//            }
//            
//            booking.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            booking.setBookingStatus(rs.getString("BookingStatus"));
//            
//            try {
//                if (rs.getDate("BookingDate") != null) {
//                    booking.setBookingDate(rs.getDate("BookingDate").toString());
//                }
//            } catch (SQLException e) {
//                booking.setBookingDate(LocalDate.now().toString());
//            }
//        }
//        conn.close();
//        return booking;
//    }
//
//    // Keep your existing methods
//    public static List<FlightBooking> getAllBookings() throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking";
//        Statement stmt = conn.createStatement();
//        ResultSet rs = stmt.executeQuery(sql);
//
//        List<FlightBooking> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightBooking b = new FlightBooking();
//            b.setBookingId(rs.getInt("BookingID"));
//            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            b.setUserId(rs.getInt("UserID"));
//            b.setSeatCategory(rs.getString("SeatCategory"));
//            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            b.setTotalAmount(rs.getInt("TotalAmount"));
//            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            b.setBookingStatus(rs.getString("BookingStatus"));
//            list.add(b);
//        }
//        conn.close();
//        return list;
//    }
//    
//    public static List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightBooking WHERE UserID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, userId);
//        ResultSet rs = pstmt.executeQuery();
//
//        List<FlightBooking> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightBooking b = new FlightBooking();
//            b.setBookingId(rs.getInt("BookingID"));
//            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            b.setUserId(rs.getInt("UserID"));
//            b.setSeatCategory(rs.getString("SeatCategory"));
//            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
//            b.setTotalAmount(rs.getInt("TotalAmount"));
//            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
//            b.setBookingStatus(rs.getString("BookingStatus"));
//            list.add(b);
//        }
//        conn.close();
//        return list;
//    }
//
//    public static boolean cancelBooking(int bookingId) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "UPDATE FlightBooking SET BookingStatus = 'cancelled' WHERE BookingID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, bookingId);
//        int result = pstmt.executeUpdate();
//        conn.close();
//        return result > 0;
//    }
//
//    public static Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
//        Map<String, Object> result = new HashMap<>();
//        result.put("success", true);
//        result.put("message", "Booking cancelled successfully");
//        result.put("refundAmount", 0);
//        return result;
//    }
//}
//



package com.AmsSpringBoot.dao;

import com.AmsSpringBoot.bean.FlightBooking;
import com.AmsSpringBoot.util.DBUtil;

import java.sql.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FlightBookingDAO {

    public static int bookFlight(FlightBooking booking) throws SQLException {
        Connection conn = DBUtil.createConnection();
        conn.setAutoCommit(false);
        int generatedBookingId = 0;
        
        try {
            String sql = "INSERT INTO FlightBooking " +
                    "(FlightScheduleID, UserID, SeatCategory, NumberOfTickets, TotalAmount, " +
                    "BaseFare, DiscountAmount, PassengerDetailsJson, BookingStatus) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'booked')";
            
            PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pstmt.setInt(1, booking.getFlightScheduleId());
            pstmt.setInt(2, booking.getUserId());
            pstmt.setString(3, booking.getSeatCategory());
            pstmt.setInt(4, booking.getNumberOfTickets());
            pstmt.setInt(5, booking.getTotalAmount());
            pstmt.setInt(6, booking.getBaseFare());
            pstmt.setInt(7, booking.getDiscountAmount());
            pstmt.setString(8, booking.getPassengerDetailsJson());
            
            int rows1 = pstmt.executeUpdate();
            
            if (rows1 > 0) {
                ResultSet generatedKeys = pstmt.getGeneratedKeys();
                if (generatedKeys.next()) {
                    generatedBookingId = generatedKeys.getInt(1);
                }
            }
            
            // Update seat count
            String seatColumn = booking.getSeatCategory().equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
                               booking.getSeatCategory().equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
                               "ExecutiveClassBookedCount";
            
            String updateSql = "UPDATE FlightSchedule SET " + seatColumn + " = " + seatColumn + " + ? WHERE FlightScheduleID = ?";
            PreparedStatement updateStmt = conn.prepareStatement(updateSql);
            updateStmt.setInt(1, booking.getNumberOfTickets());
            updateStmt.setInt(2, booking.getFlightScheduleId());
            int rows2 = updateStmt.executeUpdate();

            if (rows1 > 0 && rows2 > 0) {
                conn.commit();
                return generatedBookingId;
            } else {
                conn.rollback();
                return 0;
            }
        } finally {
            conn.setAutoCommit(true);
            conn.close();
        }
    }

    public static Map<String, Object> calculatePriceWithDiscount(int scheduleId, String seatCategory, 
                                                               int numberOfTickets, String travelDate) throws SQLException {
        Connection conn = DBUtil.createConnection();
        Map<String, Object> result = new HashMap<>();
        
        try {
            String sql = "SELECT fs.*, c.* FROM FlightSchedule fs " +
                        "JOIN Flight f ON fs.FlightID = f.FlightID " +
                        "JOIN Carrier c ON f.CarrierID = c.CarrierID " +
                        "WHERE fs.FlightScheduleID = ?";
            
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, scheduleId);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                int baseFarePerTicket = 0;
                switch (seatCategory.toLowerCase()) {
                    case "economy":
                        baseFarePerTicket = rs.getInt("EconomyClassFare");
                        break;
                    case "business":
                        baseFarePerTicket = rs.getInt("BusinessClassFare");
                        break;
                    case "executive":
                        baseFarePerTicket = rs.getInt("ExecutiveClassFare");
                        break;
                }
                
                int baseFare = baseFarePerTicket * numberOfTickets;
                
                // Calculate days until travel
                LocalDate travelDateParsed = LocalDate.parse(travelDate);
                LocalDate currentDate = LocalDate.now();
                long daysUntilTravel = ChronoUnit.DAYS.between(currentDate, travelDateParsed);
                
                // Get discount percentage
                int discountPercentage = 0;
                if (daysUntilTravel >= 90) {
                    discountPercentage = rs.getInt("DiscountPercentageNinteyDaysAdvanceBooking");
                } else if (daysUntilTravel >= 60) {
                    discountPercentage = rs.getInt("DiscountPercentageSixtyDaysAdvanceBooking");
                } else if (daysUntilTravel >= 30) {
                    discountPercentage = rs.getInt("DiscountPercentageThirtyDaysAdvanceBooking");
                }
                
                int discountAmount = (baseFare * discountPercentage) / 100;
                int totalAmount = baseFare - discountAmount;
                
                result.put("baseFare", baseFare);
                result.put("discountPercentage", discountPercentage);
                result.put("discountAmount", discountAmount);
                result.put("totalAmount", totalAmount);
                result.put("daysUntilTravel", daysUntilTravel);
            } else {
                // Default if no data found
                int baseFare = 3500 * numberOfTickets;
                result.put("baseFare", baseFare);
                result.put("discountPercentage", 0);
                result.put("discountAmount", 0);
                result.put("totalAmount", baseFare);
                result.put("daysUntilTravel", 0);
            }
        } finally {
            conn.close();
        }
        
        return result;
    }

    public static Map<String, Object> cancelBookingWithRefund(int bookingId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        conn.setAutoCommit(false);
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Get booking and carrier details
            String fetchSql = "SELECT fb.*, fs.DateOfTravel, c.* " +
                    "FROM FlightBooking fb " +
                    "JOIN FlightSchedule fs ON fb.FlightScheduleID = fs.FlightScheduleID " +
                    "JOIN Flight f ON fs.FlightID = f.FlightID " +
                    "JOIN Carrier c ON f.CarrierID = c.CarrierID " +
                    "WHERE fb.BookingID = ? AND fb.BookingStatus = 'booked'";
            
            PreparedStatement fetchStmt = conn.prepareStatement(fetchSql);
            fetchStmt.setInt(1, bookingId);
            ResultSet rs = fetchStmt.executeQuery();

            if (!rs.next()) {
                result.put("success", false);
                result.put("message", "Booking not found or already cancelled");
                return result;
            }

            int scheduleId = rs.getInt("FlightScheduleID");
            String category = rs.getString("SeatCategory");
            int tickets = rs.getInt("NumberOfTickets");
            int totalAmount = rs.getInt("TotalAmount");
            LocalDate travelDate = rs.getDate("DateOfTravel").toLocalDate();
            
            // Calculate days until travel
            long daysUntilTravel = ChronoUnit.DAYS.between(LocalDate.now(), travelDate);
            
            // Calculate refund percentage
            int refundPercentage = 0;
            if (daysUntilTravel >= 20) {
                refundPercentage = rs.getInt("RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate");
            } else if (daysUntilTravel >= 10) {
                refundPercentage = rs.getInt("RefundPercentageForTicketCancellation10DaysBeforeTravelDate");
            } else if (daysUntilTravel >= 2) {
                refundPercentage = rs.getInt("RefundPercentageForTicketCancellation2DaysBeforeTravelDate");
            }
            
            int refundAmount = (totalAmount * refundPercentage) / 100;

            // Update booking status and refund amount
            String cancelSql = "UPDATE FlightBooking SET BookingStatus = 'cancelled', RefundAmount = ? WHERE BookingID = ?";
            PreparedStatement cancelStmt = conn.prepareStatement(cancelSql);
            cancelStmt.setInt(1, refundAmount);
            cancelStmt.setInt(2, bookingId);
            int rows1 = cancelStmt.executeUpdate();

            // Decrease booked count
            String seatColumn = category.equalsIgnoreCase("economy") ? "EconomyClassBookedCount" :
                               category.equalsIgnoreCase("business") ? "BusinessClassBookedCount" :
                               "ExecutiveClassBookedCount";
                               
            String updateSql = "UPDATE FlightSchedule SET " + seatColumn + " = " + seatColumn + " - ? WHERE FlightScheduleID = ?";
            PreparedStatement updateStmt = conn.prepareStatement(updateSql);
            updateStmt.setInt(1, tickets);
            updateStmt.setInt(2, scheduleId);
            int rows2 = updateStmt.executeUpdate();

            if (rows1 > 0 && rows2 > 0) {
                conn.commit();
                result.put("success", true);
                result.put("message", "Booking cancelled successfully");
                result.put("refundAmount", refundAmount);
                result.put("refundPercentage", refundPercentage);
            } else {
                conn.rollback();
                result.put("success", false);
                result.put("message", "Cancellation failed");
            }
        } finally {
            conn.setAutoCommit(true);
            conn.close();
        }
        
        return result;
    }

    public static FlightBooking getBookingById(int bookingId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "SELECT * FROM FlightBooking WHERE BookingID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, bookingId);
        ResultSet rs = pstmt.executeQuery();

        FlightBooking booking = null;
        if (rs.next()) {
            booking = new FlightBooking();
            booking.setBookingId(rs.getInt("BookingID"));
            booking.setFlightScheduleId(rs.getInt("FlightScheduleID"));
            booking.setUserId(rs.getInt("UserID"));
            booking.setSeatCategory(rs.getString("SeatCategory"));
            booking.setNumberOfTickets(rs.getInt("NumberOfTickets"));
            booking.setTotalAmount(rs.getInt("TotalAmount"));
            booking.setBaseFare(rs.getInt("BaseFare"));
            booking.setDiscountAmount(rs.getInt("DiscountAmount"));
            booking.setRefundAmount(rs.getInt("RefundAmount"));
            booking.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
            booking.setBookingStatus(rs.getString("BookingStatus"));
            if (rs.getDate("BookingDate") != null) {
                booking.setBookingDate(rs.getDate("BookingDate").toString());
            }
        }
        conn.close();
        return booking;
    }

    public static List<FlightBooking> getBookingsByUserId(int userId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "SELECT * FROM FlightBooking WHERE UserID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, userId);
        ResultSet rs = pstmt.executeQuery();

        List<FlightBooking> list = new ArrayList<>();
        while (rs.next()) {
            FlightBooking b = new FlightBooking();
            b.setBookingId(rs.getInt("BookingID"));
            b.setFlightScheduleId(rs.getInt("FlightScheduleID"));
            b.setUserId(rs.getInt("UserID"));
            b.setSeatCategory(rs.getString("SeatCategory"));
            b.setNumberOfTickets(rs.getInt("NumberOfTickets"));
            b.setTotalAmount(rs.getInt("TotalAmount"));
            b.setBaseFare(rs.getInt("BaseFare"));
            b.setDiscountAmount(rs.getInt("DiscountAmount"));
            b.setRefundAmount(rs.getInt("RefundAmount"));
            b.setPassengerDetailsJson(rs.getString("PassengerDetailsJson"));
            b.setBookingStatus(rs.getString("BookingStatus"));
            if (rs.getDate("BookingDate") != null) {
                b.setBookingDate(rs.getDate("BookingDate").toString());
            }
            list.add(b);
        }
        conn.close();
        return list;
    }
}
