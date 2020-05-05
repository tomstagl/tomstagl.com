import React from 'react'

const BlogPost = (props) => {
  //console.log(props.post)

  return (
    <div className="pb-1">
      <h3>{props.post.title}</h3>
    </div>
  )
}

export default BlogPost
