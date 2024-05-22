import { useEffect, useState } from 'react';
import Web3 from 'web3';
import EHRContract from '../contracts/EHR.json';

const useBlockchain = () => {
  const [account, setAccount] = useState('');
  const [ehr, setEhr] = useState(null);
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', medicalHistory: '' });

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = EHRContract.networks[networkId];
      if (deployedNetwork) {
        const contract = new web3.eth.Contract(EHRContract.abi, deployedNetwork.address);
        setEhr(contract);

        // Load existing patients
        const patientCount = await contract.methods.getPatientCount().call();
        const loadedPatients = [];
        for (let i = 0; i < patientCount; i++) {
          const patient = await contract.methods.getPatientByIndex(i).call();
          loadedPatients.push(patient);
        }
        setPatients(loadedPatients);
      } else {
        console.error('Smart contract not deployed to the detected network.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  };

  const addPatient = async (patient) => {
    if (!ehr) {
      console.error('Smart contract is not loaded.');
      return;
    }

    try {
      const { name, age, medicalHistory } = patient;
      await ehr.methods.addPatient(name, age, medicalHistory).send({ from: account, gas: 3000000 });
      const patientData = await ehr.methods.getPatient(account).call();
      setPatients([...patients, patientData]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return {
    account,
    patients,
    newPatient,
    setNewPatient,
    addPatient,
  };
};

export default useBlockchain;
