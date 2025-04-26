
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CreatePost from '../components/Post/CreatePost';
import BottomNav from '../components/Navigation/BottomNav';

const Create = () => {
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
    <div className="app-container bg-white">
      <CreatePost />
      <BottomNav />
    </div>
  );
};

export default Create;
