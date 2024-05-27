import { useState } from "react";
import { useGetAllPropertiesQuery } from "../services/propertyApi";

export const usePropertyHooks = () => {
  const [newPropertyForm, setNewPropertyForm] = useState(false);

  const { data: allProperties } = useGetAllPropertiesQuery();

  const handleCloseNewPropertyModal = () => {
    setNewPropertyForm(false);
  };

  return {
    allProperties,
    newPropertyForm,
    setNewPropertyForm,
    handleCloseNewPropertyModal,
  };
};
