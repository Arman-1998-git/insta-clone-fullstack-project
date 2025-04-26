
import { useState } from 'react';
import { Post } from './Post';
import { posts as initialPosts, stories } from '../../services/mockData';

export const PostList = () => {
  const [posts] = useState(initialPosts);
  
  return (
    <div className="mb-16">
      {/* Stories */}
      <div className="flex space-x-4 overflow-x-auto px-4 py-4 bg-white border-b border-instagram-gray scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center">
            <div className={`story-circle ${!story.hasUnseenStories && 'opacity-50'}`}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <img 
                  src={story.avatar} 
                  alt={story.username} 
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs mt-1 truncate w-16 text-center">{story.username}</span>
          </div>
        ))}
      </div>
      
      {/* Posts */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
