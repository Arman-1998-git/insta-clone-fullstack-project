
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-6">Instagram</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50"
          />
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-instagram-blue hover:bg-blue-600"
          disabled={isLoading || !username || !password}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
      
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      
      <div className="text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-instagram-blue font-semibold">
            Sign up
          </Link>
        </p>
      </div>

      {/* Demo accounts for testing */}
      <div className="mt-8 p-3 border border-gray-200 rounded-md">
        <p className="text-sm text-center font-medium mb-2">Demo Accounts</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-1 bg-gray-50 rounded">
            <p className="font-semibold">johndoe</p>
            <p className="text-gray-500">password123</p>
          </div>
          <div className="p-1 bg-gray-50 rounded">
            <p className="font-semibold">janedoe</p>
            <p className="text-gray-500">password123</p>
          </div>
          <div className="p-1 bg-gray-50 rounded">
            <p className="font-semibold">mikesmith</p>
            <p className="text-gray-500">password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
