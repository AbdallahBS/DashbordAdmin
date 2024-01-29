import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function Contact() {
  const [emails, setEmails] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);


  useEffect(() => {
    // Fetch data from your API
    fetch("https://teal-basbousa-aada12.netlify.app/.netlify/functions/api/getAllEmails")
      .then((response) => response.json())
      .then((data) => {
        setEmails(data.emailData);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching Emails", error));
  }, [updateTrigger]);
  const handleDeleteClick = (email)=>{
    
    if(email){
      fetch(`https://teal-basbousa-aada12.netlify.app/.netlify/functions/api/delMail`, {
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
          // Handle success, e.g., update state, close modal
          setUpdateTrigger((prev) => !prev);
       //   window.open('https://mail.google.com/mail/u/0/#sent?compose', '_blank');
        })
        .catch((error) => {
          // Handle error
          
        });
    }
  }
  return (
    <div className="tm-section-wrap bg-white">
      <section id="clients" className="row tm-section">
        <div className="col-12 tm-section-pad">
          <div className="tm-flex-item-left">
            <MDBTable align='middle'>
              <MDBTableHead>
                <tr>
                  <th scope='col'>Email</th>
                  <th scope='col'>Objet</th>
                  <th scope='col'>Message</th>
                  <th scope='col'>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {Array.isArray(emails) &&
                  emails.map((email) => (
                    <tr key={email.id}>
                      <td>
                        <div className='d-flex '>
                          <p>{email.time}</p>
                          <div className=''>
                            <p className='fw-bold'>{email.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{email.subject}</p>
                       
                      </td>
                      <td>
                        <textarea style={{ border: 'none', outline: 'none' }}>{email.text}</textarea>
                      </td>
                      
                      <td>
                        <MDBBtn color='link' rounded size='sm'
                        onClick = {()=> handleDeleteClick(email)}>
                          Repondre
                        </MDBBtn>
                        
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
           
          </div>
        </div>
      </section>
    </div>
  );
}
