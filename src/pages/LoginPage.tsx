/* eslint-disable @typescript-eslint/no-misused-promises */
import { MutableRefObject, useEffect } from "react";
import { SyntheticEvent, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/Forms/InputField";
import {Modal} from "../components/Modal";
import { useFlash } from "../data/FlashProvider";
import { useUser } from "../data/UserProvider";
import { ErrorType } from "../models/post";
import { ErrorMessage, Field, Formik , Form} from "formik";

export default function LoginPage() {
  // const [formErrors, setFormErrors] = useState<ErrorType>({});
  // const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const passRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const user = useUser()
  // const navigate = useNavigate();
  // // const flash = useFlash();
  // const location = useLocation();

  // useEffect(() => usernameRef.current?.focus(), []);

  // const onSubmit = async (ev: SyntheticEvent) => {
  //   ev.preventDefault();

  //   const username = usernameRef.current?.value;
  //   const password = passRef.current?.value;

  //   let errors: ErrorType = {} ;
  //   if (!username) {
  //     errors.username = "username field can not be empty";
  //   }
  //   if (!password) {
  //     errors.password = "password field can not be empty";
  //   }
  //   setFormErrors(errors);
  //   if (Object.keys(errors).length > 0) return;

  //   if (username && password) {

  //     const result: string = await user?.login(username, password)

  //     if (result === 'fail') {
  //       errors = {};
       
  //       // flash && flash('Invalid username or password', 'red')
  //       errors.password = "username and password dont match";
  //       setFormErrors(errors);
  //     } else if (result === 'ok') {
  //       let next = '/';
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //       if (location.state && location?.state.next) {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //         next = location.state.next as string
  //       }
  //       navigate(next)
  //     }
  //   }
  // };

  const handleSubmit = (values: any) => {
    console.log('caleed')
    return new Promise((resolve, reject) => {
       setTimeout(() => {
          resolve(alert(JSON.stringify(values, null, 2)));
          // setSubmitting(false);
         }, 400);
    })
  }

  return (
    //   <Modal xtraclass={"bg-gray-200"}>
    //     <>
    //     <h1 className="header">Login here</h1>
    //     <form onSubmit={onSubmit}>
    //     <InputField
    //       label
    //       type="text"
    //       name={"username"}
    //       fieldRef={usernameRef}
    //       errors={formErrors}
    //     />
    //     <InputField
    //       label
    //       type={"password"}
    //       name={"password"}
    //       fieldRef={passRef}
    //       errors={formErrors}
    //     />
    //     <button type={"submit"} className={"w-full mb-5 rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500"}>submit</button>
    //   </form>
    //   <hr />
    //   <p>
    //     Don&#39;t have an account? <Link to="/register" className="underline text-orange-600">Register here</Link>
    //   </p>
    //     </>
    // </Modal>
    <section>
     <h1>Login here</h1>
     <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors: {email: string, password: string} = { email: "", password: ""}
        if (!values.email) {
          errors.email = "Email cant be empty"
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >       
  {({ isSubmitting }) => (
         <Form> 
         <Field type="email" name="email" /> {/* Add 'name' attribute */}
         <ErrorMessage name="email" component="div" />
         <Field type="password" name="password" /> {/* Add 'name' attribute */}
         <ErrorMessage name="password" component="div" />
         <button type="submit" disabled={isSubmitting}>
           Submit
         </button>
       </Form>
       )}
     </Formik>
  </section>
  );
}
