import { withPrefix } from 'gatsby';

function Cover() {
  return (
    <div className="content leading-relaxed">
      <div className="pr-32 md:pr-56 text-right mb--4">
        <img
          src={withPrefix('regex.png')}
          alt="The James Williamson Possum Balloon"
          className="inline-block filter-bw-800"
        />
      </div>
      <div className="p-6 bg-teal-500 text-white">
        <h1 className="text-6xl pb-6 border-b-2 border-white leading-none font-serif">
          Googling for the regex
        </h1>
        <p className="text-xl mt-2 leading-tight">Every. Damn. Time.</p>
      </div>
    </div>
  );
}

export default Cover;
