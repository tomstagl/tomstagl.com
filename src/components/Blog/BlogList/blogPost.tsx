import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';
import BlogReadMoreLink from './blogReadMoreLink';

const BlogPost = ({ post, latest, last, className }) => {
  const readMoreLink = `/blog/${post.slug}/`;
  const publishedSince = post.meta.firstPublishedAt;
  const abstract = post.abstract;
  const blogImage = post.blogimage;

  const isFirstOrLast = (latestPost: boolean, lastPost: boolean) => {
    const latest = latestPost || false;
    const last = lastPost || false;
    return latest || last;
  };

  return (
    <article
      className={`py-4 relative overflow-hidden ${
        isFirstOrLast(latest, last) ? 'w-full' : 'w-full md:w-1/2'
      } ${className}`}
    >
      {blogImage && (
        <figure>
          <GatsbyImage
            image={blogImage.gatsbyImageData}
            className="rounded shadow"
            alt={blogImage.alt}
            title={post.title}
          />
          {blogImage.title && <figcaption>{blogImage.title}</figcaption>}
        </figure>
      )}
      <div className={isFirstOrLast(latest, last) ? 'block md:flex py-4' : undefined}>
        <header
          className={
            isFirstOrLast(latest, last) ? 'pr-0 w-full md:w-1/2 md:pr-2' : 'w-full flex-row'
          }
        >
          <Link
            className="font-bold text-teal-600 hover:text-teal-500"
            activeClassName="underline"
            to={readMoreLink}
          >
            <h2 className="text-2xl">{post.title}</h2>
          </Link>
          <p className="flex text-sm font-light text-gray-500">
            Published{' '}
            <time itemProp="datePublished" dateTime={post.meta.htmlFirstPublishedAt}>
              {publishedSince}
            </time>
          </p>
        </header>
        <div
          className={
            isFirstOrLast(latest, last) ? 'md:pt-1 md:w-1/2 md:pl-2 pl-0 w-full' : 'w-full'
          }
        >
          <p className="text-base">{abstract}</p>

          <BlogReadMoreLink link={readMoreLink} />
        </div>
      </div>
      <hr className="object-center w-2/3 max-w-sm mx-auto mt-2 bg-opacity-75 border-gray-300 border-dotted border-1" />
    </article>
  );
};

BlogPost.propTypes = {
  post: PropTypes.object.isRequired,
  latest: PropTypes.bool,
  last: PropTypes.bool,
  className: PropTypes.string,
};

export default BlogPost;
