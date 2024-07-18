import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  resetUserReducer,
} from "../../store/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { UserRole } from "../../types/types";

export default function NavBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMyProperties = () => {
    setShowDropdown(false);
    navigate("/properties");
  };

  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(resetUserReducer());
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <nav className="bg-white border-b border-gray-300 shadow-sm shadow-gray-400">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            {/* Text */}
            <span
              className="text-lg font-semibold cursor-pointer"
              onClick={handleMyProperties}
            >
              Rentify
            </span>

            {/* Profile Name */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="uppercase rounded-full h-8 w-8 flex justify-center items-center text-md text-white p-2 bg-blue-500">
                  {currentUser?.firstName[0]}
                  {currentUser?.lastName[1]}
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </span>
                  <span className="text-sm font-medium capitalize text-neutral-400">
                    {currentUser?.role}
                  </span>
                </div>

                {!showDropdown ? (
                  <ChevronDownIcon className="h-6 w-6 text-black" />
                ) : (
                  <ChevronUpIcon className="h-6 w-6 text-black" />
                )}
              </button>
              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul>
                    {currentUser?.role === UserRole.SELLER && (
                      <li>
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            navigate("/myProperties");
                          }}
                          className="block py-2 px-4 text-sm hover:bg-gray-100 w-full text-left"
                        >
                          My Properties
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      <section className="h-screen p-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Outlet />
        </div>
      </section>
    </>
  );
}
