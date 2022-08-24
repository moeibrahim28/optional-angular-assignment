package com.example.optionalangularproject.controller;

import com.example.optionalangularproject.model.Checklist;
import com.example.optionalangularproject.repositories.UserRepository;
import com.example.optionalangularproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    // standard constructors
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    void update(@RequestBody User user){
        if(userRepository.existsById(user.getId())){
            User user1 = userRepository.findById(user.getId()).get();
            user1=user;
            userRepository.save(user1);
        }
    }
}