const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ehr', { useNewUrlParser: true, useUnifiedTopology: true });

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  medicalHistory: String,
});

const Patient = mongoose.model('Patients', patientSchema);

app.post('/addPatient', async (req, res) => {
  try {
    const { name, age, medicalHistory } = req.body;
    const newPatient = new Patient({ name, age, medicalHistory });
    await newPatient.save();
    res.json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add patient', error: error.message });
  }
});

app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch patients', error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
