package com.example.ems.repository;

import com.example.ems.enityModels.Login;
import org.springframework.data.repository.CrudRepository;

public interface LoginRepository extends CrudRepository<Login, String> {
    //all CRUD Database Methods
}