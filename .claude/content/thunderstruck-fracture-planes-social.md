# Social variants — thunderstruck 0.21: it depends on your stack

Post: https://tomstagl.com/blog/thunderstruck-fracture-planes/ (DatoCMS `fVLIGJ0vQsefz8BYulDzRQ`, published 2026-11-27)
Release: thunderstruck **v0.21.0**, published 2026-11-27 (tag `v0.21.0` at `1685297`, including the README logo from #158).
Video: `thunderstruck-fracture-planes.mp4` (1280×720, H.264 30 fps, 27.4 s, 0.6 MB; poster `thunderstruck-fracture-planes.poster.png`). Rebuild: `thunderstruck-fracture-planes-build_video.py` with `SPRING_DEMO` pointing at a scanned demo repository. The hit, the plane selection and the guidance are real `signals.py` and `bundle.py` output from thunderstruck 0.21 on a six-commit Spring Boot WebFlux demo repository built for the clip; captions are the only added text, and no model output is shown.

Facts used, all from the blog draft, which cites the thunderstruck repo (README, CHANGELOG 0.21.0, ticket #112, git log):
- `restTemplate.getForObject(…)` is correct in a Spring MVC controller (servlet thread built to block) and starves the event loop in a WebFlux handler
- A script picks the plane from a tracked `pom.xml` / Gradle build naming `spring-boot`, never the model; the scan records the plane, the matching file and a rubric hash
- Editing the rubric re-investigates and re-checks only what it touches; repositories no plane fits get byte-identical bundles
- Guidance is never evidence: a finding still has to cite code that fails
- The first plane, `java-spring`, covers 4 patterns (retry layers, blocking on reactive threads, locks across I/O, N+1 lazy loading); every other pattern is marked planned; an undeclared cell fails the build
- The seed plane is not calibrated: its effect on accuracy is not measured yet
- A measured change that did not ship: settings named in 11 of 13 claims (from 0 of 12), but one correct default-path finding was gated in every run; the main count was 9.67 vs 9.00 of 21, inside the spread over 3 runs each
- A CI job hung for 3 h 37 min because no job had a timeout

---

## X / Twitter — single post with video (post this first)

The same line of Java is correct in a Spring MVC controller and an outage in a WebFlux handler.

thunderstruck 0.21 now knows the difference. A script picks the stack's guidance from your build, never the model. And the guidance is never evidence: a finding still has to cite the code that fails.

[attach: thunderstruck-fracture-planes.mp4]

> Rationale: Spring engineers recognise the MVC/WebFlux trap instantly, so it works as the hook; the video shows the real hit and guidance, so the text only has to make the design point. Signal: video completion rate, and replies from Spring people arguing about edge cases. No link in the post; it goes in the reply.

**Reply 1 (links):**
Why the model doesn't get to decide what counts as protection, and the guidance change I measured and didn't ship: https://tomstagl.com/blog/thunderstruck-fracture-planes/
Repo (MIT, a Claude Code plugin): https://github.com/tomstagl/thunderstruck

---

## X / Twitter — thread (alternative, with the video on 1/)

1/ The same line of Java is correct in a Spring MVC controller and an outage in a WebFlux handler.

thunderstruck's detectors already knew that. The agents that read the code didn't. 0.21 fixes that.

[attach: thunderstruck-fracture-planes.mp4]

2/ A fracture plane is the maintainers' text on what counts as protection, pattern by pattern, for one stack.

A script turns it on when your pom.xml or Gradle build names spring-boot. The model never picks it, and the report says which plane ran and why.

3/ The rubric is hashed into what both agents read. Edit one paragraph and only the findings it touches are re-investigated.

A repo no plane fits gets byte-identical briefings, so its cached results stand.

4/ Guidance is never evidence. A finding still has to cite the code that fails, and a script checks every citation.

5/ The honest bit: the Spring plane is a seed, and I haven't measured whether it makes findings more accurate.

In the same release, a skeptic change looked like a clear win (11 of 13 claims named their setting, up from 0 of 12) and it didn't ship. The main score moved inside the noise.

6/ Every plane has to declare every pattern: written, n/a or planned. An undeclared one fails the build. Spring has 4 written cells today. A gap you can see is a backlog.

https://tomstagl.com/blog/thunderstruck-fracture-planes/

> Rationale: for people who want the mechanism and the measurement. Tweet 5 carries the argument. Signal: bookmarks and quote-posts.

---

## LinkedIn

The same line of Java is correct in one Spring service and an outage in the next.

In a Spring MVC controller, a blocking HTTP call runs on a servlet thread that was built to block. In a WebFlux handler, the same call runs on an event loop that serves many requests at once, and one slow dependency stalls every one of them. Every experienced Spring reviewer knows this. It rarely makes it into a checklist. It lives in a few people's heads and comes out as a review comment.

thunderstruck, the resilience scanner I build as a Claude Code plugin, now writes that knowledge down. Version 0.21 adds fracture planes: guidance on what counts as protection on one stack, starting with Spring Boot. Three rules keep it honest. A script picks the guidance from your build files, never the model. The guidance is hashed into what the agents read, so changing it re-checks exactly the findings it touches. And it is never evidence: a finding still has to cite the code that fails.

The part I'd bring to any team's review guidelines is the grid. Every plane must say, pattern by pattern, whether it is written, not applicable, or planned, and an undeclared cell fails the build. Spring has four written cells today. That grid looks embarrassingly empty, and that is the point: a gap you can see is a backlog, and a gap you can't is a guide everyone believes covers timeouts.

I haven't measured yet whether the Spring guidance makes findings more accurate, and the post says so. It also covers the change in the same release that looked like a clear win and didn't ship.

https://tomstagl.com/blog/thunderstruck-fracture-planes/

> Rationale: LinkedIn readers are leaders rather than Spring specialists, so the angle is review knowledge that lives in people's heads, and the declared-coverage grid as a practice to borrow. 280 words, link at the end (Content Strategy, Channels and Format). Signal: comments from engineering leaders about their own review guides.
