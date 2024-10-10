import axios from "axios";
import dayjs from "dayjs";
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

// Function to create a user
export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// Function to Book a visit
export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookvisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// Function to cancel a Booking
export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/cancelbooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Someting went wrong, please try Again");
    throw error;
  }
};

//function to add to favourites (toFav)

export const toFav = async(rid,email,token)=>{
  try{
    await api.post(
      `/user/toFav/${rid}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }catch(error){
    toast.error("Someting went wrong, please try Again");
    throw error;
  }
}

export const createResidency = async (data, token) => {
  console.log("Data being sent:", data); // Log the data
  try {
    const res = await api.post(
      `/residency/create`,
      data, // Send the data directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; // Ensure to return the response data if needed
  } catch (error) {
    console.error("Error creating residency:", error);
    throw error;
  }
};
