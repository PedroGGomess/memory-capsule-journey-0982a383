import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin, AuthenticatedRequest } from "../middleware/auth.js";

const router = Router();

// POST /api/verify  — PUBLIC: verify an access code
router.post("/verify", async (req: Request, res: Response): Promise<void> => {
  const { code } = req.body as { code?: string };

  if (!code?.trim()) {
    res.status(400).json({ error: "Access code is required" });
    return;
  }

  const trimmedCode = code.trim().toUpperCase();
  const user = await prisma.user.findUnique({ where: { accessCode: trimmedCode } });
  const allowed = !!user && user.active;

  // Record in access log
  await prisma.accessLog.create({
    data: {
      userId: user?.id ?? null,
      accessCode: trimmedCode,
      result: allowed ? "allowed" : "denied",
    },
  });

  if (allowed) {
    res.json({
      allowed: true,
      user: {
        id: user!.id,
        name: user!.name,
        email: user!.email,
        onboardingComplete: user!.onboardingComplete,
      },
    });
  } else {
    res.json({
      allowed: false,
      reason: user ? "inactive" : "not_found",
    });
  }
});

// GET /api/admin/logs  — protected: list all access logs
router.get("/admin/logs", requireAdmin, async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const logs = await prisma.accessLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 500,
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
  });

  const formatted = logs.map((l) => ({
    id: l.id,
    userId: l.userId,
    userName: l.user?.name ?? null,
    accessCode: l.accessCode,
    result: l.result as "allowed" | "denied",
    timestamp: l.timestamp.toISOString(),
  }));

  res.json(formatted);
});

// DELETE /api/admin/logs  — protected: clear all logs
router.delete("/admin/logs", requireAdmin, async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { count } = await prisma.accessLog.deleteMany();
  res.json({ message: `Cleared ${count} log records` });
});

export default router;
