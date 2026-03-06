import { Router, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

// All user routes require admin auth
router.use(requireAdmin);

// Utility: generate a unique access code (XXX-XXXX-XXXX format)
async function generateUniqueCode(): Promise<string> {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  for (let attempts = 0; attempts < 20; attempts++) {
    const code = `${segment(3)}-${segment(4)}-${segment(4)}`;
    const existing = await prisma.user.findUnique({ where: { accessCode: code } });
    if (!existing) return code;
  }

  throw new Error("Failed to generate a unique access code after 20 attempts");
}

// GET /api/admin/users  — list all users
router.get("/", async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      accessCode: true,
      active: true,
      notes: true,
      onboardingComplete: true,
      createdAt: true,
    },
  });
  res.json(users);
});

// GET /api/admin/users/generate-code — generate a unique access code
router.get("/generate-code", async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const code = await generateUniqueCode();
    res.json({ code });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Could not generate code" });
  }
});

// GET /api/admin/users/:id  — get single user
router.get("/:id", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

// POST /api/admin/users  — create user
router.post("/", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, email, accessCode, notes, onboardingComplete, active } = req.body as {
    name?: string;
    email?: string;
    accessCode?: string;
    notes?: string;
    onboardingComplete?: boolean;
    active?: boolean;
  };

  if (!name?.trim()) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  let code: string;
  try {
    code = accessCode?.trim().toUpperCase() || (await generateUniqueCode());
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Could not generate code" });
    return;
  }

  // Check code uniqueness
  const existing = await prisma.user.findUnique({ where: { accessCode: code } });
  if (existing) {
    res.status(409).json({ error: "Access code already in use" });
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: email?.trim() ?? "",
      accessCode: code,
      notes: notes?.trim() ?? "",
      onboardingComplete: onboardingComplete ?? false,
      active: active ?? true,
    },
  });

  res.status(201).json(user);
});

// PATCH /api/admin/users/:id  — update user
router.patch("/:id", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, email, accessCode, notes, onboardingComplete, active } = req.body as {
    name?: string;
    email?: string;
    accessCode?: string;
    notes?: string;
    onboardingComplete?: boolean;
    active?: boolean;
  };

  const existing = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  // If changing access code, check uniqueness
  if (accessCode && accessCode.toUpperCase() !== existing.accessCode) {
    const codeConflict = await prisma.user.findUnique({
      where: { accessCode: accessCode.toUpperCase() },
    });
    if (codeConflict) {
      res.status(409).json({ error: "Access code already in use" });
      return;
    }
  }

  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      ...(name !== undefined && { name: name.trim() }),
      ...(email !== undefined && { email: email.trim() }),
      ...(accessCode !== undefined && { accessCode: accessCode.trim().toUpperCase() }),
      ...(notes !== undefined && { notes: notes.trim() }),
      ...(onboardingComplete !== undefined && { onboardingComplete }),
      ...(active !== undefined && { active }),
    },
  });

  res.json(updated);
});

// DELETE /api/admin/users/:id  — delete user
router.delete("/:id", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const existing = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ message: "User deleted successfully" });
});

export default router;
