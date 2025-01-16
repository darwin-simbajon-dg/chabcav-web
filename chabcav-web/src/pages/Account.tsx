import  { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Account = () => {

    const isLoggedIn = !!localStorage.getItem('authToken'); 
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn){
            navigate('/')
        }
    }, []);

    // const userData = {
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "john.doe@example.com",
    //   message: "This is a sample message from the user.",
    // };
  
    return (
      <>
        <Navbar />
        <section className="py-4">
      <div className="container">
        <div className="row justify-space-between py-2">
          <div className="col-6 mx-auto">
            <div className="card card-profile mt-md-0 mt-5">
              <div className="card-header mt-n4 mx-3 p-0 bg-transparent position-relative z-index-2">
                <a className="d-block blur-shadow-image" href="#">
                  <img
                    src="/src/assets/img/examples/card-profile1.jpg"
                    alt="img-blur-shadow"
                    className="img-fluid border-radius-lg"
                  />
                </a>
              </div>
              <div className="card-body text-center">
                <h4 className="mb-0">Bruce Mars</h4>
                <p>Manila</p>
                <div className="row justify-content-center text-center">
                  <div className="col-lg-4 col-4">
                    <h5 className="text-info mb-0">Male</h5>
                    <small>Gender</small>
                  </div>
                  <div className="col-lg-4 col-4">
                    <h5 className="text-info mb-0">Salesman</h5>
                    <small>Profession</small>
                  </div>
                  <div className="col-lg-4 col-4">
                    <h5 className="text-info mb-0">Tagalog</h5>
                    <small>Languages</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
        <button type="submit" className="btn bg-gradient-dark w-auto">
          Update Information
        </button>
      </div>
      </div>
    </section>
        {/* <div className="page-header" style={{marginTop: "30px", marginRight: "100px"}}>
          <div
            className="position-absolute fixed-top ms-auto w-50 h-100 rounded-3 z-index-0 d-none d-sm-none d-md-block me-n4"
            style={{
              backgroundImage: "url('/src/assets/img/examples/blog3.jpg')",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-7 d-flex justify-content-center flex-column">
                <div className="card card-body d-flex justify-content-center shadow-lg p-5 blur align-items-center">
                  <h3 className="text-center">My Account</h3>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-group input-group-static mb-4">
                          <label className="form-label">First Name</label>
                          <p className="form-control-static userInfo">{userData.firstName}</p>
                        </div>
                      </div>
                      <div className="col-md-6 ps-2">
                        <div className="input-group input-group-static mb-4">
                          <label className="form-label">Last Name</label>
                          <p className="form-control-static userInfo">{userData.lastName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="input-group input-group-static">
                        <label className="form-label">Email Address</label>
                        <p className="form-control-static userInfo">{userData.email}</p>
                      </div>
                    </div>
                    <div className="input-group input-group-static mb-4">
                      <label className="form-label">Your Message</label>
                      <p className="form-control-static userInfo">{userData.message}</p>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn bg-gradient-dark w-100"
                          onClick={() => alert("Edit functionality coming soon!")}
                        >
                          Edit Account Information
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
      
    );
}

export default Account;