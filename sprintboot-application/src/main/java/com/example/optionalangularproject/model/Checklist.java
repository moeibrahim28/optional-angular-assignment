package com.example.optionalangularproject.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Checklists")
@Table(name = "\"Checklists\"")
@Getter
@Setter
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "checklists_itemslists",
            joinColumns = @JoinColumn(name = "checklists_id"),
            inverseJoinColumns = @JoinColumn(name = "items_id"))
    private List<Item> itemList = new ArrayList<>();
}
