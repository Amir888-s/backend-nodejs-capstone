const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB || 'secondChanceDB';
let client;
let database;

async function connectToDatabase() {
  if (database) return database;
  client = new MongoClient(url);
  await client.connect();
  database = client.db(dbName);
  return database;
}

async function closeDatabase() {
  if (client) await client.close();
  client = undefined;
  database = undefined;
}

module.exports = { connectToDatabase, closeDatabase, ObjectId };
