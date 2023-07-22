import React from "react";
import "./button.styles.scss"

const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

function Button({ children, buttonType, ...others }) {
  return (
    <button
      className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
      {...others}
    >
      {children}
    </button>
  );
}

export default Button;
