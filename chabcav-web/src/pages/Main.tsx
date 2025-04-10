
// import Login from '../components/Login';
// import Toast from '../components/Toast';

import '../assets/css/nucleo-icons.css'
import '../assets/css/nucleo-svg.css'
import '../assets/css/material-kit-pro.css'
import '../assets/styles.css'

import Footer from '../components/Footer';
import Prefooter from '../components/PreFooter';
import TestimonialSection from '../components/TestimonialSection';
import FeatureCards from '../components/FeatureCards';
import Header from '../components/Header';
import { useEffect } from 'react';
import React from 'react';



const Main = () => {
const [bannerImage, setBannerImage] = React.useState<string>("");
const [midContentImage, setMidContentImage] = React.useState<string>("");
const [content, setContent] = React.useState<string>("");
const [headline, setHeadline] = React.useState<string>("");
const [cardUrls, setCardUrls] = React.useState<string[]>([]);
useEffect(() => {

  async function fetchCMS(){
    const response = await fetch("http://localhost/api/cms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      console.log(data);
      setBannerImage(`http://localhost/uploads/${data.banner}`);
      setMidContentImage(`http://localhost/uploads/${data.midcontentimage}`);
      setContent(data.content);
      setHeadline(data.headline);
      const links = [
        `http://localhost/uploads/${data.card1}`, 
        `http://localhost/uploads/${data.card2}`, 
        `http://localhost/uploads/${data.card3}`, 
        `http://localhost/uploads/${data.card4}`, 
        `http://localhost/uploads/${data.card5}`, 
        `http://localhost/uploads/${data.card6}`, 
        `http://localhost/uploads/${data.card7}`, 
        `http://localhost/uploads/${data.card8}`];
      
      setCardUrls(links);


     

     
}  

fetchCMS();

}, [])

    return (
      <div className="coworking bg-gray-100">
          
            <Header backgroundImageUrl={bannerImage} />
            <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
            {/* Features Section */}
            {/* <FeaturesSection /> */}
            <TestimonialSection contentImageUrl={midContentImage} content={content} headline={headline}/>
            {/* <SecondFeatureSection /> */}
            <FeatureCards urls={cardUrls} />
            <Prefooter />
            </div>
            <Footer />
          </div>
    )
}

export default Main;