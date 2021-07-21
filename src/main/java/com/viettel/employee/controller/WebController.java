package com.viettel.employee.controller;

import com.viettel.employee.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    @RequestMapping("/")
    public String homePage(){
        return "index";
    }

    @RequestMapping("/login")
    public String login() { return "web/login"; }

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("user", new User());
        return "web/registration";
    }
}
