import { beforeEach, describe, expect, test } from "vitest";

import { prisma } from "@/lib/prisma";
import {
  createPost,
  getTimeline,
  togglePostLike,
} from "@/server/post-service";
import { resetDatabase } from "@/tests/helpers/reset-db";

async function createUser(seed: string) {
  return prisma.user.create({
    data: {
      username: `${seed}_user`,
      name: `${seed} user`,
      email: `${seed}@example.com`,
      passwordHash: "hash",
    },
  });
}

describe("post service", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  test("creates a post for the signed-in user", async () => {
    const user = await createUser("writer");

    const post = await createPost({
      authorId: user.id,
      content: "Hello, timeline!",
    });

    expect(post.authorId).toBe(user.id);
    expect(post.content).toBe("Hello, timeline!");
  });

  test("rejects empty posts", async () => {
    const user = await createUser("writer");

    await expect(
      createPost({
        authorId: user.id,
        content: "   ",
      }),
    ).rejects.toThrow("帖子内容不能为空");
  });

  test("returns the timeline with latest posts first", async () => {
    const user = await createUser("writer");

    const older = await prisma.post.create({
      data: {
        authorId: user.id,
        content: "older post",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
      },
    });

    const newer = await prisma.post.create({
      data: {
        authorId: user.id,
        content: "newer post",
        createdAt: new Date("2026-01-02T00:00:00.000Z"),
      },
    });

    const timeline = await getTimeline();

    expect(timeline.map((post) => post.id)).toEqual([newer.id, older.id]);
  });

  test("likes a post and reports the viewer state", async () => {
    const author = await createUser("author");
    const viewer = await createUser("viewer");
    const post = await prisma.post.create({
      data: {
        authorId: author.id,
        content: "like me",
      },
    });

    const liked = await togglePostLike({
      userId: viewer.id,
      postId: post.id,
    });

    expect(liked.liked).toBe(true);
    expect(liked.likeCount).toBe(1);

    const timeline = await getTimeline(viewer.id);
    expect(timeline[0]?.viewerHasLiked).toBe(true);
    expect(timeline[0]?.likeCount).toBe(1);
  });

  test("removes an existing like when toggled again", async () => {
    const author = await createUser("author");
    const viewer = await createUser("viewer");
    const post = await prisma.post.create({
      data: {
        authorId: author.id,
        content: "toggle me",
      },
    });

    await togglePostLike({
      userId: viewer.id,
      postId: post.id,
    });

    const unliked = await togglePostLike({
      userId: viewer.id,
      postId: post.id,
    });

    expect(unliked.liked).toBe(false);
    expect(unliked.likeCount).toBe(0);
  });
});
