const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/ehr');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  medicalHistory: String,
});

const Patient = mongoose.model('Patients', patientSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login request received:', req.body); // Log request body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Log error
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
});

app.post('/addPatient', async (req, res) => {
  try {
    const { name, age, medicalHistory } = req.body;
    
    // Assuming you have successfully interacted with your smart contract using MetaMask
    // and received confirmation of the transaction
    
    // Create a new patient object using the extracted data
    const newPatient = new Patient({ name, age, medicalHistory });
    
    // Save the new patient to MongoDB
    await newPatient.save();

    // Log the new patient object to verify if it's created successfully
    console.log('New patient created:', newPatient);
    
    // Return the added patient data in the response
    res.status(201).json(newPatient);
  } catch (error) {
    // If any error occurs, handle it and send an appropriate error response
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
