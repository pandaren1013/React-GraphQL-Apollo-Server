import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
export const GET_RECORDS = gql`
  query GetRecords {
    records {
      id
      name
      position
      level
    }
  }
  query SortRecords {
    sort_users {
      id
      name
      position
      level
    }
  }
`;
// const Sort_RECORD = gql`
//   mutation SortRecord() {
//     sortRecord(id: $id)
//   }
// `;
// Here, we display our Navbar
export default function Navbar() {
  // const { loading, error, data } = useQuery(GET_RECORDS);
  // const { loading, error, data } = useQuery(GET_RECORDS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  // const [sortRecord, { data}] = useMutation(Sort_RECORD, {
    
  //   refetchQueries: [Sort_RECORD, "SortRecords"],
  // });
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white  ">
        <NavLink className="navbar-brand" to="/">
          <img
            style={{ width: 25 + "%" }}
            src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
          ></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">aaa</span>
        </button>

        <div className="flex" id="navbarSupportedContent">
          <div>
            <NavLink className="nav-link" to="/create">
              Create Record
            </NavLink>
          </div>
          {/* <button
            className="btn btn-link"
            onClick={() => {
              sortRecord();
            }}
          >
            Sort Record
          </button> */}
        </div>
        {/* <div className="" id="navbarSupportedContent">
         <ul className="navbar-nav ml-16">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Create Record
             </NavLink>
           </li>
         </ul>
       </div> */}
      </nav>
    </div>
  );
}
