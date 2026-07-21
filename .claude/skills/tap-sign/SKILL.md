---
name: tap-sign
description: Re-read the project conventions and audit the current work against them, then fix what drifted. Use when the user "taps the sign" — invoking it to point you back at the posted rules (code comments, copy, PRs) after you've strayed (e.g. "/tap-sign", "tap the sign", "read the sign").
---

# Tap the sign

The user is pointing you back at the conventions that are *already written down* —
you drifted, and this is the nudge to honor them. Re-read the rules, audit what
you just changed, and fix the violations. Don't wait for the user to name the
specific rule; find it yourself.

> Why this exists: the conventions in `CLAUDE.md` are easy to agree to and easy to
> forget mid-task — comments creep into narration, "and" slips in over "&". This
> skill is the recurring self-check so the user doesn't have to be the linter.

## Steps

1. **Re-read the canonical rules.** Open `CLAUDE.md` and read the **Conventions**
   section in full (Copy, Code comments, Pull requests). If the work touched the
   design system or a deck, also re-read the banner it points to (`content/system.mdx`
   or `app/decks/README.md`). `CLAUDE.md` wins over anything remembered here.

2. **Get the diff.** Use `mcp__conductor__GetWorkspaceDiff` (or `git diff origin/main`)
   to see everything you changed on this branch — not just this session.

3. **Audit against the rules that drift most.** Read every changed hunk and check:
   - **Code comments** — explain *why*, never *what*. No narration, no restating the
     code, no commented-out code. A comment earns its place only for non-obvious
     rationale, a constraint, a gotcha, a sync point, or public-API docs. Default
     sparse; match the surrounding file's density. Delete comments that just
     describe what the next line plainly does.
   - **Copy** — user-facing text uses "&", not "and".
   - **Pull requests** — title imperative, ≤72 chars, no trailing period;
     description one sentence focused on *why*, expanded only when truly needed.
   - Anything else the Conventions section or a relevant banner specifies.

4. **Fix in place.** Edit the violations — don't just report them. Tighten verbose
   comments to why-only, drop pure narration, swap "and"→"&" in copy.

5. **Report** what you changed and why, referencing the specific rule each fix
   satisfies. If an open PR already contains the drift, amend and update it.

## Notes
- This is a self-check, not a feature change — don't alter behavior, only bring the
  work into line with the conventions.
- If you find nothing out of line, say so plainly rather than inventing fixes.
