import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import recLogo from '../assets/reclogo.jpg';
import './StudentLogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // For now, simulate successful login (replace with actual API call later)
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
        role: 'student'
      });
      
      if (response.data.success) {
        // Store authentication token
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect to student dashboard
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        setErrors({ 
          general: 'Invalid email or password. Please try again.' 
        });
      } else {
        setErrors({ 
          general: 'Login failed. Please check your connection and try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page (to be implemented)
    alert('Forgot password feature will be available soon. Please contact admin for password reset.');
  };

  return (
    <div className="container-fluid student-login-page">
      <div className="row min-vh-100">
        {/* Left Side - College Info */}
        <div className="col-lg-6 d-none d-lg-flex login-info-section">
          <div className="info-content">
            <div className="college-branding">
              <img src={recLogo} alt="REC Mirzapur Logo" className="college-logo" />
              <h2 className="college-name">REC Mirzapur</h2>
              <p className="college-tagline">Rajarshi Rananjay Sinh Institute of Management & Technology</p>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-graduation-cap"></i>
                <div>
                  <h4>Quality Education</h4>
                  <p>Excellence in technical education with modern facilities</p>
                </div>
              </div>
              
              <div className="feature-item">
                <i className="fas fa-laptop-code"></i>
                <div>
                  <h4>Digital Learning</h4>
                  <p>Advanced digital platform for seamless learning experience</p>
                </div>
              </div>
              
              <div className="feature-item">
                <i className="fas fa-users"></i>
                <div>
                  <h4>Student Support</h4>
                  <p>24/7 academic and administrative support for students</p>
                </div>
              </div>
            </div>
            
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt me-2"></i>Mirzapur, Uttar Pradesh</p>
              <p><i className="fas fa-phone me-2"></i>+91 XXXXX XXXXX</p>
              <p><i className="fas fa-envelope me-2"></i>info@recmirzapur.ac.in</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-lg-6 login-form-section">
          <div className="login-container">
            {/* Mobile Logo */}
            <div className="mobile-header d-lg-none">
              <img src={recLogo} alt="REC Mirzapur Logo" className="mobile-logo" />
              <h3 className="mobile-college-name">REC Mirzapur</h3>
            </div>

            <div className="login-header">
              <h1 className="login-title">
                <i className="fas fa-user-graduate me-2"></i>
                Student Login
              </h1>
              <p className="login-subtitle">Access your EduGate student portal</p>
            </div>

            {/* Error Alert */}
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {errors.general}
              </div>
            )}

            <div className="login-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label">
                    <i className="fas fa-envelope me-2"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your registered email"
                    disabled={loading}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">
                    <i className="fas fa-lock me-2"></i>Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-options mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign in to Portal
                    </>
                  )}
                </button>

                <div className="login-divider">
                  <span>Or</span>
                </div>

                <div className="other-options">
                  <Link to="/apply" className="btn btn-outline-primary w-100 mb-3">
                    <i className="fas fa-user-plus me-2"></i>
                    Apply for New Admission
                  </Link>
                  
                  <Link to="/admin-login" className="btn btn-outline-secondary w-100">
                    <i className="fas fa-user-shield me-2"></i>
                    Admin Login
                  </Link>
                </div>
              </form>
            </div>

            <div className="login-footer">
              <div className="back-to-home">
                <Link to="/" className="home-link">
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
              
              <div className="help-links">
                <Link to="/contact" className="help-link">Need Help?</Link>
                <span className="separator">|</span>
                <Link to="/about" className="help-link">About REC</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
