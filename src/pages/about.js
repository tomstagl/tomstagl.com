import React from 'react';

import { H2 } from '../components/Container/Headers';
import Section from '../components/Container/Section';
import SEO from '../components/seo';
import TimeLine from '../components/Timeline/Timeline';
import Layout from '../components/Layout/layout';

const About = () => (
  <Layout>
    <SEO
      title="About"
      description="Senior Director Software Engineering at Dynatrace. Leading 350 engineers building tooling, platforms, and infrastructure for 2000+ engineers. From writing code to leading at scale — now driving the shift to AI-first developer tooling."
    />
    <Section>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">About Me</h1>
      <div className="space-y-6">
        <p className="text-lg text-slate-600 leading-relaxed">
          I&apos;ve been in software since the 90s — as a programmer, a SCRUM pioneer, a CTO,
          and now as Senior Director running a 350-person engineering unit at Dynatrace. My team
          builds the tooling and infrastructure for 2,000+ engineers. The job is mostly about
          people and structure. The engineering background is why it works.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          My path here wasn&apos;t a straight line. I started writing code, fell into SCRUM in 2003
          when it was still the weird new thing, ran engineering teams for in-game commerce serving
          Riot Games and Rockstar, took a CTO seat at an Austrian scale-up, and spent time as a
          freelance coach. Every stop taught me something about what makes engineering organisations
          actually work — and what doesn&apos;t.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          The through-line across 20+ years:{' '}
          <span className="font-medium text-slate-900">
            build the systems and teams that let engineers do their best work.
          </span>
        </p>
      </div>
      <p className="text-center text-xl font-medium text-slate-800 py-4 border-y border-slate-200 mt-8">
        Still Googles for the regex. Still trusts the team.
      </p>
    </Section>

    <Section dark>
      <TimeLine timeLineData={timeLineData} />
    </Section>
    <Section>
      <H2 className="pt-4">Some of My Principles</H2>
      <ul className="p-6 list-outside list-disc">
        <li>
          If there was a production incident, write a{' '}
          <a
            target="_blank"
            className="underline"
            href="https://landing.google.com/sre/sre-book/chapters/postmortem-culture/"
            rel="noopener noreferrer"
          >
            <strong>proper Post Mortem</strong>
          </a>
        </li>
        <li>
          Meetings start on time, have an agenda - issued days before - and meeting minutes are
          taken and shared afterwards. <strong>Always!</strong>
        </li>
        <li>Ask the team, they know better</li>
        <li>Watch the baton, not the runner. Focus on outcome, not on output</li>
        <li>
          Metrics are important indicators for business performance and used to ask questions.
          Nothing more!
        </li>
        <li>
          If you don&apos;t like the style of your manager or team lead, it&apos;s your fault:
          Provide constructive feedback to your team lead. Allow her/him to get better.
        </li>
      </ul>
    </Section>
  </Layout>
);

const timeLineData = [
  {
    left: {
      header: 'SCRUM',
      text: 'First time got in touch with SCRUM in 2003 while I was working as Programm Manager for QPass. Took my first SCRUM master course with Boris Gloger in Manchester 2004.',
    },
    line: {
      year: 2003,
    },
  },
  {
    line: {
      year: 2004,
    },
    right: {
      header: 'SCRUM Master',
      text: "Next to my role as Programm Manager I took over the responsibility as acting SCRUM Master for two teams and I've been working with them until 2007.",
    },
  },
  {
    line: {
      year: 2007,
    },
    left: {
      header: 'Freelancing Software Engineer',
      text: "During my freelancing software engineering time I've worked with different frameworks and for different clients where I've also trained teams on using SCRUM and Extreme Programming practices to improve quality and turn around time. One of my clients during this time frame was 'fatfoogoo'. A company focusing on in-game commerce, which I've joined as fulltime employee in 2009.",
    },
  },
  {
    right: {
      header: 'Director Engineering - fatfoogoo / Digital River',
      text: "During my time at the in-game commerce market leader, 'fatfoogoo', I've conducted an agile transition. Establishing SCRUM for two partly remote teams. We delivered time critical initiatives for our clients, which included Riot Games, Pokemon, Rockstar Games and arena.net.",
    },
    line: {
      year: 2009,
    },
  },
  {
    line: {
      year: 2018,
    },
    left: {
      header: 'CTO - durchblicker.at',
      text: 'Started an agile transition with the help an external partner where we started off with one SCRUM team and built out a second one after a couple of months. One of my other responsibilities was attracting new talent for our teams.',
    },
  },
  {
    right: {
      header: 'Freelancing Business Agility Coach',
      text: 'Worked with small and medium-sized companies to support their journey toward business agility, helping teams find the practices that actually worked for them.',
    },
    line: {
      year: 2020,
    },
  },
  {
    left: {
      header: 'Director Software Engineering - Dynatrace',
      text: 'Joined Dynatrace to build and lead the engineering team behind the Dynatrace HUB — the platform\'s extension and app ecosystem. Built the team and the product from the ground up.',
    },
    line: {
      year: 2021,
    },
  },
  {
    right: {
      header: 'Director of Engineering - Dynatrace',
      text: 'Scope expanded beyond the HUB to include Platform Engineering and Application Security. Running multiple teams, responsible for tooling and infrastructure that the rest of engineering depends on.',
    },
    line: {
      year: 2023,
    },
  },
  {
    left: {
      header: 'Senior Director Software Engineering - Dynatrace',
      text: 'Leading a 350-person unit responsible for the tooling and infrastructure that 2,000+ Dynatrace engineers depend on. Also working out how AI fits into a developer platform — building it in rather than bolting it on.',
    },
    line: {
      year: 2024,
    },
  },
];
export default About;
