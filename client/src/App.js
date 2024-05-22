import React from 'react';
import useBlockchain from './hooks/useBlockchain';

function App() {
  const { account, patients, newPatient, setNewPatient, addPatient } = useBlockchain();

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
    <div>
      <h1>Electronic Health Records on Blockchain</h1>
      <p>Account: {account}</p>
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
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>{patient[0]} - {patient[1]} - {patient[2]}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
