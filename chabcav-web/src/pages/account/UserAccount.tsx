import "../../assets/css/accounts/css/nucleo-icons.css"; // Add custom CSS if needed
import "../../assets/css/accounts/css/nucleo-svg.css";
import "../../assets/css/accounts/css/material-dashboard.css";
import "../../assets/styles.css";
import SidebarNav from "../../components/SideBarNav";
import MainContent from "./components/UserSettings";
import { useState } from "react";
// import MainContent from "./MainContent";

const UserAccount: React.FC = () => {

    const [CurrentComponent, setCurrentComponent] = useState<React.FC | null>(() => MainContent); // Default to MainContent

    const handleNavigation = (component: React.FC | null) => {
      if (component) {
        setCurrentComponent(() => component);
      }
    };

    return (
    <div className="g-sidenav-show bg-gray-100">
        <SidebarNav onNavigate={handleNavigation} />
        {CurrentComponent ? <CurrentComponent /> : <h1>Please select an option from the sidebar.</h1>}
    </div>
    );
  };
  
  export default UserAccount;