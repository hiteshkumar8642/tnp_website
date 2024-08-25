import React, { useEffect } from 'react';
import './ErrorPage.css'; // We'll handle animations in this file

const ErrorPage = () => {
  useEffect(() => {
    document.querySelector('.cont_principal').classList.add('cont_error_active');
  }, []);

  return (
    <div className="cont_principal flex justify-center items-center h-screen">
      <div className="cont_error">
        <h1 className="text-gray-600 font-light text-6xl md:text-9xl transition-all duration-500 transform -translate-x-full">Oops</h1>
        <p className="text-gray-500 font-light text-base md:text-lg tracking-widest transition-all duration-500 transform translate-x-full delay-500 mt-3">
          You are Not Verified please wait for verification...
        </p>
      </div>
      <div className="cont_aura_1 absolute bg-blue-500 shadow-2xl"></div>
      <div className="cont_aura_2 absolute bg-blue-600 shadow-lg"></div>
    </div>
  );
}

export default ErrorPage;
