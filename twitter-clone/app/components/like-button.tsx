"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LikeButton({
  postId,
  liked,
  disabled,
}: {
  postId: string;
  liked: boolean;
  disabled: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function toggleLike() {
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: liked ? "DELETE" : "POST",
    });

    if (!response.ok) {
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        liked
          ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      } disabled:cursor-not-allowed disabled:opacity-60`}
      disabled={disabled || isPending}
      onClick={() => void toggleLike()}
    >
      {liked ? "已赞" : "点赞"}
    </button>
  );
}
