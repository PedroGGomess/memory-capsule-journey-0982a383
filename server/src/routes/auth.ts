import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { requireAdmin, signAdminToken, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

// POST /api/admin/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const creds = await prisma.adminCredentials.findUnique({ where: { username } });
  if (!creds) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, creds.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signAdminToken(username);
  res.json({ token, username });
});

// POST /api/admin/change-password  (protected)
router.post(
  "/change-password",
  requireAdmin,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: "Both currentPassword and newPassword are required" });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ error: "New password must be at least 6 characters" });
      return;
    }

    const username = req.adminUser!.username;
    const creds = await prisma.adminCredentials.findUnique({ where: { username } });
    if (!creds) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    const valid = await bcrypt.compare(currentPassword, creds.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.adminCredentials.update({
      where: { username },
      data: { passwordHash },
    });

    res.json({ message: "Password updated successfully" });
  }
);

export default router;
