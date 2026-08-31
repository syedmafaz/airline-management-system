//package com.AmsSpringBoot.dao;
//
//
//
//import com.AmsSpringBoot.bean.FlightSchedule;
//import com.AmsSpringBoot.util.DBUtil;
//
//import java.sql.*;
//import java.util.ArrayList;
//import java.util.List;
//
//public class FlightScheduleDAO {
//
//    public static boolean insertFlightSchedule(FlightSchedule schedule) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "INSERT INTO FlightSchedule (FlightID, DateOfTravel, BusinessClassBookedCount, EconomyClassBookedCount, ExecutiveClassBookedCount, BusinessClassFare, EconomyClassFare, ExecutiveClassFare) " +
//                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, schedule.getFlightId());
//        pstmt.setDate(2, schedule.getDateOfTravel());
//        pstmt.setInt(3, schedule.getBusinessClassBookedCount());
//        pstmt.setInt(4, schedule.getEconomyClassBookedCount());
//        pstmt.setInt(5, schedule.getExecutiveClassBookedCount());
//        pstmt.setInt(6, schedule.getBusinessClassFare());
//        pstmt.setInt(7, schedule.getEconomyClassFare());
//        pstmt.setInt(8, schedule.getExecutiveClassFare());
//
//        int rows = pstmt.executeUpdate();
//        conn.close();
//        return rows > 0;
//    }
//
//    public static List<FlightSchedule> getAllFlightSchedules() throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightSchedule";
//        Statement stmt = conn.createStatement();
//        ResultSet rs = stmt.executeQuery(sql);
//
//        List<FlightSchedule> list = new ArrayList<>();
//        while (rs.next()) {
//            FlightSchedule fs = new FlightSchedule();
//            fs.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            fs.setFlightId(rs.getInt("FlightID"));
//            fs.setDateOfTravel(rs.getDate("DateOfTravel"));
//            fs.setBusinessClassBookedCount(rs.getInt("BusinessClassBookedCount"));
//            fs.setEconomyClassBookedCount(rs.getInt("EconomyClassBookedCount"));
//            fs.setExecutiveClassBookedCount(rs.getInt("ExecutiveClassBookedCount"));
//            fs.setBusinessClassFare(rs.getInt("BusinessClassFare"));
//            fs.setEconomyClassFare(rs.getInt("EconomyClassFare"));
//            fs.setExecutiveClassFare(rs.getInt("ExecutiveClassFare"));
//            list.add(fs);
//        }
//        conn.close();
//        return list;
//    }
//
//    public static boolean deleteFlightSchedule(int id) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "DELETE FROM FlightSchedule WHERE FlightScheduleID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, id);
//        int rows = pstmt.executeUpdate();
//        conn.close();
//        return rows > 0;
//    }
//
//    public static boolean updateFlightSchedule(FlightSchedule fs) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "UPDATE FlightSchedule SET FlightID = ?, DateOfTravel = ?, BusinessClassBookedCount = ?, EconomyClassBookedCount = ?, ExecutiveClassBookedCount = ?, BusinessClassFare = ?, EconomyClassFare = ?, ExecutiveClassFare = ? WHERE FlightScheduleID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//
//        pstmt.setInt(1, fs.getFlightId());
//        pstmt.setDate(2, fs.getDateOfTravel());
//        pstmt.setInt(3, fs.getBusinessClassBookedCount());
//        pstmt.setInt(4, fs.getEconomyClassBookedCount());
//        pstmt.setInt(5, fs.getExecutiveClassBookedCount());
//        pstmt.setInt(6, fs.getBusinessClassFare());
//        pstmt.setInt(7, fs.getEconomyClassFare());
//        pstmt.setInt(8, fs.getExecutiveClassFare());
//        pstmt.setInt(9, fs.getFlightScheduleId());
//
//        int rows = pstmt.executeUpdate();
//        conn.close();
//        return rows > 0;
//    }
//
//    public static FlightSchedule getFlightScheduleById(int id) throws SQLException {
//        Connection conn = DBUtil.createConnection();
//        String sql = "SELECT * FROM FlightSchedule WHERE FlightScheduleID = ?";
//        PreparedStatement pstmt = conn.prepareStatement(sql);
//        pstmt.setInt(1, id);
//        ResultSet rs = pstmt.executeQuery();
//
//        FlightSchedule fs = null;
//        if (rs.next()) {
//            fs = new FlightSchedule();
//            fs.setFlightScheduleId(rs.getInt("FlightScheduleID"));
//            fs.setFlightId(rs.getInt("FlightID"));
//            fs.setDateOfTravel(rs.getDate("DateOfTravel"));
//            fs.setBusinessClassBookedCount(rs.getInt("BusinessClassBookedCount"));
//            fs.setEconomyClassBookedCount(rs.getInt("EconomyClassBookedCount"));
//            fs.setExecutiveClassBookedCount(rs.getInt("ExecutiveClassBookedCount"));
//            fs.setBusinessClassFare(rs.getInt("BusinessClassFare"));
//            fs.setEconomyClassFare(rs.getInt("EconomyClassFare"));
//            fs.setExecutiveClassFare(rs.getInt("ExecutiveClassFare"));
//        }
//        conn.close();
//        return fs;
//    }
//}
//



package com.AmsSpringBoot.dao;

import com.AmsSpringBoot.bean.FlightSchedule;
import com.AmsSpringBoot.util.DBUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class FlightScheduleDAO {

    public static boolean insertFlightSchedule(FlightSchedule schedule) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "INSERT INTO FlightSchedule " +
                "(FlightID, DateOfTravel, DepartureDate, DepartureTime, ArrivalDate, ArrivalTime, " +
                "BusinessClassBookedCount, EconomyClassBookedCount, ExecutiveClassBookedCount, " +
                "BusinessClassFare, EconomyClassFare, ExecutiveClassFare) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, schedule.getFlightId());
        pstmt.setDate(2, schedule.getDateOfTravel());
        pstmt.setDate(3, schedule.getDepartureDate());
        pstmt.setTime(4, schedule.getDepartureTime());
        pstmt.setDate(5, schedule.getArrivalDate());
        pstmt.setTime(6, schedule.getArrivalTime());
        pstmt.setInt(7, schedule.getBusinessClassBookedCount());
        pstmt.setInt(8, schedule.getEconomyClassBookedCount());
        pstmt.setInt(9, schedule.getExecutiveClassBookedCount());
        pstmt.setInt(10, schedule.getBusinessClassFare());
        pstmt.setInt(11, schedule.getEconomyClassFare());
        pstmt.setInt(12, schedule.getExecutiveClassFare());

        int rows = pstmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public static List<FlightSchedule> getAllFlightSchedules() throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "SELECT * FROM FlightSchedule";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);

        List<FlightSchedule> list = new ArrayList<>();
        while (rs.next()) {
            FlightSchedule fs = new FlightSchedule();
            fs.setFlightScheduleId(rs.getInt("FlightScheduleID"));
            fs.setFlightId(rs.getInt("FlightID"));
            fs.setDateOfTravel(rs.getDate("DateOfTravel"));
            fs.setDepartureDate(rs.getDate("DepartureDate"));
            fs.setDepartureTime(rs.getTime("DepartureTime"));
            fs.setArrivalDate(rs.getDate("ArrivalDate"));
            fs.setArrivalTime(rs.getTime("ArrivalTime"));
            fs.setBusinessClassBookedCount(rs.getInt("BusinessClassBookedCount"));
            fs.setEconomyClassBookedCount(rs.getInt("EconomyClassBookedCount"));
            fs.setExecutiveClassBookedCount(rs.getInt("ExecutiveClassBookedCount"));
            fs.setBusinessClassFare(rs.getInt("BusinessClassFare"));
            fs.setEconomyClassFare(rs.getInt("EconomyClassFare"));
            fs.setExecutiveClassFare(rs.getInt("ExecutiveClassFare"));
            list.add(fs);
        }
        conn.close();
        return list;
    }

    public static boolean deleteFlightSchedule(int id) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "DELETE FROM FlightSchedule WHERE FlightScheduleID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, id);
        int rows = pstmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public static boolean updateFlightSchedule(FlightSchedule fs) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "UPDATE FlightSchedule SET FlightID = ?, DateOfTravel = ?, " +
                "DepartureDate = ?, DepartureTime = ?, ArrivalDate = ?, ArrivalTime = ?, " +
                "BusinessClassBookedCount = ?, EconomyClassBookedCount = ?, ExecutiveClassBookedCount = ?, " +
                "BusinessClassFare = ?, EconomyClassFare = ?, ExecutiveClassFare = ? " +
                "WHERE FlightScheduleID = ?";

        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, fs.getFlightId());
        pstmt.setDate(2, fs.getDateOfTravel());
        pstmt.setDate(3, fs.getDepartureDate());
        pstmt.setTime(4, fs.getDepartureTime());
        pstmt.setDate(5, fs.getArrivalDate());
        pstmt.setTime(6, fs.getArrivalTime());
        pstmt.setInt(7, fs.getBusinessClassBookedCount());
        pstmt.setInt(8, fs.getEconomyClassBookedCount());
        pstmt.setInt(9, fs.getExecutiveClassBookedCount());
        pstmt.setInt(10, fs.getBusinessClassFare());
        pstmt.setInt(11, fs.getEconomyClassFare());
        pstmt.setInt(12, fs.getExecutiveClassFare());
        pstmt.setInt(13, fs.getFlightScheduleId());

        int rows = pstmt.executeUpdate();
        conn.close();
        return rows > 0;
    }

    public static FlightSchedule getFlightScheduleById(int id) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "SELECT * FROM FlightSchedule WHERE FlightScheduleID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, id);
        ResultSet rs = pstmt.executeQuery();

        FlightSchedule fs = null;
        if (rs.next()) {
            fs = new FlightSchedule();
            fs.setFlightScheduleId(rs.getInt("FlightScheduleID"));
            fs.setFlightId(rs.getInt("FlightID"));
            fs.setDateOfTravel(rs.getDate("DateOfTravel"));
            fs.setDepartureDate(rs.getDate("DepartureDate"));
            fs.setDepartureTime(rs.getTime("DepartureTime"));
            fs.setArrivalDate(rs.getDate("ArrivalDate"));
            fs.setArrivalTime(rs.getTime("ArrivalTime"));
            fs.setBusinessClassBookedCount(rs.getInt("BusinessClassBookedCount"));
            fs.setEconomyClassBookedCount(rs.getInt("EconomyClassBookedCount"));
            fs.setExecutiveClassBookedCount(rs.getInt("ExecutiveClassBookedCount"));
            fs.setBusinessClassFare(rs.getInt("BusinessClassFare"));
            fs.setEconomyClassFare(rs.getInt("EconomyClassFare"));
            fs.setExecutiveClassFare(rs.getInt("ExecutiveClassFare"));
        }
        conn.close();
        return fs;
    }
    
    
    public static List<FlightSchedule> getSchedulesByFlightId(int flightId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "SELECT * FROM FlightSchedule WHERE FlightID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, flightId);
        ResultSet rs = pstmt.executeQuery();

        List<FlightSchedule> list = new ArrayList<>();
        while (rs.next()) {
            FlightSchedule fs = new FlightSchedule();
            fs.setFlightScheduleId(rs.getInt("FlightScheduleID"));
            fs.setFlightId(rs.getInt("FlightID"));
            fs.setDateOfTravel(rs.getDate("DateOfTravel"));
            fs.setDepartureDate(rs.getDate("DepartureDate"));
            fs.setDepartureTime(rs.getTime("DepartureTime"));
            fs.setArrivalDate(rs.getDate("ArrivalDate"));
            fs.setArrivalTime(rs.getTime("ArrivalTime"));
            fs.setBusinessClassBookedCount(rs.getInt("BusinessClassBookedCount"));
            fs.setEconomyClassBookedCount(rs.getInt("EconomyClassBookedCount"));
            fs.setExecutiveClassBookedCount(rs.getInt("ExecutiveClassBookedCount"));
            fs.setBusinessClassFare(rs.getInt("BusinessClassFare"));
            fs.setEconomyClassFare(rs.getInt("EconomyClassFare"));
            fs.setExecutiveClassFare(rs.getInt("ExecutiveClassFare"));
            list.add(fs);
        }
        conn.close();
        return list;
    }
}
