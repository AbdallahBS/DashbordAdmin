import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });
export default function Contact() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendClick = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { email, userid } = decodedToken;
    const userId=  userid
    console.log("this is the data from decoded token", email,userId);
    const text = message;
    try {
      await fetch('https://jovial-taffy-bc3db5.netlify.app/.netlify/functions/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          text,
          email,
          userId,
        }),
      }).then((response) => {
        if (response.ok) {
          // API call was successful
          setSuccessMessage('Votre message a été envoyé avec succès.');
          // Clear input fields
          setSubject('');
          setMessage('');
        } else {
          // Handle error responses from the server
          console.error('Error sending email');
        }
      });
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  };

  return (
    <div className="tm-section-wrap bg-white">
     
      <section id="contact" className="row tm-section">
      <h2 className="text-uppercase mb-5 tm-color-primary ">Support et contact </h2>
        <form>
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="text"
              id="form4Example2"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label className="form-label" htmlFor="form4Example2">
              Sujet
            </label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <textarea
              className="form-control"
              id="form4Example3"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <label className="form-label" htmlFor="form4Example3">
              Message
            </label>
          </div>

          <button
            data-mdb-ripple-init
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={handleSendClick}
          >
            Envoyer
          </button>

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
