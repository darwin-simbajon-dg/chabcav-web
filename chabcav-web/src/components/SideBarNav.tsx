import React, { useEffect, useState } from "react";
import "../assets/css/accounts/css/nucleo-icons.css";
import "../assets/css/accounts/css/nucleo-svg.css";
import "../assets/css/accounts/css/material-dashboard.css";
import NavigationProperties from "../models/NavigationProperties";
import UserSettings from "../pages/account/components/UserSettings";
import UserProfilePage from "../pages/account/UserProfilePage";
import Dashboard from "../pages/account/Dashboard";
import LessonEditor from '../pages/Lessons/LessonEditor';
import MultiStepForm from "../pages/account/MultiStepForm";
import { useNavigate } from "react-router-dom";
import clsLogo from "../assets/css/accounts/img/clslogo.webp";


const SidebarNav: React.FC<NavigationProperties> = ({onNavigate}) => {
    const navigate = useNavigate();

    const userLessonConfig = [
      {
        title: "Profile",
        icon: "/assets/images/team-3.jpg",
        items: [
          { title: "My Profile", link: "../../pages/pages/profile/overview.html", icon: '', component: UserProfilePage, step: "UserPanel" },
          { title: "Settings", link: "../../pages/pages/account/settings.html", icon: '', component: UserSettings, step: "UserPanel" },
          { title: "Logout", link: "../../pages/authentication/signin/basic.html", icon: '', component: null, step: "Logout" },
        ],
      },
      // {
      //   title: "Activity",
      //   icon: "browse_activity",
      //   items: [
      //     { title: "Go to Lesson", link: "../../pages/dashboards/analytics.html", icon: '', component: MultiStepForm, step: "LessonPanel" },
      //   ],
      // },
      {
        title: "Chapters",
        icon: "browse_activity",
        items: [
          { title: "Chapter 1", link: "../../pages/dashboards/analytics.html", icon: '', component: MultiStepForm, step: "LessonPanel"  },
          { title: "Chapter 2", link: "../../pages/dashboards/analytics.html", icon: '', component: MultiStepForm, step: "LessonPanel"  },
          { title: "Chapter 3", link: "../../pages/dashboards/analytics.html", icon: '', component: MultiStepForm, step: "LessonPanel"  },
        ],
      },
    ];

  const adminConfig = [
      {
        title: "Profile",
        icon: "/assets/images/team-3.jpg",
        items: [
          { title: "My Profile", link: "../../pages/pages/profile/overview.html", component: UserProfilePage, icon: '', step: "AdminPanel" },
          { title: "Settings", link: "../../pages/pages/account/settings.html", component: UserSettings, icon: '', step: "AdminPanel"  },
          { title: "Logout", link: "../../pages/authentication/signin/basic.html", icon: '', component: null, step: "Logout"  },
        ],
      },
      {
        title: "Administration",
        icon: "admin_panel_settings",
        items: [
          { title: "Dashboard", link: "../../pages/dashboards/analytics.html", icon: "dashboard", component: Dashboard, step: "AdminPanel" },
          { title: "Lessons", link: "../../pages/dashboards/analytics.html", icon: "cast_for_education", component: LessonEditor, step: "AdminPanel" },
        ],
      },
    ];

  const userConfig = [
      {
        title: "Profile",
        icon: "/assets/images/team-3.jpg",
        items: [
          { title: "My Profile", link: "../../pages/pages/profile/overview.html" , icon: '', component: UserProfilePage, step: "UserPanel" },
          { title: "Settings", link: "../../pages/pages/account/settings.html", icon: '', component: UserSettings, step: "UserPanel" },
          { title: "Logout", link: "../../pages/authentication/signin/basic.html", icon: '', component: null, step: "Logout" },
        ],
      },
      {
        title: "Activity",
        icon: "browse_activity",
        items: [
          { title: "Go to Lesson", link: "../../pages/dashboards/analytics.html", icon: '', component: MultiStepForm, step: "LessonPanel" },
        ],
      },
    ];

    const handleSidebarClick = (step: string) => {
      localStorage.setItem("Step", step);
  
      if (step === "Logout") {
        localStorage.clear();
        navigate("/");
      } else {
        updateSidebarConfig(step);
      }
    };

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
      const step = localStorage.getItem("Step");
      if (step) {
        updateSidebarConfig(step);
      }
    }, [sidebarConfig]);

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
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start bg-white my-2">
      {/* Sidenav Header */}
      <div className="sidenav-header">
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
            src={clsLogo}
            className="navbar-brand-img"
            width="26"
            height="26"
            alt="main_logo"
          />
          <span className="ms-1 text-sm text-dark">CLS</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0 mb-2" />

      {/* Dynamic Sidebar Menu */}
      <div className="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
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
                  <img src={section.icon} className="avatar" alt={section.title} />
                ) : (
                  <i className={`material-symbols-rounded opacity-5`}>{section.icon}</i>
                )}
                <span className="nav-link-text ms-2 ps-1">{section.title}</span>
              </a>
              <div className="collapse" id={`section-${index}`}>
                <ul className="nav">
                  {section.items.map((item, subIndex) => (
                    <li key={subIndex} className="nav-item" onClick={() => {onNavigate(item.component); handleSidebarClick(item.step)}}>
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
    </aside>
  );
};

export default SidebarNav;
