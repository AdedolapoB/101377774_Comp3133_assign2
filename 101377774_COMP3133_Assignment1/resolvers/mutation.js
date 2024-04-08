// Import the User model
const User = require('../models/user');

// Define mutation resolvers
const mutationResolvers = {
  Mutation: {
    // Add a new user
    addUser: async (_, { username, email, password }) => {
      try {
        const newUser = new User({
          username,
          email,
          password, // In a real-world app, ensure this is hashed
        });
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        throw new Error('Failed to add user');
      }
    },
  },
};

module.exports = mutationResolvers;
