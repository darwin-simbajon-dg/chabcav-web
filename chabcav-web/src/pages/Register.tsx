import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../components/SpinnerModal";

const Register: React.FC = () => {

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(false);
  const navigate = useNavigate();
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
    if(isSuccessfulRegistration){
      navigate("/");
    }
  }
  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {

      setAlertMessage("Please accept the terms and conditions to sign up.");
      setAlertOpen(true);
      return;
    }

    if (password !== verifyPassword) {
 
      setAlertMessage("Passwords do not match.");
      setAlertOpen(true);
      return;
    }

    setIsLoading(true);

    const role = 'User';

    let response: Response | undefined;
    try {
      response = await fetch('http://localhost:80/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });
    } catch {
      setIsLoading(false);
      setAlertMessage("Registration Failed");
      setAlertOpen(true);
      return;
    }

    if (!response.ok) {
      setIsLoading(false);
      const errorData = await response.json();
      setAlertMessage(errorData || "Registration Failed");
      setAlertOpen(true);
      return;
    }
      setIsLoading(false);
      setAlertMessage("Registration Successful you will be redirected to login page after closing this");
      setAlertOpen(true);
      setIsSuccessfulRegistration(true);
      

    console.log("User signed up with the following details:", {
      name,
      email,
      password,
    });

    // Add your API call or logic here
  };

  return (
    <div className="sign-up-illustration">
        <SpinnerModal show={isLoading} />
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
                        <label className="form-label"></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={username}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label"></label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label"></label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label"></label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={verifyPassword}
                          onChange={(e) => setVerifyPassword(e.target.value)}
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
      <Modal open={alertOpen} onClose={handleAlertClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Registration
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {alertMessage}
          </Typography>
          <Button onClick={handleAlertClose} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
    
};

export default Register;