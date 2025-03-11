package com.mediafarm.surveys.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Question extends BaseEntity {

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @ManyToOne
    @JoinColumn(name = "survey_id", nullable = false)
    private Survey survey;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers;
}
