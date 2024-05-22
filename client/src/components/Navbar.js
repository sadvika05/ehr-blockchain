// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ account, connectToMetaMask }) => (
  <nav className="navbar">
    <h1>Blockchain EHR</h1>
    <div className="navbar-links">
      <Link to="/">Home</Link>
      <Link to="/patients">Patient Records</Link>
    </div>
    <button onClick={connectToMetaMask}>
      {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect to MetaMask'}
    </button>
  </nav>
);

export default Navbar;
