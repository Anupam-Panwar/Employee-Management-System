package com.example.ems.repository;

import com.example.ems.enityModels.Department;
import org.springframework.data.repository.CrudRepository;

public interface DepartmentRepository extends CrudRepository<Department, String> {
    //all CRUD Database Methods
}
