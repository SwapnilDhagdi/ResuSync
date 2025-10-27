package com.ResuSync.App.Services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ResuSync.App.Objects.AIComparisonResults;
import com.ResuSync.App.Objects.Files;
import com.ResuSync.App.Objects.Users;
import com.ResuSync.App.Repository.AIComparisonResultRepository;
import com.ResuSync.App.Repository.FileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

import jakarta.transaction.Transactional;


@Service
public class AIComparison {
    @Autowired
    private PDFService pdfService;
    
    @Autowired
    private AIComparisonResultRepository aiComparisonResultRepository;
    @Autowired
    private FileRepository fileRepository;

    ObjectMapper objectMapper=new ObjectMapper();

    @Value("${gemini.api.key}")
    private String geminiApiKey;
    
    public AIComparisonResult getAnalysisData(Long id){

        AIComparisonResults aiComparisonResults=aiComparisonResultRepository.findByFid(id); 
        if(aiComparisonResults==null){
            aiComparisonResults=aiComparisonResultRepository.findAll().get(0);
        }
        AIComparisonResult aiComparisonResult=new AIComparisonResult();
        aiComparisonResult.setAtsCompatibility(aiComparisonResults.getAtsCompatibility());
        aiComparisonResult.setCriticalGaps(aiComparisonResults.getCriticalGapsList());
        aiComparisonResult.setExperienceAlignment(aiComparisonResults.getExperienceAlignment());
        aiComparisonResult.setMatchScore(aiComparisonResults.getMatchScore());
        aiComparisonResult.setMatchingKeywords(aiComparisonResults.getMatchingKeywordsList());
        aiComparisonResult.setMissingKeywords(aiComparisonResults.getMissingKeywordsList());
        aiComparisonResult.setMissingSkills(aiComparisonResults.getMissingSkillsList());
        aiComparisonResult.setOverallAssessment(aiComparisonResults.getOverallAssessment());
        aiComparisonResult.setPresentSkills(aiComparisonResults.getPresentSkillsList());
        aiComparisonResult.setWeaknesses(aiComparisonResults.getWeaknessesList());
        aiComparisonResult.setSuggestions(aiComparisonResults.getSuggestionsList());
        aiComparisonResult.setRecommendationLevel(aiComparisonResults.getRecommendationLevel());
        aiComparisonResult.setStrengths(aiComparisonResults.getStrengthsList());
        return aiComparisonResult;
    }

    @Transactional
    public List<Files> getFiles(Long uid){
        return fileRepository.findByUserid(uid);
    }
    public String GenerateResponse(){
        Client client=Client.builder().apiKey(geminiApiKey).build();
        GenerateContentResponse response=client.models.generateContent(
            "gemini-2.5-flash", "Explain how AI works in a few words", null);
            client.close();
        return response.text();
    }
    public String BuildPromt(String Resume,String JD){
        return String.format("""
             You are an expert ATS (Applicant Tracking System) and HR consultant. 
            Analyze the following resume against the job description and provide a detailed comparison.
            
            JOB DESCRIPTION:
            %s
            
            RESUME:
            %s
            
            Please analyze and provide ONLY a valid JSON response with the following structure (no additional text):
            {
              "matchScore": <number 0-100>,
              "missingKeywords": [<list of important keywords missing from resume>],
              "matchingKeywords": [<list of keywords that match>],
              "missingSkills": [<list of technical/professional skills missing>],
              "presentSkills": [<list of skills present in resume>],
              "suggestions": [<actionable suggestions to improve resume>],
              "strengths": [<what the resume does well>],
              "weaknesses": [<areas where resume falls short>],
              "criticalGaps": [<most important missing elements>],
              "overallAssessment": "<brief summary of candidacy>",
              "atsCompatibility": "<assessment of ATS-friendliness>",
              "experienceAlignment": "<how well experience matches requirements>",
              "recommendationLevel": "<HIGHLY RECOMMENDED | RECOMMENDED | CONSIDER | NOT RECOMMENDED>"
            }
            
            IMPORTANT: Return ONLY the JSON object, no markdown formatting or extra text.
            Be specific, honest, and actionable in your analysis.
        """, Resume,JD);
    }
    public String CallAPI(String prompt){
        Client client=Client.builder().apiKey(geminiApiKey).build();
         GenerateContentResponse AIresponse =client.models.generateContent("gemini-2.5-flash", prompt, null);
         String response=AIresponse.text().trim();
         if(response.startsWith("'''json")){
            response=response.substring(7);
         }
         if(response.startsWith("'''")){
            response=response.substring(3);
         }
         if(response.endsWith("'''")){
            response=response.substring(0,response.length()-3);
         }
         return response;
    }
    public AIComparisonResult ParseAPIResponse(String response,Users user) throws IOException{
        AIComparisonResult result=new AIComparisonResult();
        AIComparisonResults entity=new AIComparisonResults();

        JsonNode root =objectMapper.readTree(response);

        result.setMatchScore(root.path("matchScore").asDouble());
        result.setMissingKeywords(parseList(root.path("missingKeywords")));
        result.setMatchingKeywords(parseList(root.path("matchingKeywords")));
        result.setMissingSkills(parseList(root.path("missingSkills")));
        result.setPresentSkills(parseList(root.path("presentSkills")));
        result.setSuggestions(parseList(root.path("suggestions")));
        result.setStrengths(parseList(root.path("strengths")));
        result.setWeaknesses(parseList(root.path("weaknesses")));
        result.setCriticalGaps(parseList(root.path("criticalGaps")));
        result.setOverallAssessment(root.path("overallAssessment").asText());
        result.setAtsCompatibility(root.path("atsCompatibility").asText());
        result.setExperienceAlignment(root.path("experienceAlignment").asText());
        result.setRecommendationLevel(root.path("recommendationLevel").asText());
        result.setResponse(response);
       Files file=fileRepository.getRecentFile();
        entity.setUser(user);
        entity.setFile(file);
        entity.setMatchScore(result.getMatchScore());
        entity.setRecommendationLevel(result.getRecommendationLevel());
        entity.setAtsCompatibility(result.getAtsCompatibility());
        entity.setExperienceAlignment(result.getExperienceAlignment());
        entity.setOverallAssessment(result.getOverallAssessment());
        entity.setMatchingKeywordsList(result.getMatchingKeywords());
        entity.setMissingKeywordsList(result.getMissingKeywords());
        entity.setPresentSkillsList(result.getPresentSkills());
        entity.setMissingSkillsList(result.getMissingSkills());
        entity.setSuggestionsList(result.getSuggestions());
        entity.setStrengthsList(result.getStrengths());
        entity.setWeaknessesList(result.getWeaknesses());
        entity.setCriticalGapsList(result.getCriticalGaps());

        

        aiComparisonResultRepository.save(entity);
        return result;
    }

    public List<String> parseList(JsonNode root){
        List<String> li=new ArrayList<>();
        if(root.isArray()){
            root.forEach(e->li.add(e.asText()));
        }
        return li;
    }
    public AIComparisonResult CompareResumeAndJD(Users user)throws IOException{
        String Resume=pdfService.getRecentFile().get(0);
        String JD=pdfService.getRecentFile().get(1);
        String prompt=BuildPromt(Resume, JD);
        String response=CallAPI(prompt); 
        // AIComparisonResults aiComparisonResults=aiComparisonResultRepository.findAll().get(0);
        // AIComparisonResult aiComparisonResult=new AIComparisonResult();
        // aiComparisonResult.setAtsCompatibility(aiComparisonResults.getAtsCompatibility());
        // aiComparisonResult.setCriticalGaps(aiComparisonResults.getCriticalGapsList());
        // aiComparisonResult.setExperienceAlignment(aiComparisonResults.getExperienceAlignment());
        // aiComparisonResult.setMatchScore(aiComparisonResults.getMatchScore());
        // aiComparisonResult.setMatchingKeywords(aiComparisonResults.getMatchingKeywordsList());
        // aiComparisonResult.setMissingKeywords(aiComparisonResults.getMissingKeywordsList());
        // aiComparisonResult.setMissingSkills(aiComparisonResults.getMissingSkillsList());
        // aiComparisonResult.setOverallAssessment(aiComparisonResults.getOverallAssessment());
        // aiComparisonResult.setPresentSkills(aiComparisonResults.getPresentSkillsList());
        // aiComparisonResult.setWeaknesses(aiComparisonResults.getWeaknessesList());
        // aiComparisonResult.setSuggestions(aiComparisonResults.getSuggestionsList());
        // aiComparisonResult.setRecommendationLevel(aiComparisonResults.getRecommendationLevel());
        // aiComparisonResult.setStrengths(aiComparisonResults.getStrengthsList());
        // aiComparisonResult.setResponse(aiComparisonResults.getResponse());
        // return aiComparisonResult;

        return ParseAPIResponse(response,user);
    
    }


    public String generateImporovmentPlan()throws IOException{

        Client client=Client.builder().apiKey(geminiApiKey).build();
        String resume=pdfService.getRecentFile().get(0);
        String jd=pdfService.getRecentFile().get(1);
        String prompt=String.format("""
              Based on this job description and resume, create a detailed action plan 
            to improve the resume for this specific role. Be specific and actionable.
            
            JOB DESCRIPTION:
            %s
            
            CURRENT RESUME:
            %s
            
            Provide a detailed improvement plan with:
            1. Top 5 priority changes to make immediately
            2. Specific keywords to add and where to add them
            3. Skills to highlight more prominently
            4. Experience sections to emphasize or rewrite
            5. New sections to add or modify
            6. Formatting and structure improvements
            
            Format your response as clear, actionable steps.
            """, jd, resume);
           GenerateContentResponse response=client.models.generateContent("gemini-2.5-flash", prompt, null);
           String text=response.text().trim();
            return text;
           //return "string";
    
    }
    public class AIComparisonResult{

        private double matchScore;
        private List<String> missingKeywords;
        private List<String> matchingKeywords;
        private List<String> missingSkills;
        private List<String> presentSkills;
        private List<String> suggestions;
        private List<String> strengths;
        private List<String> weaknesses;
        private List<String> criticalGaps;
        private String overallAssessment;
        private String atsCompatibility;
        private String experienceAlignment;
        private String recommendationLevel;
        private String response;

        // Getters and Setters
        public double getMatchScore() { return matchScore; }
        public void setMatchScore(double matchScore) { this.matchScore = matchScore; }

        public List<String> getMissingKeywords() { return missingKeywords; }
        public void setMissingKeywords(List<String> missingKeywords) { 
            this.missingKeywords = missingKeywords; 
        }

        public List<String> getMatchingKeywords() { return matchingKeywords; }
        public void setMatchingKeywords(List<String> matchingKeywords) { 
            this.matchingKeywords = matchingKeywords; 
        }

        public List<String> getMissingSkills() { return missingSkills; }
        public void setMissingSkills(List<String> missingSkills) { 
            this.missingSkills = missingSkills; 
        }

        public List<String> getPresentSkills() { return presentSkills; }
        public void setPresentSkills(List<String> presentSkills) { 
            this.presentSkills = presentSkills; 
        }

        public List<String> getSuggestions() { return suggestions; }
        public void setSuggestions(List<String> suggestions) { 
            this.suggestions = suggestions; 
        }

        public List<String> getStrengths() { return strengths; }
        public void setStrengths(List<String> strengths) { 
            this.strengths = strengths; 
        }

        public List<String> getWeaknesses() { return weaknesses; }
        public void setWeaknesses(List<String> weaknesses) { 
            this.weaknesses = weaknesses; 
        }

        public List<String> getCriticalGaps() { return criticalGaps; }
        public void setCriticalGaps(List<String> criticalGaps) { 
            this.criticalGaps = criticalGaps; 
        }

        public String getOverallAssessment() { return overallAssessment; }
        public void setOverallAssessment(String overallAssessment) { 
            this.overallAssessment = overallAssessment; 
        }
        public String getResponse(){
            return response;
        }
        public void setResponse(String response){
            this.response=response;
        }
        public String getAtsCompatibility() { return atsCompatibility; }
        public void setAtsCompatibility(String atsCompatibility) { 
            this.atsCompatibility = atsCompatibility; 
        }

        public String getExperienceAlignment() { return experienceAlignment; }
        public void setExperienceAlignment(String experienceAlignment) { 
            this.experienceAlignment = experienceAlignment; 
        }

        public String getRecommendationLevel() { return recommendationLevel; }
        public void setRecommendationLevel(String recommendationLevel) { 
            this.recommendationLevel = recommendationLevel; 
        }
        @Override
        public String toString() {
   
        return "AIComparisonResult{" +
            "\n  matchScore=" + matchScore +
            ",\n  recommendationLevel='" + recommendationLevel + '\'' +
            ",\n  atsCompatibility='" + atsCompatibility + '\'' +
            ",\n  experienceAlignment='" + experienceAlignment + '\'' +
            ",\n  overallAssessment='" + overallAssessment + '\'' +
            ",\n  strengths=[" + (strengths != null ? String.join(", ", strengths) : "") + ']' +
            ",\n  weaknesses=[" + (weaknesses != null ? String.join(", ", weaknesses) : "") + ']' +
            ",\n  criticalGaps=[" + (criticalGaps != null ? String.join(", ", criticalGaps) : "") + ']' +
            ",\n  suggestions=[" + (suggestions != null ? String.join(", ", suggestions) : "") + ']' +
            ",\n  matchingKeywords=[" + (matchingKeywords != null ? String.join(", ", matchingKeywords) : "") + ']' +
            ",\n  missingKeywords=[" + (missingKeywords != null ? String.join(", ", missingKeywords) : "") + ']' +
            ",\n  presentSkills=[" + (presentSkills != null ? String.join(", ", presentSkills) : "") + ']' +
            ",\n  missingSkills=[" + (missingSkills != null ? String.join(", ", missingSkills) : "") + ']' +
            "\n}";
    }
    }
}
