import React, { useState, useEffect } from 'react';
import '../css/CommentList.css';

function CommentList({ comments }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (comments.length > 0) {
      setIsLoading(false);
    }
  }, [comments]);

  if (isLoading) {
    return <div className="loading-container">
      <p>Loading...</p></div>;
  }

  return (
    <div className='comments'>
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <p>{comment.body}</p>
          <p>Author: {comment.author}</p>
          <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>
          <p>Votes: {comment.votes}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
