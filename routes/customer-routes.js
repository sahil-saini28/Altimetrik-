import { Router } from 'express';
import Customer from '../models/customer-model';

const router = Router();

// POST /api/customers/register
router.post('/register', async (req, res) => {
  try {
    const { name, dob, email, adharNumber, assignedMobileNumber } = req.body;
    
    // Validate input data (you can add validation here)

    const newCustomer = new Customer({
      name,
      dob,
      email,
      adharNumber,
      assignedMobileNumber,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }); // Generic error message, can be customized
  }
});

export default router;
