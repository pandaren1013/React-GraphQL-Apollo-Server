import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GET_RECORDS } from "./recordList";

const UPDATE_RECORD = gql`
  mutation UpdateRecord(
    $updateRecordId: ID!
    $position: String
    $name: String
    $score:String
    $level: String
  ) {
    updateRecord(
      id: $updateRecordId
      position: $position
      score:$score
      name: $name
      level: $level
    ) {
      name
      position
      score
      level
    }
  }
`;

export default function Edit() {
  const params = useLocation();
  const { id, name, level,score, position } = params.state.record;
  const [form, setForm] = useState({
    name,
    position,
    score,
    level,
  });
  const navigate = useNavigate();
  const [updateRecord] = useMutation(UPDATE_RECORD);

  // These methods will update the state properties.
  function updateForm(value:any) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3 className="text-red-700 font-bold text-3xl ">Update Record</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateRecord({
            variables: {
              "updateRecordId": id,
              "position": form.position,
              "score":form.score,
              "name": form.name,
              "level": form.level
            },
            refetchQueries: [GET_RECORDS, "GetRecords"],
          });
          navigate("/", { state: {} });
        }}
      >
        <div className="pt-3">
          <label className="text-xl py-2 font-semibold ">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Position: </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Score: </label>
          <input
            type="text"
            className="form-control"
            id="score"
            value={form.score}
            onChange={(e) => updateForm({ score: e.target.value })}
          />
        </div>
        <div className="text-xl py-2 font-semibold ">
          <div className="form-check form-check-inline cursor-pointer">
            <input
              className="form-check-input "
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="cursor-pointer">
              Intern
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="cursor-pointer">
              Junior
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className=" cursor-pointer">
              Senior
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="bg-green-600 p-2 font-bold text-white rounded-lg "
          />
        </div>
      </form>
    </div>
  );
}
