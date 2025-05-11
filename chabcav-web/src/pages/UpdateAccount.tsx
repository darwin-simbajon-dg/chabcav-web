import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateAccount: React.FC = () => {

    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch existing user information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("https://chabcav-api-development.up.railway.app/user/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGender(data.gender || "Male");
        setLocation(data.location);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong.");
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://chabcav-api-development.up.railway.app/user/account/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, gender, location }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update account.");
      }

      setSuccess("Account updated successfully!");
      setError(null);

      // Optional: Redirect after update
      setTimeout(() => navigate("/account"), 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update account.");
      setSuccess(null);
    }
  };

  // Handle Cancel button
  const handleCancel = () => {
    navigate("/account"); // Redirect to AccountPage
  };

  return (
    <div className="update-account-container">
      <div className="update-account-box">
        <h2>Update Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="update-button">
              Update Account
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );


};

export default UpdateAccount;