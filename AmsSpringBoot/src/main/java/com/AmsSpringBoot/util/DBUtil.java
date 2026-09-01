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
import java.sql.Statement;

public class DBUtil {
    private static final String DB_URL;
    private static volatile boolean initialized = false;

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
            if (!initialized && conn != null) {
                synchronized (DBUtil.class) {
                    if (!initialized) {
                        initTables(conn);
                        initialized = true;
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("DBUtil connection error: " + e.getMessage());
            e.printStackTrace();
        }
        return conn;
    }

    public static void initTables(Connection conn) {
        String[] statements = new String[]{
            "CREATE TABLE Users (UserID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1001, INCREMENT BY 1), UserName VARCHAR(100) NOT NULL, Password VARCHAR(100) NOT NULL, Phone BIGINT NOT NULL, EmailId VARCHAR(150) NOT NULL, Address1 VARCHAR(255), Address2 VARCHAR(255), City VARCHAR(100), State VARCHAR(100), Country VARCHAR(100), ZipCode BIGINT, DOB DATE, Role VARCHAR(50) DEFAULT 'Customer')",
            "CREATE TABLE Carrier (CarrierID INT GENERATED ALWAYS AS IDENTITY (START WITH 1001, INCREMENT BY 1) PRIMARY KEY, CarrierName VARCHAR(100), DiscountPercentageThirtyDaysAdvanceBooking INT, DiscountPercentageSixtyDaysAdvanceBooking INT, DiscountPercentageNinteyDaysAdvanceBooking INT, RefundPercentageForTicketCancellation2DaysBeforeTravelDate INT, RefundPercentageForTicketCancellation10DaysBeforeTravelDate INT, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate INT, SilverUserDiscount INT, GoldUserDiscount INT, PlatinumUserDiscount INT)",
            "CREATE TABLE Flight (FlightID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 101, INCREMENT BY 1), CarrierID INT NOT NULL, Origin VARCHAR(100) NOT NULL, Destination VARCHAR(100) NOT NULL, AirFare INT NOT NULL, SeatCapacityEconomyClass INT, SeatCapacityBusinessClass INT, SeatCapacityExecutiveClass INT)",
            "CREATE TABLE FlightSchedule (FlightScheduleID INT GENERATED ALWAYS AS IDENTITY (START WITH 1001, INCREMENT BY 1) PRIMARY KEY, FlightID INT NOT NULL, DateOfTravel DATE NOT NULL, BusinessClassBookedCount INT DEFAULT 0, EconomyClassBookedCount INT DEFAULT 0, ExecutiveClassBookedCount INT DEFAULT 0, BusinessClassFare INT DEFAULT 0, EconomyClassFare INT DEFAULT 0, ExecutiveClassFare INT DEFAULT 0)",
            "CREATE TABLE FlightBooking (BookingID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, FlightScheduleID INT, UserID INT NOT NULL, SeatCategory VARCHAR(20) NOT NULL, NumberOfTickets INT NOT NULL, TotalAmount INT NOT NULL, BaseFare INT DEFAULT 0, DiscountAmount INT DEFAULT 0, RefundAmount INT DEFAULT 0, PassengerDetailsJson CLOB, BookingStatus VARCHAR(20) NOT NULL DEFAULT 'booked', BookingDate DATE DEFAULT CURRENT_DATE)",
            "CREATE TABLE BookingDocuments (DocumentID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, BookingID INT NOT NULL, DocumentType VARCHAR(20) NOT NULL, DocumentPath VARCHAR(500), CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
            "INSERT INTO Users (UserName, Password, Phone, EmailId, Address1, Address2, City, State, Country, ZipCode, DOB, Role) VALUES ('syed', 'syed123', 9789451865, 'syed@gmail.com', 'Laskar Street', 'Gandhi Market', 'Trichy', 'Tamil Nadu', 'India', 620008, '2003-07-23', 'Customer')",
            "INSERT INTO Users (UserName, Password, Phone, EmailId, Address1, Address2, City, State, Country, ZipCode, DOB, Role) VALUES ('admin', 'admin123', 9876543210, 'admin@easygo.com', 'Main HQ', 'Admin Suite', 'Chennai', 'Tamil Nadu', 'India', 600001, '1995-01-01', 'Admin')",
            "INSERT INTO Carrier (CarrierName, DiscountPercentageThirtyDaysAdvanceBooking, DiscountPercentageSixtyDaysAdvanceBooking, DiscountPercentageNinteyDaysAdvanceBooking, RefundPercentageForTicketCancellation2DaysBeforeTravelDate, RefundPercentageForTicketCancellation10DaysBeforeTravelDate, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate, SilverUserDiscount, GoldUserDiscount, PlatinumUserDiscount) VALUES ('Air India', 10, 15, 20, 25, 50, 75, 5, 10, 15)",
            "INSERT INTO Carrier (CarrierName, DiscountPercentageThirtyDaysAdvanceBooking, DiscountPercentageSixtyDaysAdvanceBooking, DiscountPercentageNinteyDaysAdvanceBooking, RefundPercentageForTicketCancellation2DaysBeforeTravelDate, RefundPercentageForTicketCancellation10DaysBeforeTravelDate, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate, SilverUserDiscount, GoldUserDiscount, PlatinumUserDiscount) VALUES ('IndiGo', 8, 12, 18, 20, 45, 70, 4, 8, 12)",
            "INSERT INTO Flight (CarrierID, Origin, Destination, AirFare, SeatCapacityEconomyClass, SeatCapacityBusinessClass, SeatCapacityExecutiveClass) VALUES (1001, 'Chennai', 'Delhi', 5000, 100, 20, 10)",
            "INSERT INTO Flight (CarrierID, Origin, Destination, AirFare, SeatCapacityEconomyClass, SeatCapacityBusinessClass, SeatCapacityExecutiveClass) VALUES (1001, 'Mumbai', 'Bangalore', 4000, 120, 25, 15)"
        };

        for (String sql : statements) {
            try (Statement st = conn.createStatement()) {
                st.executeUpdate(sql);
            } catch (Exception e) {
                // Table or record already exists, ignore
            }
        }
    }
}

