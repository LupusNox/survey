package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.model.UserAnswer;
import com.mediafarm.surveys.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @GetMapping
    public List<UserAnswer> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @GetMapping("/{id}")
    public UserAnswer getAnswerById(@PathVariable Long id) {
        return answerService.getAnswerById(id);
    }

    @PostMapping
    public UserAnswer createAnswer(@RequestBody UserAnswer userAnswer) {
        return answerService.createAnswer(userAnswer);
    }

    @GetMapping("/count")
    public long countAnswers() {
        return answerService.countAnswers();
    }
}
