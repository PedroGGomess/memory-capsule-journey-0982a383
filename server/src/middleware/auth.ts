import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  console.error("❌ JWT_SECRET environment variable is not set. Refusing to start in production.");
  process.exit(1);
}

const EFFECTIVE_SECRET = JWT_SECRET ?? "gym-access-dev-secret-change-in-production";

export interface AuthenticatedRequest extends Request {
  adminUser?: { username: string };
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized — missing token" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, EFFECTIVE_SECRET) as { username: string };
    req.adminUser = payload;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized — invalid or expired token" });
  }
}

export function signAdminToken(username: string): string {
  return jwt.sign({ username }, EFFECTIVE_SECRET, { expiresIn: "12h" });
}
