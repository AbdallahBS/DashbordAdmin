import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Modal, Button } from 'react-bootstrap';

export default function Contact() {
  const [emails, setEmails] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    fetch("https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/getAllEmails")
      .then((response) => response.json())
      .then((data) => {
        setEmails(data.emailData);
        console.log(data);
      })
      .catch((error) => console.error("Erreur lors du chargement des emails", error));
  }, [updateTrigger]);

  const handleDeleteClick = (email) => {
    if (email) {
      fetch(`https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/delMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: email.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle success, e.g., update state
          setUpdateTrigger((prev) => !prev);
           window.open('https://mail.google.com/mail/u/0/#sent?compose', '_blank');
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  const handleRepondeClick = () => {
    // Call the handleDeleteClick function with the selected email
    handleDeleteClick(selectedEmail);
    // Additional logic for "Répondre" can be added here
    // ...

    // After handling the action, close the modal and update the state
    setSelectedEmail(null);
  };

  const openMessageModal = (email) => {
    setSelectedEmail(email);
  };

  const closeMessageModal = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="tm-section-wrap bg-white">
     <div className="col-12 tm-section-pad d-flex justify-content-center align-items-center">
  <div className="text-center">
    <h2 className="tm-text-primary mb-4">Assistance Client</h2>
    {/* Your other content goes here */}
  </div>
</div>
      <section id="clients" className="row tm-section">
        <div className="col-12 tm-section-pad">
          
          <div className="tm-flex-item-left">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Email</th>
                  <th scope="col">Objet</th>
                  <th scope="col">Message</th>
                  <th scope="col"></th>
               
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {Array.isArray(emails) &&
                  emails.map((email) => (
                    <tr key={email.id}>
                      <td>
                        <p>{new Date(email.date).toLocaleString()}</p>
                      </td>
                      <td>
                        <div className="d-flex ">
                          <p className="fw-bold">{email.email}</p>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{email.subject}</p>
                      </td>
                      <td>
                        <MDBBtn color="link" onClick={() => openMessageModal(email)}>
                          Voir le message
                        </MDBBtn>
                      </td>
                      <td>
                        {email.importance == 1 ? (
                          <MDBBadge pill bg="success" className="mt-1">
                            Important
                          </MDBBadge>
                        ) : ''}
                      </td>
                      <td>
                        {/* Remove the "Répondre" button from here */}
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </section>

      {/* Message Modal */}
      <Modal show={selectedEmail !== null} onHide={closeMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedEmail?.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeMessageModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleRepondeClick}>
            Répondre
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
