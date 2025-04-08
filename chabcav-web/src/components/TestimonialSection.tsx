import React from "react";

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-4 position-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 mx-auto bg-gradient-dark border-radius-lg">
            <div className="row py-5">
              {/* Image Section */}
                <div className="col-xl-4 col-md-6 px-5 position-relative d-flex align-items-center">
                <img
                  className="img border-radius-md w-100 position-relative z-index-2"
                  style={{ maxWidth: "600px", height: "auto", marginTop: "auto", marginBottom: "auto" }}
                  src="https://r.mobirisesite.com/910167/assets/images/maxresdefault-1256x707.jpg?v=1TojCn&auto=format&fit=crop&w=934&q=80"
                  loading="lazy"
                  alt="card image"
                />
                </div>

              {/* Quote Section */}
              <div className="col-xl-4 col-md-5 z-index-2 position-relative px-md-3 px-5 my-md-auto mt-4">
                <p className=" text-white text-3xl">Chabacano de Ciudad de Caivte 
                History</p>
                <p className="text-lg text-white">
                Welcome to the Chabacano language as spoken in the City of Cavite. The city once hosted a Spanish fort thus providing constant interaction with the Spaniards who lived there. The inhabitants of the place have to learn the foreign tongue and eventually mix and blend it with their language and the result is the delightful mixture of Spanish and Tagalog 
                – Chabacano
                </p>
                {/* <p className="text-white font-weight-bold text-sm">
                  Michael - <span className="text-xs font-weight-normal">Writer</span>
                </p> */}
                <hr className="vertical start-100 ms-n5 d-xl-block d-none" />
              </div>

              <div className="col-1"></div>

              {/* Statistics Section */}
              {/* <div className="col-xl-2 col-12 px-xl-0 px-5 my-xl-auto">
                <h3 className="text-white mt-xl-0 mt-5">1,679,700 +</h3>
                <p className="text-sm text-white opacity-8">
                  Developers and Companies around the world using our products.
                </p>
                <a href="#" className="text-white icon-move-right text-sm">
                  See all products
                  <i className="fas fa-arrow-right text-xs ms-1"></i>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
