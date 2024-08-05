

import axios from 'axios';


export async function fetchForgetPassword(email) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/api/password_reset/', { email });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch forget Password', error);
      throw error;
    }
  }
