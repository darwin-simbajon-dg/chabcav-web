import React, { useEffect, useState } from "react";
import SpinnerModal from "../../components/SpinnerModal";

interface ImageData {
  id: string;
  image: File;
}
const UserCMS: React.FC = () => {
  const [bannerImage, setBannerImage] = useState("");
  const [card1Image, setCard1Image] = useState("");
  const [card2Image, setCard2Image] = useState("");
  const [card3Image, setCard3Image] = useState("");
  const [card4Image, setCard4Image] = useState("");
  const [card5Image, setCard5Image] = useState("");
  const [card6Image, setCard6Image] = useState("");
  const [card7Image, setCard7Image] = useState("");
  const [card8Image, setCard8Image] = useState("");
  const [midContentImage, setMidContentImage] = useState("");
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false); // State to control spinner

  async function fetchCMS(){
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
      /*setBannerImage(`https://chabcav-api-development.up.railway.app/uploads/${data.banner}`);
      setMidContentImage(`https://chabcav-api-development.up.railway.app/uploads/${data.midcontentimage}`);
      setCard1Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card1}`);
      setCard2Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card2}`);
      setCard3Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card3}`);
      setCard4Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card4}`);
      setCard5Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card5}`);
      setCard6Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card6}`);
      setCard7Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card7}`);
      setCard8Image(`https://chabcav-api-development.up.railway.app/uploads/${data.card8}`);*/


      setBannerImage(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.banner}?alt=media`);
      setMidContentImage(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.midcontentimage}?alt=media`);
      setCard1Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card1}?alt=media`);
      setCard2Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card2}?alt=media`);
      setCard3Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card3}?alt=media`);
      setCard4Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card4}?alt=media`);
      setCard5Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card5}?alt=media`);
      setCard6Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card6}?alt=media`);
      setCard7Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card7}?alt=media`);
      setCard8Image(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card8}?alt=media`);

      setContent(data.content);
      setHeadline(data.headline);
}  

  async function handleContentChanges() {
    try {
      const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms/update-contents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({
          content: content,
          headline: headline,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update CMS content");
      }
      
      const text = await response.text();
      
      if (text) {
        const data = JSON.parse(text);
        console.log("Data:", data);
      } else {
        console.warn("No JSON content returned");
      }
      
      /*const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms/update-contents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify({
          content: content,
          headline: headline,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();

      if (data) {
        showToast("Content Changes Saved Successfully");
      }
      else {
        showToast("Content Changes Failed");
      }*/


      //console.log(data);
    } catch (error) {
      console.error("Error fetching content changes:", error);
    }
  }

  async function handleCMSChanges(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true); // Show spinner
    const formData = new FormData();
    imageDataList.forEach((imageData) => {
      formData.append(imageData.id, imageData.image);
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
      if (!imageDataList.length) {
        console.warn("No images to upload. Skipping the request.");
      } else {
        const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms/upload", {
          method: "POST",
          headers: {
            // You can optionally re-enable this:
            // "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: formData,
        });
      
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Failed to submit image data");
        }
        setIsLoading(false);
      }
      
      /*if (imageDataList.length) {
        console.warn("No images to upload. Skipping the request.");
        const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms/upload", {
          method: "POST",
          headers: {
            // "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: formData,
        });

        if (!response.ok) {
          setIsLoading(false); // Hide spinner
          throw new Error("Failed to submit image data");

        }
        setIsLoading(false);
        //const result = await response.json();
        //console.log("Image data submitted successfully:", result);
      }*/

      await handleContentChanges();
      await fetchCMS();
      setIsLoading(false); // Hide spinner


    } catch (error) {
      console.error("Error submitting image data:", error);
    }


  }

  useEffect(() => {


    fetchCMS();

  }, []);

  // Function to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX <= 10) {
        setIsSidebarCollapsed(false); // Expand if mouse is at the leftmost 10px
      } else if (event.clientX > 260) {
        setIsSidebarCollapsed(true); // Collapse if mouse moves far from the sidebar
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <div className="card p-4 shadow-sm mb-4" style={{
        paddingLeft: '250px', cursor: "pointer", marginTop: "0px",
        transition: "margin 0.3s ease-in-out",
        marginLeft: isSidebarCollapsed ? "0" : "250px",
        width: isSidebarCollapsed ? "100%" : "calc(100% - 250px)"
      }}>
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

        {/* Profile Card */}
        <div className="card card-body mx-2 mx-md-2 mt-n6">

          <div className="col-10 mx-auto bg-gradient-dark border-radius-lg">
            <div className="row py-5">
              {/* Image Section */}
              <div className="col-xl-4 col-md-6 px-5 position-relative d-flex align-items-center">
                <label>
                  <img
                    className="img border-radius-md w-100 position-relative z-index-2"
                    style={{ maxWidth: "600px", height: "auto", marginTop: "auto", marginBottom: "auto" }}
                    src={midContentImage}
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
                  defaultValue={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  // defaultValue="Chabacano de Ciudad de Caivte History"
                  style={{ resize: "none" }}
                />
                <textarea
                  className="text-lg text-white bg-transparent border-0 text-8xl w-100"
                  rows={10}
                  defaultValue={content}
                  onChange={(e) => setContent(e.target.value)}
                  //  defaultValue="Welcome to the Chabacano language as spoken in the City of Cavite. The city once hosted a Spanish fort thus providing constant interaction with the Spaniards who lived there. The inhabitants of the place have to learn the foreign tongue and eventually mix and blend it with their language and the result is the delightful mixture of Spanish and Tagalog – Chabacano "
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
                    <label htmlFor="card1FileInput">
                      <img
                        src={card1Image}
                        alt="Campus 6"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                        style={{ cursor: "pointer" }}
                      />
                    </label>

                    {/* </a> */}
                  </div>
                  <div className="card-body">
                    Card 1
                  </div>
                </div>

                {/* Card 2 */}
                <div className="card mt-5"
                  onClick={() => {
                    const input = document.getElementById("card4FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card2Image}
                        alt="Virtual Office"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 4
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-lg-4 mb-lg-0 mb-4">
                <div className="card"
                  onClick={() => {
                    const input = document.getElementById("card2FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card3Image}
                        alt="Cozy Spots"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 2
                  </div>
                </div>

                {/* Card 4 */}
                <div className="card mt-5"
                  onClick={() => {
                    const input = document.getElementById("card5FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card4Image}
                        alt="Co-working Spaces"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 5
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="col-lg-4">
                <div className="card"
                  onClick={() => {
                    const input = document.getElementById("card3FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card5Image}
                        alt="Home Office"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 3
                  </div>
                </div>

                {/* Card 6 */}
                <div className="card mt-5"
                  onClick={() => {
                    const input = document.getElementById("card6FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card6Image}
                        alt="Private Space"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 6
                  </div>
                </div>
              </div>
              {/* Card 5 */}
              <div className="col-lg-4">
                <div className="card"
                  onClick={() => {
                    const input = document.getElementById("card7FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card7Image}
                        alt="Home Office"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 7
                  </div>
                </div>

                {/* Card 6 */}

              </div>
              {/* Card 5 */}
              <div className="col-lg-4">
                <div className="card"
                  onClick={() => {
                    const input = document.getElementById("card8FileInput") as HTMLInputElement;
                    input.click();
                  }}>
                  <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={card8Image}
                        alt="Home Office"
                        className="img-fluid shadow border-radius-lg"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    Card 8
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
          id="card1FileInput"
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
          id="card2FileInput"
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
          id="card3FileInput"
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
          id="card4FileInput"
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
          id="card5FileInput"
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
          id="card6FileInput"
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
          id="card7FileInput"
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
          id="card8FileInput"
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
    </>

  );
};

export default UserCMS;
