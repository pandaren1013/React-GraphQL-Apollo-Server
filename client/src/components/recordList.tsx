import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { RecordObj } from "../types/user-types";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

export const GET_RECORDS = gql`
  query GetRecords {
    records {
      id
      name
      position
      score
      level
    }
  }
`;

const GET_PAGES = gql`
  query GetPages($id: Int!) {
    pages(page: $id) {
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
      name
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

const Record = (props: { record: RecordObj }) => {
  const { record } = props;
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

const Pagenation = ({pagination}: { pagination: any}) => {
  const { loading, error, data } = useQuery(GET_RECORDS);
  // console.log('total',data.records.length);
  // const TotalRecords=data.records.length;
  const[pagenum,setPagenum]=useState(1);
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
            <span className="px-2 font-medium">3</span>
            of
            <span className="px-2 font-medium">99</span>
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
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <p
              onClick={() => {
                pagination(1);
                setPagenum(1);
              }}
              aria-current="page"
              className={`${pagenum===1?"bg-indigo-600":""} cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              1
            </p>
            <a
              onClick={() => {
                pagination(2);
                setPagenum(2);

              }}
              className={`${pagenum===2?"bg-indigo-600":""} cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              2
            </a>
            <a
              onClick={() => {
                pagination(3);
                setPagenum(3);
              }}
              className={`${pagenum===3?"bg-indigo-600":""} cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              onClick={() => {
                pagination(8);
                setPagenum(8);
              }}
              className={`${pagenum===8?"bg-indigo-600":""} cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              8
            </a>
            <a
              onClick={() => {
                pagination(9);
                setPagenum(9);
              }}
              className={`${pagenum===9?"bg-indigo-600":""} cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              9
            </a>
            <a
              onClick={() => {
                pagination(10);
                setPagenum(10);
              }}
              className={`${pagenum===10?"bg-indigo-600":""} cursor-pointer relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex`}
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
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
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
  const navigate = useNavigate();

  const [deleteRecord, { data, loading, error }] = useMutation(DELETE_RECORD, {
    variables: { id:1 },
    refetchQueries: [GET_PAGES, "GetPages"],
  }
 
  );
  // navigate("/");
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
  const { loading, error, data, refetch } = useQuery(GET_PAGES, {
    variables: { id: 1},
  });

  const handleRefetch = (newVal: number) => {
    console.log(newVal);
    refetch({ id: newVal});
  }
  // const sortByName = () => {
  //   const { loading, error, data, refetch } = useQuery(GET_PAGES, {
  //     variables: { id: 1},
  //     refetch: [GET_PAGES, "GetPages"],
  //   });
  // }
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div className="flex justify-between items-baseline pt-3">
        <h3 className="text-red-700 font-bold text-3xl ">Record List</h3>
        <div className="flex gap-5">
        <a target="blank" className="text-medium mt-7 block rounded-full bg-gradient-to-b from-green-700 from-60% to-green-400  py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-blue-700  hover:to-blue-400" href="/create">Create Record</a>
        <a target="blank" className="text-medium mt-7 block rounded-full bg-gradient-to-b from-green-700 from-60% to-green-400  py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-blue-700  hover:to-blue-400" href="/chart">Chart View</a>
        </div>
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
          {data?.pages.map((record: RecordObj) => (
            <Record record={record} key={record.id} />
          ))}
        </tbody>
      </table>
      <Pagenation pagination={handleRefetch}/>
    </div>
  );
}
