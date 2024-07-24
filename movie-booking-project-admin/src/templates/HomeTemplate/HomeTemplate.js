import { Fragment } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <h1>Đây là header homepage</h1>

            <Component {...propsRoute} />

            <footer>
                Đây là footer homepage
            </footer>
        </Fragment>
    }} />
}