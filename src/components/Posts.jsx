import React from 'react'

const Posts = ({ filteredPosts }) => {

    return (
        <div>
            {
                filteredPosts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.text}</p>
                        {post.tags.map((tag, idx) => (
                            <span key={`#${tag}-${idx}`}>{`#${tag}`}</span>
                        ))}
                        <div>------------------</div>
                        {/* <img src={post.imageUrl} alt={post.title} /> */}
                    </div>
                ))
            }
        </div>
    )
}

export default Posts
