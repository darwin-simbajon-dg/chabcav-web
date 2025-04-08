import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import SpinnerModal from "../../components/SpinnerModal";
import { useToast } from "../../context/ToastContext";


const ResetPassword: React.FC = () => {

  
  // const [open, setOpen] = useState(false);
//   const [alertOpen, setAlertOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation(); 
    const [info, setInfo] = useState("Update your Password");
    const [otp, setOTP] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(true);
    const [showOTPVerificationButton, setShowOTPVerificationButton] = useState(false);
    const [showChangePasswordButton, setShowChangePasswordButton] = useState(true);

  
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
        const emailAddress = queryParams.get("email"); // Replace "userId" with your query parameter key
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
//   const handleAlertClose = () => {
//     setAlertOpen(false);
//     if(isSuccessfulRegistration){
//       navigate("/");
//     }
//   }
//   const handleSubmit =  async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!termsAccepted) {

//       setAlertMessage("Please accept the terms and conditions to sign up.");
//       setAlertOpen(true);
//       return;
//     }

//     if (password !== verifyPassword) {
 
//       setAlertMessage("Passwords do not match.");
//       setAlertOpen(true);
//       return;
//     }

//     setIsLoading(true);

//     const role = 'User';

//     const response = await fetch('http://localhost:80/user/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, email, password, role }),
//     }).catch(() => {
//         setIsLoading(false);
//         setAlertMessage("Registration Failed");  
//         setAlertOpen(true);
//     });

//      if(!response.ok){
//         setIsLoading(false);
//         const errorData = await response.json();
//         setAlertMessage(errorData || "Registration Failed");  
//         setAlertOpen(true);
//         return;
//       }
//       setIsLoading(false);
//       setAlertMessage("Registration Successful you will be redirected to login page after closing this");
//       setAlertOpen(true);
//       setIsSuccessfulRegistration(true);
      

//     console.log("User signed up with the following details:", {
//       name,
//       email,
//       password,
//     });

//     // Add your API call or logic here
//   };

const handleOTPVerification = async (e:React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);


   const response = await fetch("http://localhost/user/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({emailAddress, newPassword, currentPassword, otp})
        });
  
        if(!response.ok){
          
          const errorData = await response.json();
        //   throw new Error(errorData.message || "Password Change Failed");
          showToast(errorData.error || "Password Change Failed");
          setIsLoading(false);
          return false;
        } 
        const result = await response.json();
        showToast("Password Changed Successfully");
        setIsLoading(false);
        console.log(result);
        localStorage.clear();
        navigate("/");

}

  const handleChangePassword = async (e:React.FormEvent) => {
      e.preventDefault();
      
      console.log("Password Changed");
      
      try {
        

  
        if (currentPassword === newPassword) {
          showToast("Current Password and New Password cannot be the same");
          return;
        }
  
        if(newPassword.length < 6){
          showToast("Password must be at least 6 characters long");
          return;}
  
          const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
          if (!specialCharacterPattern.test(newPassword)) {
            showToast("Password must contain at least one special character");
            return;
          }
  
          
          if (newPassword !== confirmPassword) {
            showToast("New Password and Confirm New Password must be the same");
            return;
          }
  
          if(currentPassword === newPassword){
            showToast("Current Password and New Password cannot be the same");
            return;
          }
          setIsLoading(true);
          const response = await fetch("http://localhost/user/send-otp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({emailAddress})
            });
      
            if(!response.ok){
              showToast("Send OTP Failed");
              const errorData = await response.json();
              setIsLoading(false);
              throw new Error(errorData.message || "Send OTP Failed");
            } 
            const result = await response.json();
            setShowChangePassword(false);
            setShowOTP(true);
            setInfo("Enter the OTP sent to your email");
            setShowChangePasswordButton(false);
            setShowOTPVerificationButton(true);
            showToast("an OTP has been sent to your email");
            setIsLoading(false);
            console.log(result);
            localStorage.clear();
           
           
        
       
  
        
  
      } catch (err) {
    }
  }

  

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
                    <h4 className="font-weight-bolder">Reset Password</h4>
                    <p className="mb-0">{info}</p>
                  </div>
                  <div className="card-body">
                    <form role="form">
                        {showChangePassword && (
                            <>
                            {/* <div className="input-group input-group-outline">
                     <label className="form-label">Current password</label>
                    <input type="password" className="form-control" onChange={(e)=>setCurrentPassword(e.target.value)} />
                     </div> */}

                    <div className="input-group input-group-outline my-4">
                      <label className="form-label">New password</label>
                    <input type="password" className="form-control" onChange={(e)=>setNewPassword(e.target.value)} />
                    </div>


                      <div className="input-group input-group-outline">
                     <label className="form-label">Confirm New password</label>
                     <input type="password" id="confirmPassword" className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                            </>
                        )}
                    

<p>

</p>
     
                    {showOTP && (
                      <div className="input-group input-group-outline">
                        <label className="form-label">Verify OTP</label>
                        <input
                          type="text"
                          id="otp"
                          className="form-control"
                          onChange={(e) => setOTP(e.target.value)}
                        />
                      </div>
                    )}
                    
                    
                      <div className="text-center">
                        {showChangePasswordButton && (
                          <button
                            type="submit"
                            className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"onClick={handleChangePassword}
                          >
                            Update Password
                          </button>
                        )}  

                        {showOTPVerificationButton && (
                          <button
                            type="submit"
                            className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"onClick={handleOTPVerification}
                          >
                            Verify OTP
                          </button>
                        )}              
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Modal open={alertOpen} onClose={handleAlertClose}>
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
      </Modal> */}
    </div>
  );
    
};

export default ResetPassword;