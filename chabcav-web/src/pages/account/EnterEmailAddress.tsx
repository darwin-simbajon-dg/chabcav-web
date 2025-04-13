import React, { useState } from "react";
import SpinnerModal from "../../components/SpinnerModal";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";


const EnterEmailAddress: React.FC = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const { showToast } = useToast();
    const navigate = useNavigate();

  




  const sendVerification = async (e:React.FormEvent) => {

    setIsLoading(true);

    if (!email) {
      showToast("Please enter your email address");
      return;
    }
    e.preventDefault();
    try {
       const response = await fetch("https://chabcav-api-development.up.railway.app/user/forgot-password", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
       })

        if(!response.ok){
          const errorData = await response.json();
          showToast(errorData.message || "Unable to process your request please contact support");
        }

        showToast("Password Reset Link Sent to your email");
        navigate("/");
    } catch (error) {
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
                  {/* <div className="card-header">
                    <h4 className="font-weight-bolder">Reset Password</h4>
                    <p className="mb-0">Update your Password</p>
                  </div> */}
                  <div className="card-body">
                    <form role="form">
                    {/* <div className="input-group input-group-outline">
                     <label className="form-label">Current password</label>
                    <input type="password" className="form-control" onChange={(e)=>setCurrentPassword(e.target.value)} />
                     </div> */}

                    {/* <div className="input-group input-group-outline my-4">
                      <label className="form-label">New password</label>
                    <input type="password" className="form-control" onChange={(e)=>setNewPassword(e.target.value)} />
                    </div> */}


                      <div className="input-group input-group-outline">
                     <label className="form-label">Email Address</label>
                     <input type="text" id="confirmPassword" className="form-control" onChange={(e)=>setEmail(e.target.value)} />
                    </div>

                    
                    
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"onClick={sendVerification}
                        >
                          Send Verification
                        </button>
                      </div>
                    </form>
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

export default EnterEmailAddress;