
// import './App.css'
// import Header from './components/Header'
// import Login from './components/Login'
// import Content from './components/Content'
// import { useEffect, useState } from 'react';
// import PageData from './models/PageData';



import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Register from './pages/Register';
import UpdateAccount from './pages/UpdateAccount';
import UserAccount from './pages/account/UserAccount';
import ResetPassword from './pages/account/ResetPassword';
import EnterEmailAddress from './pages/account/EnterEmailAddress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  const isLoggedIn = !!localStorage.getItem('authToken'); 


  return (
    // <div>
    //     <Header bannerImage={data.bannerImage} />
    //     <Login/>
    //     <Content content={data.content} />
    //   </div>

    
    <Router>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/update" element={isLoggedIn ? <UpdateAccount /> : <Main />}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/enter-emailAddress" element={<EnterEmailAddress/>}/>
        
          {/* <Route path="/user/lessons" element={isLoggedIn ? <View /> : <Main />} /> */}
      </Routes>
      <ToastContainer
        toastClassName="custom-toast"
       // bodyClassName="custom-toast-body"
        className="custom-toast-container"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      
  
      />
    </Router>
  )
}

export default App
