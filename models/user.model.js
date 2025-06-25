const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const createUser = async (name, email, hashedPassword, otp, otp_expiry) => {
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, otp, otp_expiry },
  });
};

const sendOtpForUser = async (email, otp, expiry) => {
  return await prisma.user.update({
    where: { email },
    data: { otp, otp_expiry: expiry },
  });
};

const verifyOtp = async (email, otp) => {
  return await prisma.user.findFirst({
    where: {
      email,
      otp,
      otp_expiry: { gt: new Date() },
    },
  });
};

module.exports = { findUserByEmail, createUser, sendOtpForUser, verifyOtp };
