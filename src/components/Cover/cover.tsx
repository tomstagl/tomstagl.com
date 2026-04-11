import { StaticImage } from 'gatsby-plugin-image';

function Cover() {
  return (
    <div className="leading-relaxed content">
      <div className="pr-32 text-right md:pr-56 mb--4">
        <StaticImage
          src="../../../static/regex.png"
          alt="The James Williamson Possum Balloon"
          className="inline-block filter-bw-800"
          loading="eager"
          layout="constrained"
          placeholder="blurred"
          height={600}
        />
      </div>
      <div className="p-6 text-white bg-slate-900">
        <h1 className="pb-6 font-serif text-6xl leading-none tracking-tight border-b-2 border-slate-700">
          Googling for the regex
        </h1>
        <p className="mt-2 text-xl leading-tight text-slate-300">Every. Damn. Time.</p>
      </div>
    </div>
  );
}

export default Cover;
