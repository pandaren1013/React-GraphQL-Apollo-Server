import React, { useRef, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toastNotification } from "../components/ToastNTF";
import { useMediaQuery } from "react-responsive";
const LOGIN = gql`
  mutation login($name: String, $email: String, $password: String) {
    login(name: $name, email: $email, password: $password) {
      name
      email
      password
      token
    }
  }
`;
export default function Login() {
  const [invalidForm, setInvalidForm] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const invalidNameRef = useRef(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const invalidEmailRef = useRef(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const invalidPassRef = useRef(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const isDesktop = useMediaQuery({ query: "(min-width: 1650px)" });
  const hasNumber = /\d/;
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [setLogin, { data }] = useMutation(LOGIN, {
    onCompleted() {
      toastNotification("SignIn successfully!", "success", 5000);
      localStorage.setItem("auth_token", data.login.token);
      console.log("data",data);
      navigate("/");
    },
    onError(error) {
      toastNotification(`Sign In error! ${error.message}`, 5000);
    },
  });
  useEffect(() => {
    if (!name) {
      setInvalidName(false);
    }
    if (!email&& !email.includes("@")) {
      setInvalidEmail(false);
    }
    if (password.length > 6 && hasNumber.test(password)) {
      setInvalidPass(false);
    }
    if (
      name === "" ||
      
      password.length < 7 ||
      !hasNumber.test(password)
    ) {
      setInvalidForm(true);
    } else {
      setInvalidForm(false);
    }
  }, [name,email, password]);
  const handleSubmit = () => {
    setLogin({
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
    });
  };

  return (
    <div className="mt-32 items-center flex flex-col">
      <div className="flex flex-col mb-16 h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
        <h4 className="items-center mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          SIGN IN
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
      {/*  */}
      <div
        className={`${
          isDesktop
            ? "w-[600px] h-[470px] mt-[30px] pt-[40px]"
            : "2xl:w-[500px] xl:w-[510px] lg:w-[430px] md:w-[440px] sm:w-[420px] 2xl:h-[420px] xl:h-[400px] lg:h-[380px] md:h-[380px] sm:h-[360px] w-[90%] h-[340px] 2xl:mt-[20px] lg:mt-[20px] md:mt-[20px] sm:mt-[18px] mt-[16px] 2xl:pt-[10px] xl:pt-[20px] pt-0"
        } relative`}
      >
        <div
          className="absolute w-full h-full left-0 top-0 md:rounded-[40px] sm:rounded-[30px] rounded-[20px] opacity-60 z-0 p-[3px]"
          style={{
            background:
              "linear-gradient(to bottom, #921DEE 56.25%, #2B2B2B 100%)",
            opacity: "1",
          }}
        >
          <div className="w-full h-full bg-[#1d4d21] md:rounded-[40px] sm:rounded-[30px] rounded-[20px] z-10"></div>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center 2xl:px-[57px] xl:px-[40px] md:px-[48px] sm:px-[30px] px-[20px] z-10">
          <div
            className={`${
              isDesktop
                ? "text-[32px]"
                : "xl:text-[30px] lg:text-[24px] md:text-[23px] sm:text-[22px] text-[21px]"
            } font-semibold uppercase text-white opacity-100 z-10 2xl:mb-[35px] xl:mb-[20px] lg:mb-[13px] mb-[16px]`}
          >
            login
          </div>
          {/* user name */}
          <div
            className={`${
              isDesktop
                ? "h-[55px]"
                : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
            } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
          >
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
            <input
              type="text"
              placeholder="USERNAME"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value,
                })
              }
              value={formState.name}
              required
              autoComplete="off"
              className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-white xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
            />
            <div className="absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
              <img
                alt="person"
                src="/assets/images/person.png"
                className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                width={25}
                height={25}
              />
            </div>
          </div>
          <div
            className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
            style={{
              visibility: invalidNameRef.current ? "visible" : "hidden",
            }}
          >
            Name is incorrect
          </div>
          {/* email address */}
          <div
            className={`${
              isDesktop
                ? "h-[55px]"
                : "2xl:h-[50px] xl:h-[50px] lg:h-[45px] sm:h-[46px] h-[45px]"
            } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
          >
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value,
                })
              }
              value={formState.email}
              required
              autoComplete="off"
              className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-white xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
            />
            <div className="absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
              <img
                alt="person"
                src="/assets/images/lock.png"
                className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                width={25}
                height={25}
              />
            </div>
          </div>
          <div
            className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
            style={{
              visibility: invalidEmailRef.current ? "visible" : "hidden",
            }}
          >
            Email is incorrect
          </div>
          <div
            className={`${
              isDesktop
                ? "h-[55px]"
                : "2xl:h-[50px] xl:h-[50px] lg:h-[48px] sm:h-[46px] h-[45px]"
            } w-full rounded-full relative lg:border-[3px] border-[2px] border-solid border-[#fff] border-opacity-20`}
          >
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e5e5e599] blur-[2px] z-1 opacity-[0.2]"></div>
            <input
              type="password"
              placeholder="PASSWORD"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value,
                })
              }
              value={formState.password}
              required
              autoComplete="off"
              className="absolute top-0 left-0 w-full h-full rounded-[20px] bg-transparent text-white xl:pl-[55px] lg:pl-[50px] pl-[45px] pr-[30px] z-10 placeholder:text-placehd1 outline-none"
            />
            <div className=" absolute my-auto top-0 bottom-0 flex items-center pl-[17px] z-1">
              <img
                alt="person"
                src="/assets/images/lock.png"
                className="md:w-[20px] w-[17px] md:h-[20px] h-[17px]"
                width={25}
                height={25}
              />
            </div>
          </div>
          <div
            className={`2xl:text-[14px] md:text-[13px] text-[12px] text-[#aaa] z-20 mb-[5px] text-left w-full xl:pl-[57px] lg:pl-[20px] sm:pl-[40px] pl-[30px]`}
            style={{
              visibility: invalidPassRef.current ? "visible" : "hidden",
            }}
          >
            Password is incorrect{" "}
            <span className="2xl:text-[14px] md:text-[13px] text-[12px]">
              (min 7 letters and 1 number)
            </span>
          </div>
          <div className="flex gap-10 mr-5  justify-end mt-4 z-1">
          <div className="form-group ">
            <input
              type="button"
              onClick={handleSubmit}
              value="SIGN IN"
              className="bg-green-600 py-2 px-3 font-bold text-white rounded-lg z-1"
            />
          </div>
          <div className="form-group">
            <a href={"/register"}>
            <input
              type="button"
              value="SIGN UP"
              className="bg-green-600 px-3 py-2 font-bold text-white rounded-lg "
            />
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// export default Register;
