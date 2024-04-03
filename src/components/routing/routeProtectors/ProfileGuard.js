import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

export const ProfileGuard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initiateLogin = async () => {
            let sendToLogin = false;

            setIsLoading(true);
            try {
                let accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    sendToLogin = true;
                    throw new Error("Access token not found");
                } else {
                    const response = await axiosInstance.get("/verifyAccessToken", { params: { accessToken: accessToken } });
                    if (response.data === false) {
                        let refreshToken = localStorage.getItem("refreshToken");
                        const response = await axiosInstance.get("/refreshAccessToken", { params: { refreshToken: refreshToken } });
                        console.log(response)
                        if (response.data === false) {
                            sendToLogin = true;
                            throw new Error("Refresh token not found");
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
