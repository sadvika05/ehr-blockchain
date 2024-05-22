// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PatientForm from './components/Patientform';
import PatientList from './components/PatientList';
import useBlockchain from './hooks/useBlockchain';
import './App.css';

function App() {
  const { account, patients, newPatient, setNewPatient, addPatient, connectToMetaMask } = useBlockchain();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPatient(newPatient);
    setNewPatient({ name: '', age: '', medicalHistory: '' });
  };

  return (
    <Router>
      <div className="app">
        <Navbar account={account} connectToMetaMask={connectToMetaMask} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/patients"
            element={
              <>
                <PatientForm newPatient={newPatient} handleChange={handleChange} handleSubmit={handleSubmit} />
                <PatientList patients={patients} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
