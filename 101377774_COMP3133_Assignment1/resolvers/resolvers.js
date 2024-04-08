const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const EmployeeModel = require('../models/Employee');


// Joi schemas for validation
const userSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const employeeSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  salary: Joi.number().positive().required(),
});

const resolvers = {
  Query: {
    // ... your existing resolvers ...
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      // Validate user input
      const { error } = userSignupSchema.validate({ username, email, password });
      if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('Username or email already in use');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create and save the user
      const user = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      return user;
    },
    addNewEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      // Validate employee input
      const { error } = employeeSchema.validate({ first_name, last_name, email, gender, salary });
      if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
      }

      // Check if employee already exists
      const existingEmployee = await EmployeeModel.findOne({ email });
      if (existingEmployee) {
        throw new Error('Email already in use');
      }

      // Create and save the employee
      const newEmployee = new EmployeeModel({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });

      await newEmployee.save();
      return newEmployee;
    },
    // ... other mutations ...
  }
};

module.exports = resolvers;
