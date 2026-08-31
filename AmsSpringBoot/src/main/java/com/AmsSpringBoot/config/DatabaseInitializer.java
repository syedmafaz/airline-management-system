package com.AmsSpringBoot.config;

import com.AmsSpringBoot.util.DBUtil;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) {
        initializeDatabase();
    }

    private void initializeDatabase() {
        try (Connection conn = DBUtil.createConnection()) {
            if (conn == null) {
                System.err.println("Database connection failed during initialization!");
                return;
            }

            try (Statement stmt = conn.createStatement()) {
                // 1. Create Users Table
                createTableIfNotExists(stmt, "USERS",
                    "CREATE TABLE Users (" +
                    "    UserID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1001, INCREMENT BY 1)," +
                    "    UserName VARCHAR(100) NOT NULL," +
                    "    Password VARCHAR(100) NOT NULL," +
                    "    Phone BIGINT NOT NULL," +
                    "    EmailId VARCHAR(150) NOT NULL," +
                    "    Address1 VARCHAR(255)," +
                    "    Address2 VARCHAR(255)," +
                    "    City VARCHAR(100)," +
                    "    State VARCHAR(100)," +
                    "    Country VARCHAR(100)," +
                    "    ZipCode BIGINT," +
                    "    DOB DATE," +
                    "    Role VARCHAR(50) DEFAULT 'Customer'" +
                    ")");

                // 2. Create Carrier Table
                createTableIfNotExists(stmt, "CARRIER",
                    "CREATE TABLE Carrier (" +
                    "    CarrierID INT GENERATED ALWAYS AS IDENTITY (START WITH 1001, INCREMENT BY 1) PRIMARY KEY," +
                    "    CarrierName VARCHAR(100)," +
                    "    DiscountPercentageThirtyDaysAdvanceBooking INT," +
                    "    DiscountPercentageSixtyDaysAdvanceBooking INT," +
                    "    DiscountPercentageNinteyDaysAdvanceBooking INT," +
                    "    RefundPercentageForTicketCancellation2DaysBeforeTravelDate INT," +
                    "    RefundPercentageForTicketCancellation10DaysBeforeTravelDate INT," +
                    "    RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate INT," +
                    "    SilverUserDiscount INT," +
                    "    GoldUserDiscount INT," +
                    "    PlatinumUserDiscount INT" +
                    ")");

                // 3. Create Flight Table
                createTableIfNotExists(stmt, "FLIGHT",
                    "CREATE TABLE Flight (" +
                    "    FlightID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 101, INCREMENT BY 1)," +
                    "    CarrierID INT NOT NULL," +
                    "    Origin VARCHAR(100) NOT NULL," +
                    "    Destination VARCHAR(100) NOT NULL," +
                    "    AirFare INT NOT NULL," +
                    "    SeatCapacityEconomyClass INT," +
                    "    SeatCapacityBusinessClass INT," +
                    "    SeatCapacityExecutiveClass INT," +
                    "    CONSTRAINT fk_carrier_flight FOREIGN KEY (CarrierID) REFERENCES Carrier(CarrierID)" +
                    ")");

                // 4. Create FlightSchedule Table
                createTableIfNotExists(stmt, "FLIGHTSCHEDULE",
                    "CREATE TABLE FlightSchedule (" +
                    "    FlightScheduleID INT GENERATED ALWAYS AS IDENTITY (START WITH 1001, INCREMENT BY 1) PRIMARY KEY," +
                    "    FlightID INT NOT NULL," +
                    "    DateOfTravel DATE NOT NULL," +
                    "    BusinessClassBookedCount INT DEFAULT 0," +
                    "    EconomyClassBookedCount INT DEFAULT 0," +
                    "    ExecutiveClassBookedCount INT DEFAULT 0," +
                    "    BusinessClassFare INT DEFAULT 0," +
                    "    EconomyClassFare INT DEFAULT 0," +
                    "    ExecutiveClassFare INT DEFAULT 0," +
                    "    CONSTRAINT fk_fs_flight FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)" +
                    ")");

                // 5. Create FlightBooking Table
                createTableIfNotExists(stmt, "FLIGHTBOOKING",
                    "CREATE TABLE FlightBooking (" +
                    "    BookingID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY," +
                    "    FlightScheduleID INT," +
                    "    UserID INT NOT NULL," +
                    "    SeatCategory VARCHAR(20) NOT NULL," +
                    "    NumberOfTickets INT NOT NULL," +
                    "    TotalAmount INT NOT NULL," +
                    "    BaseFare INT DEFAULT 0," +
                    "    DiscountAmount INT DEFAULT 0," +
                    "    RefundAmount INT DEFAULT 0," +
                    "    PassengerDetailsJson CLOB," +
                    "    BookingStatus VARCHAR(20) NOT NULL DEFAULT 'booked'," +
                    "    BookingDate DATE DEFAULT CURRENT_DATE," +
                    "    CONSTRAINT FK_FlightBooking_User FOREIGN KEY (UserID) REFERENCES Users(UserID)" +
                    ")");

                // 6. Create BookingDocuments Table
                createTableIfNotExists(stmt, "BOOKINGDOCUMENTS",
                    "CREATE TABLE BookingDocuments (" +
                    "    DocumentID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY," +
                    "    BookingID INT NOT NULL," +
                    "    DocumentType VARCHAR(20) NOT NULL," +
                    "    DocumentPath VARCHAR(500)," +
                    "    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                    "    CONSTRAINT FK_BookingDocuments_Booking FOREIGN KEY (BookingID) REFERENCES FlightBooking(BookingID)" +
                    ")");

                // Seed initial test users if empty
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM Users");
                if (rs.next() && rs.getInt(1) == 0) {
                    stmt.executeUpdate("INSERT INTO Users (UserName, Password, Phone, EmailId, Address1, Address2, City, State, Country, ZipCode, DOB, Role) " +
                        "VALUES ('syed', 'syed123', 9789451865, 'syed@gmail.com', 'Laskar Street', 'Gandhi Market', 'Trichy', 'Tamil Nadu', 'India', 620008, '2003-07-23', 'Customer')");
                    stmt.executeUpdate("INSERT INTO Users (UserName, Password, Phone, EmailId, Address1, Address2, City, State, Country, ZipCode, DOB, Role) " +
                        "VALUES ('admin', 'admin123', 9876543210, 'admin@easygo.com', 'Main HQ', 'Admin Suite', 'Chennai', 'Tamil Nadu', 'India', 600001, '1995-01-01', 'Admin')");
                    System.out.println("Default users seeded successfully.");
                }

                // Seed initial Carriers if empty
                ResultSet rsCarrier = stmt.executeQuery("SELECT COUNT(*) FROM Carrier");
                if (rsCarrier.next() && rsCarrier.getInt(1) == 0) {
                    stmt.executeUpdate("INSERT INTO Carrier (CarrierName, DiscountPercentageThirtyDaysAdvanceBooking, DiscountPercentageSixtyDaysAdvanceBooking, DiscountPercentageNinteyDaysAdvanceBooking, RefundPercentageForTicketCancellation2DaysBeforeTravelDate, RefundPercentageForTicketCancellation10DaysBeforeTravelDate, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate, SilverUserDiscount, GoldUserDiscount, PlatinumUserDiscount) " +
                        "VALUES ('Air India', 10, 15, 20, 25, 50, 75, 5, 10, 15)");
                    stmt.executeUpdate("INSERT INTO Carrier (CarrierName, DiscountPercentageThirtyDaysAdvanceBooking, DiscountPercentageSixtyDaysAdvanceBooking, DiscountPercentageNinteyDaysAdvanceBooking, RefundPercentageForTicketCancellation2DaysBeforeTravelDate, RefundPercentageForTicketCancellation10DaysBeforeTravelDate, RefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate, SilverUserDiscount, GoldUserDiscount, PlatinumUserDiscount) " +
                        "VALUES ('IndiGo', 8, 12, 18, 20, 45, 70, 4, 8, 12)");
                    System.out.println("Default carriers seeded successfully.");
                }

                // Seed initial Flights if empty
                ResultSet rsFlight = stmt.executeQuery("SELECT COUNT(*) FROM Flight");
                if (rsFlight.next() && rsFlight.getInt(1) == 0) {
                    stmt.executeUpdate("INSERT INTO Flight (CarrierID, Origin, Destination, AirFare, SeatCapacityEconomyClass, SeatCapacityBusinessClass, SeatCapacityExecutiveClass) " +
                        "VALUES (1001, 'Chennai', 'Delhi', 5000, 100, 20, 10)");
                    stmt.executeUpdate("INSERT INTO Flight (CarrierID, Origin, Destination, AirFare, SeatCapacityEconomyClass, SeatCapacityBusinessClass, SeatCapacityExecutiveClass) " +
                        "VALUES (1001, 'Mumbai', 'Bangalore', 4000, 120, 25, 15)");
                    System.out.println("Default flights seeded successfully.");
                }
            }
            System.out.println("Database tables checked and initialized successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void createTableIfNotExists(Statement stmt, String tableName, String createSql) {
        try {
            stmt.executeUpdate(createSql);
            System.out.println("Created table: " + tableName);
        } catch (SQLException e) {
            if ("X0Y32".equalsIgnoreCase(e.getSQLState())) {
                System.out.println("Table " + tableName + " already exists.");
            } else {
                System.err.println("Error creating table " + tableName + ": " + e.getMessage());
            }
        }
    }
}
