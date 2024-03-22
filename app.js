// backend/app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(express.json());

// Define Customer schema and model
const customerSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: {
    type: String,
    unique: true,
  },
  adharNumber: {
    type: String,
    unique: true,
    minlength: 12,
    maxlength: 12,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  assignedMobileNumber: {
    type: String,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  plan: {
    name: String,
    cost: Number,
    validity: Number,
    status: String,
  }
});

const Customer = mongoose.model('Customer', customerSchema);

// Routes

// Register New Customer
app.post('/api/customers/register', async (req, res) => {
  try {
    const { name, dob, email, adharNumber, assignedMobileNumber, plan } = req.body;
    const newCustomer = new Customer({
      name,
      dob,
      email,
      adharNumber,
      assignedMobileNumber,
      plan,
    });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Choose New Plan
app.post('/api/customers/choose-plan', async (req, res) => {
  try {
    const { customerId, plan } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { plan }, { new: true });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Renew Plan
app.post('/api/customers/renew-plan', async (req, res) => {
  try {
    const { customerId, renewalDate, planStatus } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { 'plan.renewalDate': renewalDate, 'plan.status': planStatus }, { new: true });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upgrade/Downgrade Plan
app.post('/api/customers/change-plan', async (req, res) => {
  try {
    const { customerId, newPlan } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { plan: newPlan }, { new: true });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Display Customer Table
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
