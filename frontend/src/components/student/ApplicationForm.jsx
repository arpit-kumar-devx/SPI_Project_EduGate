import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './student.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Academic Details
    course: '',
    session: '',
    previousSchool: '',
    boardUniversity: '',
    passingYear: '',
    percentage: '',
    subjects: '',
    
    // Additional Details
    category: '',
    nationality: 'Indian',
    bloodGroup: '',
    emergencyContact: '',
    
    // System Details (auto-generated)
    applicationStatus: 'pending',
    applicationDate: new Date().toISOString().split('T')[0],
    applicationId: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    
    // Personal Details Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father\'s name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    // Academic Details Validation
    if (!formData.course) newErrors.course = 'Course selection is required';
    if (!formData.session) newErrors.session = 'Session selection is required';
    if (!formData.previousSchool.trim()) newErrors.previousSchool = 'Previous school is required';
    if (!formData.percentage.trim()) newErrors.percentage = 'Percentage/CGPA is required';
    if (!formData.passingYear) newErrors.passingYear = 'Passing year is required';
    
    // Additional validations
    if (!formData.category) newErrors.category = 'Category selection is required';
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Age validation (minimum 16 years)
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) {
        newErrors.dateOfBirth = 'Minimum age requirement is 16 years';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateApplicationId = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `REC${year}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setLoading(true);
    
    try {
      const applicationId = generateApplicationId();
      const submissionData = {
        ...formData,
        applicationId,
        applicationDate: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:5000/api/students/apply', formData);
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData(prev => ({ ...prev, applicationId }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container-fluid student-application-page">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="success-card">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2>Application Submitted Successfully!</h2>
              <div className="application-details">
                <p><strong>Application ID:</strong> {formData.applicationId}</p>
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Course:</strong> {formData.course}</p>
                <p><strong>Session:</strong> {formData.session}</p>
                <p><strong>Application Date:</strong> {formData.applicationDate}</p>
              </div>
              <div className="success-message">
                <p>Thank you for applying to REC Mirzapur! Your application has been successfully submitted and is now under review.</p>
                <p>You will receive an email confirmation shortly. Please keep your Application ID for future reference.</p>
              </div>
              <div className="success-actions">
                <button 
                  className="btn btn-primary me-3"
                  onClick={() => window.print()}
                >
                  <i className="fas fa-print me-2"></i>Print Application
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/')}
                >
                  <i className="fas fa-home me-2"></i>Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid student-application-page">
      <div className="row">
        <div className="col-12">
          <div className="application-header">
            <h1 className="text-center mb-3">
              <i className="fas fa-graduation-cap me-2"></i>
              Student Admission Application
            </h1>
            <p className="text-center">REC Mirzapur - Apply for Academic Session</p>
            <div className="progress-info">
              <span className="badge bg-info">Application Form</span>
              <span className="text-muted ms-2">Fill all required fields carefully</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="application-card">
            <form onSubmit={handleSubmit}>
              
              {/* Personal Details Section */}
              <div className="form-section">
                <h4 className="section-title">
                  <i className="fas fa-user me-2"></i>Personal Information
                </h4>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit phone number"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Gender *</label>
                    <select
                      className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Category *</label>
                    <select
                      className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                      <option value="ews">EWS</option>
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Father's Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`}
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="Enter father's full name"
                    />
                    {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mother's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      placeholder="Enter mother's full name"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Complete Address *</label>
                    <textarea
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter your complete postal address"
                    ></textarea>
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>
                  
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Details Section */}
              <div className="form-section">
                <h4 className="section-title">
                  <i className="fas fa-book-open me-2"></i>Academic Information
                </h4>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Desired Course *</label>
                    <select
                      className={`form-select ${errors.course ? 'is-invalid' : ''}`}
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Course</option>
                      <option value="B.Tech Computer Science Engineering">B.Tech - Computer Science Engineering</option>
                      <option value="B.Tech Electronics & Communication">B.Tech - Electronics & Communication</option>
                      <option value="B.Tech Mechanical Engineering">B.Tech - Mechanical Engineering</option>
                      <option value="B.Tech Electrical Engineering">B.Tech - Electrical Engineering</option>
                      <option value="B.Tech Civil Engineering">B.Tech - Civil Engineering</option>
                    </select>
                    {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Academic Session *</label>
                    <select
                      className={`form-select ${errors.session ? 'is-invalid' : ''}`}
                      name="session"
                      value={formData.session}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Session</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2025-26">2025-26</option>
                      <option value="2026-27">2026-27</option>
                    </select>
                    {errors.session && <div className="invalid-feedback">{errors.session}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Previous School/College *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.previousSchool ? 'is-invalid' : ''}`}
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      placeholder="Enter school/college name"
                    />
                    {errors.previousSchool && <div className="invalid-feedback">{errors.previousSchool}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Board/University</label>
                    <input
                      type="text"
                      className="form-control"
                      name="boardUniversity"
                      value={formData.boardUniversity}
                      onChange={handleInputChange}
                      placeholder="Enter board/university name"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Passing Year *</label>
                    <select
                      className={`form-select ${errors.passingYear ? 'is-invalid' : ''}`}
                      name="passingYear"
                      value={formData.passingYear}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                    </select>
                    {errors.passingYear && <div className="invalid-feedback">{errors.passingYear}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Percentage/CGPA *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.percentage ? 'is-invalid' : ''}`}
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleInputChange}
                      placeholder="Enter percentage or CGPA"
                    />
                    {errors.percentage && <div className="invalid-feedback">{errors.percentage}</div>}
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Main Subjects</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleInputChange}
                      placeholder="e.g., Physics, Chemistry, Maths"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="form-section">
                <h4 className="section-title">
                  <i className="fas fa-info-circle me-2"></i>Additional Information
                </h4>
                
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Nationality</label>
                    <select
                      className="form-select"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                    >
                      <option value="Indian">Indian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Blood Group</label>
                    <select
                      className="form-select"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Emergency Contact</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
              </div>

              {/* Declaration and Submit */}
              <div className="form-section">
                <div className="declaration-box">
                  <h5><i className="fas fa-exclamation-triangle me-2"></i>Declaration</h5>
                  <p>I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any false information may result in the rejection of my application.</p>
                  
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="declaration" required />
                    <label className="form-check-label" htmlFor="declaration">
                      I agree to the above declaration and terms & conditions
                    </label>
                  </div>
                </div>

                <div className="submit-section">
                  <div className="d-flex justify-content-between flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/')}
                    >
                      <i className="fas fa-arrow-left me-2"></i>Back to Home
                    </button>
                    
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
