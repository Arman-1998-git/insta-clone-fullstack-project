
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !fullName || !username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(username, email, password);
      
      if (success) {
        toast.success('Account created successfully!');
        navigate('/');
      } else {
        toast.error('Failed to create account');
      }
    } catch (error) {
      toast.error('An error occurred during signup');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold mb-2">Instagram</h1>
        <p className="text-gray-500 text-sm">
          Sign up to see photos and videos from your friends.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50"
          />
        </div>
        
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-gray-50"
          />
        </div>
        
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
        
        <div className="text-xs text-gray-500 text-center">
          By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
        </div>
        
        <Button
          type="submit"
          className="w-full bg-instagram-blue hover:bg-blue-600"
          disabled={isLoading || !email || !fullName || !username || !password}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm">
          Have an account?{' '}
          <Link to="/login" className="text-instagram-blue font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
