import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsById, voteOnArticle, postComment } from '../api';
import '../css/Article.css';
import CommentList from './CommentList';

function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getArticle = async () => {
      try {
        const articleData = await fetchArticleById(articleId);
        setArticle(articleData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    const getComments = async () => {
      try {
        const commentData = await fetchCommentsById(articleId);
        setComments(commentData);
      } catch (error) {
      }
    };

    getArticle();
    getComments();
  }, [articleId]);

  const handleVote = async (voteValue) => {
    setIsVoting(true);

    // Optimistically update the local state
    const updatedArticle = {
      ...article,
      votes: article.votes + voteValue,
    };
    setArticle(updatedArticle);

    try {
      await voteOnArticle(articleId, voteValue);
      // If the API call is successful, the local state is already updated
    } catch (error) {
      console.error('Error voting on article:', error);
      // Revert changes made to the local state in case of API call failure
      setArticle(article);
      setErrorMessage('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleUpVote = () => handleVote(1);
  const handleDownVote = () => handleVote(-1);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      setError('Please write a comment');
      return;
    }

    setMessage('Posting...');
    setError('');

    try {
      await postComment(articleId, newComment);
      setMessage('Comment posted');
      setNewComment('');
    } catch (err) {
      setMessage('');
      setError(`An error occurred while posting the comment ${err.message}`);
    }
  };

  return (
    <div>
      <h2>{article.title}</h2>
      <img className='article-image' src={article.article_img_url} alt={article.title} />
      <p>Author: {article.author}</p>
      <p>Votes: {article.votes}</p>
      <button onClick={handleUpVote} disabled={isVoting}>Upvote</button>
      <button onClick={handleDownVote} disabled={isVoting}>Downvote</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className='article-body'>{article.body}</p>
      <br />
      <h3>Post a comment</h3>
      <textarea
        placeholder="Write your comment here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <br />
      <button onClick={handleSubmitComment}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
      <br />
      <CommentList comments={comments} />
    </div>
  );
}

export default Article;