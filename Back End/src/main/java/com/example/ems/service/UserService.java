package com.example.ems.service;

import com.example.ems.enityModels.Employee;
import com.example.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private EmployeeRepository employeeRepository;
    public List<Employee> getEmployees() {
        List<Employee> response = (List<Employee>) employeeRepository.findAll();
        return response;
    }
}
