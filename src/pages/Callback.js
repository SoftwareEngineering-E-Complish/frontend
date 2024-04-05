import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import axiosInstance from '../api/axiosInstance';

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get('code');

  const handleCallback = async (event) => {
    if (event) event.preventDefault();
    try {
      const response = await axiosInstance.get("/session", { params: { authorizationCode: authorizationCode } });
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          idToken: response.data.id_token
        }
      }));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authorizationCode) {
      handleCallback()

    }
  });

  return <div>Completing the login...</div>;
}

export default Callback;

