import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit';
import { Modal, Button } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';

export default function Demands() {
  const [userServices, setUserServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showRefuseConfirmationModal, setShowRefuseConfirmationModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [serviceToRefuse, setServiceToRefuse] = useState(null);
  

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const { userid } = decodedToken;

  const fetchData = async () => {
    try {
      const response = await fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/getalluserservice");

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setUserServices(data.userServices); // Update the state variable with the received data
    } catch (error) {
      console.error("Error fetching user services:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run the effect only once when the component mounts

  const handleAcceptClick = async (userService) => {
    try {
      const response = await fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/gererdemandeservice", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userService.user_id,
          serviceId: userService.service_id,
          etat: 'accept',
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Assuming the API updates the service state successfully
      // Refetch the data after performing the action
      fetchData();
      alert("Vous avez accepté cette demande");
    } catch (error) {
      console.error("Error updating service state:", error);
    }
  };
  const handleTerminateClick = (userService) => {
    setServiceToDelete(userService);
    setShowConfirmationModal(true);
  };
  const handleConfirmTermination = async () => {
    try {
      const response = await fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/deluserservice", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: serviceToDelete.user_id,
          serviceId: serviceToDelete.service_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Assuming the API deletes the service user successfully
      // Refresh the data after performing the action
      fetchData();
      alert(`Vous avez terminé le service ${serviceToDelete.service_name} du client ${serviceToDelete.client_name}`);
      setShowConfirmationModal(false); // Close the modal after success
    } catch (error) {
      console.error("Error terminating service:", error);
    }
  };

  const handleCancelTermination = () => {
    setShowConfirmationModal(false);
  };
  const handleRefuseClick = (userService) => {
    setServiceToRefuse(userService);
    setShowRefuseConfirmationModal(true);
  };
  const handleConfirmRefusal = async () => {
    try {
      const response = await fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/gererdemandeservice", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: serviceToRefuse.user_id,
          serviceId: serviceToRefuse.service_id,
          etat: 'refuser',
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Assuming the API updates the service state successfully
      // Refresh the data after performing the action
      fetchData();
      console.log("SERVICE TO REFUS" , serviceToRefuse);
      alert(`Vous avez refusé la demande pour le client "${serviceToRefuse.client_name}"`);
      setShowRefuseConfirmationModal(false); // Close the modal after success
    } catch (error) {
      console.error("Error refusing service:", error);
    }
  };
  const handleCancelRefusal = () => {
    setShowRefuseConfirmationModal(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="tm-section-wrap bg-white">
      <div className="col-12 tm-section-pad d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2 className="tm-text-primary mb-4">Gestion des demandes</h2>
          {/* Votre autre contenu va ici */}
        </div>
      </div>
      <section id="demandes" className="row tm-section">
        <div className="col-12 tm-section-pad">
          <div className="tm-flex-item-left">
            <MDBTable align='middle'>
              <MDBTableHead>
                <tr>
                  <th scope='col'>Nom du Client</th>
                  <th scope='col'>service demander</th>
                  <th scope='col'>Date de demande</th>
                  <th scope='col'>État</th>
                  <th scope='col'>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {userServices.map((userService) => (
                  <tr key={userService.id}>
                    <td>{userService.client_name}</td>
                    <td>{userService.service_name}</td>
                    <td>{new Date(userService.date_obtained).toLocaleString()}</td>
                    <td>
                      <MDBBadge
                        pill
                        bg={userService.etat === 'accept' ? 'success' : (userService.etat === 'en cours de traitement' ? 'warning' : 'danger')}
                      >
                        {userService.etat}
                      </MDBBadge>
                    </td>
                    <td>
                      {userService.etat === 'accept' ? (
                        <MDBBtn color='danger' size='sm' outline onClick={()=> handleTerminateClick(userService)}>
                          Terminer
                        </MDBBtn>
                      ) : (
                        userService.etat === 'en cours de traitement' ? (
                          <>
                            <MDBBtn color='primary' size='sm' onClick={() => handleAcceptClick(userService)}>
                              Accepter
                            </MDBBtn>
                            <MDBBtn color='danger' size='sm' outline onClick={()=> handleRefuseClick(userService)}>
                              Refuser
                            </MDBBtn>
                          </>
                        ) : (
                          <MDBBtn color='danger' size='sm' outline onClick={()=>  handleTerminateClick(userService)}>
                            Terminer
                          </MDBBtn>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </section>
      <Modal show={showConfirmationModal} onHide={handleCancelTermination}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de terminaison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir terminer le service "{serviceToDelete?.service_name}" du client "{serviceToDelete?.client_name}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelTermination}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleConfirmTermination}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRefuseConfirmationModal} onHide={handleCancelRefusal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de refus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir refuser la demande de service "{serviceToRefuse?.service_name}" pour le client "{serviceToRefuse?.client_name}" ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelRefusal}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleConfirmRefusal}>
            Confirmer le refus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
                        }  
