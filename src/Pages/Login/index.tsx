import { useForm } from "react-hook-form";
import { LoginFormInputs } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/authApi";
import { useMemo, useState } from "react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | undefined>();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
  });

  const [loginUser] = useLoginUserMutation();

  const isValid = useMemo(() => {
    if (watch() && watch("username")?.length && watch("password")?.length) {
      return true;
    }

    return false;
  }, [watch()]);

  const onSubmit = (data: LoginFormInputs) => {
    loginUser(data)
      .unwrap()
      .then(() => {
        setLoginError(undefined);
        navigate("/properties");
      })
      .catch((error: any) => {
        setLoginError(error.data.error);
      });
  };

  return (
    <div className="h-screen max-w-md flex overflow-hidden mx-auto justify-center items-center">
      <div className="w-96 border border-gray-400 rounded-md p-4 items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="username"
              id="username"
              {...register("username", { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <span className="text-red-500">Username is required</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
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
            onClick={() => onSubmit}
            disabled={!isValid}
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${
              !isValid &&
              "bg-blue-500/50 hover:bg-blue-500/50 cursor-not-allowed"
            }`}
          >
            Login
          </button>
          {loginError && <span className="text-red-500">{loginError}</span>}
        </form>
        <div className="mt-2 text-center">
          Don't have an account ?{" "}
          <b
            onClick={() => {
              navigate("register");
            }}
            className="hover:underline cursor-pointer"
          >
            Sign Up
          </b>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
