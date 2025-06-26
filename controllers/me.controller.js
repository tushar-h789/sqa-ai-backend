const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getMe = async (req, res) => {
  try {
    // req.user is set by validateToken middleware
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: "User not found." });
    // Only return safe fields
    const { password, otp, otp_expiry, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user info.", error: error.message });
  }
};

module.exports = { getMe };
