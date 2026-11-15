const express = require('express');
const { connectToDatabase } = require('../models/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, condition, age, q } = req.query;
    const filter = {};
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (condition) filter.condition = { $regex: condition, $options: 'i' };
    if (age) filter.age = { $lte: Number(age) };
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    const db = await connectToDatabase();
    const items = await db.collection('secondChanceItems').find(filter).toArray();
    res.json(items);
  } catch (error) { next(error); }
});

module.exports = router;
