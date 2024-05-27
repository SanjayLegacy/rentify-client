import { NewPropertyFormInputs } from "../types/types";
import { allApis } from "./allApis";

export const propertyApi = allApis.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation<any, NewPropertyFormInputs>({
      query: (body) => {
        return {
          url: "property/createProperty",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (_) => ["Property"],
    }),
    updateProperty: builder.mutation<
      any,
      { id: string; body: NewPropertyFormInputs }
    >({
      query: (args) => {
        const { id, body } = args;

        return {
          url: `property/updateProperty/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (_) => ["Property"],
    }),
    likeProperty: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `property/likeProperty/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (_) => ["Property"],
    }),
    deleteProperty: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `property/deleteProperty/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_) => ["Property"],
    }),
    getAllProperties: builder.query<Property[], void>({
      query: () => {
        return {
          url: "property/getAllProperties",
          method: "GET",
        };
      },
      providesTags: ["Property"],
    }),
    getPropertyById: builder.query<Property, any>({
      query: (id) => {
        return {
          url: `property/getPropertyById/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useLikePropertyMutation,
} = propertyApi;
