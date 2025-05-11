import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "./SpinnerModal";
import { useToast } from "../context/ToastContext";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState<string | null>(null);
  // const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to control spinner
  const navigate = useNavigate();
  const { showToast } = useToast();

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://chabcav-api-development.up.railway.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Authentication Failed");
      }

      const result = await response.json();
      const token = result;
      const claims = JSON.parse(atob(token.split('.')[1]));
      const role = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      // localStorage.setItem("role", role);
      // console.log(claims);

      if(role === "Admin"){
        localStorage.setItem("Step", "AdminPanel");
      }

      if(role === "User"){
        localStorage.setItem("Step", "UserPanel");
      }



      localStorage.setItem("authToken", result);
      localStorage.setItem("role",result.role);
      navigate("/account");

      // if(email === 'darwin@yahoo.com' && password === 'spiders21'){
      //   localStorage.setItem("Step", "UserPanel")
      //   navigate("/account");
      // }

      // if(email === 'admin@yahoo.com' && password == "1234"){
      //   navigate("/account");
      //   localStorage.setItem("Step", "AdminPanel")
      // }
        

    } catch (err) {
      // setError(err);
      console.log(err);
      showToast("Login Failed");
    }
    finally {
      setIsLoading(false); // Hide spinner
    }
  }

    return (   
    <>
    <SpinnerModal show={isLoading} />
    <div  className="col-xl-4 col-xl-4-adj col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-4">
    <div className="card card-plain">
      <div className="card-header text-center">
        <h4 className="font-weight-bolder">Sign In</h4>
        <p className="mb-0">Enter your email and password to sign in</p>
      </div>
      <div className="card-body mt-2">
        <form role="form" onSubmit={handleLogin}>
          <div className="input-group input-group-outline mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" 
            
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{ backgroundColor: 'white' }}/>
          </div>
          <div className="input-group input-group-outline mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" 
            
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ backgroundColor: 'white' }}/>
          </div>
          <div className="form-check form-switch d-flex align-items-center mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label
              className="form-check-label mb-0 ms-3"
              htmlFor="rememberMe"
              style= {{color: "white"}}
            >
              Remember me
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="card-footer text-center pt-0 px-lg-2 px-1">
        <p className="mb-4 text-sm mx-auto" style= {{color: "white"}}>
          Don't have an account? &nbsp;
          <a href="/register" className="text-primary text-gradient font-weight-bold">
             Sign up
          </a>
        </p>

        <p className="mb-4 text-sm mx-auto" style= {{color: "white"}}>
          <a href="/enter-emailAddress" className="text-primary text-gradient font-weight-bold">
             Forgot Password?
          </a>
        </p>
      </div>
    </div>
  </div>
  </>
 );

}

export default Login;


