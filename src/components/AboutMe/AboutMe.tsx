/**
 * @deprecated This component is no longer imported by any page.
 * The about page (src/pages/about.js) now renders its own intro section directly.
 * Safe to remove once confirmed no other consumers exist.
 */
import React, { FunctionComponent } from 'react';

import Avatar from '../Avatar/avatar';
import { H1 } from '../Container/Headers';
import ShareArticle from '../Footer/ShareArticle/shareArticle';

const AboutMe: FunctionComponent = () => {
  return (
    <div className="justify-center md:text-center">
      <H1>
        Tom Stagl <span className="block text-base normal-case">Senior Director Software Engineering</span>
      </H1>
      <div className="py-12">
        <Avatar avatarSize={32} className="justify-center" />
      </div>
      <div className="content-center pb-4 md:mx-auto ">
        <ShareArticle className="justify-center" />
      </div>
      <div>
        I build the machine that builds the software. As Senior Director of Software Engineering
        at Dynatrace, I lead a 350-person unit building the tooling, platforms, and infrastructure
        that 2,000+ engineers depend on every day. Now leading the shift to AI-first developer
        tooling — making AI agents first-class citizens on our developer platform.{' '}
        <span className="font-medium text-slate-900">
          Building the systems and teams that let engineers do their best work.
        </span>
      </div>
    </div>
  );
};

export default AboutMe;
