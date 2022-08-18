package com.example.optionalangularproject.repositories;

import com.example.optionalangularproject.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
