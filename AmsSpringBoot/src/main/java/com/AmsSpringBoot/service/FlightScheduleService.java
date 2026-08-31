//package com.AmsSpringBoot.service;
//
//import com.AmsSpringBoot.bean.FlightSchedule;
//import com.AmsSpringBoot.dao.FlightScheduleDAO;
//
//
//import java.sql.SQLException;
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//
//
//@Service
//public class FlightScheduleService {
//
//    public String addSchedule(FlightSchedule schedule) throws SQLException {
//        boolean success = FlightScheduleDAO.insertFlightSchedule(schedule);
//        return success ? "Schedule Added Successfully" : "Failed to Add Schedule";
//    }
//
//    public List<FlightSchedule> getAllSchedules() throws SQLException {
//        return FlightScheduleDAO.getAllFlightSchedules();
//    }
//
//    public FlightSchedule getScheduleById(int id) throws SQLException {
//        return FlightScheduleDAO.getFlightScheduleById(id);
//    }
//
//    public String deleteSchedule(int id) throws SQLException {
//        boolean success = FlightScheduleDAO.deleteFlightSchedule(id);
//        return success ? "Deleted Successfully" : "Failed to Delete";
//    }
//
//    public String updateSchedule(FlightSchedule schedule) throws SQLException {
//        boolean success = FlightScheduleDAO.updateFlightSchedule(schedule);
//        return success ? "Updated Successfully" : "Failed to Update";
//    }
//    
//    public List<FlightSchedule> getSchedulesByFlightId(int flightId) {
//        try {
//            return FlightScheduleDAO.getSchedulesByFlightId(flightId);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    public int addSchedules(List<FlightSchedule> schedules) {
//        int count = 0;
//        for (FlightSchedule schedule : schedules) {
//            try {
//                if (FlightScheduleDAO.insertFlightSchedule(schedule)) {
//                    count++;
//                }
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
//        }
//        return count;
//    }
//}
//



package com.AmsSpringBoot.service;

import com.AmsSpringBoot.bean.FlightSchedule;
import com.AmsSpringBoot.dao.FlightScheduleDAO;
import java.sql.SQLException;
import java.util.List;

public class FlightScheduleService {

    public String addSchedule(FlightSchedule schedule) throws SQLException {
        boolean success = FlightScheduleDAO.insertFlightSchedule(schedule);
        return success ? "Schedule Added Successfully" : "Failed to Add Schedule";
    }

    public List<FlightSchedule> getAllSchedules() throws SQLException {
        return FlightScheduleDAO.getAllFlightSchedules();
    }

    public FlightSchedule getScheduleById(int id) throws SQLException {
        return FlightScheduleDAO.getFlightScheduleById(id);
    }

    public String deleteSchedule(int id) throws SQLException {
        boolean success = FlightScheduleDAO.deleteFlightSchedule(id);
        return success ? "Deleted Successfully" : "Failed to Delete";
    }

    public String updateSchedule(FlightSchedule schedule) throws SQLException {
        boolean success = FlightScheduleDAO.updateFlightSchedule(schedule);
        return success ? "Updated Successfully" : "Failed to Update";
    }

    public List<FlightSchedule> getSchedulesByFlightId(int flightId) throws SQLException {
        return FlightScheduleDAO.getSchedulesByFlightId(flightId);
    }

    public String validateSchedules(List<FlightSchedule> schedules, int flightId) throws SQLException {
        List<FlightSchedule> existing = getSchedulesByFlightId(flightId);
        int duplicateCount = 0;
        
        for (FlightSchedule schedule : schedules) {
            for (FlightSchedule existingSchedule : existing) {
                if (schedule.getDateOfTravel().equals(existingSchedule.getDateOfTravel()) &&
                    schedule.getDepartureTime().equals(existingSchedule.getDepartureTime())) {
                    duplicateCount++;
                    break;
                }
            }
        }
        
        return "Validation complete. Found " + duplicateCount + " duplicate schedules out of " + schedules.size();
    }

    public String bulkInsertSchedules(List<FlightSchedule> schedules) throws SQLException {
        int successCount = 0;
        for (FlightSchedule schedule : schedules) {
            if (FlightScheduleDAO.insertFlightSchedule(schedule)) {
                successCount++;
            }
        }
        return "Bulk insert completed. Successfully added " + successCount + " out of " + schedules.size() + " schedules";
    }
}