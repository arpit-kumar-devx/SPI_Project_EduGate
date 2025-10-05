import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get student data from localStorage
  const token = localStorage.getItem('authToken');
  const userEmail = localStorage.getItem('userEmail');
  
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // State for different sections
  const [studentData, setStudentData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [fees, setFees] = useState([]);
  
  // Form states
  const [enquiryForm, setEnquiryForm] = useState({
    subject: '',
    message: ''
  });
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Fetch student profile data
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/student/profile', axiosConfig);
      setStudentData(res.data.student);
      setError(null);
    } catch (err) {
      setError('Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch notices from admin
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/notices', axiosConfig);
      setNotices(res.data.notices || []);
      setError(null);
    } catch (err) {
      setError('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  // Fetch events from admin
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/events', axiosConfig);
      setEvents(res.data.events || []);
      setError(null);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Fetch student's enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/student/enquiries', axiosConfig);
      setEnquiries(res.data.enquiries || []);
      setError(null);
    } catch (err) {
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  // Fetch fee information
  const fetchFees = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/student/fees', axiosConfig);
      setFees(res.data.fees || []);
      setError(null);
    } catch (err) {
      setError('Failed to load fees');
    } finally {
      setLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    switch (activeTab) {
      case 'dashboard':
        fetchStudentData();
        break;
      case 'notices':
        fetchNotices();
        break;
      case 'events':
        fetchEvents();
        break;
      case 'enquiries':
        fetchEnquiries();
        break;
      case 'fees':
        fetchFees();
        break;
      default:
        break;
    }
  }, [activeTab]);

  // Handle enquiry form submission
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.subject.trim() || !enquiryForm.message.trim()) {
      alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/enquiries', {
        subject: enquiryForm.subject,
        message: enquiryForm.message,
        name: studentData?.personalDetails?.firstName + ' ' + studentData?.personalDetails?.lastName,
        email: userEmail
      }, axiosConfig);
      
      alert('Enquiry submitted successfully!');
      setEnquiryForm({ subject: '', message: '' });
      fetchEnquiries(); // Refresh enquiries list
    } catch (err) {
      alert('Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  // Handle payment via Razorpay
  const handlePayment = async (feeId, amount) => {
    try {
      setPaymentLoading(true);
      
      // Create order
      const orderRes = await axios.post('/api/admin/fees/create-order', {
        amount: amount,
        currency: 'INR',
        receipt: `fee_${feeId}_${Date.now()}`
      }, axiosConfig);

      const { orderId } = orderRes.data;

      // Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_key', // Replace with your key
        amount: amount * 100,
        currency: 'INR',
        name: 'REC Mirzapur',
        description: 'Fee Payment',
        order_id: orderId,
        handler: async (response) => {
          // Verify payment
          try {
            await axios.post('/api/admin/fees/verify-payment', {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            }, axiosConfig);
            
            // Update fee status
            await axios.put(`/api/admin/fees/${feeId}/status`, {
              status: 'paid'
            }, axiosConfig);
            
            alert('Payment successful!');
            fetchFees(); // Refresh fees
          } catch (err) {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: studentData?.personalDetails?.firstName + ' ' + studentData?.personalDetails?.lastName,
          email: userEmail
        },
        theme: { color: '#ff6633' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Failed to initiate payment');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, {studentData?.personalDetails?.firstName || 'Student'}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        {['dashboard', 'notices', 'events', 'enquiries', 'fees'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* ========== DASHBOARD (Profile) ========== */}
        {activeTab === 'dashboard' && studentData && (
          <div className="profile-section">
            <h4>Student Profile</h4>
            <div className="profile-card">
              <div className="row">
                <div className="col-md-6">
                  <h5>Personal Details</h5>
                  <p><strong>Name:</strong> {studentData.personalDetails.firstName} {studentData.personalDetails.lastName}</p>
                  <p><strong>Email:</strong> {studentData.personalDetails.email}</p>
                  <p><strong>Phone:</strong> {studentData.personalDetails.phone}</p>
                  <p><strong>Address:</strong> {studentData.personalDetails.address}</p>
                </div>
                <div className="col-md-6">
                  <h5>Academic Details</h5>
                  <p><strong>Student ID:</strong> {studentData.applicationId}</p>
                  <p><strong>Course:</strong> {studentData.academicDetails.course}</p>
                  <p><strong>Session:</strong> {studentData.academicDetails.session}</p>
                  <p><strong>Status:</strong> <span className="badge bg-success">{studentData.applicationStatus}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== NOTICES ========== */}
        {activeTab === 'notices' && (
          <div className="notices-section">
            <h4>Latest Notices</h4>
            {notices.length === 0 && <p>No notices available.</p>}
            <div className="notices-list">
              {notices.map(notice => (
                <div key={notice._id} className="notice-card">
                  <h5>{notice.title}</h5>
                  <p>{notice.message}</p>
                  <small className="text-muted">
                    Published: {new Date(notice.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== EVENTS ========== */}
        {activeTab === 'events' && (
          <div className="events-section">
            <h4>Upcoming Events</h4>
            {events.length === 0 && <p>No events scheduled.</p>}
            <div className="events-list">
              {events.map(event => (
                <div key={event._id} className="event-card">
                  <h5>{event.title}</h5>
                  <p>{event.description}</p>
                  {event.date && <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>}
                  {event.location && <p><strong>Location:</strong> {event.location}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== ENQUIRIES ========== */}
        {activeTab === 'enquiries' && (
          <div className="enquiries-section">
            <h4>Submit Enquiry</h4>
            
            {/* Enquiry Form */}
            <div className="enquiry-form-card">
              <form onSubmit={handleEnquirySubmit}>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    value={enquiryForm.subject}
                    onChange={(e) => setEnquiryForm({...enquiryForm, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </div>

            {/* Previous Enquiries */}
            <div className="mt-4">
              <h5>Your Previous Enquiries</h5>
              {enquiries.length === 0 && <p>No enquiries submitted yet.</p>}
              <div className="enquiries-list">
                {enquiries.map(enquiry => (
                  <div key={enquiry._id} className="enquiry-card">
                    <h6>{enquiry.subject}</h6>
                    <p>{enquiry.message}</p>
                    <div className="d-flex justify-content-between">
                      <small>Submitted: {new Date(enquiry.createdAt).toLocaleDateString()}</small>
                      <span className={`badge ${enquiry.resolved ? 'bg-success' : 'bg-warning'}`}>
                        {enquiry.resolved ? 'Resolved' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== FEES ========== */}
        {activeTab === 'fees' && (
          <div className="fees-section">
            <h4>Fee Management</h4>
            {fees.length === 0 && <p>No fee records found.</p>}
            <div className="fees-list">
              {fees.map(fee => (
                <div key={fee._id} className="fee-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>Academic Fee</h6>
                      <p><strong>Amount:</strong> ₹{fee.amount}</p>
                      <p><strong>Status:</strong> 
                        <span className={`badge ${fee.status === 'paid' ? 'bg-success' : 'bg-warning'} ms-2`}>
                          {fee.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      {fee.status === 'pending' && (
                        <button 
                          className="btn btn-primary"
                          onClick={() => handlePayment(fee._id, fee.amount)}
                          disabled={paymentLoading}
                        >
                          {paymentLoading ? 'Processing...' : 'Pay Now'}
                        </button>
                      )}
                      {fee.status === 'paid' && fee.paymentDate && (
                        <small className="text-success">
                          Paid on: {new Date(fee.paymentDate).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
