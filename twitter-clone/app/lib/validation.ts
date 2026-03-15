import { z } from "zod";

import { POST_MAX_LENGTH } from "@/lib/constants";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "用户名至少需要 3 个字符")
    .max(24, "用户名不能超过 24 个字符")
    .regex(/^[a-zA-Z0-9_]+$/, "用户名只能包含字母、数字和下划线"),
  name: z.string().trim().min(1, "显示名不能为空").max(50, "显示名过长"),
  email: z.string().trim().email("请输入有效邮箱"),
  password: z.string().min(8, "密码至少需要 8 个字符").max(72, "密码过长"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("请输入有效邮箱"),
  password: z.string().min(1, "请输入密码"),
});

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "帖子内容不能为空")
    .max(POST_MAX_LENGTH, `帖子内容不能超过 ${POST_MAX_LENGTH} 个字符`),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
