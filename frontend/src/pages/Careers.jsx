import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Careers() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:shantanu.srivastava08@outlook.com';
  };

  return (
    <div className="pt-5">
      <div className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center display-4 fw-bold mb-5">Career Opportunities</h2>
          <div className="card bg-light p-4 shadow-lg mb-5">
            <h3 className="h2 fw-semibold mb-4">Faculty Vacancy</h3>
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your age"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Experience</label>
                <select className="form-select">
                  <option>0-1 Year</option>
                  <option>1-3 Years</option>
                  <option>3+ Years</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Previous Experience Details</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Tell us about your previous experience..."
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <button
                  type="submit" style={{backgroundColor:"#ff6633"}}
                  className="btn w-100 py-3 fw-semibold"
                >
                  Submit Application <ChevronRight className="ms-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}