package com.example.optionalangularproject.controller;

import com.example.optionalangularproject.model.Checklist;
import com.example.optionalangularproject.model.Item;
import com.example.optionalangularproject.repositories.ChecklistRepository;
import com.example.optionalangularproject.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/items")
    public List<Item> getItems() {
        return (List<Item>) itemRepository.findAll();
    }

    @GetMapping("/items/{id}")
    public Item getItemByID(@PathVariable Long id) {
        return itemRepository.findById(id).get();
    }


    @PostMapping("/items")
    void addItem(@RequestBody Item item) {
        itemRepository.save(item);
    }
}
