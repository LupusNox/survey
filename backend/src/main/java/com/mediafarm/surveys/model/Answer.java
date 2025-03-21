package com.mediafarm.surveys.model;

import jakarta.persistence.*;

@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String answerText;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // Costruttore di default
    public Answer() {}

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getAnswerText() {
        return answerText;
    }
}
