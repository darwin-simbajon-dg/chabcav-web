import React from "react";

const SecondFeatureSection: React.FC = () => {
  return (
    <section className="py-sm-7 py-4">
      <div className="container">
        <div className="row">
          {/* Text Column */}
          <div className="col-lg-5">
            <h3 className="mt-2">Read More About Us</h3>
            <p>
              Pain is what we go through as we become older. We get insulted by others,
              lose trust for those others. We get back stabbed by friends. It becomes
              harder for us to give others a hand.
            </p>
            <a href="#" className="text-primary text-sm icon-move-right">
              More about us
              <i className="fas fa-arrow-right text-xs ms-1"></i>
            </a>
          </div>

          {/* Info Boxes */}
          <div className="col-lg-6 mt-lg-0 mt-5 ps-lg-0 ps-0 ms-auto">
            <div className="p-3 info-horizontal d-flex align-items-center">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl">
                <i className="material-symbols-rounded opacity-10">mediation</i>
              </div>
              <div className="description ps-3">
                <p className="mb-0">
                  It becomes harder for us to give others a hand. <br /> We get our heart
                  broken by people we love.
                </p>
              </div>
            </div>
            <div className="p-3 info-horizontal d-flex align-items-center">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl">
                <i className="material-symbols-rounded opacity-10">settings_overscan</i>
              </div>
              <div className="description ps-3">
                <p className="mb-0">
                  As we live, our hearts turn colder. <br />
                  Cause pain is what we go through as we become older.
                </p>
              </div>
            </div>
            <div className="p-3 info-horizontal d-flex align-items-center">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl">
                <i className="material-symbols-rounded opacity-10">token</i>
              </div>
              <div className="description ps-3">
                <p className="mb-0">
                  When we lose family over time. <br /> What else could rust the heart
                  more over time? Blackgold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondFeatureSection;
