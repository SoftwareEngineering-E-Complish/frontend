import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

export const ProfileGuard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initiateLogin = async () => {
            const sendToLogin = false;

            setIsLoading(true);
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    sendToLogin = true;
                } else {
                    const response = await axios.get("http://localhost:8005/verifyAccessToken", { params: { accessToken: accessToken } });
                    if (response.data === false) {
                        sendToLogin = true;
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                if (sendToLogin) {
                    const response = await axios.get("http://localhost:8005/loginURL");
                    const loginURL = response.data;
                    window.location.href = loginURL;
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
