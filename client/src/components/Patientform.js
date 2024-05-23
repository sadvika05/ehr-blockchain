import React, { useState } from 'react';

const PatientForm = () => {
  const [newPatient, setNewPatient] = useState({ name: '', age: '', medicalHistory: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={newPatient.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="medicalHistory"
        placeholder="Medical History"
        value={newPatient.medicalHistory}
        onChange={handleChange}
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;
