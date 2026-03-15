import { ensureDatabaseSchema } from "@/lib/db-init";
import { prisma } from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

type CreatePostParams = {
  authorId: string;
  content: string;
};

export async function createPost(input: CreatePostParams) {
  await ensureDatabaseSchema();

  const data = createPostSchema.parse({ content: input.content });

  return prisma.post.create({
    data: {
      authorId: input.authorId,
      content: data.content,
    },
  });
}

export async function getTimeline(viewerId?: string) {
  await ensureDatabaseSchema();

  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    content: post.content,
    createdAt: post.createdAt,
    author: post.author,
    likeCount: post.likes.length,
    viewerHasLiked: viewerId
      ? post.likes.some((like) => like.userId === viewerId)
      : false,
  }));
}

export async function togglePostLike(input: {
  userId: string;
  postId: string;
}) {
  await ensureDatabaseSchema();

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: input.userId,
        postId: input.postId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: input.userId,
        postId: input.postId,
      },
    });
  }

  const likeCount = await prisma.like.count({
    where: {
      postId: input.postId,
    },
  });

  return {
    liked: !existingLike,
    likeCount,
  };
}

export async function likePost(input: { userId: string; postId: string }) {
  await ensureDatabaseSchema();

  await prisma.like.upsert({
    where: {
      userId_postId: {
        userId: input.userId,
        postId: input.postId,
      },
    },
    update: {},
    create: {
      userId: input.userId,
      postId: input.postId,
    },
  });

  const likeCount = await prisma.like.count({
    where: {
      postId: input.postId,
    },
  });

  return {
    liked: true,
    likeCount,
  };
}

export async function unlikePost(input: { userId: string; postId: string }) {
  await ensureDatabaseSchema();

  await prisma.like.deleteMany({
    where: {
      userId: input.userId,
      postId: input.postId,
    },
  });

  const likeCount = await prisma.like.count({
    where: {
      postId: input.postId,
    },
  });

  return {
    liked: false,
    likeCount,
  };
}
