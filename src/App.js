 import React from 'react';
 import { createBrowserRouter,RouterProvider } from 'react-router-dom';
 import Username from './components/username';
 import Password from './components/password';
 import Dashbord from './components/dashbord';
 import Dashbordc from './client/dashbord';
 import Register from './components/register';
 //**auth midelware */
 import { AuthorizeUser, ProtectRoute } from './midlware/auth';
/**root routes */
 const router = createBrowserRouter([
  { 
    path : '/',
    element  : <Username></Username>
  },
  {
    path : '/register',
    element  : <Register></Register>
  },
  {
    path : '/client',
    element  : <Dashbordc></Dashbordc>
  },
  
  {
    path : '/admin',
    element  : <AuthorizeUser><Dashbord/></AuthorizeUser>
  },
  {
    path : '/password',
    element  : <ProtectRoute><Password/></ProtectRoute>
  },

 ])
function App() {
  return (
   <main>
    <RouterProvider router={router}></RouterProvider>
   </main>
  );
}

export default App;