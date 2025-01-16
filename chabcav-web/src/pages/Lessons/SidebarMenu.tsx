// import React, { useState } from "react";

// const SidebarMenu: React.FC = () => {
//     const [activeItem, setActiveItem] = useState<string>("Coworking");

//     const menuItems = [
//       { label: "Coworking", href: "/coworking", icon: "dashboard" },
//       { label: "Rental", href: "/rental", icon: "home" },
//       { label: "Case Study", href: "/case-study", icon: "work" },
//       { label: "About Us", href: "/about-us", icon: "info" },
//       { label: "Pricing", href: "/pricing", icon: "attach_money" },
//       { label: "Career", href: "/career", icon: "person" },
//       { label: "Help Center", href: "/help-center", icon: "help" },
//       { label: "FAQ", href: "/faq", icon: "question_answer" },
//       { label: "Contact Us", href: "/contact-us", icon: "contact_mail" },
//       { label: "Virtual Reality", href: "/virtual-reality", icon: "view_in_ar" },
//       { label: "Smart Home", href: "/smart-home", icon: "devices" },
//       { label: "Chat", href: "/chat", icon: "chat" },
//     ];
  
//     return (
//       <aside
//         className="sidebar bg-white shadow-lg d-flex flex-column"
//         style={{
//           width: "250px",
//           height: "100vh",
//           position: "fixed",
//           top: "0",
//           left: "0",
//           padding: "20px",
//           overflow: "hidden", // Removes vertical scrollbar
//         }}
//       >
//         {/* Sidebar Header */}
//         <div className="sidebar-header mb-4">
//           <a
//             href="https://demos.creative-tim.com/material-kit-pro/index"
//             className="navbar-brand text-dark font-weight-bolder"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Material Kit 3 PRO
//           </a>
//         </div>
  
//         {/* Sidebar Links */}
//         <ul className="list-unstyled flex-grow-1">
//           {menuItems.map((item) => (
//             <li
//               key={item.label}
//               className={`mb-3 ${
//                 activeItem === item.label ? "bg-light rounded shadow-sm" : ""
//               }`}
//             >
//               <a
//                 href={item.href}
//                 className={`d-flex align-items-center text-decoration-none px-3 py-2 ${
//                   activeItem === item.label ? "text-dark fw-bold" : "text-secondary"
//                 }`}
//                 onClick={() => setActiveItem(item.label)}
//               >
//                 <i className="material-symbols-rounded me-3">{item.icon}</i>
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ul>
  
//         {/* Buy Now Button */}
//         <div className="mt-auto">
//           <a
//             href="#pricing-material-kit"
//             className="btn btn-dark w-100"
//             style={{ borderRadius: "5px" }}
//           >
//             Buy Now
//           </a>
//         </div>
//       </aside>
//     );
// };

// export default SidebarMenu;
