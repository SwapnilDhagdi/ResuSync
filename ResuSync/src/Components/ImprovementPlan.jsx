import React, { useState, useEffect } from 'react';
import '../css/ImprovementPlan.css';
import instance from '../instance';
import { useLocation, useNavigate } from 'react-router-dom';

const ImprovementPlan = () => {
//     const [improvementPlan, setImprovementPlan] = useState(`## Resume Improvement Plan for AI Analyst Role

// Based on the analysis, here's your personalized action plan to transform your resume for this AI Analyst position.

// ### 1. Top 5 Priority Changes to Make Immediately

// - Add a dedicated "Technical Skills" section prominently featuring Machine Learning frameworks (TensorFlow, PyTorch) even if you're currently learning them
// - Reframe your Full Stack Development experience to highlight any data analysis, algorithm optimization, or analytical problem-solving aspects
// - Create a "Projects" section showcasing any ML/AI projects, even academic or personal ones (Kaggle competitions, online courses, etc.)
// - Include quantifiable metrics in your experience descriptions (e.g., "Optimized database queries resulting in 40% faster data retrieval")
// - Add relevant coursework or certifications in Data Science, Machine Learning, or Statistics prominently near the top

// ### 2. Specific Keywords to Add and Where to Add Them

// - **In Summary/Objective**: Include "data-driven decision making", "predictive modeling", "statistical analysis", and "machine learning"
// - **In Skills Section**: Add "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "data visualization", "statistical modeling", "R programming"
// - **In Experience Section**: Incorporate phrases like "analyzed datasets", "identified trends", "implemented algorithms", "optimized model performance"
// - **Throughout Resume**: Use variations of "AI", "artificial intelligence", "deep learning", "neural networks", "data analysis"

// ### 3. Skills to Highlight More Prominently

// - Move Python to the top of your skills list and explicitly mention its use for data analysis (Pandas, NumPy, Matplotlib)
// - Emphasize any experience with PostgreSQL for data manipulation and complex queries
// - Highlight analytical and problem-solving skills with concrete examples
// - Showcase any experience interpreting data or generating insights from databases
// - If you've done any A/B testing, performance optimization, or metrics tracking in your web development role, emphasize these heavily

// ### 4. Experience Sections to Emphasize or Rewrite

// **Current Experience Reframe:**
// Instead of: "Developed full-stack web applications using React and Spring Boot"
// Write: "Built data-driven web applications processing user behavior analytics, implementing backend algorithms in Spring Boot to optimize performance metrics by 35%"

// **Add Data-Focused Bullets:**
// - "Analyzed PostgreSQL database performance patterns to identify bottlenecks, improving query efficiency"
// - "Collaborated with team to implement predictive features based on user data trends"
// - "Debugged and optimized algorithms for real-time data processing"

// ### 5. New Sections to Add or Modify

// **Add These Sections:**

// - **Machine Learning Projects**: Even if personal/academic
//   - Kaggle competition participation
//   - Online course capstone projects
//   - Any predictive model or classification project

// - **Relevant Coursework**: If applicable
//   - Data Structures and Algorithms
//   - Database Management Systems
//   - Any statistics or ML courses

// - **Certifications** (if pursuing or completed):
//   - Google Data Analytics Certificate
//   - IBM Data Science Professional Certificate
//   - Coursera Machine Learning Specialization

// ### 6. Formatting and Structure Improvements

// - Restructure resume to lead with Technical Skills section immediately after summary
// - Use a clean, ATS-friendly format (avoid tables, graphics, or complex formatting)
// - Ensure keywords appear naturally in context, not just listed
// - Keep font size readable (10-12pt) and use standard fonts (Arial, Calibri, Times New Roman)
// - Use consistent bullet point formatting throughout
// - Include links to GitHub profile showcasing any ML projects or relevant code samples

// **Pro Tip:** Start building ML projects immediately using free resources (Kaggle, Google Colab). Even small projects demonstrating your learning journey are valuable and show genuine interest in pivoting to AI/Data Science.

// **Next Steps:**
// 1. Enroll in a beginner ML course (Andrew Ng's ML course on Coursera)
// 2. Complete 2-3 small ML projects in next 2 months
// 3. Update resume with new skills and projects
// 4. Apply for junior data analyst or ML intern positions to gain relevant experience`);
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   const location=useLocation();
    const navigate=useNavigate();
const handleChange=()=>{
    navigate('/');
}

const [improvementPlan,setImprovementPlan]=useState(location.state?.responsedata); 
    const text =location.state?.responsedata;

    const fetchImprovementPlan = () => {


        try {
            // const response = await instance.get('/api/getImprovement', {
            //     params: { resumeId, jdId }
            // });
            // setImprovementPlan(response.data);
        } catch (err) {
            setError('Failed to generate improvement plan. Please try again.');
            console.error('Error fetching improvement plan:', err);
        } finally {
            setLoading(false);
        }
    };

    const parseContent = (text) => {
        if (!text) return null;

        const sections = [];
        const lines = text.split('\n');
        let currentSection = null;
        let currentList = [];

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (!trimmedLine) {
                if (currentList.length > 0 && currentSection) {
                    sections.push({
                        type: 'list',
                        title: currentSection,
                        items: [...currentList]
                    });
                    currentList = [];
                    currentSection = null;
                }
                return;
            }

            // Check for numbered sections (1., 2., etc.)
            const numberedMatch = trimmedLine.match(/^(\d+)\.\s*(.+)/);
            if (numberedMatch) {
                if (currentList.length > 0 && currentSection) {
                    sections.push({
                        type: 'list',
                        title: currentSection,
                        items: [...currentList]
                    });
                    currentList = [];
                }
                currentSection = numberedMatch[2];
                return;
            }

            // Check for bullet points (-, *, •)
            const bulletMatch = trimmedLine.match(/^[-*•]\s*(.+)/);
            if (bulletMatch) {
                currentList.push(bulletMatch[1]);
                return;
            }

            // Check for headers (##, ###, or **bold**)
            const headerMatch = trimmedLine.match(/^#{1,3}\s*(.+)|^\*\*(.+)\*\*$/);
            if (headerMatch) {
                if (currentList.length > 0 && currentSection) {
                    sections.push({
                        type: 'list',
                        title: currentSection,
                        items: [...currentList]
                    });
                    currentList = [];
                }
                sections.push({
                    type: 'header',
                    content: headerMatch[1] || headerMatch[2]
                });
                currentSection = null;
                return;
            }

            if (currentSection && !currentList.length) {
                currentList.push(trimmedLine);
            } else if (!currentSection) {
                sections.push({
                    type: 'paragraph',
                    content: trimmedLine
                });
            } else {
                currentList.push(trimmedLine);
            }
        });


        if (currentList.length > 0 && currentSection) {
            sections.push({
                type: 'list',
                title: currentSection,
                items: currentList
            });
        }

        return sections;
    };

    const renderContent = () => {
        const sections = parseContent(improvementPlan);
        if (!sections) return null;

        return sections.map((section, index) => {
            switch (section.type) {
                case 'header':
                    return (
                        <h2 key={index} className="plan-header">
                            {section.content}
                        </h2>
                    );
                case 'list':
                    return (
                        <div key={index} className="plan-section">
                            <h3 className="section-title">
                                <span className="section-icon">📋</span>
                                {section.title}
                            </h3>
                            <ul className="improvement-list">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="improvement-item">
                                        <span className="bullet">•</span>
                                        <span className="item-text">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                case 'paragraph':
                    return (
                        <p key={index} className="plan-paragraph">
                            {section.content}
                        </p>
                    );
                default:
                    return null;
            }
        });
    };

    if (loading) {
        return (
            <div className="improvement-plan-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Generating your personalized improvement plan...</p>
                    <span className="loading-subtext">This may take a few moments</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="improvement-plan-container">
                <div className="error-state">
                    <div className="error-icon">⚠️</div>
                    <h3>Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button className="retry-button" onClick={fetchImprovementPlan}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!improvementPlan) {
        return (
            <div className="improvement-plan-container">
                <div className="empty-state">
                    <div className="empty-icon">📄</div>
                    <h3>Ready to Improve Your Resume?</h3>
                    <p>Upload your resume and job description to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="improvement-plan-container">
            <div className="plan-header-section">
                <div className="plan-title-wrapper">
                    <h1 className="plan-main-title">
                        <span className="title-icon">🎯</span>
                        Your Personalized Improvement Plan
                    </h1>
                    <p className="plan-subtitle">
                        Follow these actionable steps to optimize your resume for this role
                    </p>
                </div>
                <button className="refresh-button" onClick={handleChange}>
                    <span className="refresh-icon">🔄</span>
                    Click to ReUpload your Updated Resume JD
                </button>
            </div>

            <div className="plan-content">
                {renderContent()}
            </div>

            <div className="plan-footer">
                <div className="footer-tip">
                    <span className="tip-icon">💡</span>
                    <p>
                        <strong>Pro Tip:</strong> Implement these changes gradually and tailor them to your actual experience.
                        Authenticity is key!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImprovementPlan;