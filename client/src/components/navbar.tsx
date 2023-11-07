import React from "react";
import { useNavigate } from "react-router";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("auth_token");
  return (
    <div>
      <nav className="flex  justify-between items-baseline  ">
        <div className="flex justify-start items-baseline">
          <NavLink className="navbar-brand" to="/">
            <div className="flex items-center">
            <img
              style={{ width: 20 + "%" }}
              src="/assets/images/logo.svg"
            ></img>
            <span className="text-pink-500 text-3xl font-bold">GraphQL</span>
            
            </div>
          </NavLink>
        </div>
       
        {authToken ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("auth_token", "");

                navigate("/login", { state: {} });
              }}
            >
              <span className="text-medium mt-7 block rounded-full bg-gradient-to-b from-green-700 from-60% to-green-400  py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-blue-700  hover:to-blue-400">
                Logout
              </span>
            </button>
          </>
        ) : (
          <button>
          </button>
        )}
      </nav>
    </div>
  );
}
