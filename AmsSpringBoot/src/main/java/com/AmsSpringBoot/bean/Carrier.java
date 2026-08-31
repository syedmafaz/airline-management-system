package com.AmsSpringBoot.bean;

public class Carrier {
    private int carrierID;
    private String carrierName;
    private int discountPercentageThirtyDaysAdvanceBooking;
    private int discountPercentageSixtyDaysAdvanceBooking;
    private int discountPercentageNinteyDaysAdvanceBooking;
    private int refundPercentageForTicketCancellation2DaysBeforeTravelDate;
    private int refundPercentageForTicketCancellation10DaysBeforeTravelDate;
    private int refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate;
    private int silverUserDiscount;
    private int goldUserDiscount;
    private int platinumUserDiscount;
	public int getCarrierID() {
		return carrierID;
	}
	public void setCarrierID(int carrierID) {
		this.carrierID = carrierID;
	}
	public String getCarrierName() {
		return carrierName;
	}
	public void setCarrierName(String carrierName) {
		this.carrierName = carrierName;
	}
	public int getDiscountPercentageThirtyDaysAdvanceBooking() {
		return discountPercentageThirtyDaysAdvanceBooking;
	}
	public void setDiscountPercentageThirtyDaysAdvanceBooking(int discountPercentageThirtyDaysAdvanceBooking) {
		this.discountPercentageThirtyDaysAdvanceBooking = discountPercentageThirtyDaysAdvanceBooking;
	}
	public int getDiscountPercentageSixtyDaysAdvanceBooking() {
		return discountPercentageSixtyDaysAdvanceBooking;
	}
	public void setDiscountPercentageSixtyDaysAdvanceBooking(int discountPercentageSixtyDaysAdvanceBooking) {
		this.discountPercentageSixtyDaysAdvanceBooking = discountPercentageSixtyDaysAdvanceBooking;
	}
	public int getDiscountPercentageNinteyDaysAdvanceBooking() {
		return discountPercentageNinteyDaysAdvanceBooking;
	}
	public void setDiscountPercentageNinteyDaysAdvanceBooking(int discountPercentageNinteyDaysAdvanceBooking) {
		this.discountPercentageNinteyDaysAdvanceBooking = discountPercentageNinteyDaysAdvanceBooking;
	}
	public int getRefundPercentageForTicketCancellation2DaysBeforeTravelDate() {
		return refundPercentageForTicketCancellation2DaysBeforeTravelDate;
	}
	public void setRefundPercentageForTicketCancellation2DaysBeforeTravelDate(
			int refundPercentageForTicketCancellation2DaysBeforeTravelDate) {
		this.refundPercentageForTicketCancellation2DaysBeforeTravelDate = refundPercentageForTicketCancellation2DaysBeforeTravelDate;
	}
	public int getRefundPercentageForTicketCancellation10DaysBeforeTravelDate() {
		return refundPercentageForTicketCancellation10DaysBeforeTravelDate;
	}
	public void setRefundPercentageForTicketCancellation10DaysBeforeTravelDate(
			int refundPercentageForTicketCancellation10DaysBeforeTravelDate) {
		this.refundPercentageForTicketCancellation10DaysBeforeTravelDate = refundPercentageForTicketCancellation10DaysBeforeTravelDate;
	}
	public int getRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate() {
		return refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate;
	}
	public void setRefundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate(
			int refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate) {
		this.refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate = refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate;
	}
	public int getSilverUserDiscount() {
		return silverUserDiscount;
	}
	public void setSilverUserDiscount(int silverUserDiscount) {
		this.silverUserDiscount = silverUserDiscount;
	}
	public int getGoldUserDiscount() {
		return goldUserDiscount;
	}
	public void setGoldUserDiscount(int goldUserDiscount) {
		this.goldUserDiscount = goldUserDiscount;
	}
	public int getPlatinumUserDiscount() {
		return platinumUserDiscount;
	}
	public void setPlatinumUserDiscount(int platinumUserDiscount) {
		this.platinumUserDiscount = platinumUserDiscount;
	}
	public Carrier(int carrierID, String carrierName, int discountPercentageThirtyDaysAdvanceBooking,
			int discountPercentageSixtyDaysAdvanceBooking, int discountPercentageNinteyDaysAdvanceBooking,
			int refundPercentageForTicketCancellation2DaysBeforeTravelDate,
			int refundPercentageForTicketCancellation10DaysBeforeTravelDate,
			int refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate, int silverUserDiscount,
			int goldUserDiscount, int platinumUserDiscount) {
		super();
		this.carrierID = carrierID;
		this.carrierName = carrierName;
		this.discountPercentageThirtyDaysAdvanceBooking = discountPercentageThirtyDaysAdvanceBooking;
		this.discountPercentageSixtyDaysAdvanceBooking = discountPercentageSixtyDaysAdvanceBooking;
		this.discountPercentageNinteyDaysAdvanceBooking = discountPercentageNinteyDaysAdvanceBooking;
		this.refundPercentageForTicketCancellation2DaysBeforeTravelDate = refundPercentageForTicketCancellation2DaysBeforeTravelDate;
		this.refundPercentageForTicketCancellation10DaysBeforeTravelDate = refundPercentageForTicketCancellation10DaysBeforeTravelDate;
		this.refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate = refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate;
		this.silverUserDiscount = silverUserDiscount;
		this.goldUserDiscount = goldUserDiscount;
		this.platinumUserDiscount = platinumUserDiscount;
	}
	public Carrier() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}
