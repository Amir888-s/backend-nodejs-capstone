const express = require('express');
const multer = require('multer');
const path = require('path');
const { connectToDatabase, ObjectId } = require('../models/db');
const authenticate = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: path.join(process.cwd(), 'uploads') });

router.get('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('secondChanceItems').find({}).toArray();
    res.json(items);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const item = await db.collection('secondChanceItems').findOne({ _id: new ObjectId(req.params.id) });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    return res.json(item);
  } catch (error) { next(error); }
});

router.post('/', authenticate, upload.single('file'), async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const item = {
      name: req.body.name,
      category: req.body.category,
      condition: req.body.condition,
      age: Number(req.body.age || 0),
      description: req.body.description || '',
      image: req.file ? req.file.filename : null,
      ownerId: req.user.id,
      createdAt: new Date()
    };
    const result = await db.collection('secondChanceItems').insertOne(item);
    return res.status(201).json({ ...item, _id: result.insertedId });
  } catch (error) { next(error); }
});

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('secondChanceItems').findOneAndUpdate(
      { _id: new ObjectId(req.params.id), ownerId: req.user.id },
      { $set: { ...req.body, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Item not found or not owned by user' });
    return res.json(result);
  } catch (error) { next(error); }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('secondChanceItems').deleteOne({
      _id: new ObjectId(req.params.id),
      ownerId: req.user.id
    });
    if (!result.deletedCount) return res.status(404).json({ error: 'Item not found or not owned by user' });
    return res.status(204).send();
  } catch (error) { next(error); }
});

module.exports = router;
