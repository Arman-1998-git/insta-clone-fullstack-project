
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users } from '../services/mockData';
import UserProfile from '../components/Profile/UserProfile';
import BottomNav from '../components/Navigation/BottomNav';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState(users[0]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Find the user by username
    const foundUser = users.find(u => u.username === username);
    
    if (foundUser) {
      setUser(foundUser);
    } else {
      // Redirect if user not found
      navigate('/notfound');
    }
    
    setLoading(false);
  }, [username, navigate, isAuthenticated]);
  
  if (loading || !isAuthenticated) {
    return (
      <div className="app-container flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="app-container bg-white">
      <UserProfile user={user} />
      <BottomNav />
    </div>
  );
};

export default Profile;
