package com.example.optionalangularproject.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "Users")
@Table(name = "\"Users\"")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String email;

    // standard constructors / setters / getters / toString
}