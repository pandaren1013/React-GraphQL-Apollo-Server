import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../generated/graphql";
import  RouteComponentProps  from "react-router-dom";


// export default function Admin(props: { history: any }) {
const Register: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  let navigate:NavigateFunction=useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(email, password);
        const response = await register({
          variables: {
            email,
            password,
          },
        });

        // history.push("/");
        navigate("/login");
        console.log(response);
      }}
    >
      <div>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </div>
    </form>
  );
};
export default Register;