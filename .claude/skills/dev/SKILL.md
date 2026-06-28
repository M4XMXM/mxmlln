---
name: dev
description: Start the Next.js dev server for this portfolio in the background and report the local URL. Use when the user wants to kick off / start / run the dev server (e.g. "kick off dev", "start the server", "/dev").
---

# Start the dev server

Bring up the Next.js dev server in the background on the **first free port** (3000
upward) and report the URL. Be fast and idempotent — don't restart this
workspace's server if it's already healthy, and never collide with another
workspace already holding 3000.

> Why port-pick: each Conductor workspace is its own clone but they all serve the
> same site/title, so a 200 on :3000 can be a *different* workspace. Don't trust
> the response — check whether the port's owning process runs from *this* cwd.

## Steps

1. **Already serving from this workspace?** If a `next-server` whose cwd is this
   workspace is up, find its port, confirm 200, report it, and stop.
   ```bash
   cwd=$(pwd)
   for pid in $(pgrep -f next-server); do
     pcwd=$(lsof -a -p "$pid" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')
     [ "$pcwd" = "$cwd" ] || continue
     port=$(lsof -a -p "$pid" -iTCP -sTCP:LISTEN -P -Fn 2>/dev/null | sed -n 's/.*:\([0-9]*\)$/\1/p' | head -1)
     echo "already running on $port"; break
   done
   ```

2. **Deps present?** If `node_modules` is missing, run `npm install` first (or
   `next` won't be found).

3. **Pick the first free port** from 3000 upward (a port is free when nothing is
   LISTENing on it):
   ```bash
   for p in $(seq 3000 3010); do
     lsof -ti:"$p" -sTCP:LISTEN >/dev/null 2>&1 || { PORT=$p; break; }
   done; echo "using $PORT"
   ```

4. **Start it** on that port in the background and wait for readiness. The `dev`
   script hardcodes `--port 3000`, so append `-- --port $PORT` (last flag wins).
   Use a per-port log so parallel workspaces don't clobber each other's logs:
   ```bash
   (npm run dev -- --port "$PORT" > "/tmp/mp-dev-$PORT.log" 2>&1 &) ; \
   for i in $(seq 1 40); do \
     code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT"); \
     [ "$code" = "200" ] && { echo "ready"; break; }; sleep 1; \
   done; tail -8 "/tmp/mp-dev-$PORT.log"
   ```

5. **Report** the URL: `http://localhost:$PORT`. If the user was just working on a
   deck, also give the direct deck URL (e.g.
   `http://localhost:$PORT/decks/mousepower`). If startup failed, show the tail of
   `/tmp/mp-dev-$PORT.log`. Mention the chosen port explicitly when it isn't 3000.

## Notes
- Server runs in the background, so it survives across turns; don't block waiting
  on it beyond the readiness poll.
- The legacy Express portfolio runs separately via `node api/index.js` on :8080 —
  this skill is only for the Next.js app.
