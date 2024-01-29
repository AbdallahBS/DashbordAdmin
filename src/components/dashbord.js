import React  from 'react';
import Nav from './nav';
import Blog from './blog';
import Service from './service';
import Contact from './contact';

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
        <div className="parallax-window" data-parallax="scroll" style={{ backgroundImage: `url('img/dream-pulse-header.jpg')` }}>
          <div className="tm-section-wrap">
            <section id="intro" className="tm-section">
              <div className="tm-bg-white-transparent tm-intro">
                <h2 className="tm-section-title mb-5 text-uppercase tm-color-primary">Espace d'administration</h2>
                <p className="tm-color-gray">
                <p className='fw-bold '> Nom: {apiData?.username}&nbsp;&nbsp;&nbsp;&nbsp;telephone:{apiData?.mobile}
                   <br/> Email : {apiData?.email}
                </p>
                  
                  Vous pouvez utiliser ce dashbord pour modifier le contenu de la page 
                </p>
                <button
                    type="button"
                    style={{width : "200px"}}
                    className="btn btn-primary mr-2"
                    data-mdb-ripple-init
                    onClick={userLogout}
                  >
                    Quiter
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
