import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  // Function to get all favourites
  const getAllFav = async (email, token) => {
    console.log("Bearer_token: " + token);
    if (!token || !email) return;

    try {
      const res = await api.get(
        `/user/allFavs`, // Adjusted API route
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            email, // Pass email as a query parameter
          },
        }
      );
      return res.data.favResidenciesID; // Adjusted response handling
    } catch (e) {
      toast.error("Something went wrong while fetching favourites");
      throw e;
    }
  };

  // Use react-query to fetch data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", user?.email],
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: Boolean(user && userDetails?.token), // Only enable when user and token are available
    staleTime: 30000, // Data is considered fresh for 30 seconds
  });

  // Store the refetch function to trigger it when necessary
  queryRef.current = refetch;

  // Refetch favourites when token changes
  useEffect(() => {
    if (userDetails?.token) {
      queryRef.current && queryRef.current();
    }
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
