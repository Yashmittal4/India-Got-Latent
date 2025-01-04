const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const User = require('../models/User');
const config = require('../config');

const otpStorage = {};

const transporter = nodemailer.createTransport(config.emailConfig);

function generateOTP() {
  return randomstring.generate({ length: 6, charset: 'numeric' });
}

async function sendOTP(email, otp) {
  const mailOptions = {
    from: config.emailConfig.auth.user,
    to: email,
    subject: 'OTP for Account Verification',
    text: `Your OTP is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const otp = generateOTP();
    otpStorage[email] = otp;
    await sendOTP(email, otp);

    res.status(201).json({ message: 'User created. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (otpStorage[email] === otp) {
    await User.findOneAndUpdate({ email }, { isVerified: true });
    delete otpStorage[email];
    res.json({ message: 'Email verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

