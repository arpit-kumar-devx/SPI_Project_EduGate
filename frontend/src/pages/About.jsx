import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-5">
      <div className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-4">
              Rajkiya Engineering College, Mirzapur
            </h1>
            <h2 className="h2 mb-3" style={{color:"#ff6633"}}>
              Shaping future technocrats through innovation, integrity & infrastructure.
            </h2>
            <div className="w-25 h-2 bg-danger mx-auto"></div>
          </div>

          {/* Introduction Section */}
          <div className="mb-5">
            <div className="lead text-muted mb-4">
              <strong>Rajkiya Engineering College, Mirzapur</strong> — established by the Government of Uttar
              Pradesh in 2023, this AKTU-affiliated institution offers four-year B.Tech programs in Computer
              Science & Engineering, Information Technology, Electronics Engineering, and Electrical
              Engineering, with a yearly intake of 60 students per discipline. For its inaugural academic
              session (2023–24), REC Mirzapur is operating from the fully residential 30-acre campus of its
              mentor college in Sonbhadra, equipped with academic blocks, hostels, activity centers, and
              round-the-clock utilities.
            </div>
            <div className="lead text-muted mb-4">
              At REC Mirzapur, education goes beyond textbooks. From day one, students benefit from
              tech-enabled learning—well-equipped labs, a digital library, and smart classrooms that foster
              innovation and hands-on exploration. Like every modern institution, it provides robust amenities
              including secure hostels, Wi-Fi access, sports facilities, in-campus health services, and
              continuous power supply—creating an environment where academic growth and personal well-being go
              hand in hand.
            </div>
          </div>

          {/* Features Section */}
          <div className="row g-4 mb-4">
            <div className="col-12">
              <div className="card bg-light p-4">
                <h3 className="fw-bold mb-3">1. Modern Fully-Residential Mentor Campus</h3>
                <p className="text-muted mb-3">
                  REC Mirzapur began operations at the well-equipped, fully residential 30-acre campus of its
                  mentor institution, REC Sonbhadra. Facilities include academic blocks, student activity
                  centers, hostels with cooperative messes, a health center, canteen, open gym, and uninterrupted
                  electricity and water supply.
                </p>
              </div>
            </div>

            <div className="col-12">
              <div className="card bg-light p-4">
                <h3 className="fw-bold mb-3">2. Robust Hostel Infrastructure</h3>
                <p className="text-muted mb-3">
                  The college provides ample hostel accommodations—with multiple boys’ and girls’ hostels offering
                  single, double, and triple-seater rooms. Facilities include furnished living spaces, high-speed
                  Wi-Fi, solar water heaters, a gym, common TV rooms, libraries, and indoor and outdoor sports
                  provisions.
                </p>
              </div>
            </div>

            <div className="col-12">
              <div className="card bg-light p-4">
                <h3 className="fw-bold mb-3">3. Well-Furnished Academic Facilities</h3>
                <p className="text-muted mb-3">
                  REC Mirzapur’s infrastructure includes spacious and well-lit classrooms, departmental labs,
                  computer centers, digital libraries, and smart classroom setups to support interactive and
                  tech-enabled learning.
                </p>
              </div>
            </div>

            <div className="col-12">
              <div className="card bg-light p-4">
                <h3 className="fw-bold mb-3">4. Strong IT & Lab Support</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light">
                    The IT department serves as the backbone of campus infrastructure
                  </li>
                  <li className="list-group-item bg-light">
                    Implement systems to accurately track and record attendance of staff and workers
                  </li>
                  <li className="list-group-item bg-light">
                    Maintain systematic records of gate passes and challans to monitor movement and deliveries
                  </li>
                  <li className="list-group-item bg-light">
                    Conduct periodic fire drills for emergency preparedness and safety compliance
                  </li>
                  <li className="list-group-item bg-light">
                    Document key issuance and returns to control access to facilities
                  </li>
                  <li className="list-group-item bg-light">
                    Deploy firewalls, antivirus, encryption, content filters, and real-time activity monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-5">
            <Link to="/contact" style={{backgroundColor:"#ff6633"}} className="btn btn-lg px-5 py-3 fw-semibold">
              Contact
              <ChevronRight className="ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}