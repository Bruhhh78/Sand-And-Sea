import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Helper function to handle API responses and errors
const handleResponse = (response) => {
  if (response.status >= 400) {
    throw response.data; // Throw an error for bad responses
  }
  return response.data; // Return the response data for good responses
};

// Get all properties
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresidencies", {
      timeout: 10 * 1000,
    });
    return handleResponse(response); // Handle response and check for errors
  } catch (error) {
    toast.error("Something went wrong while fetching properties");
    throw error; // Rethrow the error for further handling
  }
};

// Get a single property by ID
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    return handleResponse(response); // Handle response and check for errors
  } catch (error) {
    toast.error("Something went wrong while fetching the property");
    throw error; // Rethrow the error for further handling
  }
};

// Create a user
export const createUser = async (email) => {
  try {
    const response = await api.post(`/user/register/`, { email });
    return handleResponse(response); // Handle response and check for errors
  } catch (error) {
    toast.error("Something went wrong while creating the user, please try again");
    throw error; // Rethrow the error for further handling
  }
};
