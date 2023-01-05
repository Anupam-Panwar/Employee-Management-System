package com.example.ems.repository;

import com.example.ems.enityModels.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmployeeRepository extends CrudRepository<Employee, String> {
    //all CRUD Database Methods
    public List<Employee> getEmployeeByRole(String role);

    public List<Employee> getEmployeeByDepartment(String department);
}