// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/dashboard/api/College/')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>My Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.subdomain}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
