import Login from "./Login";
import React, { useEffect } from "react";

interface HeaderProps {
  backgroundImageUrl: string;
}

const Header: React.FC<HeaderProps> = ({ backgroundImageUrl }) => {
  // const [bannerImage, setBannerImage] = React.useState<string>("");


  // useEffect(()=>{
  //   setBannerImage(backgroundImageUrl);

  // },[])

  const [bannerContent, setBannerContent] = React.useState<string>("");
  const [bannerSecondContent, setBannerSecondContent] = React.useState<string>("");

    useEffect(()=>{
   fetchCMS()

  },[])

  async function fetchCMS() {
    const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms", {
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
    console.log(data);
    // Set the new state for the new fields
  
    setBannerContent(data.bannercontent);
    setBannerSecondContent(data.bannersecondcontent);
   
  }


  return (
    <header>
      <div
        className="page-header min-vh-75"
        style={{
          backgroundImage:
            `url(${backgroundImageUrl})`,
        }}
      >
        <span className="mask bg-gradient-dark opacity-5"></span>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-7 d-flex justify-content-center text-md-start text-center flex-column mt-sm-0 mt-7">
              <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                 {/* Main banner content*/}
                <h1 className="text-white opacity-9">{bannerContent}</h1>
                {/* Secondary banner content*/}
                <div style={{ width: '100%' }}>
                  <p
                    className="lead text-white opacity-8"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {bannerSecondContent}
                  </p>
                </div>
                {/* <div className="buttons">
                  <button type="button" className="btn bg-gradient-dark mt-4">
                    Get Started
                  </button>
                  <button type="button" className="btn text-white shadow-none mt-4">
                    Read more
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
          className="position-absolute top-0 start-50 mt-7"
          style={{ zIndex: 10, width: "100%", maxWidth: "900px" }}
        >
        
        </div> */}
      <Login />
    </header>
  );

};

export default Header;
