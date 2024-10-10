import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { toast } from "react-toastify";
import axios from "axios";

// API configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Helper function to handle API responses and errors
const handleResponse = (response) => {
  if (response.status >= 400) {
    throw response.data; // Throw an error for bad responses
  }
  return response.data; // Return the response data for good responses
};

// Function to create residency
export const createResidency = async (data, token) => {
  console.log("Data being sent:", data); // Log the data
  try {
    const response = await api.post(
      `/residency/create`,
      data, // Send the data directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return handleResponse(response); // Handle response and check for errors
  } catch (error) {
    console.error("Error creating residency:", error);
    throw error; // Propagate the error for further handling
  }
};

// Facilities component
const Facilities = ({ prevStep, propertyDetails, setPropertyDetails, setOpened, setActiveStep }) => {
  const { user } = useAuth0();
  const { userDetails: { token } } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities?.bedrooms || 0,
      parkings: propertyDetails.facilities?.parkings || 0,
      bathrooms: propertyDetails.facilities?.bathrooms || 0,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) => (value < 1 ? "Must have at least one bathroom" : null),
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    setPropertyDetails((prev) => ({
      ...prev,
      facilities: {
        bedrooms: form.values.bedrooms,
        parkings: form.values.parkings,
        bathrooms: form.values.bathrooms,
      },
    }));

    try {
      const response = await createResidency({
        data: {
          ...propertyDetails,
          facilities: {
            bedrooms: form.values.bedrooms,
            parkings: form.values.parkings,
            bathrooms: form.values.bathrooms,
          },
          userEmail: user?.email,
        },
      }, token);

      if (response.status === 201) {
        toast.success("Added Successfully", { position: "bottom-right" });
        setPropertyDetails(initialState); // Ensure initialState is defined
        setOpened(false);
        setActiveStep(0);
        refetchProperties();
      }
    } catch (error) {
      console.error("Error creating residency:", error);
      toast.error(error?.response?.data?.message || "Error occurred", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form onSubmit={handleSubmit}>
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={1}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={1}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green">
            Add Property
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
