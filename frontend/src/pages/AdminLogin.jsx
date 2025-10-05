import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import recLogo from '../assets/reclogo.jpg';
import './StudentLogin.css'; // You can also create a dedicated AdminLogin.css with same styles

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim())
      newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.password.trim())
      newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // ✅ Send only email and password, properly trimmed/lowercased
      const res = await axios.post('/api/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });

      if (res.data.success) {
        // ✅ Save token and role from backend
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('userEmail', formData.email.trim().toLowerCase());

        // ✅ Redirect based on actual role
        if (res.data.role === 'superadmin' || res.data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          // If somehow non-admin logs in here, redirect them away
          navigate('/');
        }
      }
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || 'Login failed, please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid admin-login-page">
      <div className="row min-vh-100">
        {/* Left Side Info */}
        <div className="col-lg-6 d-none d-lg-flex login-info-section">
          <div className="info-content">
            <div className="college-branding">
              <img src={recLogo} alt="REC Mirzapur Logo" className="college-logo" />
              <h2 className="college-name">REC Mirzapur</h2>
              <p className="college-tagline">Admin Login Portal</p>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <i className="fas fa-user-shield"></i>
                <div>
                  <h4>Secure Access</h4>
                  <p>Role-based secure login for administrators</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-cogs"></i>
                <div>
                  <h4>Admin Tools</h4>
                  <p>Manage courses, sessions, and student applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="col-lg-6 login-form-section">
          <div className="login-container">
            <div className="mobile-header d-lg-none">
              <img src={recLogo} alt="REC Mirzapur Logo" className="mobile-logo" />
              <h3 className="mobile-college-name">REC Mirzapur</h3>
            </div>

            <div className="login-header">
              <h1 className="login-title">
                <i className="fas fa-user-shield me-2"></i>Admin Login
              </h1>
              <p className="login-subtitle">Access EduGate admin dashboard</p>
            </div>

            {errors.general && (
              <div className="alert alert-danger">
                <i className="fas fa-exclamation-triangle me-2"></i>{errors.general}
              </div>
            )}

            <div className="login-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label">
                    <i className="fas fa-envelope me-2"></i>Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>Logging in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>Login
                    </>
                  )}
                </button>

                <div className="login-footer mt-3 text-center">
                  <Link to="/" className="home-link">
                    <i className="fas fa-arrow-left me-1"></i> Back to Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
