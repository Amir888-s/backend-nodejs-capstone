require('dotenv').config();
const items = require('../data/items.json');
const { connectToDatabase, closeDatabase } = require('../db');

async function seed() {
  const db = await connectToDatabase();
  const collection = db.collection('secondChanceItems');
  await collection.deleteMany({});
  const result = await collection.insertMany(items);
  console.log(`Imported ${result.insertedCount} documents into secondChanceItems`);
  console.log(await collection.find({}).toArray());
  await closeDatabase();
}

seed().catch(async error => {
  console.error(error);
  await closeDatabase();
  process.exit(1);
});
