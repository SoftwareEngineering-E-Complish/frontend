import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function RegisterPage() {
  const navigate = useNavigate(); 

  const handleRegister = (event) => {
    event.preventDefault();
    
    navigate('/login'); 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="usernameInput" className="form-label">Username</label>
                  <input type="text" className="form-control" id="usernameInput" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input type="email" className="form-control" id="emailInput" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Password</label>
                  <input type="password" className="form-control" id="passwordInput" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPasswordInput" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className="mt-4 text-center">
                Already registered? <button className="btn btn-link p-0" onClick={() => navigate('/login')}>Login here</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
