package com.example.optionalangularproject.repositories;

import com.example.optionalangularproject.model.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
}
