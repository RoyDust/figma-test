import { beforeEach, describe, expect, test, vi } from "vitest";

const authMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  auth: authMock,
}));

describe("post route guards", () => {
  beforeEach(() => {
    authMock.mockReset();
  });

  test("rejects unauthenticated post creation", async () => {
    authMock.mockResolvedValue(null);
    const { POST } = await import("@/app/api/posts/route");

    const response = await POST(
      new Request("http://localhost/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "hello world" }),
      }),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "请先登录后再发帖",
    });
  });

  test("rejects unauthenticated likes", async () => {
    authMock.mockResolvedValue(null);
    const { POST } = await import("@/app/api/posts/[id]/like/route");

    const response = await POST(
      new Request("http://localhost/api/posts/abc/like", {
        method: "POST",
      }),
      {
        params: Promise.resolve({ id: "abc" }),
      },
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "请先登录后再点赞",
    });
  });
});
