import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { jwtDecode } from 'jwt-decode';

export default function Blog() {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const { userid } = decodedToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userid === undefined) {
          // userId is undefined, don't make the API request
          return;
        }

        const response = await fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/getuserservice", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid }),
        });

        if (!response.ok) {
          throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setServices(data); // Update the state variable with the received data
      } catch (error) {
        console.error("Erreur lors de la récupération des services de l'utilisateur:", error);
      }
    };

    // Fetch data from your API with userId
    fetchData();
  }, [userid]);

  const handleAnnulerDemande = async (serviceId) => {
    try {
      if (userid === undefined) {
        // userId is undefined, cannot make the API request
        console.error("Identifiant d'utilisateur non défini.");
        return;
      }

      const response = await fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/deluserservice", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userid, serviceId }),
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
      }

      // Handle the successful deletion and update the UI if needed
      alert(`Demande annulée avec succès pour le service numéro: ${serviceId}`);

      // Refetch the data after deletion to update the UI
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'annulation de la demande:", error);
    }
  };

  return (
    <div >
      <section id="vos" className="row tm-section">
       <h2 className="text-uppercase mb-5 tm-color-primary ">Liste de vos services</h2>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
          <th scope='col'>Nom du Service</th>
            <th scope='col'>Date d'Obtention</th>
            <th scope='col'>État</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.service_name}</td>
              <td>{new Date(service.date_obtained).toLocaleString()}</td>
              <td>{service.etat}</td>
              
              <td>
                {service.etat === "en cours de traitement" && (
                  <MDBBtn color='danger' size='sm' onClick={() => handleAnnulerDemande(service.id)}>
                    Annuler la demande
                  </MDBBtn>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      </section>
    </div>
  );
}
