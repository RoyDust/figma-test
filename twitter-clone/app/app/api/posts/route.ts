import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { auth } from "@/lib/auth";
import { createPost, getTimeline } from "@/server/post-service";

export async function GET() {
  const session = await auth();
  const timeline = await getTimeline(session?.user?.id);

  return NextResponse.json({ posts: timeline });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录后再发帖" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const post = await createPost({
      authorId: session.user.id,
      content: payload.content,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "帖子内容不合法" },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "发帖失败，请稍后再试" }, { status: 500 });
  }
}
