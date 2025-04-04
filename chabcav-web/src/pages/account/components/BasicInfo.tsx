import React, { useEffect, useState } from "react";
import SpinnerModal from "../../../components/SpinnerModal";
import { useToast } from "../../../context/ToastContext";

const BasicInfo: React.FC = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
  
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      const claims = JSON.parse(atob(token.split('.')[1]));
      const userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
      const email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  
      const response = await fetch(`http://localhost/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
  
      const data = response.headers.get("Content-Length") !== "0" ? await response.json() : null;

      if (!data) {
        setEmail(email);
        return;
      }
      // setInformation(data.information);
      const fullName = data.fullname.split(" ");
      setFirstName(fullName[0]);
      setLastName(fullName[1]);
      setBirthDate(new Date(data.birthdate).toISOString().split('T')[0]);
      setEmail(data.email);
      setLocation(data.location);
      setPhoneNumber(data.phonenumber);

    
      }

      fetchData();
    }, []);  

  const saveData = async (e: React.FormEvent) => {

    e.preventDefault();
    const data = {
      userId: "",
      fullName: firstName + " " + lastName,
      birthDate: birthDate,
      email: email,
      location: location,
      phoneNumber: phoneNumber
    }

    setIsLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    const claims = JSON.parse(atob(token.split('.')[1]));
    data.userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
  
    try {
      const response = await fetch("http://localhost/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save data");
      }

      const result = await response.json();
      console.log(result);

      setIsLoading(false);
      showToast("Update Successful");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
    <SpinnerModal show={isLoading} />
    <div className="card mt-4" id="basic-info">     
      <div className="card-header">
        <h5>Basic Info</h5>
      </div>
      <div className="card-body pt-0">
        <form onSubmit={saveData}>
        {/* First Name and Last Name */}
        <div className="row">
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>First Name</label>
              <input value={firstName} type="text" className="form-control" placeholder="Alec" onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Last Name</label>
              <input value={lastName} type="text" className="form-control" placeholder="Thompson" onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Gender and Birth Date */}
        <div className="row">
          {/* <div className="col-sm-4 col-6">
            <label className="form-label mt-4 ms-0">I'm</label>
            <select className="form-control" name="choices-gender" id="choices-gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div> */}
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-5 col-5">
                <label className="form-label mt-4 ms-0">Birth Date</label>
                <input type="date" className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                {/* <select className="form-control" name="choices-month" id="choices-month"></select> */}
              </div>
              {/* <div className="col-sm-4 col-3">
                <label className="form-label mt-4 ms-0">&nbsp;</label>
                <select className="form-control" name="choices-day" id="choices-day"></select>
              </div>
              <div className="col-sm-3 col-4">
                <label className="form-label mt-4">&nbsp;</label>
                <select className="form-control" name="choices-year" id="choices-year"></select>
              </div> */}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="row mt-4">
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Email</label>
              <input disabled type="email" className="form-control" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {/* <div className="col-6">
            <div className="input-group input-group-static">
              <label>Confirm Email</label>
              <input type="email" className="form-control" placeholder="example@email.com" />
            </div>
          </div> */}
        </div>

        {/* Location and Phone Number */}
        <div className="row mt-4">
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Your location</label>
              <select className="form-control" name="choices-location" id="choices-location" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="Afghanistan">Afghanistan</option>
<option value="Albania">Albania</option>
<option value="Algeria">Algeria</option>
<option value="Andorra">Andorra</option>
<option value="Angola">Angola</option>
<option value="Antigua and Barbuda">Antigua and Barbuda</option>
<option value="Argentina">Argentina</option>
<option value="Armenia">Armenia</option>
<option value="Australia">Australia</option>
<option value="Austria">Austria</option>
<option value="Azerbaijan">Azerbaijan</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahrain">Bahrain</option>
<option value="Bangladesh">Bangladesh</option>
<option value="Barbados">Barbados</option>
<option value="Belarus">Belarus</option>
<option value="Belgium">Belgium</option>
<option value="Belize">Belize</option>
<option value="Benin">Benin</option>
<option value="Bhutan">Bhutan</option>
<option value="Bolivia">Bolivia</option>
<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
<option value="Botswana">Botswana</option>
<option value="Brazil">Brazil</option>
<option value="Brunei">Brunei</option>
<option value="Bulgaria">Bulgaria</option>
<option value="Burkina Faso">Burkina Faso</option>
<option value="Burundi">Burundi</option>
<option value="Cabo Verde">Cabo Verde</option>
<option value="Cambodia">Cambodia</option>
<option value="Cameroon">Cameroon</option>
<option value="Canada">Canada</option>
<option value="Central African Republic">Central African Republic</option>
<option value="Chad">Chad</option>
<option value="Chile">Chile</option>
<option value="China">China</option>
<option value="Colombia">Colombia</option>
<option value="Comoros">Comoros</option>
<option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
<option value="Costa Rica">Costa Rica</option>
<option value="Croatia">Croatia</option>
<option value="Cuba">Cuba</option>
<option value="Cyprus">Cyprus</option>
<option value="Czech Republic">Czech Republic</option>
<option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
<option value="Denmark">Denmark</option>
<option value="Djibouti">Djibouti</option>
<option value="Dominica">Dominica</option>
<option value="Dominican Republic">Dominican Republic</option>
<option value="Ecuador">Ecuador</option>
<option value="Egypt">Egypt</option>
<option value="El Salvador">El Salvador</option>
<option value="Equatorial Guinea">Equatorial Guinea</option>
<option value="Eritrea">Eritrea</option>
<option value="Estonia">Estonia</option>
<option value="Eswatini">Eswatini</option>
<option value="Ethiopia">Ethiopia</option>
<option value="Fiji">Fiji</option>
<option value="Finland">Finland</option>
<option value="France">France</option>
<option value="Gabon">Gabon</option>
<option value="Gambia">Gambia</option>
<option value="Georgia">Georgia</option>
<option value="Germany">Germany</option>
<option value="Ghana">Ghana</option>
<option value="Greece">Greece</option>
<option value="Grenada">Grenada</option>
<option value="Guatemala">Guatemala</option>
<option value="Guinea">Guinea</option>
<option value="Guinea-Bissau">Guinea-Bissau</option>
<option value="Guyana">Guyana</option>
<option value="Haiti">Haiti</option>
<option value="Honduras">Honduras</option>
<option value="Hungary">Hungary</option>
<option value="Iceland">Iceland</option>
<option value="India">India</option>
<option value="Indonesia">Indonesia</option>
<option value="Iran">Iran</option>
<option value="Iraq">Iraq</option>
<option value="Ireland">Ireland</option>
<option value="Israel">Israel</option>
<option value="Italy">Italy</option>
<option value="Ivory Coast">Ivory Coast</option>
<option value="Jamaica">Jamaica</option>
<option value="Japan">Japan</option>
<option value="Jordan">Jordan</option>
<option value="Kazakhstan">Kazakhstan</option>
<option value="Kenya">Kenya</option>
<option value="Kiribati">Kiribati</option>
<option value="Kuwait">Kuwait</option>
<option value="Kyrgyzstan">Kyrgyzstan</option>
<option value="Laos">Laos</option>
<option value="Latvia">Latvia</option>
<option value="Lebanon">Lebanon</option>
<option value="Lesotho">Lesotho</option>
<option value="Liberia">Liberia</option>
<option value="Libya">Libya</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Lithuania">Lithuania</option>
<option value="Luxembourg">Luxembourg</option>
<option value="Madagascar">Madagascar</option>
<option value="Malawi">Malawi</option>
<option value="Malaysia">Malaysia</option>
<option value="Maldives">Maldives</option>
<option value="Mali">Mali</option>
<option value="Malta">Malta</option>
<option value="Marshall Islands">Marshall Islands</option>
<option value="Mauritania">Mauritania</option>
<option value="Mauritius">Mauritius</option>
<option value="Mexico">Mexico</option>
<option value="Micronesia">Micronesia</option>
<option value="Moldova">Moldova</option>
<option value="Monaco">Monaco</option>
<option value="Mongolia">Mongolia</option>
<option value="Montenegro">Montenegro</option>
<option value="Morocco">Morocco</option>
<option value="Mozambique">Mozambique</option>
<option value="Myanmar">Myanmar</option>
<option value="Namibia">Namibia</option>
<option value="Nauru">Nauru</option>
<option value="Nepal">Nepal</option>
<option value="Netherlands">Netherlands</option>
<option value="New Zealand">New Zealand</option>
<option value="Nicaragua">Nicaragua</option>
<option value="Niger">Niger</option>
<option value="Nigeria">Nigeria</option>
<option value="North Korea">North Korea</option>
<option value="North Macedonia">North Macedonia</option>
<option value="Norway">Norway</option>
<option value="Oman">Oman</option>
<option value="Pakistan">Pakistan</option>
<option value="Palau">Palau</option>
<option value="Palestine">Palestine</option>
<option value="Panama">Panama</option>
<option value="Papua New Guinea">Papua New Guinea</option>
<option value="Paraguay">Paraguay</option>
<option value="Peru">Peru</option>
<option value="Philippines">Philippines</option>
<option value="Poland">Poland</option>
<option value="Portugal">Portugal</option>
<option value="Qatar">Qatar</option>
<option value="Romania">Romania</option>
<option value="Russia">Russia</option>
<option value="Rwanda">Rwanda</option>
<option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
<option value="Saint Lucia">Saint Lucia</option>
<option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
<option value="Samoa">Samoa</option>
<option value="San Marino">San Marino</option>
<option value="Sao Tome and Principe">Sao Tome and Principe</option>
<option value="Saudi Arabia">Saudi Arabia</option>
<option value="Senegal">Senegal</option>
<option value="Serbia">Serbia</option>
<option value="Seychelles">Seychelles</option>
<option value="Sierra Leone">Sierra Leone</option>
<option value="Singapore">Singapore</option>
<option value="Slovakia">Slovakia</option>
<option value="Slovenia">Slovenia</option>
<option value="Solomon Islands">Solomon Islands</option>
<option value="Somalia">Somalia</option>
<option value="South Africa">South Africa</option>
<option value="South Korea">South Korea</option>
<option value="South Sudan">South Sudan</option>
<option value="Spain">Spain</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Sudan">Sudan</option>
<option value="Suriname">Suriname</option>
<option value="Sweden">Sweden</option>
<option value="Switzerland">Switzerland</option>
<option value="Syria">Syria</option>
<option value="Taiwan">Taiwan</option>
<option value="Tajikistan">Tajikistan</option>
<option value="Tanzania">Tanzania</option>
<option value="Thailand">Thailand</option>
<option value="Timor-Leste">Timor-Leste</option>
<option value="Togo">Togo</option>
<option value="Tonga">Tonga</option>
<option value="Trinidad and Tobago">Trinidad and Tobago</option>
<option value="Tunisia">Tunisia</option>
<option value="Turkey">Turkey</option>
<option value="Turkmenistan">Turkmenistan</option>
<option value="Tuvalu">Tuvalu</option>
<option value="Uganda">Uganda</option>
<option value="Ukraine">Ukraine</option>
<option value="United Arab Emirates">United Arab Emirates</option>
<option value="United Kingdom">United Kingdom</option>
<option value="United States">United States</option>
<option value="Uruguay">Uruguay</option>
<option value="Uzbekistan">Uzbekistan</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Vatican City">Vatican City</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yemen">Yemen</option>
<option value="Zambia">Zambia</option>
<option value="Zimbabwe">Zimbabwe</option>

                </select>
              {/* <input type="text" className="form-control" placeholder="Sydney, A" /> */}
            </div>
          </div>
          <div className="col-6">
            <div className="input-group input-group-static">
              <label>Phone Number</label>
              <input type="text" className="form-control" placeholder="+40 735 631 620" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Language and Skills */}
        <div className="row">
          {/* <div className="col-md-6 align-self-center">
            <label className="form-label mt-4 ms-0">Language</label>
            <select className="form-control" name="choices-language" id="choices-language">
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div> */}
          {/* <div className="col-md-6">
            <label className="form-label mt-4">Skills</label>
            <input
              className="form-control"
              id="choices-skills"
              type="text"
              defaultValue="vuejs, angular, react"
              placeholder="Enter something"
            />
          </div> */}
        </div>
        <button className="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">
          Save
        </button>
        </form>
      </div>
      
    </div>
    </>
    
  );
};

export default BasicInfo;
function showToast(arg0: string) {
  throw new Error("Function not implemented.");
}

