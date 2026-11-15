const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../models/db');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    const db = await connectToDatabase();
    const users = db.collection('users');
    if (await users.findOne({ email: email.toLowerCase() })) {
      return res.status(409).json({ error: 'Email is already in use' });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await users.insertOne({
      firstName, lastName, email: email.toLowerCase(), passwordHash, createdAt: new Date()
    });
    return res.status(201).json({ id: result.insertedId, email: email.toLowerCase() });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: String(req.body.email).toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const authtoken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || 'development-secret',
      { expiresIn: '2h' }
    );
    return res.status(200).json({ authtoken, userName: user.firstName, userEmail: user.email });
  } catch (error) { next(error); }
});

router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('users').findOneAndUpdate(
      { email: req.user.email },
      { $set: { firstName: req.body.firstName, lastName: req.body.lastName, updatedAt: new Date() } },
      { returnDocument: 'after', projection: { passwordHash: 0 } }
    );
    return res.json(result);
  } catch (error) { next(error); }
});

module.exports = router;
