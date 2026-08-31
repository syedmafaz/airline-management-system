package com.AmsSpringBoot.bean;

public class Flight {
    private int flightId;
    private int carrierId;
    private String origin;
    private String destination;
    private int airFare;
    private int seatCapacityBusinessClass;
    private int seatCapacityEconomyClass;
    private int seatCapacityExecutiveClass;

    public int getFlightId() {
        return flightId;
    }
    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }
    public int getCarrierId() {
        return carrierId;
    }
    public void setCarrierId(int carrierId) {
        this.carrierId = carrierId;
    }  
    public String getOrigin() {
        return origin;
    }
    public void setOrigin(String origin) {
        this.origin = origin;
    }
    public String getDestination() {
        return destination;
    }
    public void setDestination(String destination) {
        this.destination = destination;
    }
    public int getAirFare() {
        return airFare;
    }
    public void setAirFare(int airFare) {
        this.airFare = airFare;
    }
    public int getSeatCapacityBusinessClass() {
        return seatCapacityBusinessClass;
    }
    public void setSeatCapacityBusinessClass(int seatCapacityBusinessClass) {
        this.seatCapacityBusinessClass = seatCapacityBusinessClass;
    }
    public int getSeatCapacityEconomyClass() {
        return seatCapacityEconomyClass;
    }
    public void setSeatCapacityEconomyClass(int seatCapacityEconomyClass) {
        this.seatCapacityEconomyClass = seatCapacityEconomyClass;
    }
    public int getSeatCapacityExecutiveClass() {
        return seatCapacityExecutiveClass;
    }
    public void setSeatCapacityExecutiveClass(int seatCapacityExecutiveClass) {
        this.seatCapacityExecutiveClass = seatCapacityExecutiveClass;
    }

    public Flight(int flightId, int carrierId, String origin, String destination, int airFare,
                  int seatCapacityBusinessClass, int seatCapacityEconomyClass, int seatCapacityExecutiveClass) {
        super();
        this.flightId = flightId;
        this.carrierId = carrierId;
        this.origin = origin;
        this.destination = destination;
        this.airFare = airFare;
        this.seatCapacityBusinessClass = seatCapacityBusinessClass;
        this.seatCapacityEconomyClass = seatCapacityEconomyClass;
        this.seatCapacityExecutiveClass = seatCapacityExecutiveClass;
    }

    public Flight() {
        super();
    }
}
