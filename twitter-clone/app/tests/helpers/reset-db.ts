import { ensureDatabaseSchema } from "@/lib/db-init";
import { prisma } from "@/lib/prisma";

export async function resetDatabase() {
  await ensureDatabaseSchema();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
}
