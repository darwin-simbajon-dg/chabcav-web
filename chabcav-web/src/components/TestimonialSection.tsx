import React from "react";

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-4 position-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 mx-auto bg-gradient-dark border-radius-lg">
            <div className="row py-5">
              {/* Image Section */}
              <div className="col-xl-4 col-md-6 px-5 position-relative">
                <img
                  className="img border-radius-md max-width-300 w-100 position-relative z-index-2 mt-n7"
                  src="https://images.unsplash.com/photo-1521668576204-57ae3afee860?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                  loading="lazy"
                  alt="card image"
                />
              </div>

              {/* Quote Section */}
              <div className="col-xl-4 col-md-5 z-index-2 position-relative px-md-3 px-5 my-md-auto mt-4">
                <i className="material-symbols-rounded text-white text-5xl">format_quote</i>
                <p className="text-lg text-white">
                  Decisions: If you can’t decide, the answer is no. If two equally difficult
                  paths, choose the one more painful in the short term (pain avoidance is
                  creating an illusion of equality). Choose the path that leaves you more
                  equanimous in the long term.
                </p>
                <p className="text-white font-weight-bold text-sm">
                  Michael - <span className="text-xs font-weight-normal">Writer</span>
                </p>
                <hr className="vertical start-100 ms-n5 d-xl-block d-none" />
              </div>

              <div className="col-1"></div>

              {/* Statistics Section */}
              <div className="col-xl-2 col-12 px-xl-0 px-5 my-xl-auto">
                <h3 className="text-white mt-xl-0 mt-5">1,679,700 +</h3>
                <p className="text-sm text-white opacity-8">
                  Developers and Companies around the world using our products.
                </p>
                <a href="#" className="text-white icon-move-right text-sm">
                  See all products
                  <i className="fas fa-arrow-right text-xs ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
