import { beforeEach, describe, expect, test } from "vitest";

import { prisma } from "@/lib/prisma";
import { registerUser } from "@/server/auth-service";
import { resetDatabase } from "@/tests/helpers/reset-db";

describe("registerUser", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("creates a user with a hashed password", async () => {
    const result = await registerUser({
      username: "alice_dev",
      name: "Alice",
      email: "alice@example.com",
      password: "password123",
    });

    expect(result.user.username).toBe("alice_dev");
    expect(result.user.email).toBe("alice@example.com");
    expect(result.user.passwordHash).not.toBe("password123");
    expect(result.user.passwordHash.length).toBeGreaterThan(20);
  });

  test("rejects duplicate usernames", async () => {
    await prisma.user.create({
      data: {
        username: "alice_dev",
        name: "Alice",
        email: "alice@example.com",
        passwordHash: "hash",
      },
    });

    await expect(
      registerUser({
        username: "alice_dev",
        name: "Another Alice",
        email: "alice2@example.com",
        password: "password123",
      }),
    ).rejects.toThrow("用户名已被使用");
  });

  test("rejects duplicate emails", async () => {
    await prisma.user.create({
      data: {
        username: "alice_dev",
        name: "Alice",
        email: "alice@example.com",
        passwordHash: "hash",
      },
    });

    await expect(
      registerUser({
        username: "alice_2",
        name: "Alice Two",
        email: "alice@example.com",
        password: "password123",
      }),
    ).rejects.toThrow("邮箱已被注册");
  });
});
