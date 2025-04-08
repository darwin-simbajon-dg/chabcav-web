
// import Login from '../components/Login';
// import Toast from '../components/Toast';

import '../assets/css/nucleo-icons.css'
import '../assets/css/nucleo-svg.css'
import '../assets/css/material-kit-pro.css'
import '../assets/styles.css'

import Footer from '../components/Footer';
import Prefooter from '../components/PreFooter';
import FeaturesSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import SecondFeatureSection from '../components/SecondFeatureSection';
import FeatureCards from '../components/FeatureCards';
import Header from '../components/Header';
// import Login from '../components/Login';
// import Header from '../components/Header';
// import Content from '../components/Content';
// import PageData from '../models/PageData';


const Main = () => {
    // const [data, setData] = useState<PageData | null>(null);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {

    //     const fetchData = async() => {
    
    //       try {        
    //         // const apiBaseUrl = 'https://chabcav-api-development.up.railway.app'; //process.env.VITE_APP_API_BASE_URL;
    
    //         const apiBaseUrl = 'http://localhost';

    //         // console.log(process.env);
    //         // console.log(process.env.meta);
    //         console.log(`${apiBaseUrl}/cms/configurations`);
    
    //         const response = await fetch(`${apiBaseUrl}/cms/configurations`);
    //         if(!response.ok){
    //           throw new Error(`HTTP error! status: ${response.json()}`);
    //         }
    //         else{
    //           const result: PageData = await response.json();
    //           setData(result);
    //         }
    //       } catch (error) {
    //         setError(error instanceof Error ? error.message: 'Unknown error');
    //       }
    //     }
    
    //     fetchData();
    
    //   }, []);
    
    //   if(error) {
    //     return <div>Error: [error]</div>
    //   }
    
    //   if(!data){
    //     return <div>Loading...</div>
    //   }

    return (
      <div className="coworking bg-gray-100">
      {/* Navbar Placeholder */}
      {/* Add your Navbar component here */}

      {/* Header Section */}
     
      <Header />
      {/* Card Section */}
      <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
        {/* Features Section */}
        {/* <FeaturesSection /> */}
        <TestimonialSection />
        {/* <SecondFeatureSection /> */}
        <FeatureCards />
        {/* Add other sections like Testimonials, Footer here */}
        <Prefooter />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
    )
}

export default Main;