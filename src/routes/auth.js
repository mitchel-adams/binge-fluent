import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createAuthRoutes = (userDb) => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
      let user = await userDb.model('User', User.schema).findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new (userDb.model('User', User.schema))({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  return router;
};

export default createAuthRoutes;
