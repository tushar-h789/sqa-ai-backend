const {
  findUserByEmail,
  verifyOtp,
  createUser,
} = require("../models/user.model");
const sendEmail = require("../utils/emailSender");
const generateOtp = require("../utils/generateOTP");
const bcrypt = require("bcryptjs");
const otpEmailTemplate = require("../utils/otpEmailTemplate");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await findUserByEmail(email);
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60000);

  const user = await createUser(name, email, hashedPassword, otp, otpExpiry);

  await sendEmail(email, "Verify your email", otpEmailTemplate(otp));

  res.status(201).json({
    message: "OTP sent to your email. Please verify.",
    user: { id: user.id, email: user.email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  const otp = generateOtp();
  const expiry = new Date(Date.now() + 10 * 60000); //10 minutes

  await setOtpForUser(email, otp, expiry);

  await sendEmail(email, "Your OTP Code", `<h2>Your OTP: ${otp}</h2>`);
  res.json({ message: "OTP send to your email" });
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await verifyOtp(email, otp);
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await pool.query(
    "UPDATE users SET password = $1, otp = NULL, otp_expiry = NULL WHERE email = $2",
    [hashed, email]
  );

  res.json({ message: "Password reset successfully" });
};

module.exports = { register, login, forgotPassword, resetPassword };
