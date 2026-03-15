"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { POST_MAX_LENGTH } from "@/lib/constants";

export function PostComposer() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function submitPost() {
    setError(null);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(payload.error ?? "发帖失败，请稍后重试");
      return;
    }

    startTransition(() => {
      setContent("");
      router.refresh();
    });
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.65)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
            New Post
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            分享一个当下想法
          </h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {content.trim().length}/{POST_MAX_LENGTH}
        </span>
      </div>

      <textarea
        className="mt-4 min-h-32 w-full resize-none rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-sky-400"
        placeholder="今天想聊点什么？"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        {error ? <p className="text-sm text-rose-600">{error}</p> : <span />}
        <button
          type="button"
          className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          onClick={() => void submitPost()}
        >
          {isPending ? "发布中..." : "发布"}
        </button>
      </div>
    </section>
  );
}
