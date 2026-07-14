require("dotenv").config();

const { MongoClient } = require("mongodb");

async function testConnection() {
  try {
    console.log("URI:", process.env.MONGO_URI.replace(/:\/\/.*:/, "://****:"));

    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    console.log("✅ MongoDB Connected Successfully!");

    await client.close();
  } catch (err) {
    console.error("❌ Connection Error:");
    console.error(err);
  }
}

testConnection();