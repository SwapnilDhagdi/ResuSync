import React from 'react';
import '../css/AnalysisResult.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import instance from '../instance';
import { useAuth } from '../Context/AuthContext';
import Loader from './Loader';
import { useLoading } from '../Context/LoadingContext';
// Define a simple TagList sub-component for repeated use
const TagList = ({ items, type }) => (
    <ul className={`tag-list ${type}`}>
        {items.map((item, index) => (
            <li key={index} className="tag">
                {item}
            </li>
        ))}
    </ul>
);

const AnalysisResult = () => {

    const location=useLocation();
    const data=location.state?.responsedata;
    const navigate=useNavigate();

    const {isLoading,setIsLoading} =useAuth();
    const {showLoading,hideLoading} =useLoading();
  
//     const data = {
//     // 1. Overall Summary Metrics
//     matchScore: 78.5, // double
//     recommendationLevel: "Good Fit - Strong Candidate", // String
//     overallAssessment: "The candidate is a strong fit with extensive experience in core backend technologies (Java, Spring). The main area for improvement is a lack of explicit mention of CI/CD and Cloud deployment experience required for the role.", // String
    
//     // 2. Compatibility & Alignment
//     atsCompatibility: "Excellent (95%)", // String (High compatibility due to clean formatting and keyword density)
//     experienceAlignment: "Very High (8/10 Years)", // String (Clearly shows relevant experience)

//     // 3. Keyword Breakdown
//     matchingKeywords: [
//         "Java",
//         "Spring Boot",
//         "RESTful API",
//         "PostgreSQL",
//         "Microservices",
//         "AWS S3",
//         "Agile/Scrum"
//     ], // List<String>
//     missingKeywords: [
//         "Kubernetes",
//         "Terraform",
//         "Kafka",
//         "CI/CD Pipeline"
//     ], // List<String>

//     // 4. Skills Breakdown
//     presentSkills: [
//         "Backend Development",
//         "Database Design",
//         "Cloud Storage (AWS S3)",
//         "Technical Leadership",
//         "Unit Testing"
//     ], // List<String>
//     missingSkills: [
//         "Container Orchestration (K8s)",
//         "Infrastructure as Code (IaC)",
//         "High-Volume Messaging"
//     ], // List<String>

//     // 5. Actionable Insights
//     strengths: [
//         "7+ years of dedicated Java/Spring Boot experience.",
//         "Demonstrates successful design and deployment of microservices.",
//         "Clear quantitative metrics in previous roles (e.g., 'reduced latency by 30%')."
//     ], // List<String>
//     weaknesses: [
//         "Experience primarily focused on monolith/traditional deployments.",
//         "Limited evidence of experience managing production infrastructure.",
//         "Soft skills section is brief and lacks detail."
//     ], // List<String>
//     criticalGaps: [
//         "Must confirm expertise with Kubernetes and containerized deployment in the interview.",
//         "Candidate's resume contains an outdated objective statement.",
//         "Missing specific mention of modern CI/CD tools (e.g., GitLab/Jenkins)."
//     ], // List<String>
    
//     // 6. Suggestions
//     suggestions: [
//         "Update professional summary to highlight 'Microservices and Cloud' expertise.",
//         "Add a technical skills section explicitly listing CI/CD tools used (even if brief).",
//         "Prepare interview questions to probe for hands-on experience with IaC (Terraform)."
//     ] // List<String>
// };
    // Destructure all fields from the data prop
    const handleImprovement=()=>{
        showLoading("Getting Your Improvement Plan");
        instance.get("/api/getImprovement",{withCredentials:true,timeout:0,})
        .then(function(response){
            hideLoading();
            navigate("/ImprovementPlan",{state:{responsedata:response.data}}); 
        })
        .catch(function(error){
           
        })
    };
    const {
        matchScore,
        missingKeywords,
        matchingKeywords,
        missingSkills,
        presentSkills,
        suggestions,
        strengths,
        weaknesses,
        criticalGaps,
        overallAssessment,
        atsCompatibility,
        experienceAlignment,
        recommendationLevel,
    } = data;

    return (
        
        <div className="assessment-container">
            <NavLink to={"/"}> <button className='ghost-button'> Back To File Upload</button> </NavLink>
            <header className="summary-card">
                <h1 className="match-score-display">
                    Match Score: <span className="score-value">{matchScore}%</span>
                </h1>
                <p className="recommendation-level">{recommendationLevel}</p>
                <div className="overall-assessment">
                    <h2>Overall Assessment</h2>
                    <p>{overallAssessment}</p>
                </div>
            </header>

            <section className="compatibility-section">
                <div className="compatibility-item">
                    <span className="label">ATS Compatibility</span>
                    <span className="value">{atsCompatibility}</span>
                </div>
                <div className="compatibility-item">
                    <span className="label">Experience Alignment</span>
                    <span className="value">{experienceAlignment}</span>
                </div>
            </section>


                <h2 className="section-title">Key Insights</h2>
            <section className="key-insights-section">

                <div className="insight-card strength-card">
                    <h3>💪 Strengths</h3>
                    <ul>
                        {strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>

                <div className="insight-card weakness-card">
                    <h3>⚠️ Weaknesses</h3>
                    <ul>
                        {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>

                <div className="insight-card gap-card">
                    <h3>🚨 Critical Gaps</h3>
                    <ul>
                        {criticalGaps.map((g, i) => <li key={i}>{g}</li>)}
                    </ul>
                </div>
            </section>
             <h2 className="section-title">Detailed Breakdown</h2>
            <section className="breakdown-section">
               

                <div className="breakdown-card">
                    <h3>Keywords Match</h3>
                    <div className="list-group">
                        <div className="list-item success">
                            <span className="label">Matched:</span>
                            <TagList items={matchingKeywords} type="positive" />
                        </div>
                        <div className="list-item danger">
                            <span className="label">Missing:</span>
                            <TagList items={missingKeywords} type="negative" />
                        </div>
                    </div>
                </div>

                {/* Skills Card */}
                <div className="breakdown-card">
                    <h3>Skills Assessment</h3>
                    <div className="list-group">
                        <div className="list-item success">
                            <span className="label">Present:</span>
                            <TagList items={presentSkills} type="positive" />
                        </div>
                        <div className="list-item danger">
                            <span className="label">Missing:</span>
                            <TagList items={missingSkills} type="negative" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ACTIONABLE SUGGESTIONS */}
            <section className="suggestions-section card">
                <h2 className="section-title">💡 Actionable Suggestions</h2>
                <ol>
                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
            </section>

            <button className='glow-button' onClick={handleImprovement}>Get Imporovement plan </button>
        </div>
    );
};

export default AnalysisResult;