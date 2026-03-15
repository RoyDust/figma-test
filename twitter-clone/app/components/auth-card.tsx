"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

type AuthCardProps =
  | {
      mode: "login";
    }
  | {
      mode: "register";
    };

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (mode === "register") {
      const username = String(formData.get("username") ?? "");
      const name = String(formData.get("name") ?? "");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, email, password }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "注册失败，请稍后重试");
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("邮箱或密码不正确");
      return;
    }

    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_28px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          {mode === "login" ? "Welcome back" : "Join the feed"}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          {mode === "login" ? "登录继续发帖" : "创建你的账号"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {mode === "login"
            ? "登录后可以发布新帖、点赞和管理你的时间线。"
            : "第一版只需要用户名、显示名、邮箱和密码，就能加入这个简易版推特。"}
        </p>
      </div>

      <form
        action={(formData) => {
          void handleSubmit(formData);
        }}
        className="space-y-4"
      >
        {mode === "register" ? (
          <>
            <InputField
              label="用户名"
              name="username"
              placeholder="alice_dev"
              disabled={isPending}
            />
            <InputField
              label="显示名"
              name="name"
              placeholder="Alice"
              disabled={isPending}
            />
          </>
        ) : null}

        <InputField
          label="邮箱"
          name="email"
          placeholder="alice@example.com"
          type="email"
          disabled={isPending}
        />
        <InputField
          label="密码"
          name="password"
          placeholder="至少 8 位"
          type="password"
          disabled={isPending}
        />

        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
        >
          {isPending
            ? "提交中..."
            : mode === "login"
              ? "登录"
              : "注册并登录"}
        </button>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  placeholder,
  type = "text",
  disabled,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400"
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    </label>
  );
}
