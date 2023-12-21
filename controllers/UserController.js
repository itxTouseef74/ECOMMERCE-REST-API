const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'eb0642c1682b4cbdbff98bd3b071600873aef16b51741acf99e1862932be3b6c';

exports.signup = async (req, res) => {
  try {
    const { username, password , email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 9);

    const user = new User({ email , username, password: hashedPassword });
    await user.save();

    res.status(200).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.send(error).status(500);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or user does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Please enter the correct password' });
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

    res.status(200).send({ message: 'User login successfully', token });
  } catch (error) {
    res.send(error).status(401);
  }
};
