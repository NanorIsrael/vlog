import React, { useEffect } from "react";
import { SyntheticEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Body from "../components/Body";
import FlashMessage from "../components/FlashMessage";
import InputField from "../components/Forms/InputField";
import { useApi } from "../data/ApiProvider";
import { ErrorType } from "../models/post";

export default function RegistrationPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const conPassRef = useRef<HTMLInputElement>();
  const api = useApi();

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



    // console.log("this name", formData.get("username"))
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const confirm_pass = conPassRef.current?.value;

    const errors: ErrorType = {};
    if (!username) {
      errors.username = "username field can not be empty";
    }
    if (!password) {
      errors.password = "password field can not be empty";
    }
    if (!confirm_pass) {
      errors.conPassword = "confirm password field can not be empty";
    }
    if (!email) {
      errors.email = "confirm password field can not be empty";
    }
    if (password !== confirm_pass) {
      errors.conPassword = "passwords don't match";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const res = await api.post("/users", {
      username,
      email,
      password,
    });
    if (res.ok) {
      // alert("Registration success");
      // <FlashMessage/>
      setFormErrors({});
    } else {
      console.log(`handle forms here -->`, res);

      setFormErrors(res.body.errors.json);
    }
    // console.log(`handle forms here -->`, errors.password, errors.username)
    // setError({})
  };

  return (
    <Body>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
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
          name={"conPassword"}
          fieldRef={conPassRef}
          errors={formErrors}
        />
        <InputField type={"submit"} name={"submit"} errors={formErrors}/>
      </form>
      <hr />
      <p>
        Have an account already? <Link to="/login">Login here</Link>
      </p>
    </Body>
  );
}
