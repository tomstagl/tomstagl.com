#!/usr/bin/env python3
"""X/Twitter clip: what thunderstruck does, end to end (rank, investigate, validate, refute, verify, guardrail).

Every quoted line is thunderstruck's own output:
- the ranking, the finding, its evidence, its check and its Verify line come from
  examples/sample-report.md, which gen_sample_report.py writes by running the real
  pipeline over the test fixture (the fixture's findings are written for it and pass
  the real validator; the sample's checks are canned, no model ran);
- the edit warning is scripts/guardrail.py's real output on that fixture scan
  (`gen_sample_report.py --keep DIR`, then `report.py --repo DIR`), passed as GUARD_JSON.
Captions are the only added text.

Usage: thunderstruck-overview-build_video.py [out.mp4]   (env: THUNDERSTRUCK, GUARD_JSON, CHROME)
"""
import html, json, os, pathlib, re, subprocess, sys, tempfile

HERE = pathlib.Path(__file__).resolve().parent
TS = pathlib.Path(os.environ.get("THUNDERSTRUCK", str(pathlib.Path.home() / "code/thunderstruck")))
GUARD_JSON = pathlib.Path(os.environ["GUARD_JSON"])
CHROME = os.environ.get("CHROME") or str(pathlib.Path.home() / "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-x64/chrome-headless-shell")
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "thunderstruck-overview.mp4"
W, H = 1280, 720
e = html.escape

CSS = f"""
@font-face {{ font-family: 'Plex Cond'; src: url('file://{TS}/brand/fonts/PlexSansCondensed-Bold.ttf'); }}
@font-face {{ font-family: 'Plex Mono'; src: url('file://{TS}/brand/fonts/PlexMono-Medium.ttf'); }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; width: {W}px; height: {H}px; background: #0E1318; color: #C9D1DC; font-family: 'Plex Mono', monospace; overflow: hidden; }}
.wrap {{ position: absolute; inset: 0; padding: 44px 60px 56px; display: flex; flex-direction: column; gap: 22px; justify-content: center; }}
h1 {{ margin: 0; font-family: 'Plex Cond', sans-serif; font-size: 76px; line-height: 1.04; color: #F1F3F6; }}
h2 {{ margin: 0; font-family: 'Plex Cond', sans-serif; font-size: 46px; line-height: 1.1; color: #F1F3F6; }}
.step {{ display: flex; align-items: center; gap: 14px; font-size: 22px; letter-spacing: .06em; text-transform: uppercase; color: #D97757; }}
.who {{ font-size: 17px; letter-spacing: 0; text-transform: none; padding: 3px 12px; border-radius: 99px; border: 1px solid #33404F; color: #8B95A7; }}
.who.ai {{ border-color: #D97757; color: #D97757; }}
.box {{ background: #131A22; border: 1px solid #263140; border-radius: 12px; padding: 20px 24px; font-size: 21px; line-height: 1.5; }}
.k {{ color: #D97757; }} .m {{ color: #8B95A7; }} .w {{ color: #F1F3F6; }} .ok {{ color: #9FD3B0; }}
table {{ border-collapse: collapse; width: 100%; font-size: 20px; }}
td, th {{ padding: 7px 10px; text-align: left; border-bottom: 1px solid #222C38; white-space: nowrap; }}
th {{ color: #8B95A7; font-weight: 400; }}
.grid {{ display: grid; grid-template-columns: 210px 1fr; gap: 8px 18px; }}
.src {{ position: absolute; left: 60px; bottom: 20px; font-size: 15px; color: #6B7586; }}
"""
SRC = '<div class="src">from thunderstruck\'s sample report: the real pipeline over its test fixture</div>'


def step(n, name, who, ai=False):
    return f'<div class="step">{n} · {name} <span class="who{" ai" if ai else ""}">{who}</span></div>'


def sample():
    md = (TS / "examples/sample-report.md").read_text()
    unlink = lambda s: re.sub(r"\[`?([^\]`]+)`?\]\([^)]*\)", r"\1", s).replace("\\_", "_")
    ranked = md.split("## Ranked hotspots", 1)[1].split("\n## ", 1)[0]
    rows = []
    for line in ranked.splitlines():
        if line.startswith("| H"):
            c = [x.strip() for x in line.strip("|").split("|")]
            rows.append((c[0], unlink(c[1]).split(" · ")[0], c[2], c[3], c[4], c[6]))
    fr = md.split("### FR-001 · ", 1)[1].split("\n### ", 1)[0]
    title = fr.split("\n", 1)[0]
    field = lambda name: unlink(re.search(rf"^\| {name} \| (.*) \|$", fr, re.M).group(1))
    evidence = [unlink(l[2:]) for l in fr.split("**Evidence**", 1)[1].split("\n\n", 2)[1].splitlines() if l.startswith("- ")]
    check = fr.split("**Check** — ", 1)[1].split("\n", 1)[0]
    verify = fr.split("**Verify** — ", 1)[1].split("\n", 1)[0].strip()
    return rows, title, field, evidence, check, verify


def scenes():
    rows, title, field, evidence, check, verify = sample()
    guard = json.loads(GUARD_JSON.read_text())["hookSpecificOutput"]["additionalContext"].splitlines()
    keep = [l for l in guard if l.startswith(("thunderstruck has", "- FR-001", "  missing patterns", "  what keeps it failing"))]
    keep.append(guard[-1])  # "…hypotheses from a past scan, not verified defects."
    table = "".join(f"<tr><td class='k'>{e(r[0])}</td><td class='w'>{e(r[1])}</td><td>{e(r[2])}</td><td>{e(r[3])}</td><td>{e(r[4])}</td><td class='m'>{e(r[5])}</td></tr>" for r in rows[:5])
    def ev_line(x):
        m = re.match(r"_(\w+)_ (.*)", x)
        kind, rest = (m.group(1), m.group(2)) if m else ("", x)
        return f"<div><span class='ok'>✓</span> <span class='k'>{e(kind):<8}</span> {e(rest)}</div>"
    ev = "".join(ev_line(x) for x in evidence[:5])
    return [
        (4.0, """<div class="wrap"><div class="step">a Claude Code plugin</div>
          <h1>Hotspot tools tell you where risk is.</h1>
          <h1 class="k" style="color:#D97757">thunderstruck tells you why that code will fail in production.</h1></div>"""),
        (5.5, f"""<div class="wrap">{step(1, "Rank", "script")}
          <h2>Churn × complexity × missing stability patterns, from your git history.</h2>
          <div class="box" style="padding: 10px 14px"><table><tr><th>#</th><th>File</th><th>Score</th><th>Commits</th><th>Fixes</th><th>Leads</th></tr>{table}</table></div></div>{SRC}"""),
        (7.0, f"""<div class="wrap">{step(2, "Investigate", "Claude, read-only", True)}
          <div class="w" style="font-family:'Plex Cond'; font-size: 34px; line-height: 1.15">FR-001 · {e(title)}</div>
          <div class="box grid" style="font-size: 19px"><span class="k">Trigger</span><span>{e(field("Trigger"))}</span>
          <span class="k">Amplifier</span><span>{e(field("Amplifier"))}</span>
          <span class="k">Sustaining effect</span><span class="w">{e(field("Sustaining effect"))}</span></div></div>{SRC}"""),
        (5.5, f"""<div class="wrap">{step(3, "Validate", "script")}
          <h2>Every file:line and commit SHA is resolved. A claim resting only on a pattern match is rejected.</h2>
          <div class="box" style="font-size: 18px; line-height: 1.6">{ev}</div></div>{SRC}"""),
        (5.0, f"""<div class="wrap">{step(4, "Refute", "a second Claude, the skeptic", True)}
          <h2>A skeptic tries to disprove every finding. Only an upheld one can be high confidence.</h2>
          <div class="box"><span class="k">Check</span> — <span class="w">{e(check)}</span></div></div>{SRC}"""),
        (5.0, f"""<div class="wrap">{step(5, "Verify", "you decide")}
          <h2>Every finding says how to prove it. /thunderstruck-verify turns that into a failing test.</h2>
          <div class="box"><span class="k">Verify</span> — <span class="w">{e(verify)}</span></div></div>{SRC}"""),
        (6.0, f"""<div class="wrap">{step(6, "Guard", "hook, never blocks")}
          <h2>Edit a file with an open finding and Claude hears about it first.</h2>
          <div class="box" style="font-size: 17px; line-height: 1.55; white-space: pre-wrap">{e(chr(10).join(keep))}</div></div>
          <div class="src">scripts/guardrail.py's own output on the same fixture scan</div>"""),
        (5.0, f"""<div class="wrap" style="align-items: center; text-align: center">
          <img src="file://{TS}/brand/svg/thunderstruck-lockup-horizontal-dark.svg" style="width: 740px">
          <div class="w" style="font-size: 27px">Runs locally. No API key, no telemetry. MIT.</div>
          <div class="box k" style="font-size: 25px">/plugin install thunderstruck@thunderstruck</div></div>"""),
    ]


def shoot(body, path):
    page = path.with_suffix(".html")
    page.write_text(f"<!doctype html><meta charset='utf-8'><style>{CSS}</style><body>{body}</body>")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    f"--window-size={W},{H}", "--force-device-scale-factor=1", "--virtual-time-budget=2000",
                    f"--screenshot={path}", f"file://{page}"], check=True, capture_output=True)


def main():
    tmp = pathlib.Path(tempfile.mkdtemp())
    frames = []
    for i, (dur, body) in enumerate(scenes()):
        p = tmp / f"s{i}.png"; shoot(body, p); frames.append((dur, p))
    fade, args = 0.4, ["ffmpeg", "-y", "-loglevel", "error"]
    for dur, p in frames:
        args += ["-loop", "1", "-t", f"{dur + fade:.2f}", "-i", str(p)]
    chain, last, offset = [], "0:v", 0.0
    for i in range(1, len(frames)):
        offset += frames[i - 1][0]
        chain.append(f"[{last}][{i}:v]xfade=transition=fade:duration={fade}:offset={offset:.2f}[v{i}]")
        last = f"v{i}"
    args += ["-filter_complex", ";".join(chain) + f";[{last}]format=yuv420p[out]", "-map", "[out]",
             "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-movflags", "+faststart", str(OUT)]
    subprocess.run(args, check=True)
    OUT.with_suffix(".poster.png").write_bytes(frames[2][1].read_bytes())
    print(OUT)


if __name__ == "__main__":
    main()
