import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const { user } = useAuth0(); // Move this to the top level
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities?.bedrooms,
      parkings: propertyDetails.facilities?.parkings,
      bathrooms: propertyDetails.facilities?.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: {
          bedrooms: form.values.bedrooms,
          parkings: form.values.parkings,
          bathrooms: form.values.bathrooms,
        },
      }));
  
      try {
        const response = await createResidency(
            {
              data: {
                ...propertyDetails,
                facilities: {
                  bedrooms: form.values.bedrooms,
                  parkings: form.values.parkings,
                  bathrooms: form.values.bathrooms,
                },
                userEmail: user?.email,
              },
            },
            token
          );          
  
        if (response.status === 201) {
          toast.success("Added Successfully", { position: "bottom-right" });
          // Reset to initial state or appropriate state
          setPropertyDetails(initialState);
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
    }
  };
  

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
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
          min={0}
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
