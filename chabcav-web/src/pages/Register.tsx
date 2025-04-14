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
  const [showTerms, setShowTerms] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleAlertClose = () => {
    setAlertOpen(false);
    if (isSuccessfulRegistration) {
      navigate("/");
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
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
      response = await fetch('https://chabcav-api-development.up.railway.app/user/register', {
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
                      "/banner.png",
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
                          <button
                            type="button"
                            className="text-dark font-weight-bolder underline"
                            onClick={() => setShowTerms(true)}
                          >
                            Terms and Conditions
                          </button>
                        </label>
                        {showTerms && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto relative">
                              <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                                onClick={() => setShowTerms(false)}
                              >
                                ✖
                              </button>
                              <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                              <p><strong>For "Chabacano E-Learning" Website</strong></p>
                              <ol className="list-decimal pl-5 space-y-2 mt-2 text-sm text-gray-700">
                                <li>
                                  <strong>Acceptance of Terms</strong><br />
                                  By using this website, you agree to these terms. If you disagree, please exit the site.<br />
                                  <em>(Chabacano: "Si ta usa usted este website, acepta usted con este terminos. Si no quiere, no debe continua.")</em>
                                </li>
                                <li>
                                  <strong>User Responsibilities</strong><br />
                                  • Provide accurate info (no fake accounts).<br />
                                  • Do not share passwords or misuse content.<br />
                                  <em>(Chabacano: "Dale informacion verdadero. No comparti contraseña o roba contenido.")</em>
                                </li>
                                <li>
                                  <strong>Intellectual Property</strong><br />
                                  • Do not copy, sell, or redistribute without permission.<br />
                                  <em>(Chabacano: "Todo leccion y diseño pertenece con este sitio. No puede copia o vende.")</em>
                                </li>
                                <li>
                                  <strong>Privacy Policy</strong><br />
                                  • We collect email, name, and progress data to improve learning.<br />
                                  • Data is never sold to third parties.<br />
                                  <em>(Chabacano: "Guardamos tu email y nombre para ayuda tu aprendizaje. No vendemos informacion.")</em>
                                </li>
                                <li>
                                  <strong>Limitations</strong><br />
                                  • We’re not liable for:<br />
                                  &nbsp;&nbsp;o Technical errors (e.g., server downtime).<br />
                                  &nbsp;&nbsp;o Mistakes in lessons (report them!).<br />
                                  &nbsp;&nbsp;o User misconduct (e.g., hacking attempts).<br />
                                  <em>(Chabacano: "No kami responsable si hay problema técnico o error na leccion.")</em>
                                </li>
                                <li>
                                  <strong>Changes to Terms</strong><br />
                                  We may update these terms. Check this page periodically.<br />
                                  <em>(Chabacano: "Puede kami cambia este terminos. Revisa de vez en cuando.")</em>
                                </li>
                                <li>
                                  <strong>Contact</strong><br />
                                  Email chabcavsuite@gmail.com for questions, clarifications, and concerns.<br />
                                  <em>(Chabacano: "Si tiene pregunta, manda email: chabcavsuite@gmail.com.")</em>
                                </li>
                              </ol>
                            </div>
                          </div>
                        )}

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