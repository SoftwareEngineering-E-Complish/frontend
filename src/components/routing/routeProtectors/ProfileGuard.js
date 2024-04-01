import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

export const ProfileGuard = () => {
    if (localStorage.getItem("accessToken")) {

        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

ProfileGuard.propTypes = {
    children: PropTypes.node
}