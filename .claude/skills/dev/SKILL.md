---
name: dev
description: Start the Next.js dev server for this portfolio in the background and report the local URL. Use when the user wants to kick off / start / run the dev server (e.g. "kick off dev", "start the server", "/dev").
---

# Start the dev server

Bring up the Next.js dev server (`npm run dev`, port 3000) in the background and report the URL. Be fast and idempotent — don't restart a server that's already healthy.

## Steps

1. **Already running?** Check the port. If it returns 200, report the URL and stop — don't start a second one.
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
   ```

2. **Deps present?** If `node_modules` is missing, run `npm install` first (it's needed or `next` won't be found).

3. **Start it** in the background and wait for readiness:
   ```bash
   (npm run dev > /tmp/mp-dev.log 2>&1 &) ; \
   for i in $(seq 1 40); do \
     code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000); \
     [ "$code" = "200" ] && { echo "ready"; break; }; sleep 1; \
   done; tail -6 /tmp/mp-dev.log
   ```

4. **Report** the URL: http://localhost:3000. If the user was just working on a deck, also give the direct deck URL (e.g. http://localhost:3000/decks/mousepower). If startup failed, show the tail of `/tmp/mp-dev.log`.

## Notes
- Server runs in the background, so it survives across turns; don't block waiting on it beyond the readiness poll.
- The legacy Express portfolio runs separately via `node api/index.js` on :8080 — this skill is only for the Next.js app on :3000.
