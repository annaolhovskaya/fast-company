import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ component: Component, children, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                const { userId, edit } = props.match.params;

                if (edit && userId !== currentUser._id) {
                    return (
                        <Redirect
                            to={{
                                pathname: `/users/${currentUser._id}/edit`,
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }

                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }

                return Component ? <Component {...props} /> : children;
            }}
        />
    );
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    match: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
