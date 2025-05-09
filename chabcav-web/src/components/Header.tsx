import Login from "./Login";

interface HeaderProps {
  backgroundImageUrl: string;
}

const Header: React.FC<HeaderProps> = ({backgroundImageUrl}) => {
// const [bannerImage, setBannerImage] = React.useState<string>("");


  // useEffect(()=>{
  //   setBannerImage(backgroundImageUrl);
    
  // },[])


    return (
        <header>
        <div
          className="page-header min-vh-75"
          style={{
            backgroundImage:
              `url(${backgroundImageUrl})`,
          }}
        >
          <span className="mask bg-gradient-dark opacity-5"></span>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 d-flex justify-content-center text-md-start text-center flex-column mt-sm-0 mt-7">
                <h1 className="text-white">Chabano Learning System</h1> 
                <p className="lead pe-md-5 me-md-5 text-white opacity-8">
                   The time is now for it be okay to be great. People in this world shun
                  people for being nice. 
                </p>
                {/* <div className="buttons">
                  <button type="button" className="btn bg-gradient-dark mt-4">
                    Get Started
                  </button>
                  <button type="button" className="btn text-white shadow-none mt-4">
                    Read more
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="position-absolute top-0 start-50 mt-7"
          style={{ zIndex: 10, width: "100%", maxWidth: "900px" }}
        >
        
        </div> */}
          <Login />
      </header>
    );

};

export default Header;
