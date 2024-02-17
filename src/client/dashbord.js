import React  from 'react';

import Nav from './nav.js';
import Blog from './blog.js';
import Service from './service.js';
import Contact from './contact.js';
import {useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

export default function Dashbord() {
  const navigate = useNavigate();
  const [{isLoading,apiData,serverError}]=useFetch()
  console.log("this.",apiData)
  function userLogout(){
    console.log("logout")
    localStorage.removeItem('token');
    navigate('/')
  }
  if (isLoading) {
  
  }
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <main className="container-fluid">
    <div className="row">        
      <Nav></Nav>
      <main role="main" className="ml-sm-auto col-12">
      <div className="parallax-window" data-parallax="scroll" style={{ backgroundImage: `url('img/bg5.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="tm-section-wrap">
            <section id="intro" className="tm-section">
            <div className="tm-bg-black-transparent tm-intro" >
      <h2 className="tm-section-title mb-5 text-uppercase tm-color-primary">Espace Client</h2>
      <div className="user-details" style={{ color: 'white' }}>
        <p className="fw-">
          <span className="detail-label">Nom:</span> {apiData?.firstname} {apiData?.lastname}
        </p>
        <p className="fw-">
          <span className="detail-label">Téléphone:</span> {apiData?.mobile}
        </p>
        <p className="fw-">
          <span className="detail-label">Email:</span> {apiData?.email}
        </p>
      </div>
      <p className="tm-color-gray" style={{ color: 'white' }}>
      Vous pouvez utiliser ce tableau de bord pour contrôler vos services.
      </p>
      <button
        type="button"
        className="btn btn-primary mr-2"
        style={{ width: "200px" }}
        onClick={userLogout}
      >
        Quitter
      </button>
    </div>       
            </section>
          </div>            
        </div>
        <div className="tm-section-wrap bg-white">
         <Blog></Blog>
        </div>
        <Service></Service>
        <Contact></Contact>
      
      </main>        
    </div>
  </main>
  
  );
}
