import React from "react";

const FeatureCards: React.FC = () => {
  return (
    <section className="features-3 py-4">
      <div className="container">
        {/* Section Heading */}
        <div className="row text-center justify-content-center">
          <div className="col-lg-6">
            <span className="badge rounded-pill badge-primary mb-2">Co-working</span>
            <h2>Explore our places in London</h2>
            <p>
              If you can’t decide, the answer is no. If two equally difficult paths, choose
              the one more painful in the short term (pain avoidance is creating an illusion
              of equality).
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="row mt-5">
          {/* Card 1 */}
          <div className="col-lg-4 mb-lg-0 mb-4">
            <div className="card">
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                    alt="Campus 6"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
                <h5 className="font-weight-normal">Campus 6</h5>
                <p>
                  Website visitors today demand a frictionless user experience. Applies to
                  mobile applications too.
                </p>
                <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                  Find more
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card mt-5">
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://images.unsplash.com/photo-1589884629108-3193400c7cc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                    alt="Virtual Office"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
                <h5 className="font-weight-normal">Virtual Office</h5>
                <p>
                  If you’re more passionate about founding a business than the business
                  itself, you can fall into.
                </p>
                <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                  More info
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 mb-lg-0 mb-4">
            <div className="card">
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://images.unsplash.com/photo-1498677231914-50deb6ba4217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                    alt="Cozy Spots"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
                <h5 className="font-weight-normal">Cozy Spots</h5>
                <p>
                  If you’re more passionate about founding a business than the business
                  itself technology.
                </p>
                <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                  More info
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="card mt-5">
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                    alt="Co-working Spaces"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
                <h5 className="font-weight-normal">Co-working Spaces</h5>
                <p>
                  Smart money is just dumb money that’s been through a crash. Business than
                  the business itself.
                </p>
                <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                  Find more
                </button>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://images.unsplash.com/photo-1587578932405-7c740a762f7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                    alt="Home Office"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
                <h5 className="font-weight-normal">Home Office</h5>
                <p>
                  Website visitors today demand a frictionless user experience — especially
                  when using search.
                </p>
                <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                  Find more
                </button>
              </div>
            </div>

            {/* Card 6 */}
            <div className="card mt-5">
              <div className="card-header p-0 position-relative mt-2 mx-2 z-index-2">
                <a className="d-block blur-shadow-image">
                  <img
                    src="https://images.unsplash.com/photo-1461988625982-7e46a099bf4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                    alt="Private Space"
                    className="img-fluid shadow border-radius-lg"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="card-body">
                <h5 className="font-weight-normal">Private Space</h5>
                <p>
                  Technology is not only the thing that moves the human race forward, but
                  it’s the only thing that has.
                </p>
                <button className="btn btn-outline-dark btn-sm mb-0" type="button">
                  More info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
