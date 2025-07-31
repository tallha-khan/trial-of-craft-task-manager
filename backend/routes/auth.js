const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');



router.post('/signup', signup);
router.post('/login', login);

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
});

module.exports = router;
