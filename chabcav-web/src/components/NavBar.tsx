import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const handleGoToLesson = () => {
        navigate("/user/lessons"); // Replace "/lesson" with the route you want to navigate to
      };
 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white z-index-3 py-3">
      <div className="container">
        <a
          className="navbar-brand"
          href="https://demos.creative-tim.com/material-kit-pro/index"
          rel="tooltip"
          title="Designed and Coded by Creative Tim"
          data-placement="bottom"
          target="_blank"
        >
          Chabacano Learning System
        </a>
        <a
          href="https://www.creative-tim.com/product/material-kit-pro#pricingCard"
          className="btn btn-sm bg-gradient-dark btn-round mb-0 ms-auto d-lg-none d-block"
        >
          Buy Now
        </a>
        <button
          className="navbar-toggler shadow-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon mt-2">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div
          className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
          id="navigation"
        >
          <ul className="navbar-nav navbar-nav-hover mx-auto">
            <li className="nav-item mx-2">
              <a
                className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                role="button"
              >
                Administration
                <img
                  src="/src/assets/img/down-arrow-dark.svg"
                  alt="down-arrow"
                  className="arrow ms-1"
                />
              </a>
            </li>
            <li className="nav-item mx-2">
              <a
                className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                role="button"
              >
                Account
                <img
                  src="/src/assets/img/down-arrow-dark.svg"
                  alt="down-arrow"
                  className="arrow ms-1"
                />
              </a>
            </li>
           {/* <li className="nav-item mx-2">
              <a
                className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                role="button"
              >
                Blocks
                <img
                  src="/src/assets/img/down-arrow-dark.svg"
                  alt="down-arrow"
                  className="arrow ms-1"
                />
              </a>
            </li>
             <li className="nav-item mx-2">
              <a
                className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                role="button"
              >
                Docs
                <img
                  src="/src/assets/img/down-arrow-dark.svg"
                  alt="down-arrow"
                  className="arrow ms-1"
                />
              </a>
            </li> */}
          </ul>

          <ul className="navbar-nav d-lg-block d-none">
            <li className="nav-item">
            <button
                className="btn btn-sm bg-gradient-dark mb-0 me-1"
                onClick={handleGoToLesson} // Trigger navigation
              >
                Go to Lesson
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
