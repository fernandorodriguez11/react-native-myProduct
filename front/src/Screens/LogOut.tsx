/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const LogOut = () => {

  const {logOut} = useContext(AuthContext);

  useEffect(() => {
    
    logOut();
    
  }, [])
  
  return (
    <>
    </>
  )
}

export default LogOut;
