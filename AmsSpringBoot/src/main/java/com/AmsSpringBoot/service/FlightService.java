package com.AmsSpringBoot.service;

import com.AmsSpringBoot.bean.Flight;
import com.AmsSpringBoot.dao.FlightDAO;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class FlightService {

    public boolean addFlight(Flight flight) {
        return FlightDAO.insertFlight(flight) > 0;
    }

    public boolean updateFlight(Flight flight) {
        return FlightDAO.updateFlight(flight);
    }

    public boolean deleteFlight(int id) {
        return FlightDAO.deleteFlight(id);
    }

    public List<Flight> getAllFlights() {
        return FlightDAO.getAllFlights();
    }

    public Flight getFlightById(int id) {
        return FlightDAO.getFlightById(id);
    }
    
    public int addFlights(List<Flight> flights) {
        int count = 0;
        for (Flight f : flights) {
            if (FlightDAO.insertFlight(f) > 0) {
                count++;
            }
        }
        return count;
    }
    
    
    public List<Flight> getFlightsByCarrierId(int carrierId) throws SQLException {
        return FlightDAO.getFlightsByCarrierId(carrierId);
    }
}
