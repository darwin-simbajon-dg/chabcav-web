import React, { useEffect, useState } from "react";
import "../assets/css/accounts/css/nucleo-icons.css";
import "../assets/css/accounts/css/nucleo-svg.css";
import "../assets/css/accounts/css/material-dashboard.css";
import NavigationProperties from "../models/NavigationProperties";
import UserSettings from "../pages/account/components/UserSettings";
import UserProfilePage from "../pages/account/UserProfilePage";
import UserCMS from "../pages/account/UserCMS";
import Dashboard from "../pages/account/Dashboard";
import LessonEditor from '../pages/Lessons/LessonEditor';
import { useNavigate } from "react-router-dom";
import ViewDictionary from "../pages/account/ViewDictionary";
import UploadDictionary from "../pages/Lessons/UploadDictionary";
import LMSview from "../pages/account/LMSView";
import AdminUserManagement from "../pages/AdminUsersManagement";


const SidebarNav: React.FC<NavigationProperties> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imageUrl, setImageUrl] = useState("");


  const userLessonConfig = [
    {
      title: "Profile",
      icon: "/assets/images/team-3.jpg",
      items: [
        { title: "My Profile", link: "../../pages/pages/profile/overview.html", icon: 'face', component: UserProfilePage, step: "UserPanel" },
        { title: "Settings", link: "../../pages/pages/account/settings.html", icon: 'settings', component: UserSettings, step: "UserPanel" },
        // { title: "Logout", link: "../../pages/authentication/signin/basic.html", icon: 'logout', component: null, step: "Logout" },
      ],
    },
    {
      title: "Learning",
      icon: "browse_activity",
      items: [
        { title: "Learn Chabacano", link: "../../pages/dashboards/analytics.html", icon: 'Book', component: LMSview, step: "LessonPanel" },
        //{ title: "All Chapters", link: "../../pages/dashboards/analytics.html", icon: 'book', component: BookView, step: "LessonPanel" },
        { title: "Dictionary", link: "../../pages/dashboards/analytics.html", icon: 'dictionary', component: ViewDictionary, step: "LessonPanel" },
        //{ title: "Chapter 3", link: "../../pages/dashboards/analytics.html", icon: '', component: MultiStepForm, step: "LessonPanel"  },
      ],
    },

  ];

  const adminConfig = [

    {
      title: "Profile",
      icon: "/assets/images/team-3.jpg",
      items: [

        // { title: "My Profile", link: "../../pages/pages/profile/overview.html", component: UserProfilePage, icon: '', step: "AdminPanel" },
        { title: "Settings", link: "../../pages/pages/account/settings.html", component: UserSettings, icon: 'settings', step: "AdminPanel" },
        // { title: "Logout", link: "../../pages/authentication/signin/basic.html", icon: 'logout', component: null, step: "Logout"  },
      ],
    },

    {
      title: "Administration",
      icon: "admin_panel_settings",
      items: [
        { title: "Dashboard", link: "../../pages/dashboards/analytics.html", icon: "dashboard", component: Dashboard, step: "AdminPanel" },
        { title: "CMS", link: "../../pages/pages/account/settings.html", icon: "settings", component: UserCMS, step: "AdminPanel" },
        { title: "Users Management", link: "../../pages/pages/account/settings.html", icon: "settings", component: AdminUserManagement, step: "AdminPanel" },
        { title: "Chapters Management", link: "../../pages/dashboards/analytics.html", icon: "cast_for_education", component: LessonEditor, step: "AdminPanel" },
        { title: "Update Dictionary", link: "../../pages/dashboards/analytics.html", icon: "cast_for_education", component: UploadDictionary, step: "AdminPanel" },
      ],
    },

    /* {
       title: "Logout",
       link: "../../pages/authentication/signin/basic.html",
       icon: "logout",
       component: null,
       step: "Logout",
       items: [{ icon: "logout" }],
     },*/
  ];


  const userConfig = [
    {
      title: "Profile",
      icon: "/assets/images/team-3.jpg",
      items: [
        { title: "My Profile", link: "../../pages/pages/profile/overview.html", icon: 'face', component: UserProfilePage, step: "UserPanel" },
        { title: "Settings", link: "../../pages/pages/account/settings.html", icon: 'settings', component: UserSettings, step: "UserPanel" },
        //{ title: "CMS", link: "../../pages/pages/account/settings.html", icon: '', component: UserCMS, step: "UserPanel" },
        //  { title: "Logout", link: "../../pages/authentication/signin/basic.html", icon: 'logout', component: null, step: "Logout" },
      ],
    },
    {
      title: "Learning",
      icon: "browse_activity",
      items: [
        { title: "Learn Chabacano", link: "../../pages/dashboards/analytics.html", icon: 'Book', component: LMSview, step: "LessonPanel" },
        { title: "Dictionary", link: "../../pages/dashboards/analytics.html", icon: 'dictionary', component: ViewDictionary, step: "LessonPanel" },
      ],
    },
  ];

  const handleSidebarClick = (step: string) => {
    localStorage.setItem("Step", step);
    if (step === "Logout") {
      localStorage.clear();
      navigate("/");
    }
    else {
      // setChaptername(selectedChapter);
      updateSidebarConfig(step);
    }
  };

  /*const handleSidebarClick = (step: string, chapterName?: string) => {
    if (chapterName) {
      console.log("Navigating to Chapter:", chapterName); // Debugging
      setSelectedChapter(chapterName); // ✅ Updates state
    }
  
    if (step === "Logout") {
      localStorage.clear();
      navigate("/");
    } else {
      updateSidebarConfig(step);
    }
  };*/


  const [sidebarConfig, setSideBarConfig] = useState(adminConfig);

  const updateSidebarConfig = (step: string) => {
    if (step === "AdminPanel") {
      setSideBarConfig(adminConfig);
    } else if (step === "UserPanel") {
      setSideBarConfig(userConfig);
    } else if (step === "LessonPanel") {
      setSideBarConfig(userLessonConfig);
    }


  };

  useEffect(() => {

    async function fetchData() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      const claims = JSON.parse(atob(token.split('.')[1]));
      const userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];

      if (userId !== undefined) {
        const response = await fetch(`https://chabcav-api-development.up.railway.app/profile/${userId}`, {
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

        if (!data) {
          throw new Error("Profile data is null");
          
        }
        setImageUrl(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.imageid}?alt=media`)
      }
    }

    fetchData();

    const step = localStorage.getItem("Step");
    if (step) {
      updateSidebarConfig(step);
    }
  }, []);


  // const [sidebarConfig, setSideBarConfig] = useState(adminConfig);

  //   const handleSidebarClick = (step: string) => {

  //     localStorage.setItem("Step", step);

  //     if(step === "AdminPanel"){
  //       setSideBarConfig(adminConfig);
  //     }

  //     if(step === "UserPanel"){
  //       setSideBarConfig(userConfig);
  //     }

  //     if(step === "LessonPanel"){
  //       setSideBarConfig(userLessonConfig);
  //     }

  //     if(step === "Logout"){
  //       localStorage.clear();
  //       navigate("/")
  //     }

  //   }

  //   useEffect(() => {

  //     const currentStep = localStorage.getItem("Step");

  //     if(currentStep === "AdminPanel"){
  //       setSideBarConfig(adminConfig);
  //     }

  //     if(currentStep === "UserPanel"){
  //       setSideBarConfig(userConfig);
  //     }

  //     if(currentStep === "LessonPanel"){
  //       setSideBarConfig(userLessonConfig);
  //     }


  //   }, []);

  return (

    <aside className={`sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start bg-white my-2 ${isCollapsed ? "collapsed" : ""
      }`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      style={{
        width: isCollapsed ? "0" : "250px",
        transition: "width 0.3s ease",
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
        flexDirection: "column",
     
        alignItems: isCollapsed ? "center" : "flex-start", // Center when collapsed
      }}
    >
      {/* Sidenav Header */}
      <div className="sidenav-header d-flex align-items-center" style={{ width: "80%" }}>

        <i
          className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          className="navbar-brand px-4 py-3 m-0"
          href="https://demos.creative-tim.com/material-dashboard-pro/pages/dashboards/analytics.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"ChabCavLogo.png"}
            className="navbar-brand-img"
            width="26"
            height="26"
            alt="main_logo"
          />
          {!isCollapsed && <span className="ms-1 text-sm text-dark">Main Menu</span>}
        </a>

      </div>
      <hr className="horizontal dark mt-0 mb-2" />

      {/* Dynamic Sidebar Menu */}
      <div className="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main" style={{ width: "100%", textAlign: "center", padding: 0 }}>
        <ul className="navbar-nav">
          {sidebarConfig.map((section, index) => (
            <li key={index} className="nav-item mb-2 mt-0">
              <a
                data-bs-toggle="collapse"
                href={`#section-${index}`}
                className="nav-link text-dark"
                aria-controls={`section-${index}`}
                role="button"
                aria-expanded="false"
              >
                {section.icon.startsWith("/") ? (
                  <img src={imageUrl} className="avatar" alt={section.title} />
                ) : (
                  <i className={`material-symbols-rounded opacity-5`}>{section.icon}</i>
                )}
                <span className="nav-link-text ms-2 ps-1">{section.title}</span>
              </a>
              <div className="collapse" id={`section-${index}`}>
                <ul className="nav">
                  {section.items.map((item, subIndex) => (
                    <li key={subIndex} className="nav-item" onClick={() => { onNavigate(item.component); /*handleChapterClick(item.title);*/ handleSidebarClick(item.step) }}>
                      <a className="nav-link text-dark" href="#">
                        <i className={`material-symbols-rounded opacity-5`}>{item.icon}</i>
                        <span className="sidenav-normal ms-3 ps-1">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

          ))}


        </ul>



      </div>

      <div style={{ marginTop: "auto", width: "100%", padding: "16px" }}>
        <button
          onClick={() => handleSidebarClick("Logout")}
          style={{
        padding: "10px 16px",
        backgroundColor: "#e53e3e",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
          }}
        >
          Logout
        </button>
      </div>


    </aside>



  );
};

export default SidebarNav;