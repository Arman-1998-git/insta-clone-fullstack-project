
import { useState } from 'react';
import { Search } from 'lucide-react';
import { posts } from '../services/mockData';
import BottomNav from '../components/Navigation/BottomNav';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Shuffle posts for explore page
  const shuffledPosts = [...posts].sort(() => 0.5 - Math.random());
  
  return (
    <div className="app-container bg-gray-50">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white border-b border-instagram-gray p-2 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-instagram-darkGray" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-lg text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {shuffledPosts.map((post) => (
          <div key={post.id} className="aspect-square relative">
            <img 
              src={post.imageUrl} 
              alt="Post" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="text-white flex items-center space-x-2">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="none" className="w-5 h-5 mr-1">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  {post.likes}
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="none" className="w-5 h-5 mr-1">
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                  </svg>
                  {post.comments.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Explore;
