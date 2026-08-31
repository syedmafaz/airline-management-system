package com.AmsSpringBoot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.AmsSpringBoot.bean.User;
import com.AmsSpringBoot.dao.UserDAO;

//@Service
//public class UserService {
//    public User login(String username, String password) {
//        return UserDAO.authenticateUser(username, password);
//    }
//
//    public boolean register(User user) {
//        return UserDAO.insertUser(user) > 0;
//    }
//}
//



@Service
public class UserService {
    public User login(String username, String password) {
        return UserDAO.authenticateUser(username, password);
    }

    public boolean register(User user) {
        return UserDAO.insertUser(user) > 0;
    }

    public User getUserById(int userId) {
        return UserDAO.getUserById(userId);
    }

    public boolean updateUser(User user) {
        return UserDAO.updateUser(user);
 }
    
    public List<User> getAllUsers() {
        return UserDAO.getAllUsers();
    }

    public boolean deleteUserById(int id) {
        return UserDAO.deleteUser(id);
    }

}
