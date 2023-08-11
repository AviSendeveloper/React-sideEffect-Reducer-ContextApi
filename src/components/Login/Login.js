import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
    if (action.type === "ENTERED_EMAIL") {
        return { val: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "CHECK_EMAIL") {
        return { val: state.val, isValid: state.val.includes("@") };
    }
    return { val: "", isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === "ENTERED_PASSWORD") {
        return { val: action.val, isValid: action.val.length > 6 };
    }
    if (action.type === "CHECK_PASSWORD") {
        return { val: state.val, isValid: state.val.length > 6 };
    }
    return { val: "", isValid: false };
};

const Login = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    // reducer for email
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        val: "",
        isValid: false,
    });

    // reducer for password
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        val: "",
        isValid: false,
    });

    /**
     * for first time clean up function not run
     * from the time clean up function run first then execute other code inside of useEffect function
     * Here clean up function working with principal of clouser.
     */
    useEffect(() => {
        const indentifier = setTimeout(() => {
            setFormIsValid(emailState.isValid && passwordState.isValid);
        }, 1000);
        console.log("useEffect");

        return () => {
            clearTimeout(indentifier);
        };
    }, [emailState.isValid, passwordState.isValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "ENTERED_EMAIL", val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "ENTERED_PASSWORD", val: event.target.value });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "CHECK_EMAIL" });
    };

    const validatePasswordHandler = () => {
        dispatchEmail({ type: "CHECK_PASSWORD" });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.val, passwordState.val);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.val}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.val}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
