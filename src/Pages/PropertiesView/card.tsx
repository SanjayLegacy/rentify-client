import { useState } from "react";
import Modal from "../../components/Modal";
import { HeartIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useGetUserByIdQuery } from "../../services/authApi";
import {
  useDeletePropertyMutation,
  useLikePropertyMutation,
  useUpdatePropertyMutation,
} from "../../services/propertyApi";
import { dateTimeFormat } from "../../utils/dateTimeFormat";
import { NewPropertyFormInputs } from "../../types/types";
import { useForm } from "react-hook-form";

interface PropertyCardProps {
  cardData: Property;
  fromProperties: boolean;
}
export default function PropertyCard(props: PropertyCardProps) {
  const { cardData, fromProperties } = props;

  const newPropertyFormStyle = `p-2 border border-gray-300 rounded-md focus:outline-none`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPropertyFormInputs>({
    mode: "onChange",
    defaultValues: cardData,
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);

  const { data: sellerData } = useGetUserByIdQuery(cardData.createdBy);
  const [likeProperty] = useLikePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();

  const toggleLike = () => {
    likeProperty(cardData.id).unwrap();
  };

  const handleUpdatePropertyFormSubmit = (data: NewPropertyFormInputs) => {
    updateProperty({ id: cardData.id, body: data })
      .unwrap()
      .then(() => {
        reset();
        setShowFormModal(false);
      });
  };

  const handleCloseInterestModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img
          className="rounded-t-lg"
          src="https://img.freepik.com/free-vector/inside-nice-home-isometric-style_23-2147602850.jpg?size=626&ext=jpg"
          alt=""
        />
        <div className="p-5 w-full">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {cardData.name}
          </h5>

          <div className="grid grid-cols-2 gap-2">
            <div>Place</div>
            <div>{cardData.place}</div>

            <div>Area</div>
            <div>{cardData.area}</div>

            <div>Address</div>
            <div>{cardData.address}</div>

            <div>Bedrooms</div>
            <div>{cardData.bedrooms}</div>

            <div>Bathrooms</div>
            <div>{cardData.bathrooms}</div>

            <div>Amenities</div>
            <div>{cardData.amenities}</div>

            <div>Near by college(s)</div>
            <div>{cardData.nearByColleges}</div>

            <div>Near by hospital(s)</div>
            <div>{cardData.nearByHospitals}</div>

            <div>Price</div>
            <div>{cardData.price} /-</div>
          </div>
          <div className="mb-3 font-normal text-gray-700 mt-4 break-all">
            {cardData.description}
          </div>
          <div className="mb-3 font-normal text-gray-700 break-all">
            Posted at {dateTimeFormat(cardData.createdAt)}
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-x-1">
              <HeartIcon
                className={`h-6 w-6 cursor-pointer ${
                  cardData.likes > 0 ? "text-red-500" : "text-gray-500"
                }`}
                onClick={() => toggleLike()}
              />

              {cardData.likes}
            </div>

            {fromProperties ? (
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                I'm interested
              </button>
            ) : (
              <div className="flex flex-row items-center gap-x-2">
                <PencilIcon
                  className="w-6 h-6 p-0.5 border rounded-md border-black cursor-pointer"
                  onClick={() => setShowFormModal(true)}
                />
                <TrashIcon
                  className="w-6 h-6 p-0.5 border rounded-md border-red-500 text-red-500 cursor-pointer"
                  onClick={() => deleteProperty(cardData.id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          title="Seller information"
          body={
            <>
              <div>
                Seller Name :{" "}
                <b>
                  {sellerData?.firstName} {sellerData?.lastName}
                </b>
              </div>
              <div>
                Contact Info :<b> {sellerData?.contactInfo} </b>
              </div>
            </>
          }
          footer={<></>}
          onClose={handleCloseInterestModal}
        />
      )}

      {showFormModal && (
        <Modal
          title="Add Property by filling the details"
          subtitle="Start Entering details...!"
          body={
            <form
              onSubmit={handleSubmit(handleUpdatePropertyFormSubmit)}
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
          onClose={() => setShowFormModal(false)}
        />
      )}
    </>
  );
}
