const { StreamChat } = require("stream-chat");

// Replace with your Stream API Key
const apiKey = "3xaqyqptv4yb";  // Replace with your actual Stream API key
const client = StreamChat.getInstance(apiKey);

const generateToken = (userId) => {
  const token = client.devToken(userId); // This generates a development token for testing
  console.log(`Generated token for user ${userId}: ${token}`);
  return token;
};

// Example of generating a token for a user
const userId = "student123";  // Replace with the user ID you want to generate a token for
generateToken(userId);

