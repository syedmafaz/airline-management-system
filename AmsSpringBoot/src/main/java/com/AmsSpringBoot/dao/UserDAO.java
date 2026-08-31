package com.AmsSpringBoot.dao;




import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.AmsSpringBoot.bean.User;
import com.AmsSpringBoot.util.DBUtil;

public class UserDAO {
    public static int insertUser(User user) {
        int result = 0;
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "INSERT INTO Users (UserName, Password, Phone, EmailId, Address1, Address2, City, State, Country, ZipCode, DOB, Role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, user.getUserName());
            pstmt.setString(2, user.getPassword());
            pstmt.setLong(3, user.getPhone());
            pstmt.setString(4, user.getEmailId());
            pstmt.setString(5, user.getAddress1());
            pstmt.setString(6, user.getAddress2());
            pstmt.setString(7, user.getCity());
            pstmt.setString(8, user.getState());
            pstmt.setString(9, user.getCountry());
            pstmt.setLong(10, user.getZipCode());
            pstmt.setDate(11, user.getDob());
            pstmt.setString(12, user.getRole());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static User authenticateUser(String username, String password) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Users WHERE UserName = ? AND Password = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setUserId(rs.getInt("UserID"));
                user.setUserName(rs.getString("UserName"));
                user.setPassword(rs.getString("Password"));
                user.setPhone(rs.getLong("Phone"));
                user.setEmailId(rs.getString("EmailId"));
                user.setAddress1(rs.getString("Address1"));
                user.setAddress2(rs.getString("Address2"));
                user.setCity(rs.getString("City"));
                user.setState(rs.getString("State"));
                user.setCountry(rs.getString("Country"));
                user.setZipCode(rs.getLong("ZipCode"));
                user.setDob(rs.getDate("DOB"));
                user.setRole(rs.getString("Role"));
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    
    
    public static User getUserById(int userId) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Users WHERE UserId = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, userId);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setUserId(rs.getInt("UserID"));
                user.setUserName(rs.getString("UserName"));
                user.setPassword(rs.getString("Password"));
                user.setPhone(rs.getLong("Phone"));
                user.setEmailId(rs.getString("EmailId"));
                user.setAddress1(rs.getString("Address1"));
                user.setAddress2(rs.getString("Address2"));
                user.setCity(rs.getString("City"));
                user.setState(rs.getString("State"));
                user.setCountry(rs.getString("Country"));
                user.setZipCode(rs.getLong("ZipCode"));
                user.setDob(rs.getDate("DOB"));
                user.setRole(rs.getString("Role"));
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean updateUser(User user) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "UPDATE Users SET UserName=?, Password=?, Phone=?, EmailId=?, Address1=?, Address2=?, City=?, State=?, Country=?, ZipCode=?, DOB=?, Role=? WHERE UserId=?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, user.getUserName());
            pstmt.setString(2, user.getPassword());
            pstmt.setLong(3, user.getPhone());
            pstmt.setString(4, user.getEmailId());
            pstmt.setString(5, user.getAddress1());
            pstmt.setString(6, user.getAddress2());
            pstmt.setString(7, user.getCity());
            pstmt.setString(8, user.getState());
            pstmt.setString(9, user.getCountry());
            pstmt.setLong(10, user.getZipCode());
            pstmt.setDate(11, user.getDob());
            pstmt.setString(12, "Customer"); // Assuming role is always "Customer" for now
            pstmt.setInt(13, user.getUserId());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public static List<User> getAllUsers() {
        List<User> userList = new ArrayList<>();
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Users";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                User user = new User();
                user.setUserId(rs.getInt("UserID"));
                user.setUserName(rs.getString("UserName"));
                user.setPassword(rs.getString("Password"));
                user.setPhone(rs.getLong("Phone"));
                user.setEmailId(rs.getString("EmailId"));
                user.setAddress1(rs.getString("Address1"));
                user.setAddress2(rs.getString("Address2"));
                user.setCity(rs.getString("City"));
                user.setState(rs.getString("State"));
                user.setCountry(rs.getString("Country"));
                user.setZipCode(rs.getLong("ZipCode"));
                user.setDob(rs.getDate("DOB"));
                user.setRole(rs.getString("Role"));
                userList.add(user);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }

    public static boolean deleteUser(int id) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "DELETE FROM Users WHERE UserId = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public static boolean emailExists(String email) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT COUNT(*) FROM Users WHERE EmailId = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    public static boolean phoneExists(long phone) {
		try (Connection conn = DBUtil.createConnection()) {
			String sql = "SELECT COUNT(*) FROM Users WHERE Phone = ?";
			PreparedStatement pstmt = conn.prepareStatement(sql);
			pstmt.setLong(1, phone);
			ResultSet rs = pstmt.executeQuery();
			if (rs.next()) {
				return rs.getInt(1) > 0;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
   
    return false;
    }

    public static User authenticateByEmail(String emailId, String password) {
        try (Connection conn = DBUtil.createConnection()) {
            String sql = "SELECT * FROM Users WHERE EmailId = ? AND Password = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, emailId);
            pstmt.setString(2, password);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                User user = new User();
                user.setUserId(rs.getInt("UserID"));
                user.setUserName(rs.getString("UserName"));
                user.setPassword(rs.getString("Password"));
                user.setPhone(rs.getLong("Phone"));
                user.setEmailId(rs.getString("EmailId"));
                user.setAddress1(rs.getString("Address1"));
                user.setAddress2(rs.getString("Address2"));
                user.setCity(rs.getString("City"));
                user.setState(rs.getString("State"));
                user.setCountry(rs.getString("Country"));
                user.setZipCode(rs.getLong("ZipCode"));
                user.setDob(rs.getDate("DOB"));
                user.setRole(rs.getString("Role"));
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
