import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";


const ADD_ACCOUNT = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;
const GET_ACCOUNTS = gql`
  query GetUsers {
    users {
      email
      password
    }
  }
`;
const LOGIN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;
export default function Login() {
  const [setLogin,{ data, loading, error }] = useMutation(LOGIN);
  if (loading) return "Loding...";
  if (error) return `Login error! ${error.message}`;
  const [form, setForm] = useState({
    // name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLogin = () => {
    setLogin({
      variables: {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      },
    });
    navigate("/");
  };


  function updateForm(value: any) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <div className="mt-32 items-center flex flex-col">
      <div className="flex flex-col mb-16 h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
        <h4 className="items-center mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-3 ml-1 text-xl  text-gray-600">Welcome!</p>
        <div className="flex">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-md font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
      </div>
      <form
        className="flex flex-col w-[430px] gap-4"
        onSubmit={handleSubmit(handleLogin)}
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
            className="form-control"
            ref={emailRef} required={true}
          />
        </div>
        <div className="form-group">
          <label className="text-xl py-2 font-semibold ">Password</label>
          <input
            className="form-control"
            ref={passwordRef} required={true}
          />
        </div>
        {errors.email && <div>email is required</div>}
        {errors.password && <div>password is required</div>}
        <div className="flex gap-10 mr-5  justify-end mt-4">
          <div className="form-group ">
            <input
              type="submit"
              value="Sign In"
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
        <div>
          If you dont have account click there
          <button onClick={() => navigate("/register")} />
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
