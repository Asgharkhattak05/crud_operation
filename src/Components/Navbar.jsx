import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Navbar>
        <ul class="flex">
          <NavLink to="/" class="flex-1 mr-2">
            <a class="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
              Home
            </a>
          </NavLink>
          <NavLink to="/read" class="flex-1 mr-2">
            <a class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4">
              Read
            </a>
          </NavLink>
          <NavLink to="/update" class="flex-1 mr-2">
            <a class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4">
              Update
            </a>
          </NavLink>
          <li class="flex-1 mr-2">
            <a class="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4">
              Delete
            </a>
          </li>
        </ul>
      </Navbar>
    </>
  );
};

export default Navbar;
