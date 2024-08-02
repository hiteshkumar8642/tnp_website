import React from 'react';
import { useLoading } from '../LoadingContext/LoadingContext';
import './Loader.css';

const Loader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div class="loader">
        <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
    </div>
    </div>
  );
};

export default Loader;
