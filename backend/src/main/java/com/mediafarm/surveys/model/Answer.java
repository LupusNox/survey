package com.mediafarm.surveys.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "answers")
@Getter
@Setter
public class Answer extends BaseEntity {

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answerText;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL)
    private List<UserAnswer> userAnswers;
}
