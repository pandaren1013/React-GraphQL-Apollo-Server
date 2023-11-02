import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import InputField from "../components/InputField";
import { useNavigate } from "react-router";

const ADD_ACCOUNT = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      password
    }
  }
`;
export const GET_USER = gql`
  query GetUser {
    user {
      
      email
      password
    }
  }
`;
// const Register: React.FC = () => {
export default function Register() {
  const [createUser] = useMutation(ADD_ACCOUNT);

  const [form, setForm] = useState({
    // name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value: any) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  return (
    <div className="mt-32 items-center flex flex-col">
      <div className="flex flex-col mb-16 h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
        <h4 className="items-center mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-3 ml-1 text-xl  text-gray-600">Welcome!</p>
        <div className="flex">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-md font-medium text-navy-700 dark:text-white">
            Sign Up with Google
          </h5>
        </div>
      </div>
      <form
        className="flex flex-col w-[430px] gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          createUser({
            variables: {
              // name: form.name,
              email: form.email,
              password: form.password,
            },
            refetchQueries: [GET_USER, "GetUser"],
          });

          setForm({ email: "", password: "" });
          navigate("/login");
        }}
      >
        {/* <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div> */}
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div className="flex gap-10 mr-5  justify-end mt-4">
          <div className="form-group ">
            <input
              type="submit"
              value="Sign Up"
              className="bg-red-500 py-2 px-2.5 font-bold text-white rounded-lg "
            />
          </div>
          <div className="form-group">
            <input
              type="button"
              value="Cancel"
              className="bg-red-500 px-3 py-2 font-bold text-white rounded-lg "
            />
          </div>
        </div>
      </form>
      {/* <form onSubmit={handleSubmit(handleRegister)} className="form-control">
        <input type="text" required={true} ref={emailRef} />
        <input type="password" ref={passwordRef} required={true} />
        {errors.email && <div>email is required</div>}
        {errors.password && <div>password is required</div>}
        <input type="submit" />
      </form> */}
    </div>
  );
}

// export default Register;
