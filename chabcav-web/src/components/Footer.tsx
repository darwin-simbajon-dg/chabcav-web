import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer pt-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-3 mb-4 ms-auto">
            <div>
              <a href="https://www.creative-tim.com/product/material-kit-pro">
                <img
                  src="../assets/img/logo-ct-dark.png"
                  className="mb-3 footer-logo"
                  alt="main_logo"
                />
              </a>
              <h6 className="font-weight-bolder mb-4">Material Kit 3 PRO</h6>
            </div>
            <div>
              <ul className="d-flex flex-row ms-n3 nav">
                <li className="nav-item">
                  <a
                    className="nav-link pe-1"
                    href="https://www.facebook.com/CreativeTim/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook text-lg opacity-8"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link pe-1"
                    href="https://twitter.com/creativetim"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter text-lg opacity-8"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link pe-1"
                    href="https://dribbble.com/creativetim"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-dribbble text-lg opacity-8"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link pe-1"
                    href="https://github.com/creativetimofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github text-lg opacity-8"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link pe-1"
                    href="https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube text-lg opacity-8"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Section */}
          <div className="col-md-2 col-sm-6 col-6 mb-4">
            <div>
              <h6 className="text-sm">Company</h6>
              <ul className="flex-column ms-n3 nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/presentation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/templates/free"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Freebies
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/templates/premium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Premium Tools
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources Section */}
          <div className="col-md-2 col-sm-6 col-6 mb-4">
            <div>
              <h6 className="text-sm">Resources</h6>
              <ul className="flex-column ms-n3 nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://iradesign.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Illustrations
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/bits"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bits & Snippets
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/affiliates/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Help & Support Section */}
          <div className="col-md-2 col-sm-6 col-6 mb-4">
            <div>
              <h6 className="text-sm">Help & Support</h6>
              <ul className="flex-column ms-n3 nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/contact-us"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/knowledge-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Knowledge Center
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://services.creative-tim.com/?ref=ct-material-kit-pro-footer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Custom Development
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/sponsorships"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sponsorships
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Section */}
          <div className="col-md-2 col-sm-6 col-6 mb-4 me-auto">
            <div>
              <h6 className="text-sm">Legal</h6>
              <ul className="flex-column ms-n3 nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/knowledge-center/terms-of-service/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/knowledge-center/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.creative-tim.com/license"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Licenses (EULA)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="col-12">
            <div className="text-center">
              <p className="text-dark my-4 text-sm font-weight-normal">
                All rights reserved. Copyright ©{" "}
                {new Date().getFullYear()} Material Kit by{" "}
                <a
                  href="https://www.creative-tim.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative Tim
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
