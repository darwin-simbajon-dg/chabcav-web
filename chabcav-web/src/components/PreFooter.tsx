import React from "react";
import { useEffect } from "react";

const Prefooter: React.FC = () => {

  const [characterReference, setCharacterReference] = React.useState<string>("");

   useEffect(() => {
      fetchCMS();
    }, []);


    
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
        setCharacterReference(data.characterreference);
       
      }
  
  return (
    <div className="container">
      <div
        className="my-10 py-5 bg-gradient-dark position-relative border-radius-xl"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="container position-relative z-index-2">
          <div className="row">
            <div className="col-lg-5 col-md-8 m-auto text-start">
              <h5 className="text-white mb-lg-0 mb-5">
              {characterReference}
              
              </h5>
            </div>
            <div className="col-lg-6 m-auto">
              <div className="row">
                <div className="col-sm-4 col-6 ps-sm-0 ms-auto">
                  {/* <button
                    type="button"
                    className="btn bg-gradient-warning mb-0 ms-lg-3 ms-sm-2 mb-sm-0 mb-2 me-auto w-100 d-block"
                  > */}
                    Serves as a reference for this project
                  {/* </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prefooter;
