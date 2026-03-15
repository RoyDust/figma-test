import { prisma } from "@/lib/prisma";
import { ensureDatabaseSchema } from "@/lib/db-init";

async function main() {
  await ensureDatabaseSchema();
  console.log("Database initialized.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
