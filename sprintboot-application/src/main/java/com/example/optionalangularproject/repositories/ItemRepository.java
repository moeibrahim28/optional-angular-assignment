package com.example.optionalangularproject.repositories;

import com.example.optionalangularproject.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
