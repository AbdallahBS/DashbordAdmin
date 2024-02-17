import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';

import { registerUser } from '../helper/helper';

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'Création...',
        success: <b>Inscription réussie...!</b>,
        error: <b>Impossible de s'inscrire </b>,
      });
      registerPromise
        .then(function () {
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

 

  return (
    <MDBContainer className="my-5">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <MDBCard>
        <MDBRow className="g-5">
        <MDBCol md="6">
            <MDBCardImage src="img/bg3.jpg" alt="login form" className="rounded-start w-100 h-100" />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Kube Kloud</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Inscription{' '}
              </h5>
              <form onSubmit={formik.handleSubmit}>
  <MDBInputGroup className="mb-4">
    <MDBInput label="Prénom" {...formik.getFieldProps('firstName')} id="formControlLg" type="text" size="lg" className="mb-3" />
    <MDBInput label="Nom" {...formik.getFieldProps('lastName')} id="formControlLg" type="text" size="lg" className="mb-3" />
  </MDBInputGroup>
  <MDBInput label="Email" {...formik.getFieldProps('email')} id="formControlLg" type="text" size="lg" className="mb-3" />
  <MDBInput label="Nom d'utilisateur" {...formik.getFieldProps('username')} id="formControlLg" type="text" size="lg" className="mb-3" />
  <MDBInput label="Mot de passe" {...formik.getFieldProps('password')} id="formControlLg" type="password" size="lg" className="mb-3" />
  <MDBInput label="Numéro de téléphone" {...formik.getFieldProps('phoneNumber')} id="formControlLg" type="text" size="lg" className="mb-3" />
  <MDBBtn className="mb-4 px-5" color="dark" type="submit" size="lg">
    S'inscrire
  </MDBBtn>
</form>

              <p>
                <a className="small text-muted" href="#!">
                  Vous avez déjà un compte ?
                </a>
                <Link to="/" style={{ color: '#393f81' }}>
                  {' '}
                  Connectez-vous maintenant
                </Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
