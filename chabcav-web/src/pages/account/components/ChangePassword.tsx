import React from "react";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";




const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChangePassword = async (e:React.FormEvent) => {
    e.preventDefault();
    console.log("Password Changed");
    
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        showToast("Authentication token is missing. Please log in again.");
        return;
      }
      const claims = JSON.parse(atob(token.split('.')[1]));
      const userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];

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
         
      
      const response = await fetch("http://localhost/user/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId, newPassword, currentPassword})
      });

      if(!response.ok){
        showToast("Password Change Failed");
        const errorData = await response.json();
        throw new Error(errorData.message || "Password Change Failed");
      } 
      const result = await response.json();
      showToast("Password Changed Successfully");
      console.log(result);
      localStorage.clear();
      navigate("/");

      

    } catch (err) {
  }
}
  


  return (
    <div className="card mt-4" id="password">
      <div className="card-header">
        <h5>Change Password</h5>
      </div>
      <div className="card-body pt-0">
        {/* Current Password */}
        <div className="input-group input-group-outline">
          <label className="form-label">Current password</label>
          <input type="password" className="form-control" onChange={(e)=>setCurrentPassword(e.target.value)} />
        </div>

        {/* New Password */}
        <div className="input-group input-group-outline my-4">
          <label className="form-label">New password</label>
          <input type="password" className="form-control" onChange={(e)=>setNewPassword(e.target.value)} />
        </div>

        {/* Confirm New Password */}
        <div className="input-group input-group-outline">
          <label className="form-label">Confirm New password</label>
          <input type="password" id="confirmPassword" className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>

        {/* Password Requirements */}
        <h5 className="mt-5">Password requirements</h5>
        <p className="text-muted mb-2">
          Please follow this guide for a strong password:
        </p>
        <ul className="text-muted ps-4 mb-0 float-start">
          <li>
            <span className="text-sm">One special character</span>
          </li>
          <li>
            <span className="text-sm">Min 6 characters</span>
          </li>
          <li>
            <span className="text-sm">Change it often</span>
          </li>
        </ul>

        {/* Update Password Button */}
        <button className="btn bg-gradient-dark btn-sm float-end mt-6 mb-0" onClick={handleChangePassword}>
          Update password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
