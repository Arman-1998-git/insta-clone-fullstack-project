
import { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast.error('Please select an image to post');
      return;
    }
    
    if (!isAuthenticated) {
      toast.error('You must be logged in to create a post');
      navigate('/login');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, we would upload the image to a server
      // and create the post in the database
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create post');
      console.error('Error creating post:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const resetForm = () => {
    setSelectedImage(null);
    setCaption('');
  };
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-center">Create New Post</h1>
      
      <form onSubmit={handleSubmit}>
        {!selectedImage ? (
          <div className="border-2 border-dashed border-instagram-gray rounded-lg p-8 flex flex-col items-center justify-center mb-4">
            <Camera size={48} className="text-instagram-darkGray mb-4" />
            <p className="text-center text-instagram-darkGray mb-4">
              Upload a photo to share with everyone
            </p>
            <label className="bg-instagram-blue text-white px-4 py-2 rounded cursor-pointer">
              Select from device
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        ) : (
          <div className="relative mb-4">
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full rounded-lg max-h-96 object-cover"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {selectedImage && (
          <>
            <div className="mb-4">
              <label htmlFor="caption" className="block mb-2 text-sm font-medium">
                Caption
              </label>
              <textarea
                id="caption"
                className="w-full p-2 border border-instagram-gray rounded-lg resize-none"
                rows={4}
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="submit"
                className="w-full bg-instagram-blue hover:bg-blue-600"
                disabled={isUploading}
              >
                {isUploading ? 'Posting...' : 'Share'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isUploading}
                className="w-1/3"
              >
                Reset
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
