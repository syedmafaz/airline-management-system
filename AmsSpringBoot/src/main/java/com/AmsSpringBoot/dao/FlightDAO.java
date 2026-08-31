package com.AmsSpringBoot.dao;

import com.AmsSpringBoot.bean.Flight;
import com.AmsSpringBoot.util.DBUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FlightDAO {

    public static int insertFlight(Flight flight) {
        int result = 0;
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "INSERT INTO Flight (CarrierID, Origin, Destination, AirFare, SeatCapacityBusinessClass, SeatCapacityEconomyClass, SeatCapacityExecutiveClass) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, flight.getCarrierId());
            ps.setString(2, flight.getOrigin());
            ps.setString(3, flight.getDestination());
            ps.setInt(4, flight.getAirFare());
            ps.setInt(5, flight.getSeatCapacityBusinessClass());
            ps.setInt(6, flight.getSeatCapacityEconomyClass());
            ps.setInt(7, flight.getSeatCapacityExecutiveClass());
            result = ps.executeUpdate();
            
            if (result > 0) {
                ResultSet keys = ps.getGeneratedKeys();
                if (keys.next()) {
                    flight.setFlightId(keys.getInt(1));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Inserting Flight with Carrier ID: " + flight.getCarrierId());

        return result;
    }

    public static boolean updateFlight(Flight flight) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "UPDATE Flight SET CarrierID=?, Origin=?, Destination=?, AirFare=?, SeatCapacityBusinessClass=?, SeatCapacityEconomyClass=?, SeatCapacityExecutiveClass=? WHERE FlightID=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, flight.getCarrierId());
            ps.setString(2, flight.getOrigin());
            ps.setString(3, flight.getDestination());
            ps.setInt(4, flight.getAirFare());
            ps.setInt(5, flight.getSeatCapacityBusinessClass());
            ps.setInt(6, flight.getSeatCapacityEconomyClass());
            ps.setInt(7, flight.getSeatCapacityExecutiveClass());
            ps.setInt(8, flight.getFlightId());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean deleteFlight(int id) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "DELETE FROM Flight WHERE FlightID = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static List<Flight> getAllFlights() {
        List<Flight> list = new ArrayList<>();
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Flight";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Flight f = new Flight();
                f.setFlightId(rs.getInt("FlightID"));
                f.setCarrierId(rs.getInt("CarrierID"));
                f.setOrigin(rs.getString("Origin"));
                f.setDestination(rs.getString("Destination"));
                f.setAirFare(rs.getInt("AirFare"));
                f.setSeatCapacityBusinessClass(rs.getInt("SeatCapacityBusinessClass"));
                f.setSeatCapacityEconomyClass(rs.getInt("SeatCapacityEconomyClass"));
                f.setSeatCapacityExecutiveClass(rs.getInt("SeatCapacityExecutiveClass"));
                list.add(f);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public static Flight getFlightById(int id) {
        Flight flight = null;
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Flight WHERE FlightID = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                flight = new Flight();
                flight.setFlightId(rs.getInt("FlightID"));
                flight.setCarrierId(rs.getInt("CarrierID"));
                flight.setOrigin(rs.getString("Origin"));
                flight.setDestination(rs.getString("Destination"));
                flight.setAirFare(rs.getInt("AirFare"));
                flight.setSeatCapacityBusinessClass(rs.getInt("SeatCapacityBusinessClass"));
                flight.setSeatCapacityEconomyClass(rs.getInt("SeatCapacityEconomyClass"));
                flight.setSeatCapacityExecutiveClass(rs.getInt("SeatCapacityExecutiveClass"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flight;
    }
    
    
//    public static List<Flight> getFlightsByCarrierId(int carrierId) {
//        List<Flight> list = new ArrayList<>();
//        try (Connection conn = DBUtil.createConnection()) {
//            String sql = "SELECT * FROM Flight WHERE CarrierID = ?";
//            PreparedStatement ps = conn.prepareStatement(sql);
//            ps.setInt(1, carrierId);
//            ResultSet rs = ps.executeQuery();
//            while (rs.next()) {
//                Flight f = new Flight();
//                f.setFlightId(rs.getInt("FlightID"));
//                f.setCarrierId(rs.getInt("CarrierID"));
//                f.setOrigin(rs.getString("Origin"));
//                f.setDestination(rs.getString("Destination"));
//                f.setAirFare(rs.getInt("AirFare"));
//                f.setSeatCapacityBusinessClass(rs.getInt("SeatCapacityBusinessClass"));
//                f.setSeatCapacityEconomyClass(rs.getInt("SeatCapacityEconomyClass"));
//                f.setSeatCapacityExecutiveClass(rs.getInt("SeatCapacityExecutiveClass"));
//                list.add(f);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return list;
//    }
    
    public static List<Flight> getFlightsByCarrierId(int carrierId) throws SQLException {
        Connection conn = DBUtil.createConnection();
        String sql = "SELECT * FROM Flight WHERE CarrierID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, carrierId);
        ResultSet rs = pstmt.executeQuery();
        
        List<Flight> flights = new ArrayList<>();
        while (rs.next()) {
            Flight flight = new Flight();
            flight.setFlightId(rs.getInt("FlightID"));
            flight.setCarrierId(rs.getInt("CarrierID"));
            flight.setOrigin(rs.getString("Origin"));
            flight.setDestination(rs.getString("Destination"));
            flight.setAirFare(rs.getInt("AirFare"));
            flight.setSeatCapacityEconomyClass(rs.getInt("SeatCapacityEconomyClass"));
            flight.setSeatCapacityBusinessClass(rs.getInt("SeatCapacityBusinessClass"));
            flight.setSeatCapacityExecutiveClass(rs.getInt("SeatCapacityExecutiveClass"));
            flights.add(flight);
        }
        conn.close();
        return flights;
    }
}
