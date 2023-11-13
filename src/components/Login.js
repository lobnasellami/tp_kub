import React, {useState} from 'react';
import jwtDecode from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
      e.preventDefault();
    
      // Simulate a login check (you can add your actual authentication logic here)
      const validEmail = 'riadhmadani@gmail.com';
      const validPassword = 'riadhmadani2023!';
    
      if (email === validEmail && password === validPassword) {
        // Set the token expiration to one hour from the current time
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
    
        // Create a mock JWT token (for demonstration purposes)
        const tokenPayload = { email, exp: Math.floor(expirationDate.getTime() / 1000) }; // Add the 'exp' field with expiration time (in seconds)
        const token = btoa(JSON.stringify(tokenPayload)); // Encode payload as base64 string
    
        // Save the access token to local storage
        localStorage.setItem('access_token', token);
    
        // Redirect or handle successful login as needed
        // For example, you can redirect the user to the admin dashboard
        // using window.location.href or a routing library like React Router.
        window.location.href = '/admin';
      } else {
        // Handle login failure here, show an error message, etc.
        console.log('Invalid email or password');
      }
    };
    
    

      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="card mt-5">
                <div className="card-body">
                  <h4 className="card-title text-center mb-4">Login</h4>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Log in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Login;
