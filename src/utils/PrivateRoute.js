import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from '../context/UserProvider';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { curUser } = useContext(UserContext);
    console.log(curUser);
    return (
        <Route
            {...rest}
            render={props => {
                return curUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    )
}