import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  adharNumber: {
    type: String,
    required: true,
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
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
