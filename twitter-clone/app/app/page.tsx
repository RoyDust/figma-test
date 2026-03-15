import Link from "next/link";

import { PostComposer } from "@/components/post-composer";
import { SignOutButton } from "@/components/sign-out-button";
import { TimelineCard } from "@/components/timeline-card";
import { auth } from "@/lib/auth";
import { getTimeline } from "@/server/post-service";

export default async function Home() {
  const session = await auth();
  const posts = await getTimeline(session?.user?.id);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.2),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-white/70 bg-white/80 px-5 py-5 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
                Twitter MVP
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                用最小但真实的全栈闭环，搭一个简易版推特。
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                这版支持注册、登录、发帖、全局时间线和点赞。范围刻意收紧，只把最核心的社交流程做完整。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {session?.user ? (
                <>
                  <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                    @{session.user.username}
                  </div>
                  <SignOutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    登录
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                  >
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-5">
            {session?.user ? (
              <PostComposer />
            ) : (
              <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6 text-slate-600">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                  Join to post
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  登录后就能发布你的第一条短帖。
                </h2>
                <p className="mt-3 text-sm leading-7">
                  访客仍然可以浏览时间线，但发帖和点赞需要登录。
                </p>
              </section>
            )}

            {posts.length ? (
              posts.map((post) => (
                <TimelineCard
                  key={post.id}
                  post={post}
                  isLoggedIn={Boolean(session?.user)}
                />
              ))
            ) : (
              <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-center shadow-[0_24px_60px_-44px_rgba(15,23,42,0.65)]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                  Empty Feed
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  还没有任何帖子。
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {session?.user
                    ? "发一条新的帖子，让首页时间线开始流动起来。"
                    : "先注册一个账号，发布第一条内容，时间线就会立刻热起来。"}
                </p>
              </section>
            )}
          </section>

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.65)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                MVP Scope
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>真实注册和登录</li>
                <li>发布 280 字以内的短帖</li>
                <li>首页最新优先时间线</li>
                <li>点赞和取消点赞</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.75)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                Local Stack
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li>Next.js App Router</li>
                <li>Prisma client + SQLite</li>
                <li>NextAuth credentials</li>
                <li>Vitest service tests</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
