
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PostList from '../components/Post/PostList';
import BottomNav from '../components/Navigation/BottomNav';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="app-container bg-gray-50">
      <PostList />
      <BottomNav />
    </div>
  );
};

export default Index;
