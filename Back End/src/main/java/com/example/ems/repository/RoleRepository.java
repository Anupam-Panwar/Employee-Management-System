package com.example.ems.repository;

import com.example.ems.enityModels.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, String> {
    //all CRUD Database Methods
}