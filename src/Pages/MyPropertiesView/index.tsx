import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { usePropertyHooks } from "../../hooks/PropertyHooks";
import PropertyCard from "../PropertiesView/card";
import { cloneDeep } from "lodash";

export default function MyPropertiesView() {
  const navigate = useNavigate();

  const currentUser = useSelector(getCurrentUser);

  const { allProperties } = usePropertyHooks();

  const propertiesList = useMemo(() => {
    return allProperties?.filter(
      (property) => property.createdBy === currentUser?.id
    );
  }, [allProperties, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col w-full h-full">
      {propertiesList && propertiesList.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-4">
          {React.Children.toArray(
            cloneDeep(propertiesList)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((data: Property, idx: number) => {
                return (
                  <PropertyCard
                    cardData={data}
                    key={idx}
                    fromProperties={false}
                  />
                );
              })
          )}
        </div>
      ) : (
        <div className="flex flex-1 w-full h-full justify-center items-center">
          No Properties!
        </div>
      )}
    </div>
  );
}
