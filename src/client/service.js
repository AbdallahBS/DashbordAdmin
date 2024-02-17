import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
export default function Service() {
  const [services, setServices] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    // Fetch data from your API
    fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/getTech")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching Services:", error));
  }, [updateTrigger]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const obtenirService = async (serviceId) => {
    try {
      // Get user ID from the token or wherever it's stored
      const userId = getUserId(); // Implement this function according to your authentication setup

      // Get the current date in the required format
      const dateDemande = getCurrentDate();
console.log("this is the user id");
      // Make the API request to add a demande
      const response = await fetch('https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/adduserservice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({ userId, serviceId, dateDemande }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.json) // Log or handle the success message

        // Trigger an update to re-fetch services after obtaining one
        setUpdateTrigger(!updateTrigger);
      } else {
        const errorResult = await response.json();
        alert(errorResult.error); // Log or handle the error message
      }
    } catch (error) {
      console.error('Error obtaining service:', error);
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const {userid} = decodedToken;
      return userid
  };

  return (
    <div className="tm-section-wrap bg-white">
  <section id="service" className="row tm-section">
    <div className="col-12 mb-4">
      <h2 className="text-uppercase mb-5 tm-color-primary ">Liste des Services </h2>
      {Array.isArray(services) &&
        services.map((service) => (
          <div className="row" key={service.id}>
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <img
                    src={`data:image/png;base64, ${service.image}`}
                    alt={service.name}
                    style={{ width: '180px', height: '50px' }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => obtenirService(service.id)}
                    data-mdb-ripple-init
                  >
                    Obtenir ce service
                  </button>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        ))}
    </div>
  </section>
</div>
  );
}
