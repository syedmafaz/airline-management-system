//// Step 1: Create the FlightBooking.java bean
//package com.AmsSpringBoot.bean;
//
//public class FlightBooking {
//	private int bookingId;
//    private int flightScheduleId;
//    private int userId;
//    private String seatCategory;
//    private int numberOfTickets;
//    private int totalAmount;
//    private String passengerDetailsJson;
//    private String bookingStatus;
//    private int refundAmount; // New field
//    private String bookingDate; // New field
//    private int baseFare; // New field
//    private int discountAmount; // New field
//
//    public int getRefundAmount() {
//		return refundAmount;
//	}
//
//	public void setRefundAmount(int refundAmount) {
//		this.refundAmount = refundAmount;
//	}
//
//	public String getBookingDate() {
//		return bookingDate;
//	}
//
//	public void setBookingDate(String bookingDate) {
//		this.bookingDate = bookingDate;
//	}
//
//	public int getBaseFare() {
//		return baseFare;
//	}
//
//	public void setBaseFare(int baseFare) {
//		this.baseFare = baseFare;
//	}
//
//	public int getDiscountAmount() {
//		return discountAmount;
//	}
//
//	public void setDiscountAmount(int discountAmount) {
//		this.discountAmount = discountAmount;
//	}
//
//	public int getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(int bookingId) {
//        this.bookingId = bookingId;
//    }
//
//    public int getFlightScheduleId() {
//        return flightScheduleId;
//    }
//
//    public void setFlightScheduleId(int flightScheduleId) {
//        this.flightScheduleId = flightScheduleId;
//    }
//
//    public int getUserId() {
//        return userId;
//    }
//
//    public void setUserId(int userId) {
//        this.userId = userId;
//    }
//
//    public String getSeatCategory() {
//        return seatCategory;
//    }
//
//    public void setSeatCategory(String seatCategory) {
//        this.seatCategory = seatCategory;
//    }
//
//    public int getNumberOfTickets() {
//        return numberOfTickets;
//    }
//
//    public void setNumberOfTickets(int numberOfTickets) {
//        this.numberOfTickets = numberOfTickets;
//    }
//
//    public int getTotalAmount() {
//        return totalAmount;
//    }
//
//    public void setTotalAmount(int totalAmount) {
//        this.totalAmount = totalAmount;
//    }
//
//    public String getPassengerDetailsJson() {
//        return passengerDetailsJson;
//    }
//
//    public void setPassengerDetailsJson(String passengerDetailsJson) {
//        this.passengerDetailsJson = passengerDetailsJson;
//    }
//
//    public String getBookingStatus() {
//        return bookingStatus;
//    }
//
//    public void setBookingStatus(String bookingStatus) {
//        this.bookingStatus = bookingStatus;
//    }
//}



//package com.AmsSpringBoot.bean;
//
//public class FlightBooking {
//    private int bookingId;
//    private int flightScheduleId;
//    private int userId;
//    private String seatCategory;
//    private int numberOfTickets;
//    private int totalAmount;
//    private String passengerDetailsJson;
//    private String bookingStatus;
//    private int refundAmount = 0;
//    private String bookingDate;
//    private int baseFare = 0;
//    private int discountAmount = 0;
//
//    // Default constructor
//    public FlightBooking() {}
//
//    // Parameterized constructor
//    public FlightBooking(int flightScheduleId, int userId, String seatCategory, 
//                        int numberOfTickets, int totalAmount, String passengerDetailsJson) {
//        this.flightScheduleId = flightScheduleId;
//        this.userId = userId;
//        this.seatCategory = seatCategory;
//        this.numberOfTickets = numberOfTickets;
//        this.totalAmount = totalAmount;
//        this.passengerDetailsJson = passengerDetailsJson;
//        this.bookingStatus = "booked";
//    }
//
//    // Getters and Setters
//    public int getBookingId() { return bookingId; }
//    public void setBookingId(int bookingId) { this.bookingId = bookingId; }
//
//    public int getFlightScheduleId() { return flightScheduleId; }
//    public void setFlightScheduleId(int flightScheduleId) { this.flightScheduleId = flightScheduleId; }
//
//    public int getUserId() { return userId; }
//    public void setUserId(int userId) { this.userId = userId; }
//
//    public String getSeatCategory() { return seatCategory; }
//    public void setSeatCategory(String seatCategory) { this.seatCategory = seatCategory; }
//
//    public int getNumberOfTickets() { return numberOfTickets; }
//    public void setNumberOfTickets(int numberOfTickets) { this.numberOfTickets = numberOfTickets; }
//
//    public int getTotalAmount() { return totalAmount; }
//    public void setTotalAmount(int totalAmount) { this.totalAmount = totalAmount; }
//
//    public String getPassengerDetailsJson() { return passengerDetailsJson; }
//    public void setPassengerDetailsJson(String passengerDetailsJson) { this.passengerDetailsJson = passengerDetailsJson; }
//
//    public String getBookingStatus() { return bookingStatus; }
//    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }
//
//    public int getRefundAmount() { return refundAmount; }
//    public void setRefundAmount(int refundAmount) { this.refundAmount = refundAmount; }
//
//    public String getBookingDate() { return bookingDate; }
//    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }
//
//    public int getBaseFare() { return baseFare; }
//    public void setBaseFare(int baseFare) { this.baseFare = baseFare; }
//
//    public int getDiscountAmount() { return discountAmount; }
//    public void setDiscountAmount(int discountAmount) { this.discountAmount = discountAmount; }
//
//    @Override
//    public String toString() {
//        return "FlightBooking{" +
//                "bookingId=" + bookingId +
//                ", flightScheduleId=" + flightScheduleId +
//                ", userId=" + userId +
//                ", seatCategory='" + seatCategory + '\'' +
//                ", numberOfTickets=" + numberOfTickets +
//                ", totalAmount=" + totalAmount +
//                ", refundAmount=" + refundAmount +
//                ", bookingStatus='" + bookingStatus + '\'' +
//                '}';
//    }
//}



package com.AmsSpringBoot.bean;

public class FlightBooking {
    private int bookingId;
    private int flightScheduleId;
    private int userId;
    private String seatCategory;
    private int numberOfTickets;
    private int totalAmount;
    private int baseFare;
    private int discountAmount;
    private int refundAmount;
    private String passengerDetailsJson;
    private String bookingStatus;
    private String bookingDate;

    // Constructors
    public FlightBooking() {}
    
    public FlightBooking(int flightScheduleId, int userId, String seatCategory, 
                        int numberOfTickets, int totalAmount, String passengerDetailsJson) {
        this.flightScheduleId = flightScheduleId;
        this.userId = userId;
        this.seatCategory = seatCategory;
        this.numberOfTickets = numberOfTickets;
        this.totalAmount = totalAmount;
        this.passengerDetailsJson = passengerDetailsJson;
        this.bookingStatus = "booked";
    }

    // Getters and Setters
    public int getBookingId() { return bookingId; }
    public void setBookingId(int bookingId) { this.bookingId = bookingId; }

    public int getFlightScheduleId() { return flightScheduleId; }
    public void setFlightScheduleId(int flightScheduleId) { this.flightScheduleId = flightScheduleId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getSeatCategory() { return seatCategory; }
    public void setSeatCategory(String seatCategory) { this.seatCategory = seatCategory; }

    public int getNumberOfTickets() { return numberOfTickets; }
    public void setNumberOfTickets(int numberOfTickets) { this.numberOfTickets = numberOfTickets; }

    public int getTotalAmount() { return totalAmount; }
    public void setTotalAmount(int totalAmount) { this.totalAmount = totalAmount; }

    public int getBaseFare() { return baseFare; }
    public void setBaseFare(int baseFare) { this.baseFare = baseFare; }

    public int getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(int discountAmount) { this.discountAmount = discountAmount; }

    public int getRefundAmount() { return refundAmount; }
    public void setRefundAmount(int refundAmount) { this.refundAmount = refundAmount; }

    public String getPassengerDetailsJson() { return passengerDetailsJson; }
    public void setPassengerDetailsJson(String passengerDetailsJson) { this.passengerDetailsJson = passengerDetailsJson; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }
}
