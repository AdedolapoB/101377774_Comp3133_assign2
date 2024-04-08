// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: String,
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);

