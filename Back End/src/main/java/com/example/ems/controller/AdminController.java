package com.example.ems.controller;

import com.example.ems.enityModels.Department;
import com.example.ems.enityModels.Employee;
import com.example.ems.enityModels.Login;
import com.example.ems.enityModels.Role;
import com.example.ems.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody Login login){
        String response = adminService.authenticate(login);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/roles/")
    public ResponseEntity<List<Role>> getRoles(){
        return new ResponseEntity<List<Role>>(adminService.getRoles(), HttpStatus.OK);
    }

    @GetMapping("/department/")
    public ResponseEntity<List<Department>> getDepartment(){
        return new ResponseEntity<List<Department>>(adminService.getDepartment(), HttpStatus.OK);
    }

    @PostMapping("/update/employee")
    public ResponseEntity<String> updateEmployee(@RequestBody Employee employee){
        String response = adminService.updateEmployee(employee);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/add/employee")
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee){
        String response = adminService.addEmployee(employee);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/add/role")
    public ResponseEntity<String> addRole(@RequestBody Role role){
        String response = adminService.addRole(role);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/add/department")
    public ResponseEntity<String> addDepartment(@RequestBody Department department){
        String response = adminService.addDepartment(department);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/remove/employee")
    public ResponseEntity<String> deleteEmployee(@RequestBody String email){
        String response = adminService.deleteEmployee(email);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/remove/role")
    public ResponseEntity<String> deleteRole(@RequestBody String role){
        String response = adminService.deleteRole(role);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/remove/department")
    public ResponseEntity<String> deleteDepartment(@RequestBody String department){
        String response = adminService.deleteDepartment(department);
        if(response.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(response, HttpStatus.OK);
        else
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
