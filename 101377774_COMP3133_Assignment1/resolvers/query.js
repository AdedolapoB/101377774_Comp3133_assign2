// Import the User model
const User = require('../models/user');

// Define query resolvers
const queryResolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  },
};

module.exports = queryResolvers;
