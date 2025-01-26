import React from 'react';
import './about.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    return (
       
        <div className="about">
            <div className="about-content">
                <h2>About Us</h2>
                <p className="intro">
                    Welcome to our E-learning Platform, your trusted partner in online education! 
                    We are passionate about providing top-notch courses designed to enhance learning experiences and foster professional and personal growth.
                </p>
                <div className="mission-vision">
                    <div className="section">
                        <h3>Our Mission</h3>
                        <p>
                            To make quality education accessible to everyone, empowering individuals to achieve their dreams through learning.
                        </p>
                    </div>
                    <div className="section">
                        <h3>Our Vision</h3>
                        <p>
                            To be a global leader in online education by creating a platform that inspires lifelong learning, innovation, and excellence.
                        </p>
                    </div>
                </div>
                <div className="core-values">
                    <h3>Our Core Values</h3>
                    <ul>
                        <li>📘 Excellence in Education</li>
                        <li>🌟 Accessibility for Everyone</li>
                        <li>💡 Innovation in Learning</li>
                        <li>🤝 Collaboration and Support</li>
                        <li>🌍 Commitment to a Better World</li>
                    </ul>
                </div>
                <div className="cta">
                    <p>
                        Join thousands of learners who have transformed their lives through our platform. 
                        Explore our courses, connect with top instructors, and start your journey today!
                    </p>
                    <button onClick={()=>navigate('/courses')}>Explore Courses</button>
                </div>
            </div>
        </div>
    );
};

export default About;
