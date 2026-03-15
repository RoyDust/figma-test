import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { registerUser } from "@/server/auth-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await registerUser(payload);

    return NextResponse.json(
      {
        user: {
          id: result.user.id,
          username: result.user.username,
          name: result.user.name,
          email: result.user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "注册信息无效" },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "注册失败，请稍后重试" }, { status: 500 });
  }
}
