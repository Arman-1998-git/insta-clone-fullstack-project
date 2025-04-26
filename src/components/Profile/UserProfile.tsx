
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Post, posts as initialPosts } from '../../services/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const { currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const userPosts = initialPosts.filter(post => post.userId === user.id);
  
  const handleFollowToggle = () => {
    if (!currentUser) {
      toast.error('You need to be logged in to follow users');
      return;
    }
    
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
    } else {
      setFollowersCount(followersCount + 1);
    }
    
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? `Unfollowed ${user.username}` : `Following ${user.username}`);
  };
  
  const isOwnProfile = currentUser?.id === user.id;
  
  return (
    <div className="pb-16">
      {/* Profile Header */}
      <div className="p-4 border-b border-instagram-gray">
        <div className="flex items-center">
          {/* Profile Picture */}
          <div className="mr-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center mb-3 flex-wrap">
              <h2 className="text-xl font-light mr-4">{user.username}</h2>
              
              {isOwnProfile ? (
                <Button variant="outline" size="sm" className="text-sm">
                  Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={handleFollowToggle}
                  size="sm"
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? "text-sm" : "bg-instagram-blue text-sm"}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap text-sm mb-3">
              <div className="mr-5">
                <span className="font-semibold">{user.postsCount}</span> posts
              </div>
              <div className="mr-5">
                <span className="font-semibold">{followersCount}</span> followers
              </div>
              <div>
                <span className="font-semibold">{user.followingCount}</span> following
              </div>
            </div>
            
            <div className="text-sm">
              <div className="font-semibold">{user.fullName}</div>
              {user.bio && <div>{user.bio}</div>}
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Tabs */}
      <div className="flex border-t border-instagram-gray">
        <button className="flex-1 py-2 text-sm font-semibold text-center border-t-2 border-instagram-black">
          POSTS
        </button>
        <button className="flex-1 py-2 text-sm text-instagram-darkGray text-center">
          SAVED
        </button>
        <button className="flex-1 py-2 text-sm text-instagram-darkGray text-center">
          TAGGED
        </button>
      </div>
      
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {userPosts.length > 0 ? (
          userPosts.map((post: Post) => (
            <div key={post.id} className="aspect-square relative">
              <img 
                src={post.imageUrl} 
                alt="Post" 
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-instagram-darkGray">
            <p>No posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
