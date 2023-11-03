import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { RecordObj } from "../types/user-types";
import { NavLink } from "react-router-dom";

// import Pagenation from "./pagenation";

export const GET_RECORDS = gql`
  query GetRecords {
    sort_users {
      id
      name
      position
      score
      level
    }
  }
`;
const GET_MYSELF = gql`
  query user {
    user {
      email
      password
    }
  }
`;

const DELETE_RECORD = gql`
  mutation DeleteRecord11($id: ID!) {
    deleteRecord(id: $id)
  }
`;
// props: {
//   newmodal: boolean;
//   setNewModal: (value: boolean) => void;
//   setReload: (value: boolean) => void;
//   inputs: any;
const Record = (props: { record: RecordObj }) => {
  // function displayError(err: any) {
  // const Record = ( {record:any})=> {
  const { record } = props;
  const { loading, error, data } = useQuery(GET_RECORDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);
  return (
    <tr>
      <td>{record.name}</td>
      <td>{record.position}</td>
      <td>{record.score}</td>
      <td>{record.level}</td>
      <td>
        <Link to={`/edit/${record.id}`} state={{ record }}>
          <span className="bg-blue-600 px-3 py-1 rounded-md text-white  font-semibold ">
            Edit
          </span>
        </Link>{" "}
        <DeleteRecord id={record.id} />
      </td>
    </tr>
  );
};

const PAGE_RECORD = gql`
  mutation SortRecord($id: Int!) {
    sortRecord(page: $id)
  }
`;

const SortRecord = () => {
  // const { record } = props;
  const id = 0;
  const [sortRecord, { data, loading, error }] = useMutation(PAGE_RECORD, {
    variables: { id },
    refetchQueries: [GET_RECORDS, "GetRecords"],
  });
  console.log("111", typeof id);

  if (loading) return "Deleting...";
  if (error) return `Delete error! ${error.message}`;
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="px-2 font-medium">1</span>
            to
            <span className="px-2 font-medium">10</span>
            of
            <span className="px-2 font-medium">97</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <p
              onClick={() => {
                sortRecord({ variables: { id: 1 } });
              }}
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </p>
            <a
              onClick={() => {
                sortRecord({ variables: { id: 2 } });
              }}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
const DeleteRecord = ({ id }: { id: number }) => {
  const [deleteRecord, { data, loading, error }] = useMutation(DELETE_RECORD, {
    variables: { id },
    refetchQueries: [GET_RECORDS, "GetRecords"],
  });

  if (loading) return "Deleting...";
  if (error) return `Delete error! ${error.message}`;

  return (
    <button
      className="bg-red-600 px-2 py-1 rounded-md text-white font-semibold "
      onClick={() => {
        deleteRecord({ variables: { id } });
      }}
    >
      Delete
    </button>
  );
};

export default function RecordList() {
  const { loading, error, data } = useQuery(GET_RECORDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div className="flex justify-between items-baseline pt-3">
        <h3 className="text-red-700 font-bold text-3xl ">Record List</h3>
        <NavLink className="nav-link" to="/create">
          <span className="bg-green-600 font-semibold rounded-md text-xl px-2 py-1 text-white">
            Create Record
          </span>
        </NavLink>
      </div>
      <table
        className="table table-striped text-center"
        style={{ marginTop: 20 }}
      >
        <thead>
          <tr>
            <th className="font-bold text-2xl">Name</th>
            <th className="font-bold text-2xl">Position</th>
            <th className="font-bold text-2xl">Score</th>
            <th className="font-bold text-2xl">Level</th>
            <th className="font-bold text-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.sort_users.map((record: RecordObj) => (
            <Record record={record} key={record.id} />
          ))}
        </tbody>
      </table>
      <SortRecord />
    </div>
  );
}
