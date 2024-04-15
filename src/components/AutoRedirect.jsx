import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../api/auth.api';
import Loading from './Loading';

const AutoRedirect = (p) => {
  const { children } = p;
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token) 
        .then(() => {
          setIsVerified(true);
        })
        .catch(() => {
          setIsVerified(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    // Optionally return a loading indicator while checking
    return <Loading minsize="35px"/>;
  }

  if (isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AutoRedirect;
