import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

export const ProfileGuard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initiateLogin = async () => {
            setIsLoading(true);
            try {
                if (!localStorage.getItem("accessToken")) {
                    const response = await axios.get("http://localhost:8005/loginURL");
                    const loginURL = response.data;
                    window.location.href = loginURL;
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        initiateLogin();
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return localStorage.getItem("accessToken") ? <Outlet /> : null;
};
