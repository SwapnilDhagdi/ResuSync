import React from 'react';
import '../css/About.css';
import image from "../assets/LogoCroped.png"
const About = () => {
    return (
        <div className="about-container">
            
            <section className="hero-section">
                <div className="hero-content">
                    <div className="logo-animation">
                        <img src={image} alt="ResuSync Logo" className="hero-logo" />
                    </div>
                    <h1 className="hero-title">
                        Welcome to <span className="brand-name">ResuSync</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your AI-Powered Resume Optimization Platform
                    </p>
                    <div className="hero-tagline">
                        Transform your resume. Land your dream job.
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="section-header">
                    <h2 className="section-title">Our Mission</h2>
                    <div className="title-underline"></div>
                </div>
                <p className="mission-text">
                    ResuSync empowers job seekers by providing AI-driven insights to optimize their resumes 
                    for specific job descriptions. We bridge the gap between talented candidates and their 
                    dream opportunities by ensuring resumes pass through Applicant Tracking Systems (ATS) 
                    and catch the attention of hiring managers.
                </p>
            </section>

            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">What We Do</h2>
                    <div className="title-underline"></div>
                </div>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3 className="feature-title">AI-Powered Analysis</h3>
                        <p className="feature-description">
                            Leverage Google Gemini AI to analyze your resume against job descriptions, 
                            identifying missing keywords, skills gaps, and areas for improvement.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3 className="feature-title">Match Score & Insights</h3>
                        <p className="feature-description">
                            Get a comprehensive match score with detailed breakdowns of strengths, 
                            weaknesses, and critical gaps between your resume and target role.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💡</div>
                        <h3 className="feature-title">Personalized Recommendations</h3>
                        <p className="feature-description">
                            Receive actionable, step-by-step improvement plans tailored specifically 
                            to your background and target position.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3 className="feature-title">ATS Compatibility Check</h3>
                        <p className="feature-description">
                            Ensure your resume is optimized for Applicant Tracking Systems to pass 
                            initial screening and reach human reviewers.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3 className="feature-title">Keyword Optimization</h3>
                        <p className="feature-description">
                            Identify missing technical skills and industry keywords that are crucial 
                            for your target role's requirements.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💾</div>
                        <h3 className="feature-title">History & Tracking</h3>
                        <p className="feature-description">
                            Save comparison results and track your progress as you optimize your 
                            resume for different job opportunities.
                        </p>
                    </div>
                </div>
            </section>

            <section className="process-section">
                <div className="section-header">
                    <h2 className="section-title">How It Works</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="process-steps">
                    <div className="process-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="step-title">Upload Your Documents</h3>
                            <p className="step-description">
                                Upload your resume and the job description you're targeting in PDF format.
                            </p>
                        </div>
                    </div>

                    <div className="process-connector"></div>

                    <div className="process-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="step-title">AI Analysis</h3>
                            <p className="step-description">
                                Our AI extracts and compares content, identifying keyword matches, skill gaps, 
                                and alignment between your experience and job requirements.
                            </p>
                        </div>
                    </div>

                    <div className="process-connector"></div>

                    <div className="process-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="step-title">Get Insights</h3>
                            <p className="step-description">
                                Receive a detailed report with match score, missing keywords, strengths, 
                                weaknesses, and critical gaps.
                            </p>
                        </div>
                    </div>

                    <div className="process-connector"></div>

                    <div className="process-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3 className="step-title">Implement Changes</h3>
                            <p className="step-description">
                                Follow our personalized improvement plan to optimize your resume and 
                                increase your chances of landing interviews.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="tech-section">
                <div className="section-header">
                    <h2 className="section-title">Built With Cutting-Edge Technology</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="tech-grid">
                    <div className="tech-item">
                        <div className="tech-icon">⚛️</div>
                        <h4>React</h4>
                        <p>Modern, responsive frontend</p>
                    </div>
                    <div className="tech-item">
                        <div className="tech-icon">🍃</div>
                        <h4>Spring Boot</h4>
                        <p>Robust backend architecture</p>
                    </div>
                    <div className="tech-item">
                        <div className="tech-icon">🤖</div>
                        <h4>Google Gemini AI</h4>
                        <p>Advanced AI analysis</p>
                    </div>
                    <div className="tech-item">
                        <div className="tech-icon">📄</div>
                        <h4>Apache PDFBox</h4>
                        <p>Efficient PDF processing</p>
                    </div>
                    <div className="tech-item">
                        <div className="tech-icon">🗄️</div>
                        <h4>MySQL</h4>
                        <p>Secure data storage</p>
                    </div>
                    <div className="tech-item">
                        <div className="tech-icon">🔐</div>
                        <h4>Spring Security</h4>
                        <p>Authentication & authorization</p>
                    </div>
                </div>
            </section>

            <section className="why-choose-section">
                <div className="section-header">
                    <h2 className="section-title">Why Choose ResuSync?</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="benefits-list">
                    <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <div className="benefit-text">
                            <strong>Free & Accessible:</strong> Powerful resume optimization available to everyone
                        </div>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <div className="benefit-text">
                            <strong>Instant Results:</strong> Get comprehensive analysis in seconds
                        </div>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <div className="benefit-text">
                            <strong>Data Privacy:</strong> Your documents are secure and never shared
                        </div>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <div className="benefit-text">
                            <strong>Actionable Insights:</strong> Not just scores, but practical steps to improve
                        </div>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">✓</div>
                        <div className="benefit-text">
                            <strong>Industry Standards:</strong> Aligned with ATS requirements used by top companies
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Optimize Your Resume?</h2>
                    <p className="cta-text">
                        Join thousands of job seekers who have improved their resumes with ResuSync
                    </p>
                    <button className="cta-button" onClick={() => window.location.href = '/'}>
                        Get Started Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;