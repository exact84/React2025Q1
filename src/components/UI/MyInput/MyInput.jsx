// import { forwardRef } from "react";
import classes from "./MyInput.module.css";

const MyInput = (props, ref) => {
  return <input ref={ref} {...props} className={classes["my-input"]} />;
};

export default MyInput;
