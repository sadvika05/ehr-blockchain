// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ account, connectToMetaMask }) => {
  return (
    <nav>
      <h1>EHR Blockchain</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/patients">Patient Records</Link>
      </div>
      <div>
        {account ? (
          <p>Connected: {account}</p>
        ) : (
          <button onClick={connectToMetaMask}>Connect to MetaMask</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
