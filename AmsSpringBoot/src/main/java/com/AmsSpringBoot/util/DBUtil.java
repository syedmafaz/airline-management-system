package com.AmsSpringBoot.util;

//package com.util;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//public class DBUtil {
//
//	public static Connection createConnection() {
//		Connection cn = null;
//		try {
//			String driver="org.apache.derby.jdbc.EmbeddedDriver";
//			String databaseURL = "jdbc:derby:C:\\Users\\Admin\\JavaServletAndJSP;create=true";
//		    
//			Class.forName(driver);
//			cn = DriverManager.getConnection(databaseURL);
//		} catch (SQLException e) {
//			System.out.println(e.getMessage());
//			 e.printStackTrace();
//		} catch (ClassNotFoundException e) {
//			System.out.println(e.getMessage());
//		}
//		return cn;
//	}
//
//	public static void closeAllConection(Connection cn, PreparedStatement ps, ResultSet rs) {
//		try {
//			if(rs!=null) {
//				rs.close();
//			}
//			if(ps!=null) {
//				ps.close();
//			}
//			if(cn!=null) {
//				cn.close();
//			}
//		} catch (SQLException e) {
//			System.out.println(e.getMessage());
//		}
//	}
//}




import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
  public static Connection createConnection() {
      Connection conn = null;
      try {
          Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
          //String dbURL = "jdbc:derby:C:\\Users\\Admin\\JavaServletAndJSP;create=true"; // Use your actual DB path
          
//          String dbURL = "jdbc:derby:C:\\Users\\Admin\\AMS_Angular_and_Spring;create=true";
          String dbURL = "jdbc:derby:./ams_db;create=true";
          conn = DriverManager.getConnection(dbURL);
      } catch (ClassNotFoundException | SQLException e) {
          e.printStackTrace();
      }
      return conn;
  }
}

