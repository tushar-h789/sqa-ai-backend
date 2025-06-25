const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPendingUser = async (name, email, password, otp, expired_at) => {
  return await prisma.pendingUser.create({
    data: { name, email, password, otp, expired_at },
  });
};

const findPendingUserByEmail = async (email) => {
  return await prisma.pendingUser.findUnique({ where: { email } });
};

const updatePendingUserOtp = async (email, otp, expired_at) => {
  return await prisma.pendingUser.update({
    where: { email },
    data: { otp, expired_at, try_count: { increment: 1 } },
  });
};

const deletePendingUser = async (email) => {
  return await prisma.pendingUser.delete({ where: { email } });
};

module.exports = {
  createPendingUser,
  findPendingUserByEmail,
  updatePendingUserOtp,
  deletePendingUser,
};
