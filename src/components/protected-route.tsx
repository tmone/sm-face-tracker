'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton'; // Or your preferred loading indicator

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user'; // Optional role requirement
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        // If not authenticated, redirect to login
        router.push('/login');
      } else if (requiredRole) {
        // If a role is required, check if the user has it
        const hasRequiredRole = (requiredRole === 'admin' && isAdmin) || (requiredRole === 'user'); // User role check is implicit if logged in
        if (!hasRequiredRole) {
          // If user doesn't have the required role, redirect (e.g., to dashboard or an unauthorized page)
           console.warn(`User does not have required role: ${requiredRole}`);
           router.push('/dashboard'); // Or create an '/unauthorized' page
        }
      }
    }
  }, [user, loading, isAdmin, requiredRole, router]);

  if (loading || !user) {
    // Show loading indicator while checking auth status or if redirecting
    return (
      <div className="flex items-center justify-center h-screen">
         <Skeleton className="h-12 w-1/2 rounded-md" />
      </div>
    );
  }

   // Role check might still be pending if loading just finished
   if (requiredRole) {
      const hasRequiredRole = (requiredRole === 'admin' && isAdmin) || (requiredRole === 'user');
      if (!hasRequiredRole) {
          // Return loading/skeleton again while redirect happens, prevents brief flash of content
           return (
             <div className="flex items-center justify-center h-screen">
               <Skeleton className="h-12 w-1/2 rounded-md" />
             </div>
          );
      }
   }


  // If authenticated and (no role required OR has required role), render the children
  return <>{children}</>;
}
