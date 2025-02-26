import React, { useEffect, useState } from "react";

const UserProfilePage: React.FC = () => {
  const [information, setInformation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost/profile/9b9499c4-584c-4816-a768-d7348a07237a", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();

      setInformation(data.information);
      setFullName(data.fullname);
      setEmail(data.email);
      setLocation(data.location);
      setPhoneNumber(data.phoneNumber);

    }

    fetchData();
  }, []);

  return (
    <div className="container-fluid" style={{ paddingLeft: '250px' }}>
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
                src="../../assets/img/bruce-mars.jpg"
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">Richard Davis</h5>
              <p className="mb-0 font-weight-normal text-sm">CEO / Co-Founder</p>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1 active"
                    data-bs-toggle="tab"
                    href="#app"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="material-symbols-rounded text-lg position-relative">home</i>
                    <span className="ms-1">App</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1"
                    data-bs-toggle="tab"
                    href="#messages"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="material-symbols-rounded text-lg position-relative">email</i>
                    <span className="ms-1">Messages</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1"
                    data-bs-toggle="tab"
                    href="#settings"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="material-symbols-rounded text-lg position-relative">settings</i>
                    <span className="ms-1">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>

        {/* Sections */}
        <div className="row">
          

          <div className="col-md-6 col-xl-4">
            {/* Profile Information */}
            <div className="card card-plain h-100">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center">
                    <h6 className="mb-0">Profile Information</h6>
                  </div>
                  <div className="col-md-4 text-end">
                    <a href="#edit-profile">
                      <i
                        className="fas fa-user-edit text-secondary text-sm"
                        title="Edit Profile"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <p className="text-sm">
                  {information}
                </p>
                <ul className="list-group">
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Full Name:</strong> {fullName}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Mobile:</strong> {phoneNumber}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Email:</strong> {email}
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Location:</strong> {location}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
