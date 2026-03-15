import Link from "next/link";

import { AuthCard } from "@/components/auth-card";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.2),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center gap-10">
        <section className="hidden max-w-xl lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Simple Twitter MVP
          </p>
          <h1 className="mt-4 text-6xl font-semibold tracking-tight text-slate-950">
            把想法发到你自己的时间线里。
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            这是一版从零搭建的全栈 Twitter 风格 MVP。登录后就能发帖、浏览时间线和点赞。
          </p>
        </section>

        <div className="w-full max-w-md">
          <AuthCard mode="login" />
          <p className="mt-5 text-center text-sm text-slate-600">
            还没有账号？
            <Link className="ml-2 font-semibold text-sky-600" href="/register">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
