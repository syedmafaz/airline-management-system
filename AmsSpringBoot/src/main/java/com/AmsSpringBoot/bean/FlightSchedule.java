//	package com.AmsSpringBoot.bean;
//
//import java.sql.Date;
//import java.sql.Time;
//
//public class FlightSchedule {
//
//    
//    private int flightScheduleId;
//
//    private int flightId;
//
//    private Date dateOfTravel;
//
//    private int businessClassBookedCount;
//    private int economyClassBookedCount;
//    private int executiveClassBookedCount;
//
//    private int businessClassFare;
//    private int economyClassFare;
//    private int executiveClassFare;
//    
//    private Date departureDate;
//    private Time departureTime;
//    private Date arrivalDate;
//    private Time arrivalTime;
//
//	public int getFlightScheduleId() {
//		return flightScheduleId;
//	}
//	public void setFlightScheduleId(int flightScheduleId) {
//		this.flightScheduleId = flightScheduleId;
//	}
//	public int getFlightId() {
//		return flightId;
//	}
//	public void setFlightId(int flightId) {
//		this.flightId = flightId;
//	}
//	public Date getDateOfTravel() {
//		return dateOfTravel;
//	}
//	public void setDateOfTravel(Date dateOfTravel) {
//		this.dateOfTravel = dateOfTravel;
//	}
//	public int getBusinessClassBookedCount() {
//		return businessClassBookedCount;
//	}
//	public void setBusinessClassBookedCount(int businessClassBookedCount) {
//		this.businessClassBookedCount = businessClassBookedCount;
//	}
//	public int getEconomyClassBookedCount() {
//		return economyClassBookedCount;
//	}
//	public void setEconomyClassBookedCount(int economyClassBookedCount) {
//		this.economyClassBookedCount = economyClassBookedCount;
//	}
//	public int getExecutiveClassBookedCount() {
//		return executiveClassBookedCount;
//	}
//	public void setExecutiveClassBookedCount(int executiveClassBookedCount) {
//		this.executiveClassBookedCount = executiveClassBookedCount;
//	}
//	public int getBusinessClassFare() {
//		return businessClassFare;
//	}
//	public void setBusinessClassFare(int businessClassFare) {
//		this.businessClassFare = businessClassFare;
//	}
//	public int getEconomyClassFare() {
//		return economyClassFare;
//	}
//	public void setEconomyClassFare(int economyClassFare) {
//		this.economyClassFare = economyClassFare;
//	}
//	public int getExecutiveClassFare() {
//		return executiveClassFare;
//	}
//	public void setExecutiveClassFare(int executiveClassFare) {
//		this.executiveClassFare = executiveClassFare;
//	}
//	public FlightSchedule(int flightScheduleId, int flightId, Date dateOfTravel, int businessClassBookedCount,
//			int economyClassBookedCount, int executiveClassBookedCount, int businessClassFare, int economyClassFare,
//			int executiveClassFare) {
//		super();
//		this.flightScheduleId = flightScheduleId;
//		this.flightId = flightId;
//		this.dateOfTravel = dateOfTravel;
//		this.businessClassBookedCount = businessClassBookedCount;
//		this.economyClassBookedCount = economyClassBookedCount;
//		this.executiveClassBookedCount = executiveClassBookedCount;
//		this.businessClassFare = businessClassFare;
//		this.economyClassFare = economyClassFare;
//		this.executiveClassFare = executiveClassFare;
//	}
//	public FlightSchedule() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
//    // Getters and Setters
//    // (You can generate these using Lombok or manually)
//}




// Updated FlightSchedule.java
package com.AmsSpringBoot.bean;

import java.sql.Date;
import java.sql.Time;

public class FlightSchedule {

    private int flightScheduleId;
    private int flightId;
    private Date dateOfTravel;
    private Date departureDate;
    private Time departureTime;
    private Date arrivalDate;
    private Time arrivalTime;
    private int businessClassBookedCount;
    private int economyClassBookedCount;
    private int executiveClassBookedCount;
    private int businessClassFare;
    private int economyClassFare;
    private int executiveClassFare;

    // Getters and Setters

    public int getFlightScheduleId() {
        return flightScheduleId;
    }

    public void setFlightScheduleId(int flightScheduleId) {
        this.flightScheduleId = flightScheduleId;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public Date getDateOfTravel() {
        return dateOfTravel;
    }

    public void setDateOfTravel(Date dateOfTravel) {
        this.dateOfTravel = dateOfTravel;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Time getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(Time departureTime) {
        this.departureTime = departureTime;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public Time getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(Time arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getBusinessClassBookedCount() {
        return businessClassBookedCount;
    }

    public void setBusinessClassBookedCount(int businessClassBookedCount) {
        this.businessClassBookedCount = businessClassBookedCount;
    }

    public int getEconomyClassBookedCount() {
        return economyClassBookedCount;
    }

    public void setEconomyClassBookedCount(int economyClassBookedCount) {
        this.economyClassBookedCount = economyClassBookedCount;
    }

    public int getExecutiveClassBookedCount() {
        return executiveClassBookedCount;
    }

    public void setExecutiveClassBookedCount(int executiveClassBookedCount) {
        this.executiveClassBookedCount = executiveClassBookedCount;
    }

    public int getBusinessClassFare() {
        return businessClassFare;
    }

    public void setBusinessClassFare(int businessClassFare) {
        this.businessClassFare = businessClassFare;
    }

    public int getEconomyClassFare() {
        return economyClassFare;
    }

    public void setEconomyClassFare(int economyClassFare) {
        this.economyClassFare = economyClassFare;
    }

    public int getExecutiveClassFare() {
        return executiveClassFare;
    }

    public void setExecutiveClassFare(int executiveClassFare) {
        this.executiveClassFare = executiveClassFare;
    }

    public FlightSchedule() {}

    public FlightSchedule(int flightScheduleId, int flightId, Date dateOfTravel, Date departureDate, Time departureTime,
                          Date arrivalDate, Time arrivalTime, int businessClassBookedCount,
                          int economyClassBookedCount, int executiveClassBookedCount,
                          int businessClassFare, int economyClassFare, int executiveClassFare) {
        this.flightScheduleId = flightScheduleId;
        this.flightId = flightId;
        this.dateOfTravel = dateOfTravel;
        this.departureDate = departureDate;
        this.departureTime = departureTime;
        this.arrivalDate = arrivalDate;
        this.arrivalTime = arrivalTime;
        this.businessClassBookedCount = businessClassBookedCount;
        this.economyClassBookedCount = economyClassBookedCount;
        this.executiveClassBookedCount = executiveClassBookedCount;
        this.businessClassFare = businessClassFare;
        this.economyClassFare = economyClassFare;
        this.executiveClassFare = executiveClassFare;
    }
}
