//// ReportsService.java
//package com.AmsSpringBoot.service;
//
//import com.AmsSpringBoot.dao.ReportsDAO;
//import org.springframework.stereotype.Service;
//
//import java.io.UnsupportedEncodingException;
//import java.sql.SQLException;
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class ReportsService {
//
//    public List<Map<String, Object>> getBookingsByCarrier(int carrierId) throws SQLException {
//        return ReportsDAO.getBookingsByCarrier(carrierId);
//    }
//
//    public List<Map<String, Object>> getBookingsByFlight(int flightId) throws SQLException {
//        return ReportsDAO.getBookingsByFlight(flightId);
//    }
//
//    public List<Map<String, Object>> getBookingsBySchedule(int scheduleId) throws SQLException {
//        return ReportsDAO.getBookingsBySchedule(scheduleId);
//    }
//
//    public Map<String, Object> getReportSummary(Integer carrierId, Integer flightId) throws SQLException {
//        return ReportsDAO.getReportSummary(carrierId, flightId);
//    }
//
//    public List<Map<String, Object>> getAllBookings() throws SQLException {
//        return ReportsDAO.getAllBookings();
//    }
//
//    public byte[] exportBookingsToCSV(Integer carrierId, Integer flightId) throws SQLException, UnsupportedEncodingException {
//        return ReportsDAO.exportBookingsToCSV(carrierId, flightId);
//    }
//}




package com.AmsSpringBoot.service;

import com.AmsSpringBoot.dao.ReportsDAO;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class ReportsService {

    public List<Map<String, Object>> getBookingsBySchedule(int scheduleId) throws SQLException {
        return ReportsDAO.getBookingsBySchedule(scheduleId);
    }

    public List<Map<String, Object>> getBookingsByFlight(int flightId) throws SQLException {
        return ReportsDAO.getBookingsByFlight(flightId);
    }

    public List<Map<String, Object>> getBookingsByCarrier(int carrierId) throws SQLException {
        return ReportsDAO.getBookingsByCarrier(carrierId);
    }
    
//    public Map<String, Object> getReportSummary(Integer carrierId, Integer flightId) throws SQLException {
//      return ReportsDAO.getReportSummary(carrierId, flightId);
//  }
//
//  public List<Map<String, Object>> getAllBookings() throws SQLException {
//      return ReportsDAO.getAllBookings();
//  }
//
//  public byte[] exportBookingsToCSV(Integer carrierId, Integer flightId) throws SQLException, UnsupportedEncodingException {
//      return ReportsDAO.exportBookingsToCSV(carrierId, flightId);
//  }
}
