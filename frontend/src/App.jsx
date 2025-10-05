import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Header from './components/Header';
import ApplicationForm from './components/student/ApplicationForm';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './components/student/StudentDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-white">
        <Header />
        <main className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/student-login' element={}/> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />

            {/* Student */}
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />


            {/* Admin */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;