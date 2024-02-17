import React  from 'react';
import Nav from './nav';
import Blog from './blog';
import Service from './service';
import Contact from './contact';
import Demands from './demands';

import {useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';
import { getUsername } from '../helper/helper';


export default function Dashbord() {
  const username = getUsername()
  console.log("eroo",username);
  const navigate = useNavigate();
  const [{isLoading,apiData,serverError}]=useFetch()
  console.log("this.",apiData)
  //logout handel function

  function userLogout(){
    console.log("logout")
    localStorage.removeItem('token');
    navigate('/')
  }
  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <main className="container-fluid">
      <div className="row">        
        <Nav></Nav>
        <main role="main" className="ml-sm-auto col-12">
          <div className="parallax-window" data-parallax="scroll" style={{ backgroundImage: `url('img/bg5.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            
            <div className="tm-section-wrap">
            <div className="col-md-4 mb-4">
 
  
</div>

              <section id="intro" className="tm-section">
                
              <div className="tm-bg-black-transparent tm-intro container">
  <div className="row">
  <div className="col-md-8">
  <div className="tm-section-content">
    <h2 className="tm-section-title mb-4 text-uppercase tm-color-primary" style={{ color: '#7CB9E8' }}>Espace d'administration</h2>
    <p className="tm-color-gray" style={{ color: 'white' }}>
      <span className='fw-bold'>Nom:</span> {apiData?.username}
    </p>
    <p style={{ color: 'white' }}><span className='fw-bold'>Téléphone: 20580395</span> {apiData?.mobile} </p>
    <p style={{ color: 'white' }}><span className='fw-bold'>Email:</span> {apiData?.email}</p>

    <p className="tm-color-gray" style={{ color: 'white' }}>
      Vous pouvez utiliser ce tableau de bord pour modifier le contenu de la page.
    </p>
    <button
      type="button"
      className="btn btn-primary mt-3"
      onClick={userLogout}
    >
      Quitter
    </button>
  </div>
</div>


    <div className="col-md-4">
      {/* Card for the number of clients */}
      <div className="card mb-4 bg-transparent border-0" style={{ color: 'white' }}>
    <div className="card-body">
      <h5 className="card-title">Nombre de clients</h5>
      <p className="card-text">34</p>
    </div>
  </div>

      {/* Card for the number of messages */}
      <div className="card mb-4 bg-transparent border-0" style={{ color: 'white' }}>
    <div className="card-body">
      <h5 className="card-title">Nombre des demandes </h5>
      <p className="card-text">12</p>
    </div>
  </div>

      {/* Card for the number of demands */}
      <div className="card mb-4 bg-transparent border-0" style={{ color: 'white' }}>
    <div className="card-body">
      <h5 className="card-title">Nombre des messages</h5>
      <p className="card-text">1234</p>
    </div>
  </div>
    </div>
  </div>
</div>
             
              </section>
            </div>            
          </div>
          <div className="tm-section-wrap bg-white">
          
            <Blog></Blog>
          </div>
          <Service></Service>
          <Demands></Demands>
          <Contact></Contact>
        </main>        
      </div>
    </main>
  );
  
  }  