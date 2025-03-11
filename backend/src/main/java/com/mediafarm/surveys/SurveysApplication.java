package com.mediafarm.surveys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.mediafarm.surveys.controller", // Scansiona i controller
        "com.mediafarm.surveys.service",    // Scansiona i servizi
        "com.mediafarm.surveys.repository", // Scansiona i repository
        "com.mediafarm.surveys.model"       // Scansiona i modelli
})
@EnableJpaRepositories(basePackages = "com.mediafarm.surveys.repository") // Abilita i repository JPA
public class SurveysApplication {
    public static void main(String[] args) {
        SpringApplication.run(SurveysApplication.class, args);
    }
}
