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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserController userController;


    @GetMapping("/checklists")
    public List<Checklist> getChecklists() {
        return checklistRepository.findAll();
    }

    @PostMapping("/checklists")
    void addChecklist(@RequestBody Checklist checklist) {
        Checklist newChecklist = new Checklist();

            User user = userRepository.findById(checklist.getUser().getId()).get();

        newChecklist.setName(checklist.getName());
        
        for (int i = 0; i < checklist.getItemList().size(); i++) {
            if (itemRepository.existsById(checklist.getItemList().get(i).getId())) {
                Item item = checklist.getItemList().get(i);
                newChecklist.getItemList().add(item);
            }
            else{
                Item item = new Item();
                item.setName(checklist.getItemList().get(i).getName());
                itemRepository.save(item);
                newChecklist.getItemList().add(item);
            }
        }
        for(int i =0; i<checklist.getTags().size();i++){
            newChecklist.getTags().add(checklist.getTags().get(i));
        }
        newChecklist.setUser(user);
        user.getChecklists().add(newChecklist);
        newChecklist.setIsChecked(checklist.getIsChecked());
        newChecklist.setProgress(0.0);
        checklistRepository.save(newChecklist);
    }

    @PutMapping("/checklists/{id}")
    void update(@RequestBody Checklist checklist){
        if(checklistRepository.existsById(checklist.getId())){
            Checklist checklist1 = checklistRepository.findById(checklist.getId()).get();
            checklist1=checklist;
            checklistRepository.save(checklist1);
        }
    }
}
