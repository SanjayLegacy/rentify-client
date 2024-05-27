import { LoginFormInputs, RegisterFormInputs } from "../types/types";
import { allApis } from "./allApis";

export const authApi = allApis.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<any, LoginFormInputs>({
      query: (body) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
    }),
    createUser: builder.mutation<any, RegisterFormInputs>({
      query: (body) => {
        return {
          url: "auth/register",
          method: "POST",
          body,
        };
      },
    }),
    updateUser: builder.mutation<any, { id: string; body: RegisterFormInputs }>(
      {
        query: (args) => {
          const { id, body } = args;

          return {
            url: `auth/update/${id}`,
            method: "PUT",
            body,
          };
        },
      }
    ),
    getUserById: builder.query<User, string>({
      query: (id) => {
        return {
          url: `auth/getUserById/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = authApi;
