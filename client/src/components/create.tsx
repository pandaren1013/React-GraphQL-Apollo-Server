import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { GET_RECORDS } from "./recordList";

const CREATE_RECORD = gql`
  mutation CreateRecord($name: String!, $position: String, $level: String, $score:String) {
    createRecord(name: $name, position: $position,score:$score, level: $level) {
      id
    }
  }
`;

export default function Create() {
  const [createRecord] = useMutation(CREATE_RECORD);

  const [form, setForm] = useState({
    name: "",
    position: "",
    score:"",
    level: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value:any) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3 className="text-red-700 font-bold text-3xl ">Create New Record</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRecord({
            variables: {
              name: form.name,
              position: form.position,
              score:form.score,
              level: form.level,
            },
            refetchQueries: [GET_RECORDS, "GetRecords"],
          });

          setForm({ name: "", position: "",score:"", level: "" });
          navigate("/");
        }}
      >
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Score</label>
          <input
            type="text"
            className="form-control"
            id="score"
            value={form.score}
            onChange={(e) => updateForm({ score: e.target.value })}
          />
        </div>
        <div className="text-xl py-2 font-semibold ">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">
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
            <label htmlFor="positionJunior" className="form-check-label">
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
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="bg-green-600 p-2 font-bold text-white rounded-lg "
          />
        </div>
      </form>
    </div>
  );
}
