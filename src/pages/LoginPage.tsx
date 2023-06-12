import { useEffect } from "react";
import { SyntheticEvent, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/Forms/InputField";
import Modal from "../components/Modal";
import { useFlash } from "../data/FlashProvider";
import { useUser } from "../data/UserProvider";
import { ErrorType } from "../models/post";

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const user = useUser()
  const navigate = useNavigate();
  const flash = useFlash();
  const location = useLocation();

  useEffect(() => usernameRef.current?.focus(), []);

  const onSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();

    const username = usernameRef.current?.value;
    const password = passRef.current?.value;

    const errors: ErrorType = {};
    if (!username) {
      errors.username = "username field can not be empty";
    }
    if (!password) {
      errors.password = "password field can not be empty";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    console.log(user)


    if (username && password) {

      const result: string = await user?.login(username, password)
      if (result === 'fail') {
        flash && flash('Invalid username or password', 'red')
      } else if (result === 'ok') {
        let next = '/';
        if (location.state && location?.state.next) {
          next = location.state.next
        }
        navigate(next)
      }
    }
  };

  return (
    // <Body>
      <Modal xtraclass={"bg-gray-200"}>
        <h1 className="header">Login here</h1>
        <form onSubmit={onSubmit}>
        <InputField
          label
          type="text"
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
        <button type={"submit"} className={"w-full mb-5 rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500"}>submit</button>
      </form>
      <hr />
      <p>
        Don&#39;t have an account? <Link to="/register" className="underline text-orange-600">Register here</Link>
      </p>
      </Modal>
    // </Body>
  );
}
