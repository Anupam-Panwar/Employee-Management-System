package com.example.ems.service;

import com.example.ems.enityModels.Department;
import com.example.ems.enityModels.Employee;
import com.example.ems.enityModels.Login;
import com.example.ems.enityModels.Role;
import com.example.ems.repository.DepartmentRepository;
import com.example.ems.repository.EmployeeRepository;
import com.example.ems.repository.LoginRepository;
import com.example.ems.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public String authenticate(Login login) {
        Optional<Login> dbLoginRaw = loginRepository.findById(login.getEmail());
        if(!dbLoginRaw.isPresent())
            return "Failure";

        Optional<Employee> dbEmployeeRaw = employeeRepository.findById(login.getEmail());
        if(!dbEmployeeRaw.isPresent())
            return "Failure";
        else{
            Login dbLogin = dbLoginRaw.get();
            if(dbLogin.getPassword().equals(login.getPassword()))
                return "Success";
            else
                return "Failure";
        }

    }

    public String updateEmployee(Employee employee) {
        Optional<Employee> employeedbRaw = employeeRepository.findById(employee.getEmail());
        if(!employeedbRaw.isPresent())
            return "Failure";
        else {
            employeeRepository.save(employee);
            return "Success";
        }

    }

    public String deleteEmployee(String email) {
        Optional<Employee> employeeRaw = employeeRepository.findById(email);
        if(!employeeRaw.isPresent())
            return "Failure";
        employeeRepository.delete(employeeRaw.get());
        return "Success";
    }

    public String deleteRole(String role) {
        Optional<Role> roleRaw = roleRepository.findById(role);
        if(!roleRaw.isPresent())
            return "Failure";

        List<Employee> employees = employeeRepository.getEmployeeByRole(role);
        for(Employee employee : employees)
            employeeRepository.delete(employee);

        roleRepository.delete(roleRaw.get());
        return "Success";
    }

    public String deleteDepartment(String department) {
        Optional<Department> departmentRaw = departmentRepository.findById(department);
        if(!departmentRaw.isPresent())
            return "Failure";

        List<Employee> employees = employeeRepository.getEmployeeByDepartment(department);
        for(Employee employee : employees)
            employeeRepository.delete(employee);

        departmentRepository.delete(departmentRaw.get());
        return "Success";
    }

    public String addEmployee(Employee employee) {
        Optional<Employee> employeedbRaw = employeeRepository.findById(employee.getEmail());
        if(employeedbRaw.isPresent())
            return "Failure";
        else {
            employeeRepository.save(employee);
            return "Success";
        }
    }

    public String addRole(Role role) {
        Optional<Role> roleRaw = roleRepository.findById(role.getName());
        if(roleRaw.isPresent())
            return "Failure";
        else {
            roleRepository.save(role);
            return "Success";
        }
    }

    public String addDepartment(Department department) {
        Optional<Department> departmentRaw = departmentRepository.findById(department.getName());
        if(departmentRaw.isPresent())
            return "Failure";
        else {
            departmentRepository.save(department);
            return "Success";
        }
    }

    public List<Role> getRoles() {
        List<Role> response = (List<Role>) roleRepository.findAll();
        return response;
    }

    public List<Department> getDepartment() {
        List<Department> response = (List<Department>) departmentRepository.findAll();
        return response;
    }
}
