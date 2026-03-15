import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { likePost, unlikePost } from "@/server/post-service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_: Request, context: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录后再点赞" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await likePost({ userId: session.user.id, postId: id });

  return NextResponse.json(result);
}

export async function DELETE(_: Request, context: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "请先登录后再点赞" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await unlikePost({ userId: session.user.id, postId: id });

  return NextResponse.json(result);
}
