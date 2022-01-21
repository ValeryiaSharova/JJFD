import React, { useState } from "react";

const withAuth = (Component) => (props) => {
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem("user") !== "false"
    );

    const onLogin = () => {
        localStorage.setItem("user", true);
        setIsAuth(true);
    };

    const onLogOut = () => {
        localStorage.setItem("user", false);
        setIsAuth(false);
    };

    return (
        <Component
            {...props}
            isAuth={isAuth}
            onLogin={onLogin}
            onLogOut={onLogOut}
        />
    );
};

export default withAuth;
