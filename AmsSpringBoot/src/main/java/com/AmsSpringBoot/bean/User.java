package com.AmsSpringBoot.bean;



import java.sql.Date;

public class User {
    private int userId;
    private String userName;
    private String password;
    private long phone;
    private String emailId;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String country;
    private long zipCode;
    private Date dob;
    private String role;
    //private String userCategory;

    // Getters and Setters
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public long getPhone() { return phone; }
    public void setPhone(long phone) { this.phone = phone; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public String getAddress1() { return address1; }
    public void setAddress1(String address1) { this.address1 = address1; }

    public String getAddress2() { return address2; }
    public void setAddress2(String address2) { this.address2 = address2; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public long getZipCode() { return zipCode; }
    public void setZipCode(long zipCode) { this.zipCode = zipCode; }

    public Date getDob() { return dob; }
    public void setDob(Date dob) { this.dob = dob; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

//    public String getUserCategory() { return userCategory; }
//    public void setUserCategory(String userCategory) { this.userCategory = userCategory; }
}
