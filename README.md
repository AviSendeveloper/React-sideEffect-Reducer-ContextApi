# React-sideEffect-Reducer-ContextApi

sideEffect, reducer and context-Api in react

## Side-Effect

### useEffect

```js
import React, { useState, useEffect } from "react";
...

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, []);
    ...

}
```

> **useEffect() execute first when component first render and afterward when dependency changes**

> **What will happen if we doesn't use useEffect() here?** \
> If we use only useState() then When we'll set setIsLogedIn(true), component will re-renderd and it'll fall in infinite loop, like

```js
// infinite loop with out useEffect()
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        setIsLoggedIn(true);
    }
    ...

}
```

#### use dependency

In components/Login/login.js

```js
useEffect(() => {
    setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
}, [enteredEmail, enteredPassword]);
```

#### clean-up function

In useEffect() we return clean up function with return statement

In components/Login/login.js

```js
useEffect(() => {
    const indentifier = setTimeout(() => {
        setFormIsValid(
            enteredEmail.includes("@") && enteredPassword.trim().length > 6
        );
    }, 1000);

    return () => {
        clearTimeout(indentifier);
    };
}, [enteredEmail, enteredPassword]);
```

> First time when component will render clean up function will not run. \
> From the next time when dependency will change, clean up function (return () => {}) will run first then rest of the code.

Here clean up function form a clouser, but how it's working? \
When first time useEffect run, in **indentifier** constant setTimeout id is save. Now in next time when useEffect re-executing, clean up function run first and from clouser's lexical environment (which is created in first time) it takes **indentifier**'s id and destroy them and then execute **identifier** and create new **indentifier** id and it repeating.\
**In this way only for last key stock setTimeout will be there and and only for the one time setFormIsValid() will be executed.**

---

## Reducer

```js
const [state, dispatcher] = useReducer(reduceFn, initialState, initFn);
```

**Example**

```js
const emailReducer = (state, action) => {
    if (action.type === "ENTERED_EMAIL") {
        return { val: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "CHECK_EMAIL") {
        return { val: state.val, isValid: state.val.includes("@") };
    }
    return { val: "", isValid: false };
};

// reducer format
const [emailState, dispatchEmail] = useReducer(emailReducer, {
    val: "",
    isValid: false,
});

// change state using dispatch
dispatchEmail({ type: "ENTERED_EMAIL", val: event.target.value });
```
