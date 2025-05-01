import React, { useEffect, useState } from "react";
import UserProgress from "../UsersProgress";
import { Card, CardContent } from "@mui/material";

const UserProfilePage: React.FC = () => {
  const [information, setInformation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [imageUrl, setImageUrl] = useState("");



  useEffect(() => {
    async function fetchData() {

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      const claims = JSON.parse(atob(token.split('.')[1]));
      const userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];

      const response = await fetch(`https://chabcav-api-development.up.railway.app/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      setInformation(data.information);
      setFullName(data.fullname);
      setEmail(data.email);
      setLocation(data.location);
      setPhoneNumber(data.phonenumber);
      setImageUrl(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.imageid}?alt=media`)
      //setImageUrl('https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.imageid}?alt=media'); // Assuming the response contains the image URL
      //setImageUrl(`https://chabcav-api-development.up.railway.app/uploads/${data.imageid}`); // Assuming the response contains the image URL
    }

    fetchData();
  }, []);

  // Function to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX <= 10) {
        setIsSidebarCollapsed(false); // Expand if mouse is at the leftmost 10px
      } else if (event.clientX > 260) {
        setIsSidebarCollapsed(true); // Collapse if mouse moves far from the sidebar
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "250px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)",
      }}
    >
      {/* Page Header */}
      <div
        className="page-header min-height-300 border-radius-xl mt-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
        }}
      >
        <span className="mask bg-gradient-dark opacity-6"></span>
      </div>

      {/* Profile Card */}
      <div className="card card-body mx-2 mx-md-2 mt-n6">
        <div className="row gx-4 mb-2">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <img
                src={imageUrl}
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">{fullName}</h5>
              {/* <p className="mb-0 font-weight-normal text-sm">CEO / Co-Founder</p> */}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="w-full flex justify-center">
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Profile Information Card */}
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h6 className="text-lg font-semibold">Profile Information</h6>
          {/* <a href="#edit-profile">
            <i className="fas fa-user-edit text-secondary text-sm" title="Edit Profile"></i>
          </a> */}
        </div>
        <p className="text-sm">{information}</p>
        <ul className="list-group mt-4 space-y-1">
          <li><strong>Full Name:</strong> {fullName}</li>
          <li><strong>Mobile:</strong> {phoneNumber}</li>
          <li><strong>Email:</strong> {email}</li>
          <li><strong>Location:</strong> {location}</li>
        </ul>
      </CardContent>
    </Card>

    {/* User Progress Card */}
    <Card className="w-full flex justify-center items-center">
      <CardContent className="p-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold">User Progress</h2>
        <UserProgress />
      </CardContent>
    </Card>

  </div>
</div>

















      </div>
    </div>




  );
};

export default UserProfilePage;
