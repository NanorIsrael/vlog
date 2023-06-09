import React, { useEffect } from "react";
import { SyntheticEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Body from "../components/Body";
import InputField from "../components/Forms/InputField";
import Modal from "../components/Modal";
import { useApi } from "../data/ApiProvider";
import { ErrorType } from "../models/post";

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  // const api = useApi()

  useEffect(() => usernameRef.current?.focus(), []);

  const onSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();

    const username = usernameRef.current?.value;
    const password = passRef.current?.value;

    const errors: ErrorType = {};
    if (!username) {
      errors.username = "username field can not be empty";
    }
    if (!password || password === "") {
      errors.password = "password field can not be empty";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // const res = await api.post('/login', {username, password})
    // if (res.ok) {
    //     alert("Login success")
    // } else {
    //             console.log(`handle forms here -->`, res)

    //     setFormErrors(res.body.data)
    // }
    // console.log(`handle forms here -->`, errors.password, errors.username)
    // setError({})
  };

  return (
    <Body>
      <Modal>
      <h1 className="header">Login here</h1>
      <form onSubmit={onSubmit}>
        <InputField
          label
          name={"username"}
          fieldRef={usernameRef}
          errors={formErrors}
        />
        <InputField
          label
          type={"password"}
          name={"password"}
          fieldRef={passRef}
          errors={formErrors}
        />
        {/* <InputField label type={'password'} name={'confirm password'} fieldRef={ref} error={formErrors}/> */}
        <InputField type={"submit"} name={"submit"} errors={formErrors} />
      </form>
      <hr />
      <p>
        Don&#39;t have an account? <Link to="/register">Register here</Link>
      </p>
      </Modal>
   
    </Body>
  );
}
