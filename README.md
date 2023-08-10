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
