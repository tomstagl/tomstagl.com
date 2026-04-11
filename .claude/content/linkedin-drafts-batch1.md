# LinkedIn Drafts — Agentic Platform Engineering (Batch 1)

---

## Post 1: The Category-Defining Post — What Is Agentic Platform Engineering?

Your developer platform has a new user. It doesn't have a Slack avatar. It doesn't attend standup. And it's about to file 200 pull requests before lunch.

We've spent years building internal developer platforms for humans — golden paths, self-service infra, developer portals. Good. Necessary. Not enough anymore.

At Dynatrace, I lead the teams building tooling and infrastructure for 2,000+ engineers. We're now designing for a world where AI agents are first-class users of that platform. I'm calling this **agentic platform engineering** because it needs a name, and "AI stuff" isn't going to cut it in your architecture docs.

What does it actually mean? It means your platform needs to answer questions it never had to before:

- How does an AI agent authenticate to your internal services?
- Who's accountable when an agent merges code that breaks production?
- How do you rate-limit something that never sleeps?
- What does your CI/CD pipeline look like when half the commits aren't from humans?
- How do you observe and govern agent behavior at scale?

This isn't a future problem. If your engineering org is adopting Copilot, Cursor, or any coding agent, your platform is already serving non-human users. You just haven't designed for it yet.

The platform teams that figure this out first won't just be "enabling AI." They'll be defining how software gets built for the next decade.

Is your platform team already thinking about agents as users — or still treating AI as just another IDE plugin?

---

## Post 2: The Reality Check — What Actually Changes When Agents Become Platform Users

Everyone's talking about AI agents writing code. Nobody's talking about the plumbing.

Here's the unglamorous reality: when AI agents become real users of your developer platform, the first thing that breaks isn't your code quality. It's your infrastructure assumptions.

At Dynatrace, we're building the platform layer for 2,000+ engineers — and increasingly, for the agents working alongside them. Here's what actually changes:

**Identity and access.** Your auth model assumed humans. Agents need service identities, scoped permissions, and audit trails that map agent actions back to the human who initiated them. Your RBAC model just got a new dimension.

**Cost visibility.** When an agent can spin up 50 CI runs in a minute, your cloud bill becomes a governance problem. You need per-agent cost attribution yesterday.

**Observability.** Human developers leave breadcrumbs — Slack messages, Jira comments, commit messages with context. Agents leave API calls. If you can't trace an agent's decision chain, you can't debug what went wrong.

**Rate limiting and guardrails.** Humans are self-throttling. They get tired, go to lunch, have meetings. Agents don't. Every API, every service, every pipeline needs to account for request volumes that humans would never generate.

**Governance.** Who approved this change? "The agent" isn't an acceptable answer in a regulated environment.

None of this is glamorous. None of it will make the keynote. But it's the difference between "we're experimenting with AI" and "AI agents are production-grade participants in our engineering org."

What's the first piece of infrastructure that broke when your team started using AI agents?

---

## Post 3: The Adoption Story — What Driving AI Adoption Across 350 Engineers Actually Looks Like

I lead an AI adoption stream for 350 engineers. Here's what the vendor pitch doesn't tell you: adoption is a people problem wearing a technology costume.

You'd think the hard part would be choosing the right tools. It's not. The hard part is the engineer with 15 years of experience who feels like you're telling them their skills don't matter anymore. The hard part is the team that's been burned by three "transformative" initiatives and has built up antibodies to anything with a keynote.

Here's what we actually did — the messy version:

**We started with volunteers, not mandates.** The engineers who were already experimenting became our multipliers. We gave them space, tools, and air cover. Forcing adoption top-down would have created compliance, not capability.

**We measured the wrong things first.** Lines of code generated? Useless metric. We had to learn that the right question wasn't "how much code did the AI write" but "did the engineer ship faster with higher confidence?"

**We built feedback loops, not training programs.** Weekly office hours where people shared what worked, what didn't, what felt weird. The "what felt weird" part was the most valuable — that's where the real friction lives.

**We accepted uneven adoption.** Some teams went all-in within weeks. Others needed months. That's fine. Sustainable adoption is lumpy. If your adoption curve is perfectly smooth, people are probably lying to you on the survey.

The biggest unlock wasn't a tool. It was making it safe to be bad at something new.

What's been the hardest part of AI adoption in your engineering org — the technology or the culture?

---

## Post 4: The Controversial Take — What Most Companies Get Wrong About AI in Engineering

Hot take: most companies are optimizing AI for individual developer productivity. That's the wrong unit of analysis, and it's going to cost them.

Here's what I see at Dynatrace, where I build the infrastructure for 2,000+ engineers: the real leverage isn't making one developer 30% faster. It's redesigning the system — the platform, the workflows, the feedback loops — so the entire engineering organization operates differently.

Giving every developer a code assistant and calling it "AI transformation" is like giving every factory worker a power drill and calling it "industrialization." The power drill helps. But the factory changed the world.

The companies that will win aren't the ones with the best individual AI tools. They're the ones rebuilding their developer platforms to be AI-native — where agents handle the toil, humans handle the judgment, and the platform orchestrates the whole thing.

What does this look like in practice?

- **Not:** AI suggests code completions. **Instead:** Agents autonomously handle the entire test-fix-verify cycle for well-defined bug classes.
- **Not:** AI writes boilerplate. **Instead:** The platform generates and maintains entire service scaffolds, keeping them in sync with evolving standards.
- **Not:** AI summarizes PRs. **Instead:** Agent-driven CI pipelines that flag architectural drift before humans even review.

The companies spending millions on seat licenses for copilots while their CI/CD pipeline is still duct tape and Jenkins? They're buying power drills for a factory that doesn't exist yet.

Build the factory. The drills will take care of themselves.

What's your org investing in — better individual tools or better systems?

---

## Post 5: The Career Arc Post — What Didn't Change in 20 Years

20 years ago I was a SCRUM master with a whiteboard and a pack of sticky notes. Today I lead 350 engineers building AI-powered developer tooling at Dynatrace.

The tech stack has changed roughly 47 times. The fundamental job hasn't changed once.

It's still about removing friction so people can do their best work.

As a SCRUM master, I removed process friction — unnecessary meetings, unclear priorities, blockers that nobody was unblocking. As a CTO at a startup, I removed technical friction — bad architecture, missing automation, decisions nobody wanted to make. Now, leading platform engineering at scale, I remove systemic friction — building the infrastructure and tooling that lets 2,000+ engineers ship without fighting their own systems.

The AI chapter is the same story with different nouns. The friction today is: engineers spending hours on tasks that agents could handle in minutes. Manual toil that compounds across an org of thousands. Platform assumptions built for a world where every action had a human behind it.

What throws people off about career arcs like this is that it looks like reinvention. It isn't. Every role taught me the same lesson from a different altitude:

- SCRUM master: understand what blocks a team.
- Developer: understand what blocks the code.
- CTO: understand what blocks the company.
- Sr. Director: understand what blocks the system.

The altitude changes. The question doesn't: *what's in the way, and how do I remove it?*

If you're early in your engineering career wondering whether to specialize or generalize — my honest answer is: learn to see friction. The technology will keep changing. The ability to identify and remove what slows people down will always be the job.

What's the thread that connects the different chapters of your career?
