package com.ResuSync.App.Objects;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "aicomparisonresults")
public class AIComparisonResults {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Foreign Keys
    @ManyToOne
    @JoinColumn(name = "User_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "File_id", nullable = false)
    @OnDelete(action=OnDeleteAction.CASCADE)
    private Files file;

    // Store just file names for quick reference
    @Column(name = "resume_file_name")
    private String resumeFileName;

    @Column(name = "jd_file_name")
    private String jdFileName;

    // Score and Recommendation
    @Column(name = "match_score")
    private double matchScore;

    @Column(name = "recommendation_level")
    private String recommendationLevel;


    // Text Assessments (using TEXT for long content)
    @Column(name = "ats_compatibility", columnDefinition = "TEXT")
    private String atsCompatibility;

    @Column(name = "experience_alignment", columnDefinition = "TEXT")
    private String experienceAlignment;

    @Column(name = "overall_assessment", columnDefinition = "TEXT")
    private String overallAssessment;

    // Lists stored as JSON or comma-separated (using TEXT)
    @Column(name = "matching_keywords", columnDefinition = "TEXT")
    private String matchingKeywords; 

    @Column(name = "missing_keywords", columnDefinition = "TEXT")
    private String missingKeywords;

    @Column(name = "present_skills", columnDefinition = "TEXT")
    private String presentSkills;

    @Column(name = "missing_skills", columnDefinition = "TEXT")
    private String missingSkills;

    @Column(name = "strengths", columnDefinition = "TEXT")
    private String strengths;

    @Column(name = "weaknesses", columnDefinition = "TEXT")
    private String weaknesses;

    @Column(name = "critical_gaps", columnDefinition = "TEXT")
    private String criticalGaps;

    @Column(name = "suggestions", columnDefinition = "TEXT")
    private String suggestions;

    // Metadata
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public AIComparisonResults() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
    
    public Files getFile() {
        return file;
    }

    public void setFile(Files file) {
        this.file = file;
        if (file != null) {
            this.resumeFileName = file.getFileName();
        }
    }

    public String getResumeFileName() {return resumeFileName;}

    public void setResumeFileName(String resumeFileName) {
        this.resumeFileName = resumeFileName;
    }

    public String getJdFileName() {
        return jdFileName;
    }

    public void setJdFileName(String jdFileName) {
        this.jdFileName = jdFileName;
    }

    public double getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(double matchScore) {
        this.matchScore = matchScore;
    }

    public String getRecommendationLevel() {
        return recommendationLevel;
    }

    public void setRecommendationLevel(String recommendationLevel) {
        this.recommendationLevel = recommendationLevel;
    }

    public String getAtsCompatibility() {
        return atsCompatibility;
    }

    public void setAtsCompatibility(String atsCompatibility) {
        this.atsCompatibility = atsCompatibility;
    }

    public String getExperienceAlignment() {
        return experienceAlignment;
    }

    public void setExperienceAlignment(String experienceAlignment) {
        this.experienceAlignment = experienceAlignment;
    }

    public String getOverallAssessment() {
        return overallAssessment;
    }

    public void setOverallAssessment(String overallAssessment) {
        this.overallAssessment = overallAssessment;
    }

    public String getMatchingKeywords() {
        return matchingKeywords;
    }

    public void setMatchingKeywords(String matchingKeywords) {
        this.matchingKeywords = matchingKeywords;
    }

    // Helper method to set from List
    public void setMatchingKeywordsList(List<String> keywords) {
        this.matchingKeywords = String.join(",", keywords);
    }

    // Helper method to get as List
    public List<String> getMatchingKeywordsList() {
        return matchingKeywords != null ? 
            List.of(matchingKeywords.split(",")) : List.of();
    }

    public String getMissingKeywords() {
        return missingKeywords;
    }

    public void setMissingKeywords(String missingKeywords) {
        this.missingKeywords = missingKeywords;
    }

    public void setMissingKeywordsList(List<String> keywords) {
        this.missingKeywords = String.join(",", keywords);
    }

    public List<String> getMissingKeywordsList() {
        return missingKeywords != null ? 
            List.of(missingKeywords.split(",")) : List.of();
    }

    public String getPresentSkills() {
        return presentSkills;
    }

    public void setPresentSkills(String presentSkills) {
        this.presentSkills = presentSkills;
    }

    public void setPresentSkillsList(List<String> skills) {
        this.presentSkills = String.join(",", skills);
    }

    public List<String> getPresentSkillsList() {
        return presentSkills != null ? 
            List.of(presentSkills.split(",")) : List.of();
    }

    public String getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(String missingSkills) {
        this.missingSkills = missingSkills;
    }

    public void setMissingSkillsList(List<String> skills) {
        this.missingSkills = String.join(",", skills);
    }

    public List<String> getMissingSkillsList() {
        return missingSkills != null ? 
            List.of(missingSkills.split(",")) : List.of();
    }

    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public void setStrengthsList(List<String> strengthsList) {
        this.strengths = String.join("|", strengthsList);
    }

    public List<String> getStrengthsList() {
        return strengths != null ? 
            List.of(strengths.split("\\|")) : List.of();
    }

    public String getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(String weaknesses) {
        this.weaknesses = weaknesses;
    }

    public void setWeaknessesList(List<String> weaknessesList) {
        this.weaknesses = String.join("|", weaknessesList);
    }

    public List<String> getWeaknessesList() {
        return weaknesses != null ? 
            List.of(weaknesses.split("\\|")) : List.of();
    }

    public String getCriticalGaps() {
        return criticalGaps;
    }

    public void setCriticalGaps(String criticalGaps) {
        this.criticalGaps = criticalGaps;
    }

    public void setCriticalGapsList(List<String> gaps) {
        this.criticalGaps = String.join("|", gaps);
    }

    public List<String> getCriticalGapsList() {
        return criticalGaps != null ? 
            List.of(criticalGaps.split("\\|")) : List.of();
    }

    public String getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }

    public void setSuggestionsList(List<String> suggestionsList) {
        this.suggestions = String.join("|", suggestionsList);
    }

    public List<String> getSuggestionsList() {
        return suggestions != null ? 
            List.of(suggestions.split("\\|")) : List.of();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}