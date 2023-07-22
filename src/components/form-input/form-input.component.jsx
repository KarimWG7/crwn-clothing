import React from "react";
import "./form-input.styles.scss";

function FormInput({ label, ...other }) {
  return (
    <div className="group">
      <input {...other} className="form-input" />
      {label && (
        <label
          className={`${other.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;
