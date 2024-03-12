import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation (use useNavigate for React Router v6)

function LoginPage() {
  const navigate = useNavigate(); // Instantiate the useHistory hook

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/properties');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="usernameInput" className="form-label">Username</label>
                  <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" required />
                  
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Password</label>
                  <input type="password" className="form-control" id="passwordInput" required />
                </div>
                <button type="submit" className="btn btn-primary w-100" onClick = {handleLogin}>Log in</button>
              </form>
              <div className="mt-4 text-center">
            Not yet registered? <button className="btn btn-link p-0" onClick={handleRegisterRedirect}>Sign up here</button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
