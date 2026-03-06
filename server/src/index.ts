import "dotenv/config";
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import accessRouter from "./routes/access.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Strict limit for login to prevent brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { error: "Too many login attempts — please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Moderate limit for admin API (CRUD operations)
const adminLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,
  message: { error: "Too many requests — please slow down" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public access verification terminal
const verifyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: { error: "Too many verification attempts — please try again shortly" },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? ["http://localhost:5173", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/admin/login", loginLimiter);
app.use("/api/admin/change-password", loginLimiter);
app.use("/api/admin", adminLimiter, authRouter);
app.use("/api/admin/users", adminLimiter, usersRouter);
app.use("/api/verify", verifyLimiter);
app.use("/api", accessRouter);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── 404 fallback ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🏋️  Gym Access Server running on http://localhost:${PORT}`);
  console.log(`   Database: ${process.env.DATABASE_URL ?? "(not set)"}`);
});

export default app;
