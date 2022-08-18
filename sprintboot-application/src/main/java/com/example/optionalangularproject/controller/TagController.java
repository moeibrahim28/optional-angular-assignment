package com.example.optionalangularproject.controller;

import com.example.optionalangularproject.model.Item;
import com.example.optionalangularproject.model.Tag;
import com.example.optionalangularproject.repositories.ItemRepository;
import com.example.optionalangularproject.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping("/tags")
    public List<Tag> getItems() {
        return (List<Tag>) tagRepository.findAll();
    }

    @GetMapping("/tags/{id}")
    public Tag getTagByID(@PathVariable Long id) {
        return tagRepository.findById(id).get();
    }


    @PostMapping("/tags")
    void addTag(@RequestBody Tag tag) {
        tagRepository.save(tag);
    }
}
