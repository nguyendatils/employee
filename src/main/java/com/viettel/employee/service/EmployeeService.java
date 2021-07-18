package com.viettel.employee.service;

import com.viettel.employee.model.Employee;
import com.viettel.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> findAll(Integer limit) {
        return Optional.ofNullable(limit).map(value -> employeeRepository.findAll(PageRequest.of(0, value)).getContent())
                .orElseGet(() -> employeeRepository.findAll());
    }

    public Employee add(Employee employee) {
        return employeeRepository.save(employee);
    }

}
