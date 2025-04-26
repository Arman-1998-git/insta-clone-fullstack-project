
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';
import { Post as PostType, Comment } from '../../services/mockData';
import { toast } from "sonner";

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(post.hasLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [showAllComments, setShowAllComments] = useState(false);
  
  const toggleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      toast.success("Post saved to your collection");
    }
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        userId: "currentUser", // In a real app, this would be the current user's ID
        username: "currentUser", // In a real app, this would be the current user's username
        text: comment,
        timestamp: new Date().toISOString()
      };
      
      setComments([...comments, newComment]);
      setComment('');
    }
  };
  
  const displayComments = showAllComments ? comments : comments.slice(0, 2);
  
  return (
    <div className="border border-instagram-gray rounded-sm bg-white mb-4">
      {/* Post Header */}
      <div className="flex items-center px-4 py-3">
        <Link to={`/profile/${post.username}`} className="flex items-center">
          <img 
            src={post.userAvatar} 
            alt={post.username} 
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="font-semibold text-sm">{post.username}</span>
        </Link>
      </div>
      
      {/* Post Image */}
      <img 
        src={post.imageUrl} 
        alt="Post" 
        className="w-full object-cover max-h-[600px]"
        loading="lazy"
      />
      
      {/* Post Actions */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleLike}>
              <Heart 
                className={`${isLiked ? 'text-instagram-red fill-instagram-red' : 'text-instagram-black'}`}
                size={24}
              />
            </button>
            <button>
              <MessageSquare size={24} />
            </button>
          </div>
          <button onClick={toggleBookmark}>
            <Bookmark 
              className={isBookmarked ? 'text-instagram-black fill-instagram-black' : 'text-instagram-black'}
              size={24}
            />
          </button>
        </div>
        
        {/* Likes */}
        <div className="mt-1">
          <span className="font-semibold text-sm">{likesCount} likes</span>
        </div>
        
        {/* Caption */}
        <div className="mt-1 text-sm">
          <Link to={`/profile/${post.username}`} className="font-semibold mr-1">{post.username}</Link>
          <span>{post.caption}</span>
        </div>
        
        {/* Comments */}
        {comments.length > 0 && (
          <div className="mt-1">
            {comments.length > 2 && !showAllComments && (
              <button
                className="text-instagram-darkGray text-sm"
                onClick={() => setShowAllComments(true)}
              >
                View all {comments.length} comments
              </button>
            )}
            
            <div className="mt-1">
              {displayComments.map((comment) => (
                <div key={comment.id} className="text-sm mb-1">
                  <Link to={`/profile/${comment.username}`} className="font-semibold mr-1">
                    {comment.username}
                  </Link>
                  <span>{comment.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Timestamp */}
        <div className="mt-1">
          <span className="text-xs text-instagram-darkGray uppercase">
            {new Date(post.timestamp).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
      
      {/* Add Comment */}
      <div className="border-t border-instagram-gray">
        <form onSubmit={handleAddComment} className="flex items-center px-4 py-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-grow text-sm outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.trim() && (
            <button 
              type="submit" 
              className="text-instagram-blue font-semibold text-sm"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Post;
