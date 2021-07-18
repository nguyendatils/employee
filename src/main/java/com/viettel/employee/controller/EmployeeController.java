package com.viettel.employee.controller;

import com.viettel.employee.model.Employee;
import com.viettel.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employee/get")
    public ResponseEntity<List<Employee>> getAll(){
        List<Employee> employeesList = employeeRepository.findAll();
        return ResponseEntity.ok(employeesList);
    }
    @PostMapping("/employee")
    public ResponseEntity<Employee> add(@RequestBody Employee employee){
        return ResponseEntity.ok(employeeRepository.save(employee));
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> update(@RequestBody Employee employee, @PathVariable long id) throws ResourceNotFoundException{
        Employee employee1 = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + id));;
//        employee1.setId(employee.getId());
        employee1.setName(employee.getName());
        employee1.setPhone_number(employee.getPhone_number());
        employee1.setEmail(employee.getEmail());
        return ResponseEntity.ok(employeeRepository.save(employee1));
    }




    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> find(@PathVariable long id){
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()){
            return ResponseEntity.ok(employee.get());
        }else throw new RuntimeException("Failed");
    }

    @DeleteMapping("/employee/{id}")
    public String delete(@PathVariable long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if(employee.isPresent()){
            employeeRepository.delete(employee.get());
            return "Delete employee have id:" + id;
        }else return "Failed";

    }
}
//@Controller
//public class EmployeeController {
//    @Autowired
//    private EmployeeService employeeService;
//
//    @GetMapping("/employee")
//    public String index(Model model, @RequestParam(value = "limit", required = false) Integer limit) {
//        model.addAttribute("employeeList", employeeService.findAll(limit));
//        return "listEmployee";
//    }
//
//    @GetMapping("/employee")
//    public String addEmployee(Model model) {
//        model.addAttribute("employee", new Employee());
//        return "addEmployee";
//    }
//
//    @PostMapping("/employee")
//    public String addEmployee(@ModelAttribute Employee employee) {
//        return Optional.ofNullable(employeeService.add(employee))
//                .map(t -> "success")
//                .orElse("failed");
//    }
//
//}
