// src/hooks/useBlockchain.jsx
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import EHRContract from '../contracts/EHR.json';

const useBlockchain = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [ehr, setEhr] = useState(null);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', medicalHistory: '' });

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      connectToMetaMask();
    } else {
      console.error('MetaMask is not installed');
    }
  }, []);

  useEffect(() => {
    if (web3) {
      loadBlockchainData();
    }
  }, [web3]);

  const loadBlockchainData = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = EHRContract.networks[networkId];
    const contract = new web3.eth.Contract(EHRContract.abi, deployedNetwork && deployedNetwork.address);
    setEhr(contract);

    const patientCount = await contract.methods.getPatientCount().call();
    const patientsArray = [];
    for (let i = 0; i < patientCount; i++) {
      const patient = await contract.methods.getPatientByIndex(i).call();
      patientsArray.push(patient);
    }
    setPatients(patientsArray);
  };

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const addPatient = async (patient) => {
    const { name, age, medicalHistory } = patient;
    await ehr.methods.addPatient(name, age, medicalHistory).send({ from: account });
    const patientData = await ehr.methods.getPatientByIndex(patients.length).call();
    setPatients([...patients, patientData]);
  };

  return { account, patients, newPatient, setNewPatient, addPatient, connectToMetaMask };
};

export default useBlockchain;
