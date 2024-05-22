// src/components/PatientForm.js
import React from 'react';

const PatientForm = ({ newPatient, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="patient-form">
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

export default PatientForm;
