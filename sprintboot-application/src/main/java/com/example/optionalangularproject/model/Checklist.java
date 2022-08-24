package com.example.optionalangularproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private double progress;

    @JsonIgnoreProperties("checklists")
    @ManyToOne
    private User user;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    @ElementCollection
    private List<Boolean>  isChecked= new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "checklists_itemsLists",
            joinColumns = @JoinColumn(name = "checklist_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    List<Item> itemList=new ArrayList<>();
}
