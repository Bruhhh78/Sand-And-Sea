import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { api } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  // Function to get all bookings
  const getAllBooks = async (email, token) => {
    // console.log("Bearer_token_from_useBookings: " + token); //log to check bearer token
    if (!token || !email) return;

    try {
      const res = await api.get(
        `/user/allBookings`, // Adjusted API route
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            email, // Pass email as a query parameter
          },
        }
      );
      return res.data.bookedVisits; // Return the fetched bookings
    } catch (e) {
      toast.error("Something went wrong while fetching Bookings");
      console.error("Error fetching bookings: ", e.response?.data || e.message);
      throw e;
    }
  };

  // Use react-query to fetch data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allBookings", user?.email],
    queryFn: () => getAllBooks(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, bookings: data })), // Update 'bookings' in userDetails context
    enabled: Boolean(user && userDetails?.token), // Only enable when user and token are available
    staleTime: 30000, // Data is considered fresh for 30 seconds
  });

  // Store the refetch function to trigger it when necessary
  queryRef.current = refetch;

  // Refetch bookings when token changes
  useEffect(() => {
    if (userDetails?.token) {
      queryRef.current && queryRef.current();
    }
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
