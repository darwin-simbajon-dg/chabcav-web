import React from "react";

const Content: React.FC = () => {
  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-10 d-flex justify-content-center flex-column mx-auto text-lg-start text-center">
            <h2 className="mb-4">Find more great partners</h2>
            <p className="mb-2">
              It really matters and then like it really doesn&#39;t matter. What
              matters is the people who are sparked by it. And the people who
              are like offended by it, it doesn&#39;t matter.
            </p>
            <ul className="m-lg-2 m-auto">
              <li className="mb-2">People are so scared to lose their hope</li>
              <li className="mb-2">That&#39;s the main thing people</li>
              <li className="mb-2">Thoughts- their perception of themselves!</li>
            </ul>
            <p>
              It really matters and then like it really doesn&#39;t matter. What
              matters is the people who are sparked by it. And the people who
              are like offended by it, it doesn&#39;t matter.
            </p>
            <h3 className="mt-4">We will be with you forever</h3>
            <p>
              It really matters and then like it really doesn&#39;t matter. What
              matters is the people who are sparked by it. And the people who
              are like offended by it, it doesn&#39;t matter.
            </p>
            <p className="blockquote my-3 ps-2">
              <span className="text-bold">
                “And thank you for turning my personal jean jacket into a
                couture piece.”
              </span>
              <br />
              <small className="blockquote-footer">Kanye West, Producer.</small>
            </p>
          </div>
          <div className="col-md-5 col-6 mx-lg-0 mx-auto px-lg-0 px-md-0 my-auto">
            <img
              className="max-width-400 border-radius-lg shadow-lg"
              src="/src/assets/img/examples/studio-2.jpg"
              alt="Studio example"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
