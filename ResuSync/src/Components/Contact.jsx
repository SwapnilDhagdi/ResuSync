import React from 'react';
import '../css/Contact.css';

const Contact = () => {
    const contactInfo = {
        name: "Swapnil Dhagdi",
        email: "swapnildhagdi@gmail.com",
        phone: "+91 9028871392",
        linkedin: "https://www.linkedin.com/in/swapnil-dhagdi-b06017266/",
        github: "https://github.com/SwapnilDhagdi",
        location: "Pune, Maharashtra, India"
    };

    const handleCopyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${type} copied to clipboard!`);
        });
    };

    return (
        <div className="contact-container">
           
            <section className="contact-header">
                <div className="header-content">
                    <h1 className="contact-title">Get In Touch</h1>
                    <p className="contact-subtitle">
                        Have questions or feedback? Feel free to reach out!
                    </p>
                </div>
            </section>

 
            <section className="contact-content">
                <div className="contact-grid">
             
                    <div className="contact-card">
                        <div className="card-icon email-icon">📧</div>
                        <h3 className="card-title">Email</h3>
                        <p className="card-info">{contactInfo.email}</p>
                        <div className="card-actions">
                            <a 
                                href={`mailto:${contactInfo.email}`} 
                                className="action-button primary"
                            >
                                Send Email
                            </a>
                            <button 
                                onClick={() => handleCopyToClipboard(contactInfo.email, 'Email')}
                                className="action-button secondary"
                            >
                                Copy
                            </button>
                        </div>
                    </div>

  
                    <div className="contact-card">
                        <div className="card-icon phone-icon">📱</div>
                        <h3 className="card-title">Phone</h3>
                        <p className="card-info">{contactInfo.phone}</p>
                        <div className="card-actions">
                            <a 
                                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
                                className="action-button primary"
                            >
                                Call Now
                            </a>
                            <button 
                                onClick={() => handleCopyToClipboard(contactInfo.phone, 'Phone')}
                                className="action-button secondary"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                    <div className="contact-card">
                        <div className="card-icon linkedin-icon">💼</div>
                        <h3 className="card-title">LinkedIn</h3>
                        <p className="card-info">Connect with me</p>
                        <div className="card-actions">
                            <a 
                                href={contactInfo.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="action-button primary"
                            >
                                Visit Profile
                            </a>
                            <button 
                                onClick={() => handleCopyToClipboard(contactInfo.linkedin, 'LinkedIn')}
                                className="action-button secondary"
                            >
                                Copy Link
                            </button>
                        </div>
                    </div>


                    <div className="contact-card">
                        <div className="card-icon github-icon">💻</div>
                        <h3 className="card-title">GitHub</h3>
                        <p className="card-info">Check out my projects</p>
                        <div className="card-actions">
                            <a 
                                href={contactInfo.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="action-button primary"
                            >
                                View Repos
                            </a>
                            <button 
                                onClick={() => handleCopyToClipboard(contactInfo.github, 'GitHub')}
                                className="action-button secondary"
                            >
                                Copy Link
                            </button>
                        </div>
                    </div>


                    <div className="contact-card">
                        <div className="card-icon location-icon">📍</div>
                        <h3 className="card-title">Location</h3>
                        <p className="card-info">{contactInfo.location}</p>
                        <div className="card-actions">
                            <button 
                                onClick={() => handleCopyToClipboard(contactInfo.location, 'Location')}
                                className="action-button primary full-width"
                            >
                                Copy Address
                            </button>
                        </div>
                    </div>


                    <div className="contact-card info-card">
                        <div className="card-icon info-icon">ℹ️</div>
                        <h3 className="card-title">Quick Info</h3>
                        <div className="quick-info">
                            <div className="info-item">
                                <span className="info-label">Name:</span>
                                <span className="info-value">{contactInfo.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Response Time:</span>
                                <span className="info-value">Within 24 hours</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Availability:</span>
                                <span className="info-value">Open to opportunities</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="social-section">
                <h2 className="social-title">Connect on Social Media</h2>
                <div className="social-links">
                    <a 
                        href={contactInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link linkedin"
                        title="LinkedIn"
                    >
                        <span className="social-icon">in</span>
                    </a>
                    <a 
                        href={contactInfo.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-link github"
                        title="GitHub"
                    >
                        <span className="social-icon">gh</span>
                    </a>
                    <a 
                        href={`mailto:${contactInfo.email}`}
                        className="social-link email"
                        title="Email"
                    >
                        <span className="social-icon">@</span>
                    </a>
                    <a 
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        className="social-link phone"
                        title="Phone"
                    >
                        <span className="social-icon">📞</span>
                    </a>
                </div>
            </section>


            <section className="contact-footer">
                <div className="footer-message">
                    <p className="footer-text">
                        💡 <strong>Tip:</strong> For the fastest response, reach out via email or LinkedIn.
                    </p>
                    <p className="footer-note">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Contact;