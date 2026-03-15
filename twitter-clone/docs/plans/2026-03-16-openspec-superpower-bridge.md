# OpenSpec Superpower Bridge Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the generated OpenSpec Codex skills work cleanly with the local superpower workflow by treating OpenSpec as structure and superpowers as process control.

**Architecture:** Update the project-local OpenSpec skill documents so they defer behavioral flow to superpower skills, remove references to unsupported tools, and keep OpenSpec CLI commands focused on change selection, artifact generation, and archive mechanics. Verification will confirm the rewritten guidance exists in the skill files and the project still responds to OpenSpec CLI commands.

**Tech Stack:** Markdown skill files, OpenSpec CLI, Codex local skill loading

---

### Task 1: Add the implementation plan document

**Files:**
- Create: `docs/plans/2026-03-16-openspec-superpower-bridge.md`

**Step 1: Write the plan file**

Add this document with the goal, architecture summary, and bite-sized tasks for the bridge update.

**Step 2: Verify the file exists**

Run: `Get-Item docs/plans/2026-03-16-openspec-superpower-bridge.md`
Expected: the file is listed without errors

### Task 2: Rewrite OpenSpec propose and explore skills

**Files:**
- Modify: `.codex/skills/openspec-propose/SKILL.md`
- Modify: `.codex/skills/openspec-explore/SKILL.md`

**Step 1: Replace unsupported tool instructions**

Remove references to unavailable tools such as `AskUserQuestion` and `TodoWrite`, replacing them with direct conversation guidance and local shell/CLI checks.

**Step 2: Bridge propose/explore to superpower process skills**

Update `openspec-propose` to require `using-superpowers`, `brainstorming`, and `writing-plans` before finalizing OpenSpec artifacts. Update `openspec-explore` so it stays an exploration-only entry point aligned with superpower discovery behavior.

**Step 3: Verify the bridge text**

Run: `rg -n "using-superpowers|brainstorming|writing-plans|AskUserQuestion|TodoWrite" .codex/skills/openspec-propose/SKILL.md .codex/skills/openspec-explore/SKILL.md -S`
Expected: superpower references are present and unsupported tool references are absent

### Task 3: Rewrite apply and archive skills

**Files:**
- Modify: `.codex/skills/openspec-apply-change/SKILL.md`
- Modify: `.codex/skills/openspec-archive-change/SKILL.md`

**Step 1: Align implementation with superpower execution**

Update `openspec-apply-change` so it reads OpenSpec artifacts but defers implementation discipline to superpower skills such as `test-driven-development`, `systematic-debugging`, and `verification-before-completion`.

**Step 2: Align archiving with verified completion**

Update `openspec-archive-change` to remove unsupported tool references, require direct user confirmation in normal conversation, and demand fresh verification evidence before claiming a change is ready to archive.

**Step 3: Verify the bridge text**

Run: `rg -n "test-driven-development|systematic-debugging|verification-before-completion|AskUserQuestion|Task tool" .codex/skills/openspec-apply-change/SKILL.md .codex/skills/openspec-archive-change/SKILL.md -S`
Expected: superpower references are present and unsupported tool references are absent

### Task 4: Run final verification

**Files:**
- Modify: `.codex/skills/openspec-propose/SKILL.md`
- Modify: `.codex/skills/openspec-explore/SKILL.md`
- Modify: `.codex/skills/openspec-apply-change/SKILL.md`
- Modify: `.codex/skills/openspec-archive-change/SKILL.md`
- Create: `docs/plans/2026-03-16-openspec-superpower-bridge.md`

**Step 1: Verify the rewritten skills are readable**

Run: `Get-Content .codex/skills/openspec-propose/SKILL.md`
Expected: file reads successfully with the new bridge guidance

**Step 2: Verify project OpenSpec state still works**

Run: `openspec-cn list`
Expected: OpenSpec CLI returns the current project state without errors
