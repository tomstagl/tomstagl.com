#!/usr/bin/env python3
"""X/Twitter clip and blog hero for thunderstruck 0.21 (fracture planes).

The detector hit, the selected plane and the plane guidance are real output of
thunderstruck 0.21's deterministic stages (`signals.py`, `bundle.py`) on a
six-commit Spring Boot WebFlux demo repository (SPRING_DEMO below, built by hand
for this clip). Captions are the only added text. No model output is shown.

Usage: thunderstruck-fracture-planes-build_video.py [out.mp4]
Needs: ffmpeg, a headless Chrome (CHROME), the thunderstruck checkout (THUNDERSTRUCK).
"""
import html, json, os, pathlib, subprocess, sys, tempfile

HERE = pathlib.Path(__file__).resolve().parent
TS = pathlib.Path(os.environ.get("THUNDERSTRUCK", str(pathlib.Path.home() / "code/thunderstruck")))
SPRING_DEMO = pathlib.Path(os.environ.get("SPRING_DEMO", ""))
CHROME = os.environ.get("CHROME") or str(pathlib.Path.home() / "Library/Caches/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-mac-x64/chrome-headless-shell")
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "thunderstruck-fracture-planes.mp4"
W, H = 1280, 720

FONTS = f"""
@font-face {{ font-family: 'Plex Cond'; src: url('file://{TS}/brand/fonts/PlexSansCondensed-Bold.ttf'); }}
@font-face {{ font-family: 'Plex Mono'; src: url('file://{TS}/brand/fonts/PlexMono-Medium.ttf'); }}
"""
BASE = FONTS + """
* { box-sizing: border-box; }
body { margin: 0; width: %(w)dpx; height: %(h)dpx; background: #0E1318; color: #C9D1DC;
       font-family: 'Plex Mono', monospace; overflow: hidden; }
.wrap { position: absolute; inset: 0; padding: 48px 64px; display: flex; flex-direction: column; gap: 28px; justify-content: center; }
h1 { margin: 0; font-family: 'Plex Cond', sans-serif; font-size: 84px; line-height: 1.05; color: #F1F3F6; font-weight: 700; }
h2 { margin: 0; font-family: 'Plex Cond', sans-serif; font-size: 50px; line-height: 1.1; color: #F1F3F6; font-weight: 700; }
.k { color: #D97757; } .m { color: #8B95A7; } .w { color: #F1F3F6; }
.eyebrow { font-size: 24px; letter-spacing: .08em; text-transform: uppercase; color: #D97757; }
.box { background: #131A22; border: 1px solid #263140; border-radius: 12px; padding: 24px 28px; font-size: 25px; line-height: 1.5; white-space: pre-wrap; }
.hot { background: #2A1B14; outline: 1px solid #D97757; border-radius: 4px; }
.cols { display: flex; gap: 24px; }
.cols > div { flex: 1; }
.tag { display: inline-block; padding: 4px 14px; border-radius: 99px; font-size: 21px; }
.ok { background: #1C2A22; color: #9FD3B0; } .bad { background: #D97757; color: #0E1318; }
"""


def demo_facts():
    """The hit and the guidance, read from the demo repository's own scan output."""
    hs = json.loads((SPRING_DEMO / ".thunderstruck/hotspots.json").read_text())
    plane = hs["planes"][0]
    hit = next(h for h in hs["hotspots"][0]["detector_hits"] if h["pattern_id"] == "S27")
    bundle = (SPRING_DEMO / ".thunderstruck/bundles/H01.md").read_text()
    s27 = bundle.split("#### S27", 1)[1].split("####", 1)[0].split("## Source", 1)[0].strip().replace("`", "")
    return plane, hit, s27


def scenes():
    plane, hit, s27 = demo_facts()
    line = "restTemplate.getForObject(pricing + id, String.class)"
    does_not = s27.split("**Does not count.**", 1)[1].split("**Baseline.**", 1)[0].strip()
    baseline = s27.split("**Baseline.**", 1)[1].strip().split(". ")[0] + "."
    e = html.escape
    return [
        (3.2, f"""<div class="wrap"><div class="eyebrow">thunderstruck 0.21</div>
          <h1>One line of Java.</h1><div class="box w">{e(line)}</div></div>"""),
        (5.0, f"""<div class="wrap"><h2>Correct on one Spring stack. An outage on the other.</h2><div class="cols">
          <div class="box"><span class="tag ok">Spring MVC controller</span>\n\n<span class="w">{e(line)}</span>\n\n<span class="m">servlet thread, built to block</span></div>
          <div class="box"><span class="tag bad">WebFlux handler</span>\n\n<span class="w hot">{e(line)}</span>\n\n<span class="m">event loop: one slow call starves every request it serves</span></div>
          </div></div>"""),
        (4.6, f"""<div class="wrap"><h2>A script picks the stack's guidance from your build. Never the model.</h2>
          <div class="box"><span class="m">.thunderstruck/hotspots.json</span>
<span class="w">"planes": [ {{ "id": "<span class="k">{e(plane['id'])}</span>", "matched_by": "<span class="k">{e(plane['matched_by'])}</span>" }} ]</span>

<span class="m">lead</span>  <span class="w">{e(hit['ref'])}</span>
<span class="m">      {e(hit['note'])}</span></div></div>"""),
        (6.2, f"""<div class="wrap"><h2>The investigator and the skeptic read the same rubric.</h2>
          <div class="box" style="font-size: 22px"><span class="m">bundle · Plane guidance · java-spring · S27</span>

<span class="k">Does not count.</span> <span class="w">{e(does_not)}</span>

<span class="k">Baseline.</span> <span class="w">{e(baseline)}</span></div></div>"""),
        (3.8, """<div class="wrap"><h1>Guidance, never evidence.</h1>
          <div style="font-size: 32px; line-height: 1.5" class="w">A finding still has to cite the code that fails,<br>and every citation is checked by a script.</div></div>"""),
        (4.2, f"""<div class="wrap" style="align-items: center; text-align: center">
          <img src="file://{TS}/brand/svg/thunderstruck-lockup-horizontal-dark.svg" style="width: 760px">
          <div class="w" style="font-size: 30px">0.21 · fracture planes, starting with Spring Boot</div>
          <div class="box k" style="font-size: 26px">/plugin install thunderstruck@thunderstruck</div></div>"""),
    ]


def shoot(body, path, w=W, h=H):
    page = path.with_suffix(".html")
    page.write_text(f"<!doctype html><meta charset='utf-8'><style>{BASE % {'w': w, 'h': h}}</style><body>{body}</body>")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    f"--window-size={w},{h}", "--force-device-scale-factor=1", "--virtual-time-budget=2000",
                    f"--screenshot={path}", f"file://{page}"], check=True, capture_output=True)


def main():
    tmp = pathlib.Path(tempfile.mkdtemp())
    sc = scenes()
    frames = []
    for i, (dur, body) in enumerate(sc):
        p = tmp / f"s{i}.png"; shoot(body, p); frames.append((dur, p))
    # crossfade the stills: each scene holds, then a 0.4 s fade into the next
    fade = 0.4
    args = ["ffmpeg", "-y", "-loglevel", "error"]
    for dur, p in frames:
        args += ["-loop", "1", "-t", f"{dur + fade:.2f}", "-i", str(p)]
    chain, last, offset = [], "0:v", 0.0
    for i in range(1, len(frames)):
        offset += frames[i - 1][0]
        out = f"v{i}"
        chain.append(f"[{last}][{i}:v]xfade=transition=fade:duration={fade}:offset={offset:.2f}[{out}]")
        last = out
    args += ["-filter_complex", ";".join(chain) + f";[{last}]format=yuv420p[out]", "-map", "[out]",
             "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-movflags", "+faststart", str(OUT)]
    subprocess.run(args, check=True)
    poster = OUT.with_suffix(".poster.png")
    poster.write_bytes(frames[1][1].read_bytes())
    # blog hero, 2400×960: the lockup over the S27 guidance
    _, hit, s27 = demo_facts()
    does_not = s27.split("**Does not count.**", 1)[1].split("**Baseline.**", 1)[0].strip()
    hero = HERE / "thunderstruck-fracture-planes-hero.png"
    shoot(f"""<div class="wrap" style="padding: 120px 160px; gap: 56px">
      <img src="file://{TS}/brand/svg/thunderstruck-lockup-horizontal-dark.svg" style="width: 1100px">
      <div class="box" style="font-size: 30px; line-height: 1.55"><span class="m">Plane guidance · java-spring · S27</span>
<span class="k">Does not count.</span> <span class="w">{html.escape(does_not)}</span></div></div>""", hero, 2400, 960)
    print(OUT, poster, hero)


if __name__ == "__main__":
    main()
