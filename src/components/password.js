import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Link,useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
export default function Password() {
  const navigate = useNavigate();
  const {username} = useAuthStore(state => state.auth)
  console.log(username)
  const [{isLoading,apiData,serverError}]=useFetch(`/user/${username}`)
  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate,
    validateOnBlur : false,
    validateOnChange : false,
    onSubmit : async values =>{

      let loginPromise = verifyPassword({username,password : values.password})

      toast.promise(loginPromise , {
        loading :'Checking...',
        success :<b>'login succefully'</b>,
        error: <b>Password doesn't Match...!</b>, 
      });
      loginPromise.then(res=> {
        
        let {token}=res.data;
        localStorage.setItem('token',token);
        navigate('/admin');
      }).catch(error=>{
        console.log(error)
      })
    }
  })
  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    
    <MDBContainer className="my-5">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <MDBCard>
        <MDBRow className='g-5'>

          <MDBCol md='6'>
            
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Kube Kloud</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Bonjour {apiData?.firstName || apiData?.username}!</h5>
               <form onSubmit={formik.handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='password' {...formik.getFieldProps('password')} id='formControlLg' type='text' size="lg"/>

              <MDBBtn className="mb-4 px-5" color='dark' type='submit' size='lg'>Login</MDBBtn>
              </form>
             
             

           

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}
