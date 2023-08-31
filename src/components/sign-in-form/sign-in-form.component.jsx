import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

import "./sign-in-form.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

const defaultFormFeilds = {
  email: "",
  password: "",
};

function SignInForm() {
  const dispatch = useDispatch();
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { email, password } = formFeilds;

  const resetFormFeilds = () => {
    setFormFeilds(defaultFormFeilds);
  };

  // Manage form inputs and submit
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFeilds({ ...formFeilds, [name]: value });
  };

  //managing signing in with google
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  // managing signing with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFeilds();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Wrong Password");
          break;
        case "auth/user-not-found":
          alert("No User found with this email address.");
          break;
        case "auth/network-request-failed":
          alert("Network Error! Please check you internet connection.");
          break;
        default:
          console.error(err);
      }
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={onChangeHandler}
          minLength="8"
        ></FormInput>
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={onChangeHandler}
          minLength="8"
        ></FormInput>
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
