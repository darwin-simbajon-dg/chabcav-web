import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the terms and conditions to sign up.");
      return;
    }

    console.log("User signed up with the following details:", {
      name,
      email,
      password,
    });

    // Add your API call or logic here
  };

  return (
    <div className="sign-up-illustration">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              {/* Left Image Section */}
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  style={{
                    backgroundImage:
                      "url('/src/assets/img/illustrations/illustration-signup.jpg')",
                    backgroundSize: "cover",
                  }}
                  // loading="lazy"
                ></div>
              </div>

              {/* Form Section */}
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                <div className="card card-plain">
                  <div className="card-header">
                    <h4 className="font-weight-bolder">Sign Up</h4>
                    <p className="mb-0">Enter your email and password to register</p>
                  </div>
                  <div className="card-body">
                    <form role="form" onSubmit={handleSubmit}>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Gender</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Verify Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-check form-check-info text-start ps-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          I agree to the{" "}
                          <a href="#" className="text-dark font-weight-bolder">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-2 text-sm mx-auto">Already have an account?</p>
                    <a href="/" className="text-primary text-gradient font-weight-bold">
                      Sign in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
    
};

export default Register;