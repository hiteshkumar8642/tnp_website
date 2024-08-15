import axios from "axios";

const unprotectedApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export default unprotectedApiClient;
