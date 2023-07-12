/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { MutableRefObject, useEffect } from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Body from "../components/Body";
import FlashMessage from "../components/FlashMessage";
import InputField from "../components/Forms/InputField";
import { useApi } from "../data/ApiProvider";
import FlashProvider, { useFlash } from "../data/FlashProvider";
import { AuthFormType, ErrorType } from "../models/post";

 function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({} as ErrorType);
  const [toggleBtn, setToggleBtn] = useState(true);
  const navigate = useNavigate();
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passRef = useRef() as MutableRefObject<HTMLInputElement>;
  const conPassRef = useRef() as MutableRefObject<HTMLInputElement>;
  const api = useApi();
  const flashMessage = useFlash();

  useEffect(() => usernameRef.current?.focus(), []);

  
  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // console.log("this event" , ev.target)
    // const formData = new FormData(ev.target as HTMLFormElement)
    // formData.
    // const target = ev.currentTarget;
    // const formData = new FormData(target);
    //   // Rest of your code using formData
    //   console.log("this name", ev.currentTarget, formData.get("username"))


    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const confirm_pass = conPassRef.current?.value;
  
    // console.log("this name", formData.get("username"))
    
    const errors: ErrorType = {};
    if (!username) {
      errors.username = "username field can not be empty";
    }
    if (!password) {
      errors.password = "password field can not be empty";
    }
    if (!confirm_pass) {
      errors['confirm password']= "confirm password field can not be empty";
    }
    if (!email) {
      errors.email = "email field can not be empty";
    }
    if (password !== confirm_pass) {
      console.log("hey password dont match")
      errors['confirm password'] = "passwords don't match";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const res = await api.post<AuthFormType, {ok: string, errors?: ErrorType}>("/users", {
      username,
      email,
      password,
    });
    if (res.ok) {
      flashMessage && flashMessage("Registration successfull!", "green");
      setFormErrors({});
      navigate('/login');
    } else {
      if (res.body?.errors) {
        setFormErrors(res.body?.errors) ;
      }
    }
  };

  return (
    <Body>
      <section className="my-0 mx-auto w-11/12 flex flex-col justify-center items-center">
      <h1 className="">Register</h1>
      <form onSubmit={onSubmit} className="mb-5 p-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center">
        <InputField
          label
          name={"username"}
          fieldRef={usernameRef}
          errors={formErrors}
        />
        <InputField
          label
          type={"email"}
          name={"email"}
          fieldRef={emailRef}
          errors={formErrors}
        />
        <InputField
          label
          type={"password"}
          name={"password"}
          fieldRef={passRef}
          errors={formErrors}
        />
        <InputField
          label
          type={"password"}
          name={"confirm password"}
          fieldRef={conPassRef}
          errors={formErrors}
        />
        <button type={"submit"}
        className={"rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500"}
         >
           submit
           </button>
      </form>
      <hr />
      <p className={'mb-20'}>
        Have an account already? <Link to="/login" className={"underline text-orange-500"}>Login here</Link>
      </p>
      </section>
    </Body>
  );
}

export default function RegistrationPageWithFlash() {
 return ( 
    <FlashProvider>
      <FlashMessage/>
      <RegistrationPage/>
    </FlashProvider>
 )
}

