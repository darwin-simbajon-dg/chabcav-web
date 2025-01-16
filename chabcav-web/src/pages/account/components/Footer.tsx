import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer py-4">
    <div className="container-fluid">
      <div className="row align-items-center justify-content-lg-between">
        <div className="col-lg-6">
          <div className="copyright text-center text-sm text-muted text-lg-start">
            © {new Date().getFullYear()}, made with <i className="fa fa-heart"></i> by
            <a href="#" className="font-weight-bold">Creative Tim</a> for a better web.
          </div>
        </div>
        <div className="col-lg-6">
          <ul className="nav nav-footer justify-content-center justify-content-lg-end">
            <li className="nav-item">
              <a className="nav-link text-muted" href="#">Creative Tim</a>
            </li>
            {/* Add more nav links */}
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
