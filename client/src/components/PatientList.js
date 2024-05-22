// src/components/PatientList.js
import React from 'react';

const PatientList = ({ patients }) => (
  <ul className="patient-list">
    {patients.map((patient, index) => (
      <li key={index}>{patient[0]} - {patient[1]} - {patient[2]}</li>
    ))}
  </ul>
);

export default PatientList;
