import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-md-7">
      <div className="container">
        <div className="row justify-content-start">
          {/* Column 1 */}
          <div className="col-md-4 ms-md-auto me-md-4">
            <div className="text-start">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4">
                <i className="material-symbols-rounded opacity-10">payment</i>
              </div>
              <h5 className="mt-3">Modular Components</h5>
              <p>
                The Arctic Ocean freezes every winter and much of the sea-ice then thaws
                every summer, and that process will continue whatever.
              </p>
            </div>
            <div className="primary text-start border-radius-lg mt-6">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4">
                <i className="material-symbols-rounded opacity-10">insights</i>
              </div>
              <h5 className="mt-3">Great Features</h5>
              <p>
                People are so scared to lose that they don't even try. Like, one thing
                people can't say is that I'm not trying, and I'm not trying my hardest.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 me-md-auto ms-md-4">
            <div className="primary text-start border-radius-lg">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4">
                <i className="material-symbols-rounded opacity-10">access_alarms</i>
              </div>
              <h5 className="mt-3">Awesome Support</h5>
              <p>
                The time is now for it to be okay to be great. People in this world shun
                people for being great. For being a bright color. What else could rust?
              </p>
            </div>
            <div className="primary text-start border-radius-lg mt-6">
              <div className="icon icon-md icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4">
                <i className="material-symbols-rounded opacity-10">sentiment_satisfied</i>
              </div>
              <h5 className="mt-3">Modern Interface</h5>
              <p>
                If everything I did failed - which it doesn't, it actually succeeds - just
                the fact that I'm willing to fail is an inspiration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
