package com.mediafarm.surveys.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private double earnings = 0;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private List<Survey> surveys;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserAnswer> userAnswers;
    
 // ✅ TRACCIA I SONDAGGI VOTATI
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_voted_surveys", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "survey_id")
    private Set<Long> votedSurveys = new HashSet<>();
    // ✅ Controlla se l'utente ha già votato su un sondaggio
    public boolean hasVoted(Long surveyId) {
        return votedSurveys.contains(surveyId);
    }

    // ✅ Aggiunge un sondaggio ai voti dell'utente
    public void addVotedSurvey(Long surveyId) {
        votedSurveys.add(surveyId);
    }
    
    
    // Metodo getId() ereditato da BaseEntity
    @Override
    public Long getId() {
        return super.getId();
    }

    // Metodo getEmail() per evitare problemi con Lombok
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

 // ✅ Ritorna la lista dei sondaggi votati
    public Set<Long> getVotedSurveys() {
        return votedSurveys;
    }
}
