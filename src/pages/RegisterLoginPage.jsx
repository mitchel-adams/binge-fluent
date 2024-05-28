import React, { useState } from 'react';
import axios from 'axios';

const RegisterLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const response = await axios.post(url, { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/app/home'; // Redirect to member-only home
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </button>
    </div>
  );
};

export default RegisterLoginPage;
