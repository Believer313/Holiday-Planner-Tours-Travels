import axios from 'axios';

// Replace with your backend URL
const BASE_URL = 'http://localhost:5000';

export const createBooking = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/bookings`, data);
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(`${BASE_URL}/api/bookings`);
  return response.data;
};
