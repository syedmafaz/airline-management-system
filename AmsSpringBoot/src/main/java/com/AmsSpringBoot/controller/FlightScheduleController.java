//package com.AmsSpringBoot.controller;
//
//import com.AmsSpringBoot.bean.FlightSchedule;
//import com.AmsSpringBoot.service.FlightScheduleService;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.SQLException;
//import java.util.List;
//
//@RestController
//@CrossOrigin(originPatterns = "*") // for Angular communication
//@RequestMapping("/api/flightschedule")
//public class FlightScheduleController {
//
//    FlightScheduleService service = new FlightScheduleService();
//
//    @PostMapping("/add")
//    public String addFlightSchedule(@RequestBody FlightSchedule schedule) {
//        try {
//            return service.addSchedule(schedule);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while adding schedule: " + e.getMessage();
//        }
//    }
//
//    @GetMapping("/list")
//    public List<FlightSchedule> getAllFlightSchedules() {
//        try {
//            return service.getAllSchedules();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @GetMapping("/search/{id}")
//    public FlightSchedule getFlightScheduleById(@PathVariable int id) {
//        try {
//            return service.getScheduleById(id);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @PutMapping("/update")
//    public String updateFlightSchedule(@RequestBody FlightSchedule schedule) {
//        try {
//            return service.updateSchedule(schedule);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while updating: " + e.getMessage();
//        }
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public String deleteFlightSchedule(@PathVariable int id) {
//        try {
//            return service.deleteSchedule(id);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while deleting: " + e.getMessage();
//        }
//    }
//    
//    
//    
//}



//package com.AmsSpringBoot.controller;
//
//import com.AmsSpringBoot.bean.FlightSchedule;
//import com.AmsSpringBoot.service.FlightScheduleService;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.SQLException;
//import java.util.List;
//
//@RestController
//@CrossOrigin(originPatterns = "*")
//@RequestMapping("/api/flightschedule")
//public class FlightScheduleController {
//
//    FlightScheduleService service = new FlightScheduleService();
//
//    @PostMapping("/add")
//    public String addFlightSchedule(@RequestBody FlightSchedule schedule) {
//        try {
//            return service.addSchedule(schedule);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while adding schedule: " + e.getMessage();
//        }
//    }
//
//    @GetMapping("/list")
//    public List<FlightSchedule> getAllFlightSchedules() {
//        try {
//            return service.getAllSchedules();
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @GetMapping("/search/{id}")
//    public FlightSchedule getFlightScheduleById(@PathVariable int id) {
//        try {
//            return service.getScheduleById(id);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
//
//    @PutMapping("/update")
//    public String updateFlightSchedule(@RequestBody FlightSchedule schedule) {
//        try {
//            return service.updateSchedule(schedule);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while updating: " + e.getMessage();
//        }
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public String deleteFlightSchedule(@PathVariable int id) {
//        try {
//            return service.deleteSchedule(id);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while deleting: " + e.getMessage();
//        }
//    }
//
//    @GetMapping("/flight/{flightId}")
//    public List<FlightSchedule> getSchedulesByFlightId(@PathVariable int flightId) throws SQLException {
//        return service.getSchedulesByFlightId(flightId);
//    }
//
//    @PostMapping("/bulk/validate/{flightId}")
//    public String validateBulkSchedules(@PathVariable int flightId, @RequestBody List<FlightSchedule> schedules) {
//        try {
//            return service.validateSchedules(schedules, flightId);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while validating schedules: " + e.getMessage();
//        }
//    }
//
//    @PostMapping("/bulk/insert/{flightId}")
//    public String insertBulkSchedules(@PathVariable int flightId, @RequestBody List<FlightSchedule> schedules) {
//        try {
//            return service.bulkInsertSchedules(schedules);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            return "Error while inserting schedules: " + e.getMessage();
//        }
//    }
//}



package com.AmsSpringBoot.controller;

import com.AmsSpringBoot.bean.FlightSchedule;
import com.AmsSpringBoot.service.FlightScheduleService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
@RequestMapping("/api/flightschedule")
public class FlightScheduleController {

    FlightScheduleService service = new FlightScheduleService();

    @PostMapping("/add")
    public String addFlightSchedule(@RequestBody FlightSchedule schedule) {
        try {
            return service.addSchedule(schedule);
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while adding schedule: " + e.getMessage();
        }
    }

    @GetMapping("/list")
    public List<FlightSchedule> getAllFlightSchedules() {
        try {
            return service.getAllSchedules();
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/search/{id}")
    public FlightSchedule getFlightScheduleById(@PathVariable int id) {
        try {
            return service.getScheduleById(id);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/update")
    public String updateFlightSchedule(@RequestBody FlightSchedule schedule) {
        try {
            return service.updateSchedule(schedule);
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while updating: " + e.getMessage();
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFlightSchedule(@PathVariable int id) {
        try {
            return service.deleteSchedule(id);
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while deleting: " + e.getMessage();
        }
    }

    @GetMapping("/flight/{flightId}")
    public List<FlightSchedule> getSchedulesByFlightId(@PathVariable int flightId) {
        try {
            return service.getSchedulesByFlightId(flightId);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/bulk/validate/{flightId}")
    public String validateBulkSchedules(@PathVariable int flightId, @RequestBody List<FlightSchedule> schedules) {
        try {
            return service.validateSchedules(schedules, flightId);
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while validating schedules: " + e.getMessage();
        }
    }

    @PostMapping("/bulk/insert/{flightId}")
    public String insertBulkSchedules(@PathVariable int flightId, @RequestBody List<FlightSchedule> schedules) {
        try {
            return service.bulkInsertSchedules(schedules);
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error while inserting schedules: " + e.getMessage();
        }
    }
}
