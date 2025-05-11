import React, { useEffect, useState } from "react";
import BasicInfo from "../components/BasicInfo";
import ChangePassword from "../components/ChangePassword";
import Profile from "../Profile";
// import Multistep from "./MultiStep";
// import NavigationProperties from "../../models/NavigationProperties";

const UserSettings: React.FC = () => {

const [ChildComponent, setChildComponent] = useState<React.FC | null>();
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

const handleNavigationClick = (Component: React.FC) => {
    setChildComponent(() => Component);
};

const data = {
    pageName : "Settings",
    description: "Configure user information",
    navigation: [
        { icon: "person", label: "Profile", link: "#profile", id: "Profile", component: Profile },
        { icon: "receipt_long", label: "Basic Info", link: "#basic-info", id: "BasicInfo", component: BasicInfo },
        { icon: "lock", label: "Change Password", link: "#password", id: "Password", component: ChangePassword },
      ]
}

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
    <main
      className="main-content max-height-vh-100 h-100"
      style={{
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "250px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl">
        <div className="container-fluid py-1 px-3">         
          <div
            className="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2"
            id="navbar"
          >
            <ul className="navbar-nav justify-content-end ms-auto">
              <li className="nav-item d-xl-none ps-3 pe-0 d-flex align-items-center">
                <a href="#" className="nav-link text-body p-0" id="iconNavbarSidenav">
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="container-fluid mt-2">
        <div className="row align-items-start flex-column">
          <div className="col-lg-5 ms-3 col-sm-8">
            <h3 className="mb-0 h4 font-weight-bolder">{data.pageName}</h3>
            <p className="mb-4">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-fluid my-3 py-3">
        <div className="row mb-5">
          {/* Left Sidebar */}
          <div className="col-lg-3">
            <div className="card position-sticky top-1">
              <ul className="nav flex-column bg-white border-radius-lg p-3">
                {data.navigation.map((item, index) => (
                  <li className="nav-item pt-2" key={index} onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    handleNavigationClick(item.component);
                  }}>
                    <a className="nav-link text-dark d-flex" data-scroll="" href={item.link}>
                      <i className={`material-symbols-rounded text-lg me-2`}>{item.icon}</i>
                      <span className="text-sm">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 mt-lg-0 mt-4">
                {ChildComponent ? <ChildComponent /> : <Profile />}          
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserSettings;
