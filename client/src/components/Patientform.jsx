// src/components/PatientForm.jsx
import React, { useState } from 'react';
import useBlockchain from '../hooks/useBlockchain';

const PatientForm = () => {
  const { account, newPatient: blockchainPatient, setNewPatient: setBlockchainPatient, addPatient: addBlockchainPatient } = useBlockchain();
  const [newPatient, setNewPatient] = useState({ name: '', age: '', medicalHistory: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
    setBlockchainPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add patient to the blockchain
      if (account) {
        await addBlockchainPatient(blockchainPatient);
      } else {
        alert('Please connect to MetaMask.');
        return;
      }

      // Add patient to the server
      const response = await fetch('http://localhost:5000/addPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      // Reset form after successful submission
      setNewPatient({ name: '', age: '', medicalHistory: '' });
      setBlockchainPatient({ name: '', age: '', medicalHistory: '' });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newPatient.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={newPatient.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="medicalHistory"
        placeholder="Medical History"
        value={newPatient.medicalHistory}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;
