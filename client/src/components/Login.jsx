// src/components/Login.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import AuthContext from '../context/AuthContext'; // Import AuthContext correctly

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAuthState({ token: response.data.token, user: formData.username });
      
      // Redirect to the /patients page after successful login
      navigate('/patients');
    } catch (error) {
      console.error('Failed to login: ', error.response?.data || error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
