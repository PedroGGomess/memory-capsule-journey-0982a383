import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed default admin credentials (admin / admin123)
  const existing = await prisma.adminCredentials.findUnique({
    where: { username: "admin" },
  });

  if (!existing) {
    const passwordHash = await bcrypt.hash("admin123", 12);
    await prisma.adminCredentials.create({
      data: { username: "admin", passwordHash },
    });
    console.log("✅ Admin credentials seeded: admin / admin123");
  } else {
    console.log("ℹ️  Admin credentials already exist, skipping seed.");
  }

  // Seed a demo member so the system has something to show
  const demoCode = "DEMO-XMPL-0001";
  const demoExists = await prisma.user.findUnique({
    where: { accessCode: demoCode },
  });
  if (!demoExists) {
    await prisma.user.create({
      data: {
        name: "Demo Member",
        email: "demo@example.com",
        accessCode: demoCode,
        active: true,
        onboardingComplete: true,
        notes: "Seeded demo account — feel free to delete",
      },
    });
    console.log(`✅ Demo member created with code: ${demoCode}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
