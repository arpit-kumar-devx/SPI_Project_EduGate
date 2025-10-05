import React from 'react';
import { MapPin, Phone, Mail, Merge as Tiger } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:shantanu.srivastava08@outlook.com';
  };

  return (
    <div className="pt-5">
      <div className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Contact Us</h2>
            <h3 style={{color:"#ff6633"}} >Get in Touch</h3>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit" style={{backgroundColor:"#ff6633"}}
                    className="btn w-100 py-3 fw-semibold"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-column gap-4">
                <div className="card p-4 shadow">
                  <div className="d-flex justify-content-center mb-4">
                    <Tiger style={{color:"#ff6633"}} size={64} />
                  </div>
                  <h3 className="h2 fw-bold text-center mb-4">REC Mirzapur</h3>
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex">
                        <MapPin className=" me-3 flex-shrink-0" style={{color:"#ff6633"}} size={20} />
                        <div>
                          <p>Rajkiya Engineering College, Mirzapur (Presently operating from campus of Rajkiya Engineering College, Churk, Sonbhadra, U.P. - 231206)</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Phone className="me-3" style={{color:"#ff6633"}} size={20} />
                        <a href="tel:+05444252003" className="text-decoration-none text-dark">
                          05444252003
                        </a>
                        
                      </div>
                      <div className="d-flex align-items-center">
                        <Mail className="me-3" style={{color:"#ff6633"}} size={20} />
                        <a href="mailto:directorrecmzp@gmail.com" className="text-decoration-none text-dark">
                          directorrecmzp@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card overflow-hidden" style={{height: '300px'}}>
                  
                  <div className="w-100 h-100 bg-secondary d-flex align-items-center justify-content-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.251773201536!2d82.56670969999999!3d25.1271775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fc10009b0c6f3%3A0xe55164ce440bf746!2sRajkiya%20Engineering%20College%2C%20Mirzapur!5e0!3m2!1sen!2sin!4v1739449845984!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}