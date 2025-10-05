import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("admissions");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // Data states for each module
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [fees, setFees] = useState([]);

  // Modals
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch data per tab
  const fetchData = async (endpoint, setter) => {
    setLoading(true);
    try {
      const res = await axios.get(endpoint, axiosConfig);
      setter(res.data.data || res.data.applications || res.data.students || []);
      setError(null);
    } catch (err) {
      setError("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case "students":
        fetchData("/api/admin/students", setStudents);
        break;
      case "admissions":
        fetchData("/api/admin/applications", (data) =>
          setAdmissions(data.filter((a) => a.applicationStatus === "pending"))
        );
        break;
      case "courses":
        fetchData("/api/courses", setCourses);
        break;
      case "sessions":
        fetchData("/api/sessions", setSessions);
        break;
      case "notices":
        fetchData("/api/notices", setNotices);
        break;
      case "events":
        fetchData("/api/events", setEvents);
        break;
      case "enquiries":
        fetchData("/api/enquiries", setEnquiries);
        break;
      case "fees":
        fetchData("/api/admin/fees", setFees);
        break;
      default:
        break;
    }
  }, [activeTab]);

  // Admission actions
  const approveAdmission = async (id) => {
    await axios.put(`/api/admin/applications/${id}/approve`, {}, axiosConfig);
    fetchData("/api/admin/applications", setAdmissions);
    alert("Approved & credentials emailed to student");
  };
  const rejectAdmission = async (id) => {
    await axios.put(`/api/admin/applications/${id}/reject`, {}, axiosConfig);
    fetchData("/api/admin/applications", setAdmissions);
    alert("Rejected & email sent to student");
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`/api/admin/students/${id}`, axiosConfig);
    fetchData("/api/admin/students", setStudents);
  };

  // Add New Course
  const addCourse = async () => {
    const name = prompt("Course name?");
    if (!name) return;
    await axios.post("/api/courses", { name }, axiosConfig);
    fetchData("/api/courses", setCourses);
  };

  // Add Session
  const addSession = async () => {
    const name = prompt("Session (e.g., 2024-25)?");
    if (!name) return;
    await axios.post("/api/sessions", { name }, axiosConfig);
    fetchData("/api/sessions", setSessions);
  };

  // Add Notice
  const addNotice = async () => {
    const title = prompt("Notice title?");
    if (!title) return;
    await axios.post("/api/notices", { title }, axiosConfig);
    fetchData("/api/notices", setNotices);
  };

  // Add Event
  const addEvent = async () => {
    const title = prompt("Event title?");
    if (!title) return;
    await axios.post("/api/events", { title }, axiosConfig);
    fetchData("/api/events", setEvents);
  };

  // Resolve Enquiry
  const resolveEnquiry = async (id) => {
    await axios.put(`/api/enquiries/${id}/resolve`, {}, axiosConfig);
    fetchData("/api/enquiries", setEnquiries);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-tabs">
        {["admissions", "students", "courses", "sessions", "notices", "events", "enquiries", "fees"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* ========== ADMISSIONS ========== */}
      {activeTab === "admissions" && (
        <>
          <h4>Admission Requests</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Application ID</th><th>Name</th><th>Email</th><th>Course</th><th>Session</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((a) => (
                <tr key={a._id}>
                  <td>{a.applicationId}</td>
                  <td>{a.personalDetails.firstName} {a.personalDetails.lastName}</td>
                  <td>{a.personalDetails.email}</td>
                  <td>{a.academicDetails.course}</td>
                  <td>{a.academicDetails.session}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-1" onClick={() => approveAdmission(a._id)}>Accept</button>
                    <button className="btn btn-danger btn-sm me-1" onClick={() => rejectAdmission(a._id)}>Reject</button>
                    <button className="btn btn-info btn-sm" onClick={() => setSelectedItem(a)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ========== STUDENTS ========== */}
      {activeTab === "students" && (
        <>
          <h4>Students</h4>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Session</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td>{s.applicationId}</td>
                  <td>{s.personalDetails.firstName} {s.personalDetails.lastName}</td>
                  <td>{s.personalDetails.email}</td>
                  <td>{s.academicDetails.course}</td>
                  <td>{s.academicDetails.session}</td>
                  <td>{s.applicationStatus}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-1">Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ========== COURSES ========== */}
      {activeTab === "courses" && (
        <>
          <h4>Courses</h4>
          <button className="btn btn-success mb-2" onClick={addCourse}>Add Course</button>
          <ul className="list-group">
            {courses.map(c => <li key={c._id} className="list-group-item">{c.name}</li>)}
          </ul>
        </>
      )}

      {/* ========== SESSIONS ========== */}
      {activeTab === "sessions" && (
        <>
          <h4>Sessions</h4>
          <button className="btn btn-success mb-2" onClick={addSession}>Add Session</button>
          <ul className="list-group">
            {sessions.map(s => <li key={s._id} className="list-group-item">{s.name}</li>)}
          </ul>
        </>
      )}

      {/* ========== NOTICES ========== */}
      {activeTab === "notices" && (
        <>
          <h4>Notices</h4>
          <button className="btn btn-success mb-2" onClick={addNotice}>Add Notice</button>
          <ul className="list-group">
            {notices.map(n => <li key={n._id} className="list-group-item">{n.title}</li>)}
          </ul>
        </>
      )}

      {/* ========== EVENTS ========== */}
      {activeTab === "events" && (
        <>
          <h4>Events</h4>
          <button className="btn btn-success mb-2" onClick={addEvent}>Add Event</button>
          <ul className="list-group">
            {events.map(e => <li key={e._id} className="list-group-item">{e.title}</li>)}
          </ul>
        </>
      )}

      {/* ========== ENQUIRIES ========== */}
      {activeTab === "enquiries" && (
        <>
          <h4>Enquiries</h4>
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Message</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {enquiries.map(e => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.message}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => resolveEnquiry(e._id)}>Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ========== FEES ========== */}
      {activeTab === "fees" && (
        <>
          <h4>Fees</h4>
          <table className="table">
            <thead>
              <tr><th>Student</th><th>Status</th><th>Amount</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {fees.map(f => (
                <tr key={f._id}>
                  <td>{f.studentName}</td>
                  <td>{f.status}</td>
                  <td>{f.amount}</td>
                  <td>
                    {f.status === "pending" && <button className="btn btn-primary btn-sm">Mark Paid</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* View Details Modal */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h5>{selectedItem.personalDetails.firstName} {selectedItem.personalDetails.lastName}</h5>
            <p>Email: {selectedItem.personalDetails.email}</p>
            <p>Course: {selectedItem.academicDetails.course}</p>
            <p>Session: {selectedItem.academicDetails.session}</p>
            <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
