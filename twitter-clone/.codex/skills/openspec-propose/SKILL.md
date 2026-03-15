---
name: openspec-propose
description: 一步提案新变更并生成所有产出物。当用户想要快速描述他们想要构建的内容，并获得包含设计、规格说明和任务的完整提案以准备实现时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0-2"
---

提案新变更，但在 Codex 中此技能是 OpenSpec 与 superpower 流程之间的桥接层，不是独立流程。

## 核心原则

- 先遵守 `using-superpowers`
- 把 OpenSpec 视为规范载体和目录结构
- 把 superpower 视为决策流程与执行纪律
- 不要绕过 `brainstorming` 和 `writing-plans`

## 在 Codex 中如何工作

当用户想用 `/opsx:propose` 快速发起需求时：

1. 先确认需求输入
   - 如果用户没有给出明确目标，用正常对话只问一个简短澄清问题
   - 从用户描述中推导 kebab-case 名称，例如 `add-user-auth`

2. 先走 superpower 设计流程
   - 显式说明当前要先遵守 `using-superpowers`
   - 进入 `brainstorming` 流程，先探索上下文、明确目标、比较方案、拿到用户批准
   - 用户批准后，再进入 `writing-plans`

3. 创建 OpenSpec 变更骨架
   ```bash
   openspec-cn new change "<name>"
   ```

4. 读取 OpenSpec 生成指令
   ```bash
   openspec-cn status --change "<name>" --json
   openspec-cn instructions proposal --change "<name>" --json
   openspec-cn instructions design --change "<name>" --json
   openspec-cn instructions tasks --change "<name>" --json
   ```
   - 读取依赖产出物
   - 使用模板生成 `proposal.md`、`design.md`、`tasks.md`
   - 不要把 CLI 返回的 `context` 或 `rules` 原样复制进文档

5. 让 OpenSpec 文档反映已批准的 superpower 输出
   - `proposal.md` 写什么和为什么
   - `design.md` 写批准后的设计决策
   - `tasks.md` 写来自实现计划的可执行任务

6. 报告结果
   ```bash
   openspec-cn status --change "<name>"
   ```
   总结：
   - 变更名和路径
   - 已创建的产出物
   - 下一步是 `/opsx:apply`，并按 superpower 实现流程执行

## 护栏

- 不要跳过 `brainstorming` 直接生成 proposal/design/tasks
- 不要引用不存在的专用提问或待办工具，直接用正常对话与 shell/CLI
- 如果同名变更已存在，先与用户确认是继续还是新建
- 在声称准备就绪前，确认产出物文件已经写入磁盘
