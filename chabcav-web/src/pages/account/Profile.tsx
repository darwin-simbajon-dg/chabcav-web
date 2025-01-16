import React from 'react';

const Profile : React.FC = () => {

return (

        <div className="card card-body" id="profile">
              <div className="row justify-content-center align-items-center">
                <div className="col-sm-auto col-4">
                  <div className="avatar avatar-xl position-relative">
                    <img
                      src="/assets/images/bruce-mars.jpg"
                      alt="bruce"
                      className="w-100 rounded-circle shadow-sm"
                    />
                  </div>
                </div>
                <div className="col-sm-auto col-8 my-auto">
                  <div className="h-100">
                    <h5 className="mb-1 font-weight-bolder">Richard Davis</h5>
                    <p className="mb-0 font-weight-normal text-sm">CEO / Co-Founder</p>
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
            </div>
    
)

}

export default Profile;