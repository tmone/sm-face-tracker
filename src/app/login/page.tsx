'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogIn } from 'lucide-react';
import { signInWithEmailPassword } from '@/lib/auth'; // Import the sign-in function
import { useAuth } from '@/context/auth-context'; // Import useAuth hook

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
   const { user, loading: authLoading } = useAuth(); // Get user state from context

   // Redirect if user is already logged in
   React.useEffect(() => {
     if (!authLoading && user) {
       router.push('/dashboard');
     }
   }, [user, authLoading, router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailPassword(email, password);
      router.push('/dashboard'); // Redirect to dashboard on successful login
    } catch (err: any) {
       console.error("Login failed:", err);
       // Provide user-friendly error messages
       if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
         setError('Invalid email or password. Please try again.');
       } else {
          setError(err.message || 'An unexpected error occurred. Please try again.');
       }
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form if auth state is still loading or user is already logged in
  if (authLoading || user) {
     // Optionally show a loading indicator or just null
     return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
           {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
               <div className="flex items-center">
                 <Label htmlFor="password">Password</Label>
                 {/* Optional: Add forgot password link */}
                 {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                   Forgot your password?
                 </Link> */}
               </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {/* Optional: Add social login buttons */}
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
