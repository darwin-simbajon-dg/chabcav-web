import React, { useEffect, useState } from "react";

interface ImageData{
    id: string;
    image: File;
}
const UserCMS: React.FC = () => {
  const[bannerImage, setBannerImage] = useState("");
  const [information, setInformation] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);

  
async function handleCMSChanges(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    imageDataList.forEach((imageData) => {
        formData.append(imageData.id, imageData.image);
    });

    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    try {
        const response = await fetch("http://localhost/api/cms/upload", {
            method: "POST",
            headers: {
            // "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to submit image data");
        }
        const bannerImage = formData.get("banner");
        setBannerImage(`http://localhost/uploads/${bannerImage}`);
        const result = await response.json();
        console.log("Image data submitted successfully:", result);
    } catch (error) {
        console.error("Error submitting image data:", error);
    }

    
 }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost/profile/9b9499c4-584c-4816-a768-d7348a07237a", {
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

      setInformation(data.information);
      setFullName(data.fullname);
      setEmail(data.email);
      setLocation(data.location);
      setPhoneNumber(data.phoneNumber);

    }

    fetchData();


  }, []);

  return (
    <div className="container-fluid" style={{ paddingLeft: '250px', cursor: "pointer" }}>
        <div
            className="page-header min-vh-75"
            style={{
            backgroundImage: `url(${bannerImage})`,
            cursor: "pointer",        
            }}
            onClick={() => {
            const input = document.getElementById("banner") as HTMLInputElement;
            input.click();
              }}
        >
          <span className="mask bg-gradient-dark opacity-5"></span>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 d-flex justify-content-center text-md-start text-center flex-column mt-sm-0 mt-7">
            <p className="lead pe-md-5 me-md-5 text-white opacity-8"></p>
              </div>
            </div>
          </div>
        </div>
      {/* Page Header */}
      {/* <div
        className="page-header min-height-300 border-radius-xl mt-4"
        style={{
          backgroundImage:
            "",
          backgroundSize: "cover",
        }}
      >
        <span className="mask bg-gradient-dark opacity-6"></span>
      </div> */}

      {/* Profile Card */}
      <div className="card card-body mx-2 mx-md-2 mt-n6">
        {/* <div className="row gx-4 mb-2">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <label htmlFor="profileImageUpload">
                <img
                  src="../../assets/img/bruce-mars.jpg"
                  alt="profile_image"
                  className="w-100 border-radius-lg shadow-sm"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <input
                type="file"
                id="profileImageUpload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        ".avatar img"
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">DonJon</h5>
              <p className="mb-0 font-weight-normal text-sm">Tambay</p>
            </div>
          </div> */}



          {/* <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill p-1" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1 active"
                    data-bs-toggle="tab"
                    href="#app"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="material-symbols-rounded text-lg position-relative">home</i>
                    <span className="ms-1">App</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1"
                    data-bs-toggle="tab"
                    href="#messages"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="material-symbols-rounded text-lg position-relative">email</i>
                    <span className="ms-1">Messages</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link mb-0 px-0 py-1"
                    data-bs-toggle="tab"
                    href="#settings"
                    role="tab"
                    aria-selected="false"
                  >
                    <i className="material-symbols-rounded text-lg position-relative">settings</i>
                    <span className="ms-1">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
            
          </div> */}
           <div className="col-10 mx-auto bg-gradient-dark border-radius-lg">
            <div className="row py-5">
              {/* Image Section */}
                <div className="col-xl-4 col-md-6 px-5 position-relative d-flex align-items-center">
                <label>
                  <img
                    className="img border-radius-md w-100 position-relative z-index-2"
                    style={{ maxWidth: "600px", height: "auto", marginTop: "auto", marginBottom: "auto" }}
                    src="https://r.mobirisesite.com/910167/assets/images/maxresdefault-1256x707.jpg?v=1TojCn&auto=format&fit=crop&w=934&q=80"
                    loading="lazy"
                    alt="card image"
                    onClick={() => {
                        const input = document.getElementById("midContent") as HTMLInputElement;
                        input.click();
                      }}
                  />
                </label>                
                </div>

              {/* Quote Section */}
              <div className="col-xl-4 col-md-5 z-index-2 position-relative px-md-3 px-5 my-md-auto mt-4">
                <textarea
                  className="form-control text-white bg-transparent border-0 text-3xl"
                  rows={3}
                  defaultValue="Chabacano de Ciudad de Caivte History"
                  style={{ resize: "none" }}
                />
                <textarea
                 className="text-lg text-white bg-transparent border-0 text-8xl w-100"  
                 rows={10}
                 defaultValue="Welcome to the Chabacano language as spoken in the City of Cavite. The city once hosted a Spanish fort thus providing constant interaction with the Spaniards who lived there. The inhabitants of the place have to learn the foreign tongue and eventually mix and blend it with their language and the result is the delightful mixture of Spanish and Tagalog – Chabacano "
                 style={{ resize: "none" }}
                >
                </textarea>
                <hr className="vertical start-100 ms-n5 d-xl-block d-none" />
              </div>

              <div className="col-1"></div>
            </div>
          </div>
        {/* </div> */}

        {/* Sections */}
        <div className="row">
          
          

        <div className="row mt-5">
          {/* Card 1 */}
          <div className="col-lg-4 mb-lg-0 mb-4">
            <div className="card"
              onClick={() => {
                const input = document.getElementById("fileInputCard1") as HTMLInputElement;
                input.click();
              }}>

              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                {/* <a className="d-block blur-shadow-image"> */}
                    <label htmlFor="profileImageUpload2">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441482142-1297391438285686-2974495117336394948-n-1080x1296.jpg?v=1TojCn"
                    alt="Campus 6"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                  />               
                  </label>
                
                {/* </a> */}
              </div>
              <div className="card-body">
              </div>
            </div>

            {/* Card 2 */}
            <div className="card mt-5"
             onClick={() => {
                const input = document.getElementById("fileInputCard2") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441549978-478114801425205-6537926792892865305-n-694x833.jpg?v=1TojCn"
                    alt="Virtual Office"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 mb-lg-0 mb-4">
            <div className="card"
             onClick={() => {
                const input = document.getElementById("fileInputCard3") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441489322-473613091898724-7919112223862581296-n-694x833.jpg?v=1TojCn"
                    alt="Cozy Spots"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div>

            {/* Card 4 */}
            <div className="card mt-5"
             onClick={() => {
                const input = document.getElementById("fileInputCard4") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441568339-443647471614286-8735612661788619240-n-1080x1296.jpg?v=1TojCn"
                    alt="Co-working Spaces"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-lg-4">
            <div className="card"
             onClick={() => {
                const input = document.getElementById("fileInputCard5") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441888247-1628473944631717-5704146367515044747-n-694x833.jpg?v=1TojCn"
                    alt="Home Office"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div>

            {/* Card 6 */}
            <div className="card mt-5"
             onClick={() => {
                const input = document.getElementById("fileInputCard6") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441577533-2212279502451537-8703496605716778471-n-1080x1296.jpg?v=1TojCn"
                    alt="Private Space"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="col-lg-4">
            <div className="card"
             onClick={() => {
                const input = document.getElementById("fileInputCard7") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441888247-1628473944631717-5704146367515044747-n-694x833.jpg?v=1TojCn"
                    alt="Home Office"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div>

            {/* Card 6 */}
            
          </div>
            {/* Card 5 */}
            <div className="col-lg-4">
            <div className="card"
             onClick={() => {
                const input = document.getElementById("fileInputCard8") as HTMLInputElement;
                input.click();
              }}>
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://r.mobirisesite.com/910167/assets/images/441577533-2212279502451537-8703496605716778471-n-1080x1296.jpg?v=1TojCn"
                    alt="Home Office"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
              </div>
            </div> 
          </div>
        </div>
        </div>
      </div>
      <button className="btn btn-outline-dark btn-sm mb-0" type="button" onClick={handleCMSChanges}>
                  Save
                </button>
      <input
                type="file"
                id="fileInputCard1"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard1"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card1", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard2"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard2"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card2", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard3"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard3"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card3", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard4"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard4"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card4", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard5"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard5"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card5", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard6"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard6"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card6", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard7"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard7"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card7", image: file },
                      ]);
                  }
                }}
              />
                <input
                type="file"
                id="fileInputCard8"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="fileInputCard8"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "Card8", image: file },
                      ]);
                  }
                }}
              />

                <input
                type="file"
                id="banner"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="banner"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "banner", image: file },
                      ]);
                  }
                }}
              />

                <input
                type="file"
                id="midContent"
                style={{ display: "none" }}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imgElement = document.querySelector(
                        `label[for="midContent"] img`
                      ) as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                    setImageDataList((prevList) => [
                        ...prevList,
                        { id: "midcontentimage", image: file },
                      ]);
                  }
                }}
              />
    </div>
  );
};

export default UserCMS;
