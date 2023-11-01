import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { RecordObj } from "../types/user-types";


export const GET_RECORDS = gql`
  query GetRecords {
    sort_users {
      id
      name
      position
      level
    }
  }
`;
const DELETE_RECORD = gql`
  mutation DeleteRecord($id: ID!) {
    deleteRecord(id: $id)
  }
`;
// props: {
//   newmodal: boolean;
//   setNewModal: (value: boolean) => void;
//   setReload: (value: boolean) => void;
//   inputs: any;
const Record=(props: {record: RecordObj;}) => {
  // function displayError(err: any) {
// const Record = ( {record:any})=> {
  const { record} = props;

  return (
    <tr>
      <td>{record.name}</td>
      <td>{record.position}</td>
      <td>{record.level}</td>
      <td>
        <Link
          className="btn btn-link"
          to={`/edit/${record.id}`}
          state={{ record }}
        >
          Edit
        </Link>{" "}
        <DeleteRecord id={record.id} />
      </td>
    </tr>
  );
};

const DeleteRecord = ( id:any ) => {
  const [deleteRecord, { data, loading, error }] = useMutation(DELETE_RECORD, {
    variables: { id },
    refetchQueries: [GET_RECORDS, "GetRecords"],
  });

  if (loading) return "Deleting...";
  if (error) return `Delete error! ${error.message}`;

  return (
    <button
      className="btn btn-link"
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
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.sort_users.map((record:RecordObj) => (
            <Record record={record} key={record.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
