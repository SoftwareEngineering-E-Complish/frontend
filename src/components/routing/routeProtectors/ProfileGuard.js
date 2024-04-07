import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

export const LoggedInGuard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initiateLogin = async () => {
            let sendToLogin = false;

            setIsLoading(true);
            try {
                let accessToken = localStorage.getItem("accessToken");
                if (!accessToken || accessToken === "undefined") {
                    sendToLogin = true;
                    throw new Error("Access token not found");
                } else {
                    const response = await axiosInstance.get("/verifyAccessToken", { params: { accessToken: accessToken } });
                    if (response.data === false) {
                        let refreshToken = localStorage.getItem("refreshToken");
                        if (!refreshToken || refreshToken === "undefined") {
                            sendToLogin = true;
                        } else {
                            const response = await axiosInstance.get("/refreshAccessToken", { params: { refreshToken: refreshToken } });
                            if (response.data === false) {
                                sendToLogin = true;
                                throw new Error("Refresh token not found");
                            } else {
                                localStorage.setItem("accessToken", response.data.accessToken);
                                localStorage.setItem("refreshToken", response.data.refreshToken);
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                if (sendToLogin) {
                    const response = await axiosInstance.get("/loginURL");
                    window.location.href = response.data;
                }
            }
        };

        initiateLogin();
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return localStorage.getItem("accessToken") ? <Outlet /> : null;
};

