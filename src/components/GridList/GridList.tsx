import React from 'react'

import { H2, H3 } from '../Container/Headers'

const GridList = () => {
  return (
    <>
      <div className="lg:text-center">
        <H2>My Services</H2>
        <h4>
          Starting agile transitions should only have one goal; to{' '}
          <span className="text-teal-600 font-bold">
            make your company successful
          </span>
          . Making a company successful requires different disciplines. Each one
          applied carefully will lead to an organisition which is acting with
          agility.
        </h4>
      </div>

      <div className="mt-10">
        <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
          <li>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  There is more than processes and tools
                </h4>
                <p className="mt-2 text-base leading-6 text-gray-500">
                  A carefully started agile transition focuses not only on
                  existing processes but mainly on the people and interactions
                  in your company. An agile transition also requires a culture
                  change to truly empower your employees.{' '}
                </p>
                <p className="font-bold text-teal-800">
                  I will guide you to take the right steps during your agile
                  transition journey.
                </p>
              </div>
            </div>
          </li>
          <li className="mt-10 md:mt-0">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  Balance between goals and execution
                </h4>
                <p className="mt-2 text-base leading-6 text-gray-500">
                  Goal setting in an agile environment has to help you to find
                  your north start, and the goals also needs to stay adjustable.
                  Using OKRs is one of the powerful ways to set your big and
                  bold goals which then can be transformed into your preferred
                  agile framework.
                </p>
                <p className="font-bold text-teal-800">
                  I support you with the setup and during the execution of OKRs.
                </p>
              </div>
            </div>
          </li>
          <li className="mt-10 md:mt-0">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  Connecting the dots
                </h4>
                <p className="mt-2 text-base leading-6 text-gray-500">
                  Starting with SCRUM requires some roles to be filled. Usually
                  it takes some time for recruiting a SCRUM Master and turning
                  one team member into a SCRUM Master is not the best idea.
                </p>
                <p>
                  I can take over the role as a SCRUM Master and also support
                  your recruiting process.
                </p>
              </div>
            </div>
          </li>
          <li className="mt-10 md:mt-0">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded bg-teal-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  Effective Communications
                </h4>
                <p className="mt-2 text-base leading-6 text-gray-500">
                  Getting a good set of action items during the agile transition
                  retrospective is quiet easy, executing them falls short from
                  time to time.
                </p>
                <p className="font-bold text-teal-800">
                  I keep nodging so that you can keep up your pace and continue
                  improving.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default GridList
