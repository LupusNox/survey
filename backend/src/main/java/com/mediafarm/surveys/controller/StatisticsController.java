package com.mediafarm.surveys.controller;

import com.mediafarm.surveys.service.SurveyService;
import com.mediafarm.surveys.service.UserService;
import com.mediafarm.surveys.service.AnswerService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final SurveyService surveyService;
    private final UserService userService;
    private final AnswerService answerService;

    public StatisticsController(SurveyService surveyService, UserService userService, AnswerService answerService) {
        this.surveyService = surveyService;
        this.userService = userService;
        this.answerService = answerService;
    }

    @GetMapping
    public Map<String, Object> getStatistics() {
        return Map.of(
        		 "totalSurveys", surveyService.countSurveys(),
                 "totalUsers", userService.countUsers(),
                 "totalAnswers", answerService.countAnswers(),
                 "uniqueVisitors", userService.countUsers(),
                 "surveysPerCategory", surveyService.getSurveysPerCategory(),
                 "surveyParticipation", surveyService.getSurveyParticipation()
             );
    }
}
