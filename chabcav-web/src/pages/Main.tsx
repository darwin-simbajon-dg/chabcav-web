
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

const Main = () => {
   
    return (
      <div className="coworking bg-gray-100">
    
      <Header />
      <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
        {/* Features Section */}
        {/* <FeaturesSection /> */}
        <TestimonialSection />
        {/* <SecondFeatureSection /> */}
        <FeatureCards />
        <Prefooter />
      </div>
      <Footer />
    </div>
    )
}

export default Main;