import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import students from '../assets/students.jpg'
import {
  Shield,
  Users,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  UserCog,
  PencilRuler
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = '..';
  }

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section
        className="position-relative min-vh-100 d-flex align-items-center bg-black" 
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${students})`,
          backgroundSize:'cover',
          backgroundPosition: 'center',
        height:"100vh"}}
      >
        <div className="position-absolute top-0 start-0 end-0 bottom-0" >
        </div>

        <div className="container mx-auto px-4 position-relative">
          <div className="row">
            <div className="col-lg-8 text-white">
              {/* Main Heading */}
              <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                One Portal for All Academic Needs — Built for <span style={{color:"#ff6633"}}>REC Mirzapur</span>
              </h1>

              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4 mb-5 animate__animated animate__fadeIn">
                <Link
                  to="/registration"
                  className="btn btn-lg px-5 py-3 rounded-pill d-inline-flex align-items-center" style={{backgroundColor:"#ff6633"}}
                >
                  Get Started
                  <ChevronRight className="ms-2" />
                </Link>
                <Link
                  to="/about"
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill d-inline-flex align-items-center"
                >
                  Learn More
                  <ChevronRight className="ms-2" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="row g-4 animate__animated animate__fadeIn" style={{color:"#ff6633"}}>
                {[
                  { number: "5+", text: "Departments" },
                  { number: "20+", text: "Our Staff" },
                  { number: "18+", text: "Years Of Established" },
                  { number: "500+", text: "Graduates" }
                ].map((stat, index) => (
                  <div key={index} className="col-6 col-md-3 text-center">
                    <div className="h3 fw-bold"  style={{color: "#ff6633"}} >{stat.number}</div>
                    <div className="small text-light">{stat.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Showcase (Student and Admin) */}
      <section className="py-5 d-flex bg-light">
        <div className="container py-5">
          <h2 className="text-center display-4 fw-bold mb-4">Your Gateway to Academic Management</h2>
          <p className="text-center lead text-muted mb-5 mx-auto" style={{maxWidth: '800px'}}>
            EduGate is a centralized Student & Academic management system 
          </p>

          <div className="row g-4 mt-3 justify-content-evenly">
            {/* Login Cards */}
            <div className="col-md-4">
              <Link to={"/student-login"}className='text-decoration-none'>
              <div className="card h-100 w-100 overflow-hidden" style={{borderRadius:"15px",cursor:"pointer",transition:"transform 0.2s"}}>
                <GraduationCap className='ms-4 mb-5' style={{color:"black"}} size={250}  />
                <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50">
                  <h3 className=" text-center card-title text-white">Student Login</h3>
                </div>
              </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link to={"/admin-login"} className='text-decoration-none'>
              <div className="card h-100 w-100 overflow-hidden" style={{borderRadius:"15px",cursor:"pointer",transition:"transform 0.2s"}}>
                <UserCog style={{color:"black"}} className='ms-4' size={250} />
                <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50">
                  <h3 className="text-center card-title text-white">Admin Login</h3>  
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-4 bg-white">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-md-6 position-relative">
              <img
                src="src\assets\edugate.jpg"
                alt="edugate_logo" style={{width:"350px",height:"350px"}}
                className="img-fluid rounded ms-5  z-1 shadow"
              />
            </div> 
            <div className="col-md-6">
              <h2 className="display-4 fw-bold mb-4">About EduGate</h2>
              <p className="lead text-muted mb-4">
                The rapid advancement of technology has transformed the way educational institutions operate and manage their academic and administrative processes.
              </p>
              <p className="lead text-muted mb-4">
                EduGate is a web-based college management portal designed specifically for Rajkiya Engineering College, Gonda to streamline communication, academic operations, and data management between students, faculty, and administration.</p>
              <p className="lead text-muted mb-4" >
                This platform aims to integrate all academic and administrative functions under one digital roof, reducing manual effort, increasing efficiency, and ensuring seamless access to information anytime, anywhere.
              </p>
              <Link
                to="/about"
                className="btn btn-link fw-bold text-decoration-none d-inline-flex align-items-center"  style={{color: "#ff6633"}} 
              >
                Learn more about 
                <ChevronRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-4 bg-light">
        <div className="container py-4">
          <h2 className="text-center display-4 fw-bold mb-5">Features</h2>
          <div className="row g-4">
            {[
              {
                icon: Users,
                title: "Student Information Management",
                description: ""
              },
              {
                icon: Shield,
                title: "Course & Session Management",
                description: ""
              },
              {
                icon: PencilRuler,
                title: "Managing Enquiries",
                description: ""
              },
              {
                icon: Shield,
                title: "Admin Management",
                description: ""
              }
            ].map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 bg-light p-4 text-center shadow">
                  <feature.icon className="mx-auto mb-4" style={{color: "#ff6633"}} size={48} />
                  <h3 className="h4 fw-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-white" id="contact">
        <div className="container py-5">
          <h2 className="text-center display-4 fw-bold mb-5">Contact Us</h2>
          
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="card bg-light p-4 shadow">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-medium">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Phone</label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Query About</label>
                    <select className="form-select form-select-lg">
                      <option>Registration</option>
                      <option>Admission</option>
                      <option>Careers</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Message</label>
                    <textarea
                      className="form-control form-control-lg"
                      rows={4}
                      placeholder="Tell us about your Enquiry..."
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit" style={{backgroundColor: "#ff6633"}}
                      className="btn btn-lg w-100 py-3"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card bg-light p-4 shadow mb-4">
                <h3 className="h2 fw-bold mb-4">Contact Information</h3>

                <div className="row  g-4">
                  <div className="col-12 d-flex">
                    <Phone className=" me-3 mt-1" size={24} style={{color: "#ff6633"}} />
                    <div>
                      <p className="fw-semibold mb-1">Phone</p>
                      <a style={{textDecoration:"none"}} href="tel:05444252003" className="text-muted d-block">
                        05444252003
                      </a>
                      <a style={{textDecoration:"none"}} href="tel:7379070858" className="text-muted d-block">
                        7379070858
                      </a>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <Mail className="me-3 mt-1" style={{color: "#ff6633"}} size={24} />
                    <div>
                      <p className="fw-semibold mb-1">Email</p>
                      <a style={{textDecoration:"none"}} href="mailto:directorrecmzp@gmail.com" className="text-muted">
                        directorrecmzp@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="col-12 d-flex">
                    <MapPin className="me-3 mt-1" style={{color: "#ff6633"}} size={24} />
                    <div>
                      <p className="fw-semibold mb-1">Address</p>
                      <p className="text-muted">
                        Rajkiya Engineering College, Mirzapur, U.P. - 231206
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-light p-4 shadow">
                <h3 className="h2 fw-bold mb-4">Operating Hours</h3>
                <div className="row g-3">
                  <div className="col-12 d-flex justify-content-between">
                    <span className="fw-medium">Monday - Saturday:</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="col-12 d-flex justify-content-between">
                    <span className="fw-medium">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row g-5">
            <div className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center mb-3">
                <h3 className="h4 fw-bold mb-0" style={{color: "#ff6633"}}>RAJKIYA ENGINEERING COLLEGE</h3>
              </div>
              <p className="text-white mb-4">
                Rajkiya Engineering College, Mirzapur (Presently operating from campus of Rajkiya Engineering College, Churk, Sonbhadra, U.P. - 231206)
              </p>
              
            </div>
            <div className="col-md-6 col-lg-3">
              <h3 className="h4 fw-bold mb-3" style={{color: "#ff6633"}}>Quick Links</h3>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className=" text-decoration-none text-white">AKTU</Link></li>
                <li className="mb-2"><Link to="/" className="text-white text-decoration-none">AICTE</Link></li>
                <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Circular AKTU</Link></li>
                <li className="mb-2"><Link to="/" className="text-white text-decoration-none">NPTEL</Link></li>
                <li><Link to="/" className="text-white text-decoration-none">AKTU-ERP</Link></li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3">
              <h3 className="h4 fw-bold mb-3" style={{color: "#ff6633"}}>COLLEGE CELL</h3>
              <ul className="list-unstyled text-white">
                <li className="mb-2">Anti-Ragging Cell</li>
                <li className="mb-2">Placement Cell</li>
                <li className="mb-2">Grievance Redressal Cell</li>
                <li className="mb-2">IQAC Cell</li>
                <li className="mb-2">Our Faculty</li>
                <li className="mb-2">Our Department</li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-3">
              <h3 className="h4 fw-bold mb-3" style={{color: "#ff6633"}}>POLICIES</h3>
              <ul className="list-unstyled text-white">
                <li className="mb-2">Disclaimer</li>
                <li className="mb-2">Privacy policy</li>
                <li className="mb-2">Hyperlinking Policy</li>
                <li className="mb-2">Copyright Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-top border-secondary mt-5 pt-4 text-center">
            <p className="text-white">
              © Copyright {new Date().getFullYear()} REC Mirzapur, Uttar Pradesh, India | Powered by Softpro India Computer Technologies (P) Ltd. 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}