package com.mediafarm.surveys.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "surveys")
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String category;

    @Column(nullable = false)
    private double compenso; // 🔥 Nuovo campo: compenso

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy; // L'utente che ha creato il sondaggio

    @OneToMany(mappedBy = "survey", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<UserAnswer> userAnswers;


    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getCompenso() {
        return compenso;
    }

    public void setCompenso(double compenso) {
        this.compenso = compenso;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public List<UserAnswer> getUserAnswers() {
        return userAnswers;
    }

    public void setUserAnswers(List<UserAnswer> userAnswers) {
        this.userAnswers = userAnswers;
    }
}
