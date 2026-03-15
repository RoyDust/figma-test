import Link from "next/link";

import { AuthCard } from "@/components/auth-card";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.2),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center gap-10">
        <section className="hidden max-w-xl lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Get Started
          </p>
          <h1 className="mt-4 text-6xl font-semibold tracking-tight text-slate-950">
            创建一个本地可跑的社交产品雏形。
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            先从真实注册登录、发帖和点赞做起。这个版本故意收小范围，只把核心闭环做完整。
          </p>
        </section>

        <div className="w-full max-w-md">
          <AuthCard mode="register" />
          <p className="mt-5 text-center text-sm text-slate-600">
            已经有账号？
            <Link className="ml-2 font-semibold text-sky-600" href="/login">
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
