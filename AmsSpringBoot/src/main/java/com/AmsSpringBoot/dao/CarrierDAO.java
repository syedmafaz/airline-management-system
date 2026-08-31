package com.AmsSpringBoot.dao;

import com.AmsSpringBoot.bean.Carrier;
import com.AmsSpringBoot.util.DBUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CarrierDAO {
    public static int insertCarrier(Carrier carrier) {
        int result = 0;
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "INSERT INTO Carrier (CarrierName, DiscountPercentageThirtyDaysAdvanceBooking, DiscountPercentageSixtyDaysAdvanceBooking, DiscountPercentageNinteyDaysAdvanceBooking, RefundPercentageForTicketCancellation2DaysBeforeTravelDate, RefundPercentageForTicketCancellation10DaysBeforeTravelDate, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate, SilverUserDiscount, GoldUserDiscount, PlatinumUserDiscount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, carrier.getCarrierName());
            ps.setInt(2, carrier.getDiscountPercentageThirtyDaysAdvanceBooking());
            ps.setInt(3, carrier.getDiscountPercentageSixtyDaysAdvanceBooking());
            ps.setInt(4, carrier.getDiscountPercentageNinteyDaysAdvanceBooking());
            ps.setInt(5, carrier.getRefundPercentageForTicketCancellation2DaysBeforeTravelDate());
            ps.setInt(6, carrier.getRefundPercentageForTicketCancellation10DaysBeforeTravelDate());
            ps.setInt(7, carrier.getRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate());
            ps.setInt(8, carrier.getSilverUserDiscount());
            ps.setInt(9, carrier.getGoldUserDiscount());
            ps.setInt(10, carrier.getPlatinumUserDiscount());
            result = ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static boolean updateCarrier(Carrier carrier) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "UPDATE Carrier SET CarrierName=?, DiscountPercentageThirtyDaysAdvanceBooking=?, DiscountPercentageSixtyDaysAdvanceBooking=?, DiscountPercentageNinteyDaysAdvanceBooking=?, RefundPercentageForTicketCancellation2DaysBeforeTravelDate=?, RefundPercentageForTicketCancellation10DaysBeforeTravelDate=?, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate=?, SilverUserDiscount=?, GoldUserDiscount=?, PlatinumUserDiscount=? WHERE CarrierID=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, carrier.getCarrierName());
            ps.setInt(2, carrier.getDiscountPercentageThirtyDaysAdvanceBooking());
            ps.setInt(3, carrier.getDiscountPercentageSixtyDaysAdvanceBooking());
            ps.setInt(4, carrier.getDiscountPercentageNinteyDaysAdvanceBooking());
            ps.setInt(5, carrier.getRefundPercentageForTicketCancellation2DaysBeforeTravelDate());
            ps.setInt(6, carrier.getRefundPercentageForTicketCancellation10DaysBeforeTravelDate());
            ps.setInt(7, carrier.getRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate());
            ps.setInt(8, carrier.getSilverUserDiscount());
            ps.setInt(9, carrier.getGoldUserDiscount());
            ps.setInt(10, carrier.getPlatinumUserDiscount());
            ps.setInt(11, carrier.getCarrierID());
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean deleteCarrier(int id) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "DELETE FROM Carrier WHERE CarrierID = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static List<Carrier> getAllCarriers() {
        List<Carrier> list = new ArrayList<>();
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Carrier";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Carrier c = new Carrier();
                c.setCarrierID(rs.getInt("CarrierID"));
                c.setCarrierName(rs.getString("CarrierName"));
                c.setDiscountPercentageThirtyDaysAdvanceBooking(rs.getInt("DiscountPercentageThirtyDaysAdvanceBooking"));
                c.setDiscountPercentageSixtyDaysAdvanceBooking(rs.getInt("DiscountPercentageSixtyDaysAdvanceBooking"));
                c.setDiscountPercentageNinteyDaysAdvanceBooking(rs.getInt("DiscountPercentageNinteyDaysAdvanceBooking"));
                c.setRefundPercentageForTicketCancellation2DaysBeforeTravelDate(rs.getInt("RefundPercentageForTicketCancellation2DaysBeforeTravelDate"));
                c.setRefundPercentageForTicketCancellation10DaysBeforeTravelDate(rs.getInt("RefundPercentageForTicketCancellation10DaysBeforeTravelDate"));
                c.setRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate(rs.getInt("RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate"));
                c.setSilverUserDiscount(rs.getInt("SilverUserDiscount"));
                c.setGoldUserDiscount(rs.getInt("GoldUserDiscount"));
                c.setPlatinumUserDiscount(rs.getInt("PlatinumUserDiscount"));
                list.add(c);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
    
    public static Carrier getCarrierById(int id) {
        Carrier carrier = null;
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Carrier WHERE CarrierID = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                carrier = new Carrier();
                carrier.setCarrierID(rs.getInt("CarrierID"));
                carrier.setCarrierName(rs.getString("CarrierName"));
                carrier.setDiscountPercentageThirtyDaysAdvanceBooking(rs.getInt("DiscountPercentageThirtyDaysAdvanceBooking"));
                carrier.setDiscountPercentageSixtyDaysAdvanceBooking(rs.getInt("DiscountPercentageSixtyDaysAdvanceBooking"));
                carrier.setDiscountPercentageNinteyDaysAdvanceBooking(rs.getInt("DiscountPercentageNinteyDaysAdvanceBooking"));
                carrier.setRefundPercentageForTicketCancellation2DaysBeforeTravelDate(rs.getInt("RefundPercentageForTicketCancellation2DaysBeforeTravelDate"));
                carrier.setRefundPercentageForTicketCancellation10DaysBeforeTravelDate(rs.getInt("RefundPercentageForTicketCancellation10DaysBeforeTravelDate"));
                carrier.setRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate(rs.getInt("RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate"));
                carrier.setSilverUserDiscount(rs.getInt("SilverUserDiscount"));
                carrier.setGoldUserDiscount(rs.getInt("GoldUserDiscount"));
                carrier.setPlatinumUserDiscount(rs.getInt("PlatinumUserDiscount"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return carrier;
    }
}