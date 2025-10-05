import React from 'react';
import './Header.css';
import recLogo from '../assets/reclogo.jpg';
import aktuLogo from '../assets/aktulogo.png';
 import image from '../assets/image.png'; 
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="left-buttons">
          </div>
          <div className="right-buttons mt-2 mb-2">

            <button  style={{backgroundColor: "#ff6633"}}  className="btn text-light me-2">
              <i className="fa-solid fa-building-columns"></i> Virtual Tour
            </button>

            <button onClick={()=> navigate("/student-login")} style={{backgroundColor: "#ff6633"}}  className="btn text-light me-2">Student Login</button>

            <button onClick={()=> navigate("/admin-login")} style={{backgroundColor: "#ff6633"}}  className="btn text-light me-3">Admin Login</button>

            <Link to={''}  style={{backgroundColor: "#ff6633"}}  className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to={''}  style={{backgroundColor: "#ff6633"}}  className="social-icon youtube">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link to={''}  style={{backgroundColor: "#ff6633"}}  className="social-icon linkedin">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo-section">
            <img src={recLogo} alt="REC Logo" className="rec-logo" />
          </div>
          <div className="text-section text-center">
            <h3>Rajkiya Engineering College, Mirzapur</h3>
            <h6 className='mt-3' >राजकीय इंजीनियरिंग कॉलेज, मिर्जापुर</h6>
            <h6 className="sub-text mt-2">
              An AKTU-affiliated Government Engineering College (Code: 1215)
            </h6>
          </div>
          <div className="right-logos">
            <img src={aktuLogo} alt="AKTU Logo" className="small-logo" />
             <img src={image} alt="Make In India" className="small-logo" /> 
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <nav className="bottom-navbar sticky-top">
        <div className="container">
          <ul className="nav-list">
            <li><a href="/">HOME</a></li>
            <li><a href="/about">ABOUT REC</a></li>
            <li><a href="/academics">ACADEMICS</a></li>
            <li><a href="/departments">DEPARTMENTS</a></li>
            <li><a href="/placement">PLACEMENT CELL</a></li>
            <li><a href="/students">STUDENTS</a></li>
            <li><a href="/student-login">STUDENT LOGIN</a></li>
            <li><a href="/admin-login">ADMIN LOGIN</a></li>
            <li><a href="/careers">CAREERS</a></li>
            <li><a href="/apply">REGISTRATION</a></li>
            <li><a href="/contact">CONTACT US</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
