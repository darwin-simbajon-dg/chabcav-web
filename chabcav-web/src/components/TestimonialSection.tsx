import React from "react";


interface TestimonialSectionProps {
  contentImageUrl: string;
  headline: string;
  content:string;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ contentImageUrl, headline, content }) => {
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
                  src={contentImageUrl}
                  loading="lazy"
                  alt="card image"
                />
              </div>

              {/* Quote Section */}
              <div className="col-xl-4 col-md-5 z-index-2 position-relative px-md-3 px-5 my-md-auto mt-4">
                <p className="text-white text-3xl">{headline}</p>
                {/*<p className="text-lg text-white">{content}</p>*/}
                <p className="text-white w-full max-w-6xl px-4">{content}</p>

                <hr className="vertical start-100 ms-n5 d-xl-block d-none" />
              </div>

              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
