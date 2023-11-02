import React from "react";
// import { Menu } from 'semantic-ui-react';
import { gql, useQuery, useMutation } from "@apollo/client";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex  justify-between items-baseline  ">
        <div className="flex justify-start items-baseline">
          <NavLink className="navbar-brand" to="/">
            <img
              style={{ width: 35 + "%" }}
              src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
            ></img>
          </NavLink>

          
        </div>
        <div className="flex gap-3 justify-end">
          <NavLink className="nav-link" to="/login">
            <span className="bg-blue-600 font-semibold rounded-md text-xl px-2 py-1 text-white">
              Login
            </span>
          </NavLink>
          <NavLink className="nav-link" to="/register">
            <span className="bg-blue-600 font-semibold rounded-md text-xl px-2 py-1 text-white">
              Register
            </span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
