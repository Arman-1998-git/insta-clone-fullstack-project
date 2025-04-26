
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const BottomNav = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 px-2 sm:px-6 z-10">
      <Link to="/" className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-black' : 'text-gray-500'}`}>
        <Home className="w-6 h-6" strokeWidth={isActive('/') ? 2 : 1.5} />
      </Link>
      
      <Link to="/explore" className={`flex flex-col items-center justify-center ${isActive('/explore') ? 'text-black' : 'text-gray-500'}`}>
        <Search className="w-6 h-6" strokeWidth={isActive('/explore') ? 2 : 1.5} />
      </Link>
      
      <Link to="/create" className={`flex flex-col items-center justify-center ${isActive('/create') ? 'text-black' : 'text-gray-500'}`}>
        <Plus className="w-6 h-6" strokeWidth={isActive('/create') ? 2 : 1.5} />
      </Link>
      
      <Link to="/activity" className={`flex flex-col items-center justify-center ${isActive('/activity') ? 'text-black' : 'text-gray-500'}`}>
        <Heart className="w-6 h-6" strokeWidth={isActive('/activity') ? 2 : 1.5} />
      </Link>
      
      <Link 
        to={currentUser ? `/profile/${currentUser.username}` : "/login"} 
        className={`flex flex-col items-center justify-center ${isActive(`/profile/${currentUser?.username}`) ? 'text-black' : 'text-gray-500'}`}
      >
        {currentUser ? (
          <div className={`w-6 h-6 rounded-full overflow-hidden ${isActive(`/profile/${currentUser.username}`) ? 'border border-black' : ''}`}>
            <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        ) : (
          <User className="w-6 h-6" strokeWidth={1.5} />
        )}
      </Link>
    </div>
  );
};

export default BottomNav;
