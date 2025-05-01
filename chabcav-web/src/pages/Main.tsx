
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
import AboutUs from './AboutUs';



const Main = () => {
const [bannerImage, setBannerImage] = React.useState<string>("");
const [midContentImage, setMidContentImage] = React.useState<string>("");
const [content, setContent] = React.useState<string>("");
const [headline, setHeadline] = React.useState<string>("");
const [cardUrls, setCardUrls] = React.useState<string[]>([]);

useEffect(() => {

  async function fetchCMS(){
    const response = await fetch("https://chabcav-api-development.up.railway.app/api/cms", {
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
      setBannerImage(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.banner}?alt=media`);
      setMidContentImage(`https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.midcontentimage}?alt=media`);
      setContent(data.content);
      setHeadline(data.headline);
      const links = [
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card1}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card2}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card3}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card4}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card5}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card6}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card7}?alt=media`, 
        `https://firebasestorage.googleapis.com/v0/b/chabcav-d81fa.firebasestorage.app/o/public%2F${data.card8}?alt=media`];
      
      setCardUrls(links);


     

     
}  

fetchCMS();

}, [])

//For Emergency if ifrebase storage is down or not working - up this function and comment the fetchCMS function above
// This is a static version of the CMS data. You can replace this with your actual CMS data fetching logic.
/*async function fetchCMS() {
  // Static image paths (assuming these are inside the `public` folder)
  setBannerImage("/banner.png");
  setMidContentImage("/midcontent.jpg");

  // Static text content
  setContent("Welcome to the Chabacano language as spoken in the City of Cavite. The city once hosted a Spanish fort thus providing constant interaction with the Spaniards who lived there. The inhabitants of the place have to learn the foreign tongue and eventually mix and blend it with their language and the result is the delightful mixture of Spanish and Tagalog - Chabacano");
  setHeadline("Chabacano de Ciudad de Caivte History");

  // Static card images
  const links = [
    "/card1.jpg",
    "/card2.jpg",
    "/card3.jpg",
    "/card4.jpg",
    "/card5.jpg",
    "/card6.jpg",
    "/card7.jpg",
    "/card1.jpg"
  ];

  setCardUrls(links);
}

// Then call it normally inside useEffect
useEffect(() => {
  fetchCMS();
}, []);*/




    return (
      <div className="coworking bg-gray-100">
          
            <Header backgroundImageUrl={bannerImage} />
            <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
            {/* Features Section */}
            {/* <FeaturesSection /> */}
            <TestimonialSection contentImageUrl={midContentImage} content={content} headline={headline}/>
            {/* <SecondFeatureSection /> */}
            <FeatureCards urls={cardUrls} />
            <AboutUs />
            <Prefooter />
            </div>
            <Footer />
          </div>
    )
}

export default Main;