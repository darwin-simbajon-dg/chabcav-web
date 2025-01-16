import React from "react";

const BasicInfo: React.FC = () => {
  return (
    <div className="card mt-4" id="basic-info">
      <div className="card-header">
        <h5>Basic Info</h5>
      </div>
      <div className="card-body pt-0">
        {/* First Name and Last Name */}
        <div className="row">
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="Alec" />
            </div>
          </div>
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Thompson" />
            </div>
          </div>
        </div>

        {/* Gender and Birth Date */}
        <div className="row">
          <div className="col-sm-4 col-6">
            <label className="form-label mt-4 ms-0">I'm</label>
            <select className="form-control" name="choices-gender" id="choices-gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-5 col-5">
                <label className="form-label mt-4 ms-0">Birth Date</label>
                <select className="form-control" name="choices-month" id="choices-month"></select>
              </div>
              <div className="col-sm-4 col-3">
                <label className="form-label mt-4 ms-0">&nbsp;</label>
                <select className="form-control" name="choices-day" id="choices-day"></select>
              </div>
              <div className="col-sm-3 col-4">
                <label className="form-label mt-4">&nbsp;</label>
                <select className="form-control" name="choices-year" id="choices-year"></select>
              </div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="row mt-4">
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="example@email.com" />
            </div>
          </div>
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Confirm Email</label>
              <input type="email" className="form-control" placeholder="example@email.com" />
            </div>
          </div>
        </div>

        {/* Location and Phone Number */}
        <div className="row mt-4">
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Your location</label>
              <input type="text" className="form-control" placeholder="Sydney, A" />
            </div>
          </div>
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Phone Number</label>
              <input type="number" className="form-control" placeholder="+40 735 631 620" />
            </div>
          </div>
        </div>

        {/* Language and Skills */}
        <div className="row">
          <div className="col-md-6 align-self-center">
            <label className="form-label mt-4 ms-0">Language</label>
            <select className="form-control" name="choices-language" id="choices-language">
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label mt-4">Skills</label>
            <input
              className="form-control"
              id="choices-skills"
              type="text"
              defaultValue="vuejs, angular, react"
              placeholder="Enter something"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
