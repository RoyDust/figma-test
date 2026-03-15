import { Prisma } from "@prisma/client";

import { ensureDatabaseSchema } from "@/lib/db-init";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { registerSchema, type RegisterInput } from "@/lib/validation";

export async function registerUser(input: RegisterInput) {
  await ensureDatabaseSchema();

  const data = registerSchema.parse(input);
  const passwordHash = await hashPassword(data.password);

  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        name: data.name,
        email: data.email,
        passwordHash,
      },
    });

    return { user };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = Array.isArray(error.meta?.target)
        ? error.meta.target.join(",")
        : String(error.meta?.target ?? "");

      if (target.includes("username")) {
        throw new Error("用户名已被使用");
      }

      if (target.includes("email")) {
        throw new Error("邮箱已被注册");
      }
    }

    throw error;
  }
}
