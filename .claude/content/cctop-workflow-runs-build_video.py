#!/usr/bin/env python3
"""X/Twitter clip for cctop's workflow-runs feature (branch workflows-prd).

Every terminal frame is real `cctop run --once --ansi` output on the branch's
own fixtures (W and its live cut, composed and anonymised from a real run).
The live strip is animated by replaying the fixture's journal line by line
from a scratch copy; nothing is edited. Captions are the only added text.
"""
import html, os, pathlib, shutil, subprocess, sys, tempfile

CCTOP_ROOT = pathlib.Path("/private/tmp/claude-501/-Users-tom-code-tomstagl-com/dc67c0c8-58b6-4bf3-ac15-56760e1860c6/scratchpad/cctop-v090")
sys.path.insert(0, str(CCTOP_ROOT / "scripts"))
from demo import ansi_to_html, FFMPEG  # cctop's own renderer
CHROME = os.environ.get("CHROME") or str(pathlib.Path.home() / "Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-x64/chrome-headless-shell")

HERE = pathlib.Path(__file__).resolve().parent
B = os.environ.get("CCTOP_BIN", "/private/tmp/claude-501/-Users-tom-code-tomstagl-com/dc67c0c8-58b6-4bf3-ac15-56760e1860c6/scratchpad/cctop-target/release/cctop")
LIVE_NOW = (CCTOP_ROOT / "fixtures/session-w-live.now").read_text().strip()
JOURNAL = HERE / "session-w-live/subagents/workflows/wf_0aa065ff-0a0/journal.jsonl"
JOURNAL_FULL = HERE / "journal.full"
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "cctop-workflow-runs.mp4"
W, H, SIZE = 1280, 720, "120x30"


def cctop(session, keys=None, now=None):
    env = dict(os.environ)
    if now:
        env["CCTOP_FAKE_NOW"] = now
    args = [B, "run", "--once", "--ansi", "--size", SIZE, "--session", session]
    if keys:
        args += ["--keys", keys]
    return subprocess.run(args, capture_output=True, text=True, env=env, check=True).stdout


def terminal(ansi, focus=None, keep=None):
    """ANSI → HTML, one row per line; rows outside `focus` are dimmed, rows
    outside `keep` are cut (the box's bottom border is always kept)."""
    rows = ansi.rstrip("\n").split("\n")
    if keep is not None:
        border = max(i for i, r in enumerate(rows) if "└" in r or "╰" in r) if any("└" in r or "╰" in r for r in rows) else None
        keep = set(keep) | ({border} if border is not None else set())
    out = []
    for i, row in enumerate(rows):
        if keep is not None and i not in keep:
            continue
        dim = focus is not None and i not in focus
        out.append(f'<div class="row{" dim" if dim else ""}">{ansi_to_html(row) or "&nbsp;"}</div>')
    return "".join(out)


PAGE = """<!doctype html><meta charset="utf-8"><style>
html,body{{margin:0;background:#0B1015}}
body{{width:{w}px;height:{h}px;overflow:hidden;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;color:#E8EEF5;position:relative}}
.cap{{position:absolute;left:56px;right:56px;top:34px;height:92px;display:flex;flex-direction:column;justify-content:center}}
.cap .k{{font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:#5FC77E;font-weight:600;margin-bottom:8px}}
.cap .t{{font-size:30px;line-height:1.22;font-weight:600;letter-spacing:-.01em}}
.stage{{position:absolute;left:0;right:0;top:136px;bottom:48px;display:flex;align-items:center;justify-content:center}}
.term{{background:#0E1318;border:1px solid #243140;border-radius:10px;padding:12px 14px;box-shadow:0 18px 50px rgba(0,0,0,.45)}}
.row{{font-family:"SF Mono",Menlo,Consolas,monospace;font-size:15.6px;line-height:21px;white-space:pre;color:#D6DEE8;transition:none}}
.dim{{opacity:.28}}
.mark{{position:absolute;right:56px;bottom:22px;font:500 14px "SF Mono",Menlo,monospace;color:#5D6B7D}}
.card{{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 110px}}
.card .big{{font-size:52px;line-height:1.12;font-weight:700;letter-spacing:-.02em}}
.card .sub{{font-size:28px;line-height:1.35;color:#9FB0C3;margin-top:22px}}
.card .mono{{font:600 22px "SF Mono",Menlo,monospace;color:#5FC77E;margin-top:34px}}
</style><body>{body}</body>"""


def shoot(body, path):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(PAGE.format(w=W, h=H, body=body))
        tmp = f.name
    profile = tempfile.mkdtemp(prefix="wfvid-chrome-")
    r = subprocess.run([CHROME, "--hide-scrollbars", "--no-first-run",
                        f"--user-data-dir={profile}", f"--window-size={W},{H}",
                        "--screenshot=" + str(path), "file://" + tmp], capture_output=True, text=True, timeout=60)
    shutil.rmtree(profile, ignore_errors=True)
    os.unlink(tmp)
    if r.returncode != 0 or not pathlib.Path(path).exists():
        sys.exit(f"chrome failed ({r.returncode}): {r.stderr[-800:]}")


def scene(kicker, title, ansi, focus=None, keep=None):
    return (f'<div class="cap"><div class="k">{html.escape(kicker)}</div>'
            f'<div class="t">{html.escape(title)}</div></div>'
            f'<div class="stage"><div class="term">{terminal(ansi, focus, keep)}</div></div>'
            f'<div class="mark">cctop · workflow runs</div>')


def card(big, sub, mono=""):
    m = f'<div class="mono">{html.escape(mono)}</div>' if mono else ""
    return f'<div class="card"><div class="big">{html.escape(big)}</div><div class="sub">{html.escape(sub)}</div>{m}</div>'


def main():
    frames = pathlib.Path(tempfile.mkdtemp(prefix="wfvid-"))
    shots = []  # (png, seconds)

    def add(body, secs):
        p = frames / f"f{len(shots):03d}.png"
        shoot(body, p)
        shots.append((p, secs))

    add(card("A Claude Code Workflow just fanned out 300 agents.",
             "Which phase is running? Which agents are failing, and why?"), 3.2)

    # Live: replay the fixture's journal; the strip is row 1 (0-based).
    total = len(JOURNAL_FULL.read_text().splitlines())
    steps = [5, 15, 30, 45, 60, 80, 100, total]
    for i, n in enumerate(steps):
        JOURNAL.write_text("".join(JOURNAL_FULL.read_text().splitlines(True)[:n]))
        ansi = cctop(str(HERE / "session-w-live.jsonl"), now=LIVE_NOW)
        add(scene("While it runs",
                  "One strip under the header: phase, progress, failures and their cause, spend.",
                  ansi, focus={0, 1}, keep=range(0, 10)), 2.2 if i == len(steps) - 1 else 0.85)
    JOURNAL.write_text(JOURNAL_FULL.read_text())

    fixture_w = str(CCTOP_ROOT / "fixtures/session-w.jsonl")
    agents = cctop(fixture_w, keys="6,Enter,6,Enter")
    add(scene("When it ends", "The run folds into one row in the agents view.", agents, focus={0, 1, 2}, keep=range(0, 6)), 2.8)

    detail = cctop(fixture_w, keys="6,Enter,6,Enter,Enter")
    lines = detail.rstrip("\n").split("\n")
    idx = lambda s: next(i for i, l in enumerate(lines) if s in l)
    table = set(range(idx("sweep-4  completed"), idx("Critic") + 1))
    verify = {idx("phase "), idx("Verify ")}
    fixes = set(range(idx("───"), idx("mid-task") + 2))
    cut = range(0, idx("mid-task") + 2)
    add(scene("Enter on the run", "A verdict per phase: started, returned, failed, waste, cause.", detail, focus=table, keep=cut), 4.2)
    add(scene("The trap", "Most of Verify died on its first call, so its failures cost almost nothing. In dollars alone, this run looks fine.",
              detail, focus=verify, keep=cut), 4.6)
    add(scene("The fix", "One fix line per cause, pointing at the parallel() call in the script.", detail, focus=fixes, keep=cut), 4.6)

    add(card("cctop: htop for a Claude Code session.",
             "New in v0.9.0: Workflow runs. Read-only, like the rest.",
             "brew install tomstagl/tap/cctop  ·  github.com/tomstagl/cctop"), 3.4)

    concat = frames / "list.txt"
    with concat.open("w") as f:
        for p, s in shots:
            f.write(f"file '{p}'\nduration {s}\n")
        f.write(f"file '{shots[-1][0]}'\n")  # concat demuxer needs the last frame twice
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(concat),
                    "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "18",
                    "-profile:v", "high", "-movflags", "+faststart", str(OUT)], check=True)
    poster = OUT.with_suffix(".poster.png")
    shutil.copy(shots[-3][0], poster)  # the verdict frame with the Verify row lit
    shutil.rmtree(frames)
    print(f"{OUT} ({OUT.stat().st_size / 1e6:.2f} MB, {sum(s for _, s in shots):.1f} s) · poster {poster}")


if __name__ == "__main__":
    main()
