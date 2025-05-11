import React, { useEffect } from 'react';
import { useToast } from '../../context/ToastContext';

const Profile : React.FC = () => {
const[fullName, setFullName] = React.useState("")
const[location, setLocation] = React.useState("")
const[userId, setUserId] = React.useState("")
const[imagUrl, setImageUrl] = React.useState("")
const { showToast } = useToast();

useEffect(() => {

  async function fetchData() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    const claims = JSON.parse(atob(token.split('.')[1]));
    const userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
    setUserId(userId);

    if(userId !== undefined){
      const response =    await fetch(`https://chabcav-api-development.up.railway.app/profile/${userId}`, {
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
      setFullName(data.fullname);
      setLocation(data.location);
      setImageUrl(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.imageid}?alt=media`)
      //setImageUrl(`https://chabcav-api-development.up.railway.app/uploads/${data.imageid}`); // Assuming the response contains the image URL

    }
   
    
  }

  fetchData();

}, [])

return (

        <div className="card card-body" id="profile">
              <div className="row justify-content-center align-items-center">
                <div className="col-sm-auto col-4">
                    <div 
                    className="avatar avatar-xl position-relative" 
                    onClick={() => document.getElementById('fileInput')?.click()}
                    style={{ cursor: 'pointer' }}
                    >
                    <img
                      src={imagUrl}
                      alt="bruce"
                      className="w-100 rounded-circle shadow-sm"
                    />
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const formData = new FormData();
                        const file = e.target.files[0];
                        formData.append('file', file);
                        console.log('Selected file name:', file.name);

                        try {
                        const token = localStorage.getItem("authToken");
                        if (!token) {
                          throw new Error("No auth token found");
                        }

                        formData.append('userId', userId);

                        const response = await fetch('https://chabcav-api-development.up.railway.app/upload', {
                          method: 'POST',
                          headers: {
                          "Authorization": `Bearer ${token}`
                          },
                          body: formData
                        });

                        if (!response.ok) {
                          showToast("Failed to upload image");
                          throw new Error("Failed to upload image");
                        }

                        const data = await response.json();
                        setImageUrl(`https://chabcav-api-development.up.railway.app/uploads/${file.name}`); // Assuming the response contains the image URL
                        showToast("Image uploaded successfully");
                        console.log('Image uploaded successfully:', data);
                        // Optionally update the image source here
                        } catch (error) {
                        console.error('Error uploading image:', error);
                        }
                      }
                      }}
                    />
                    </div>
                </div>
                <div className="col-sm-auto col-8 my-auto">
                  <div className="h-100">
                    <h5 className="mb-1 font-weight-bolder">{fullName}</h5>
                    <p className="mb-0 font-weight-normal text-sm">{location}</p>
                  </div>
                </div>
                {/* <div className="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex">
                  <label className="form-check-label mb-0">
                    <small id="profileVisibility">Switch to invisible</small>
                  </label>
                  <div className="form-check form-switch ms-2 my-auto">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault23"
                      defaultChecked
                    />
                  </div>
                </div> */}
              </div>
              <div className="row mt-4">
      <div className="col-lg-6">
        {/*<div className="card h-100">
          <div className="card-header pb-0 p-3">
            <h6 className="text-start">Student Progress</h6>
          </div>
          <div className="card-body p-3 py-1">
            <div className="row">
                <div className="col-5 text-center" style={{ paddingRight: '15px', overflow: 'hidden' }}>
                <div className="position-relative" style={{ width: '100px', height: '100px', margin: '0 auto' }}>
                  <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                  className="circle-bg"
                  d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="2"
                  />
                  <path
                  className="circle"
                  d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="2"
                  strokeDasharray="10, 100" // Adjust the percentage here
                  strokeLinecap="round"
                  />
                  </svg>
                  <div
                  className="position-absolute top-50 start-50 translate-middle text-center"
                  style={{ fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                  10%
                  </div>
                </div>
               
                </div>
              <div className="col-7 my-auto">
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-0">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">Last Lesson: </h6>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs"> Lesson 2</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-0">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">Last Visit:</h6>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <span className="text-xs"> 01 August 2025 </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
            </div>
    
)

}

export default Profile;