import React from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFeilds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { displayName, email, password, confirmPassword } = formFeilds;
  const dispatch = useDispatch();

  const resetFormFeilds = () => {
    setFormFeilds(defaultFormFeilds);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFeilds({ ...formFeilds, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFeilds();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={onChangeHandler}
        />

        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={onChangeHandler}
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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
          minLength="8"
        ></FormInput>

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
