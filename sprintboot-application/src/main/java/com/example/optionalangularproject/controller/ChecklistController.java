package com.example.optionalangularproject.controller;

import com.example.optionalangularproject.model.Checklist;
import com.example.optionalangularproject.model.Item;
import com.example.optionalangularproject.model.User;
import com.example.optionalangularproject.repositories.ChecklistRepository;
import com.example.optionalangularproject.repositories.ItemRepository;
import com.example.optionalangularproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ChecklistController {


    // standard constructors
    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/checklists")
    public List<Checklist> getChecklists() {
        return (List<Checklist>) checklistRepository.findAll();
    }

    @PostMapping("/checklists")
    void addChecklist(@RequestBody Checklist checklist) {
        Checklist newChecklist = new Checklist();
        for(int i = 0; i<checklist.getItemList().size();i++){
            if(itemRepository.existsById(checklist.getItemList().get(i).getId())){
                Item item = checklist.getItemList().get(i);
                item.getChecklists().add(newChecklist);
                newChecklist.getItemList().add(item);
            }
        }
        newChecklist.setName(checklist.getName());
        checklistRepository.save(newChecklist);
    }
}
