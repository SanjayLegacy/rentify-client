import { PlusIcon } from "@heroicons/react/24/solid";
import { cloneDeep } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { usePropertyHooks } from "../../hooks/PropertyHooks";
import { useCreatePropertyMutation } from "../../services/propertyApi";
import { getCurrentUser } from "../../store/reducer/userReducer";
import {
  NewPropertyFormInputs,
  OptionsType,
  UserRole,
} from "../../types/types";
import PropertyCard from "./card";

export default function PropertiesView() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPropertyFormInputs>({
    mode: "onChange",
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filterCondition, setFilterCondition] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const currentUser = useSelector(getCurrentUser);

  const [createNewProperty] = useCreatePropertyMutation();

  const {
    allProperties,
    handleCloseNewPropertyModal,
    newPropertyForm,
    setNewPropertyForm,
  } = usePropertyHooks();

  const handleNewPropertyFormSubmit = (data: NewPropertyFormInputs) => {
    createNewProperty(data)
      .unwrap()
      .then(() => {
        reset();
        setNewPropertyForm(false);
      });
  };

  const newPropertyFormStyle = `p-2 border border-gray-300 rounded-md focus:outline-none`;

  const propertiesList = useMemo(() => {
    if (searchTerm && searchTerm !== "") {
      return allProperties?.filter((property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== "" && filterCondition !== "") {
      return allProperties?.filter(
        (property) => property[filter].toLowerCase() === filterCondition
      );
    }

    if (minPrice > 0 || maxPrice > 0) {
      if (minPrice > 0 && maxPrice > 0) {
        return allProperties?.filter(
          (property) =>
            property[filter] >= minPrice && property[filter] <= maxPrice
        );
      }

      return allProperties?.filter(
        (property) =>
          property[filter] >= minPrice || property[filter] <= maxPrice
      );
    }

    return allProperties;
  }, [searchTerm, allProperties, filter, filterCondition, minPrice, maxPrice]);

  const filterOptions: OptionsType[] = [
    {
      value: "",
      label: "Select",
    },
    {
      value: "place",
      label: "Place",
    },
    {
      value: "area",
      label: "Area",
    },
    {
      value: "price",
      label: "Price",
    },
  ];

  const filterOptionsPlace = useMemo(() => {
    if (allProperties && allProperties.length > 0) {
      const options: OptionsType[] = [{ value: "", label: "Select" }];
      allProperties.forEach((property) => {
        if (
          options.filter((opt) => opt.value === property.place.toLowerCase())
            .length === 0
        ) {
          options.push({
            value: property.place.toLowerCase(),
            label: property.place,
          });
        }
      });

      return options;
    }

    return [];
  }, [allProperties]);

  const filterOptionsArea = useMemo(() => {
    if (allProperties && allProperties.length > 0) {
      const options: OptionsType[] = [{ value: "", label: "Select" }];

      allProperties.forEach((property) => {
        if (
          options.filter((opt) => opt.value === property.area.toLowerCase())
            .length === 0
        ) {
          options.push({
            value: property.area.toLowerCase(),
            label: property.area,
          });
        }
      });

      return options;
    }

    return [];
  }, [allProperties]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-between items-center mb-4 w-full">
        <div className="flex flex-row items-center gap-x-2 w-full">
          <input
            type="text"
            placeholder="Search properties here..."
            className="flex border border-gray-300 focus:outline-none px-2 py-4 rounded-md w-full max-w-[20rem]"
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-row items-center gap-x-1 min-w-fit">
            <div className="min-w-fit">Filter by</div>
            <select
              id="filter"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setFilterCondition("");
                setMinPrice(0);
                setMaxPrice(0);
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              {filterOptions.map((filter, idx) => {
                return (
                  <option key={idx} value={filter.value}>
                    {filter.label}
                  </option>
                );
              })}
            </select>

            {filter === "place" && (
              <select
                id="place"
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                {filterOptionsPlace.map((filter, idx) => {
                  return (
                    <option value={filter.value} key={idx}>
                      {filter.label}
                    </option>
                  );
                })}
              </select>
            )}

            {filter === "area" && (
              <select
                id="area"
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                {filterOptionsArea.map((filter, idx) => {
                  return (
                    <option value={filter.value} key={idx}>
                      {filter.label}
                    </option>
                  );
                })}
              </select>
            )}

            {filter === "price" && (
              <div className="flex flex-row items-center gap-x-1">
                Min
                <input
                  type="number"
                  min={0}
                  placeholder="Min.Price"
                  className={newPropertyFormStyle}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                Max
                <input
                  type="number"
                  min={0}
                  placeholder="Max.Price"
                  className={newPropertyFormStyle}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            )}
          </div>
        </div>

        {currentUser?.role === UserRole.SELLER && (
          <div className="flex flex-1 flex-row items-center justify-end gap-x-2 min-w-fit">
            <PlusIcon className="text-white h-5 w-5" />
            <button
              onClick={() => {
                setNewPropertyForm(true);
              }}
              className="bg-blue-400 text-white p-2 rounded-md"
            >
              Create new Property
            </button>
          </div>
        )}
      </div>

      {propertiesList && propertiesList.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-4">
          {React.Children.toArray(
            cloneDeep(propertiesList)
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              )
              .map((data: Property, idx: number) => {
                return (
                  <PropertyCard
                    cardData={data}
                    key={idx}
                    fromProperties={true}
                  />
                );
              })
          )}
        </div>
      ) : (
        <div className="flex flex-1 w-full h-full justify-center items-center">
          {searchTerm && searchTerm !== ""
            ? `No results found for '${searchTerm}'!`
            : "No Properties!"}
        </div>
      )}
      {newPropertyForm && (
        <Modal
          title="Add Property by filling the details"
          subtitle="Start Entering details...!"
          body={
            <form
              onSubmit={handleSubmit(handleNewPropertyFormSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Property name"
                  className={newPropertyFormStyle}
                />
                {errors.name && (
                  <span className="text-red-500">
                    Property name is required
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("place", { required: true })}
                  placeholder="Place"
                  className={newPropertyFormStyle}
                />
                {errors.place && (
                  <span className="text-red-500">Place is required</span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("area", { required: true })}
                  placeholder="Area"
                  className={newPropertyFormStyle}
                />
                {errors.area && (
                  <span className="text-red-500">Area is required</span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Address"
                  className={newPropertyFormStyle}
                />
                {errors.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </div>

              <div>
                <input
                  type="number"
                  min={0}
                  {...register("bedrooms", { required: true })}
                  placeholder="Bedrooms"
                  className={newPropertyFormStyle}
                />
                {errors.bedrooms && (
                  <span className="text-red-500">
                    Bedrooms count is required
                  </span>
                )}
              </div>

              <div>
                <input
                  type="number"
                  min={0}
                  {...register("bathrooms", { required: true })}
                  placeholder="Bathrooms"
                  className={newPropertyFormStyle}
                />
                {errors.bathrooms && (
                  <span className="text-red-500">
                    Bathrooms count is required
                  </span>
                )}
              </div>

              <div>
                <input
                  type="number"
                  min={0}
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className={newPropertyFormStyle}
                />
                {errors.price && (
                  <span className="text-red-500">Price is required</span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("amenities", { required: true })}
                  placeholder="Amenities"
                  className={newPropertyFormStyle}
                />
                {errors.amenities && (
                  <span className="text-red-500">Amenities is required</span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("nearByColleges", { required: true })}
                  placeholder="Nearby Colleges"
                  className={newPropertyFormStyle}
                />
                {errors.nearByColleges && (
                  <span className="text-red-500">
                    Near by colleges is required
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  {...register("nearByHospitals", { required: true })}
                  placeholder="Nearby Hospitals"
                  className={newPropertyFormStyle}
                />
                {errors.nearByHospitals && (
                  <span className="text-red-500">
                    Near by hospitals is required
                  </span>
                )}
              </div>

              <textarea
                {...register("description")}
                placeholder="Description"
                className={`${newPropertyFormStyle} col-span-2`}
              />

              <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white p-2 rounded"
              >
                Submit
              </button>
            </form>
          }
          footer={<></>}
          onClose={handleCloseNewPropertyModal}
        />
      )}
    </div>
  );
}
