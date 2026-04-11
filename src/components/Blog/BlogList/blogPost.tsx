import React from 'react';
import { Link } from 'gatsby';

function BlogPost({ post }) {
  const readMoreLink = `/blog/${post.slug}`;
  return (
    <article className="py-6 group">
      <time className="text-sm text-slate-400 tabular-nums" itemProp="datePublished" dateTime={post.meta.htmlFirstPublishedAt}>
        {post.meta.firstPublishedAt}
      </time>
      <Link to={readMoreLink} className="block border-0">
        <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mt-1">
          {post.title}
        </h2>
      </Link>
      <p className="mt-2 text-slate-600 line-clamp-2">
        {post.abstract}
      </p>
    </article>
  );
}

export default BlogPost;
