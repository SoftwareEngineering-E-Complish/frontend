import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get('code');

  const handleCallback = async (event) => {
    if(event) event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8005/session",{params: { authorizationCode: authorizationCode}});
      console.log("Access Token: " + response.data.access_token);
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("idToken", response.data.id_token);

      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: {
          accessToken: response.data.access_token,
          idToken: response.data.id_token
        }
      }));
  
      navigate("/");
      } catch(error){
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
