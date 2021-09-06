import React, { FunctionComponent } from 'react';

const FrequentlyAskedQuestions: FunctionComponent = () => {
  return (
    <div>
      <div className="mb-20 text-center">
        <h1 className="mb-4 text-2xl font-medium text-center text-gray-900 sm:text-3xl title-font">
          Frequently Asked Question
        </h1>
        <p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4">
          The most common questions about how our business works and what can do for you.
        </p>
      </div>
      <div className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2">
        <div className="w-full px-4 py-2 lg:w-1/2">
          <details className="mb-4">
            <summary className="px-4 py-2 font-semibold bg-gray-200 rounded">
              How Long is this site live?
            </summary>

            <span>
              Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute deserunt esse
              ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa magna in aute.
            </span>
          </details>
          <details className="mb-4">
            <summary className="px-4 py-2 font-semibold bg-gray-200 rounded">
              Can I install/upload anything I want on there?
            </summary>

            <span>
              Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute deserunt esse
              ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa magna in aute.
            </span>
          </details>
          <details className="mb-4">
            <summary className="px-4 py-2 font-semibold bg-gray-200 rounded">
              How can I migrate to another site?
            </summary>

            <span>
              Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute deserunt esse
              ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa magna in aute.
            </span>
          </details>
        </div>
        <div className="w-full px-4 py-2 lg:w-1/2">
          <details className="mb-4">
            <summary className="px-4 py-2 font-semibold bg-gray-200 rounded">
              Can I change the domain you give me?
            </summary>

            <span className="px-4 py-2">
              Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute deserunt esse
              ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa magna in aute.
            </span>
          </details>
          <details className="mb-4">
            <summary className="px-4 py-2 font-semibold bg-gray-200 rounded">
              How many sites I can create at once?
            </summary>

            <span className="px-4 py-2">
              Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute deserunt esse
              ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa magna in aute.
            </span>
          </details>
          <details className="mb-4">
            <summary className="px-4 py-2 font-semibold bg-gray-200 rounded">
              How can I communicate with you?
            </summary>

            <span className="px-4 py-2">
              Laboris qui labore cillum culpa in sunt quis sint veniam. Dolore ex aute deserunt esse
              ipsum elit aliqua. Aute quis minim velit nostrud pariatur culpa magna in aute.
            </span>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
