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




import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
    private static final String DB_URL;

    static {
        String baseDir = System.getProperty("user.home", ".");
        File dir = new File(baseDir, "ams_db");
        DB_URL = "jdbc:derby:" + dir.getAbsolutePath().replace('\\', '/') + ";create=true";
        System.out.println("Connecting to Derby DB at: " + DB_URL);
    }

    public static Connection createConnection() {
        Connection conn = null;
        try {
            Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
            conn = DriverManager.getConnection(DB_URL);
        } catch (Exception e) {
            System.err.println("DBUtil connection error: " + e.getMessage());
            e.printStackTrace();
        }
        return conn;
    }
}

