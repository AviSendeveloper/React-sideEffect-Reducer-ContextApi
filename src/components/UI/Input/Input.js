import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ""
            }`}
        >
            <label htmlFor="email">{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
};

export default Input;
