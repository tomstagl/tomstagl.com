---
title: "thunderstruck 0.21: it depends on your stack"
subtitle: "The same line of Java is correct in one Spring service and an outage in the next. A resilience scanner has to know which, without letting a model decide."
slug: "thunderstruck-fracture-planes"
abstract: "thunderstruck is a Claude Code plugin that finds where a codebase will fail under load and proves each claim with real file:line and commit evidence. Version 0.21 adds fracture planes: stack-specific guidance on what counts as protection, picked by a script, versioned, and never treated as evidence."
seo_title: "thunderstruck 0.21: fracture planes, stack-specific resilience guidance — Tom Stagl"
seo_description: "thunderstruck 0.21 adds fracture planes: maintainer-written guidance on what counts as protection on one stack, starting with Spring Boot. A script selects it, a hash versions it, and it is never evidence."
blogimage: "thunderstruck-fracture-planes-hero.png (2400×960) — alt: The thunderstruck logo, a level meter whose needle is a lightning bolt, above a quote from the Spring plane: a blocking call inside a Reactor operator or WebFlux handler with no offload starves every request the event loop serves."
status: published
video: "thunderstruck-fracture-planes.mp4 (1280×720, 27.4 s) — a text block before 'What I have not shown', as in the Workflow-runs post"
datocms: "fVLIGJ0vQsefz8BYulDzRQ (published 2026-11-27)"
live: "https://tomstagl.com/blog/thunderstruck-fracture-planes/"
---

# Sections

## (no title)

`restTemplate.getForObject(url, String.class)` is correct Java. Put it in a Spring MVC controller and it runs on a servlet thread that was built to block. Put the same line inside a WebFlux handler and it runs on an event-loop thread that serves many requests at once, and one slow pricing service now stalls every one of them.

Every experienced Spring reviewer knows this. It is also exactly the kind of knowledge that never makes it into a checklist. It sits in two or three people's heads and comes out as a review comment: "fine in MVC, not here." When those people are on holiday, the line merges.

I have been building a tool that is supposed to catch that line. Its detectors already knew the difference. The agents that read the code and decide what it means never did: the distinction lived in a design note, where neither of them could see it. Version 0.21 is about fixing that without breaking the one rule the whole project rests on.

## What thunderstruck is

thunderstruck is a Claude Code plugin that finds where a codebase is most likely to fail in production. Deterministic scripts rank the fracture points by churn, complexity and missing stability patterns: 23 of them, from Nygard's *Release It!*, the Amazon Builders' Library, the Google SRE book and the metastable-failure literature. Then a read-only agent reads each flagged file and its git history and writes a falsifiable hypothesis: what triggers the failure, what amplifies it, and what keeps it failing after the trigger is gone. That last part, the sustaining effect, is the one reviews miss, and the reason incidents outlive their causes.

The rule I care about most is that models do judgment and scripts do everything that must be reproducible. Every file:line and commit SHA a finding cites is resolved by a script, and a finding that rests only on a pattern match is rejected. A second agent, a skeptic, tries to refute each finding before it can be reported with high confidence. Run the deterministic stages twice on an unchanged repository and you get the same bytes, which is what lets a re-scan skip everything that has not changed.

## Why generic guidance fails

A stability pattern says what fails: "no blocking calls on event-loop threads." It does not say what counts as protection on your stack. On Spring, the thread a call runs on decides what it costs. A blocking call in an MVC controller is correct. `.block()` on a `WebClient` from MVC is the documented way to use it. The same calls inside a Reactor operator are the bug.

thunderstruck's detector for this pattern is narrow on purpose: it fires on a blocking call near a `Mono` or `Flux` with no offload, and it has negative samples for the MVC cases. But a detector only produces a lead. The investigator decides whether the lead is a failure, and the skeptic decides whether to refute it, and until now both did that from generic advice. An investigator with only generic advice can credit code that merely looks protected, or call a correct MVC call a bug. A skeptic with nothing stack-specific has no basis to refute either. A false positive on correct code is worse than a miss, because people stop trusting the findings, and the true positives get ignored along with the noise.

The obvious fix is to let the model work out which stack it is looking at and judge accordingly. It would mostly work. It would also mean that what counts as protection changes from run to run, nobody can say what the agent was told, and two scans of the same commit can disagree for no reason you can point at. That is the one door I do not want to open.

## Fracture planes

A fracture plane is a file of guidance, written by the plugin's maintainers, on what counts as protection for each pattern on one stack. For each pattern it has three short paragraphs: what counts as protection, what does not, and the baseline, meaning what is idiomatic and correct and must not be flagged. The first plane is `java-spring`. It covers four patterns where Spring changes the answer: stacked retry layers, blocking calls on reactive threads, locks held across I/O, and N+1 lazy loading.

Three decisions do most of the work.

**A script picks the plane, never the model.** The plane is active when a tracked `pom.xml` or Gradle build names `spring-boot`. The scan records which plane it applied, the file that matched, and a hash of the rubric. The report prints it as one line: `Planes applied: java-spring (matched pom.xml)`.

**The guidance is versioned like code.** The rubric goes into the bundle the investigator reads and the brief the skeptic reads, so it is covered by both of their hashes. If I edit the S27 paragraph, every hotspot that paragraph touches is re-investigated and every verdict re-checked on the next scan, and nothing else is. A repository no plane fits gets bundles that are byte-identical to the previous release, so its cached findings and settled verdicts stand. Upgrading is free unless the upgrade changes what you are told.

**Guidance is never evidence.** Both agents are told that the plane is the maintainers' text, not the repository's, and a finding still needs code that fails. Nothing can cite a rubric. The plane can tell the skeptic that `subscribeOn(Schedulers.boundedElastic())` is real protection, so a finding about an offloaded call gets refuted, but only by pointing at the line that does the offloading.

There is one more piece, which is the one I would steal for any team's review guidelines. Every plane has to declare every pattern: written, not applicable, or planned. Anything undeclared fails the build, and a generated matrix shows the whole grid. Today the Spring plane has four written cells, and every other pattern is marked planned. That is an embarrassingly empty grid, and I prefer it that way. A gap you can see is a backlog. A gap you cannot see is how a team ends up believing its review guide covers timeouts when nobody ever wrote that section.

## (no title)

<video controls muted playsinline preload="metadata" poster="https://www.datocms-assets.com/27929/1795766315-thunderstruck-fracture-planes-poster.png" style="width:100%;height:auto;border-radius:8px">
  <source src="https://www.datocms-assets.com/27929/1795766319-thunderstruck-fracture-planes.mp4" type="video/mp4">
</video>

*27 seconds, no sound: one line of Java on two Spring stacks, then the plane a script selected and the guidance both agents read. The hit, the plane and the guidance are thunderstruck 0.21's own output on a small Spring Boot demo repository.*

## What I have not shown

The Spring plane is marked `seed`, not `calibrated`, and that label is honest. I have not measured whether it makes findings on real Spring services more accurate. The guidance is the distinction the Java detectors already encode, written down, and the tests prove the plumbing: deterministic selection, hashes that change when they should and stay identical when they should not, a gate that fails on an undeclared cell. They do not prove the advice is good. Calibrating it needs labelled findings on real Spring repositories, and those take time to collect.

I take this seriously because of the other item in the same release. I tried showing the skeptic how to name the configuration setting a finding depends on. On the labelled Celery set, checks went from naming a setting in 0 of 12 claims to 11 of 13. It looked like an obvious win. But one correct finding on the default path was marked as needing a setting in every run, and the benchmark's main count moved from 9.00 to 9.67 of 21 over three runs each, inside the run-to-run spread. So it did not ship. The measurement is in the changelog, next to the feature that did ship.

It is the same lesson as the coach in [cctop](https://tomstagl.com/blog/cctop-htop-for-claude-code/), which measures its own nudges against a control arm: guidance is an intervention, and interventions can be net negative. Advice to a model is no exception. If you cannot say whether your guidance changed the outcome, you have a confident paragraph, not an improvement.

## How it was built

The design and the plan were written first, as a ticket and two documents, and then built as four pull requests, each test-first and each merged before the next began. All four landed on 26 November. Most of the code was written by Claude Code in a session I steered and reviewed. That is normal for this project: 99 of the 122 commits on main since September carry a Claude co-author line.

It was not all clean. Midway through, a CI job rendering the HTML report in Chromium hung for three hours and thirty-seven minutes, because none of the jobs had a timeout. A tool whose first stability pattern is "every external call has a timeout" had a build pipeline with no timeouts at all. The fix was a separate pull request that gave every job one.

## Try it

```
/plugin marketplace add tomstagl/thunderstruck
/plugin install thunderstruck@thunderstruck
/thunderstruck-scan
```

No API key, no account and no telemetry. The scripts run locally, never build or execute your project, and what reached the model sits in `.thunderstruck/bundles/` for you to read. Detectors ship for TypeScript, JavaScript, Python and Java. The plane only switches on for Spring Boot, and everything else scans exactly as before.

The repository is [github.com/tomstagl/thunderstruck](https://github.com/tomstagl/thunderstruck), MIT licensed. If you run Spring services and have opinions on what the planned cells should say, especially timeouts and backoff on Spring's HTTP clients, that is the most useful issue you could open.
