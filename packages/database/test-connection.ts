import { prisma } from "./src/prisma";

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    const users = await prisma.user.findMany();
    console.log("✅ Found users:", users.length);

    await prisma.$disconnect();
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
