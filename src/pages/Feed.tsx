
import PostList from '../components/Post/PostList';
import BottomNav from '../components/Navigation/BottomNav';

const Feed = () => {
  return (
    <div className="app-container bg-gray-50">
      <PostList />
      <BottomNav />
    </div>
  );
};

export default Feed;
