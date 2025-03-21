package com.mediafarm.surveys.model;

import jakarta.persistence.*;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.List;

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
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private double compenso; // 🔥 Nuovo campo: compenso

    @ElementCollection
    @CollectionTable(name = "survey_votes", joinColumns = @JoinColumn(name = "survey_id"))
    @MapKeyColumn(name = "option_name")
    @Column(name = "vote_count")
    private Map<String, Integer> voteResults = new HashMap<>();
    
    @ElementCollection
    @CollectionTable(name = "survey_votes", joinColumns = @JoinColumn(name = "survey_id"))
    @MapKeyColumn(name = "option_name")
    @Column(name = "vote_count")
    private java.util.Map<String, Integer> voteCounts = new java.util.HashMap<>();
    
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy; // L'utente che ha creato il sondaggio
    
    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "survey", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<UserAnswer> userAnswers;

 // 🔥 ✅ Lista degli utenti che hanno votato
    @ManyToMany
    @JoinTable(
        name = "survey_voted_users",
        joinColumns = @JoinColumn(name = "survey_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> votedUsers = new HashSet<>();
    
    // ✅ Metodo per ottenere gli utenti che hanno votato
    public Set<User> getVotedUsers() {
        return votedUsers;
    }
    
 // ✅ Metodo per registrare un utente che ha votato
    public void addVotedUser(User user) {
        this.votedUsers.add(user);
    }

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
    
    public String getDescription() {
        return description;
    }
    
    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public String getCategory() {
        return category;
    }
    
    public Map<String, Integer> getVoteResults() { return voteResults; }
    public void setVoteResults(Map<String, Integer> voteResults) { this.voteResults = voteResults; }

    // ✅ Metodo per incrementare il conteggio dei voti
    public void incrementVoteCount(String voteOption) {
        voteResults.put(voteOption, voteResults.getOrDefault(voteOption, 0) + 1);
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
