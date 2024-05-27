import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterFormInputs } from "../../types/types";
import { useCreateUserMutation } from "../../services/authApi";

export default function Registration() {
  const navigate = useNavigate();

  const [createUser] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: "onChange",
  });

  const onSubmit = (newUser: RegisterFormInputs) => {
    const newUserData = {
      ...newUser,
      username: newUser.username.toLowerCase(),
    };

    createUser(newUserData)
      .unwrap()
      .then(() => {
        navigate("/", { replace: true });
      });
  };

  return (
    <div className="h-screen flex overflow-hidden mx-auto justify-center items-center">
      <div className="w-96 mx-auto border border-gray-300 p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <span className="text-red-500">First name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="firstName" className="block font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-500">First name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-500">Last name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="contactInfo" className="block font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="contactInfo"
              {...register("contactInfo", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.contactInfo && (
              <span className="text-red-500">Phone number is required</span>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block font-semibold mb-1">
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && (
              <span className="text-red-500">Role is required</span>
            )}
          </div>
          <div>
            <label htmlFor="Password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-2 text-center">
          Have an account !{" "}
          <b
            onClick={() => {
              navigate("/");
            }}
            className="hover:underline cursor-pointer"
          >
            Sign In
          </b>
        </div>
      </div>
    </div>
  );
}
