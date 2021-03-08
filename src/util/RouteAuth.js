import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const RouteAuth = (props) => {
    const { path, children, token, location } = props;
    const pathname = location.pathname;
    // 鉴权校验
    if (token == null) {
        return (
            <Redirect to={{
                pathname: "/login",
                state: { from: pathname }
            }} />
        )
    }
    return (
        <Route path={path}>
            {children}
        </Route>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(RouteAuth);