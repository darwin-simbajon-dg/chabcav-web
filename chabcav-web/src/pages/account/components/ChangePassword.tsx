import React from "react";

const ChangePassword: React.FC = () => {
  return (
    <div className="card mt-4" id="password">
      <div className="card-header">
        <h5>Change Password</h5>
      </div>
      <div className="card-body pt-0">
        {/* Current Password */}
        <div className="input-group input-group-outline">
          <label className="form-label">Current password</label>
          <input type="password" className="form-control" />
        </div>

        {/* New Password */}
        <div className="input-group input-group-outline my-4">
          <label className="form-label">New password</label>
          <input type="password" className="form-control" />
        </div>

        {/* Confirm New Password */}
        <div className="input-group input-group-outline">
          <label className="form-label">Confirm New password</label>
          <input type="password" className="form-control" />
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
            <span className="text-sm">One number (2 are recommended)</span>
          </li>
          <li>
            <span className="text-sm">Change it often</span>
          </li>
        </ul>

        {/* Update Password Button */}
        <button className="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">
          Update password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
