'use client';

import * as React from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { DocumentData } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

interface AuthContextType {
  user: User | null;
  userData: DocumentData | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [userData, setUserData] = React.useState<DocumentData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userDocRef = doc(db, 'users', currentUser.uid);

        // Set up Firestore listener for user data changes
        const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setIsAdmin(data?.role === 'admin');
          } else {
            // User doc doesn't exist (maybe new user, handle appropriately)
            console.log("No such user document!");
            setUserData(null);
            setIsAdmin(false);
          }
           // Only set loading to false after user data (or lack thereof) is confirmed
          setLoading(false);
        }, (error) => {
           console.error("Error fetching user data:", error);
           setUserData(null);
           setIsAdmin(false);
           setLoading(false); // Set loading false even on error
        });

        // Cleanup Firestore listener on auth state change or unmount
        return () => unsubscribeFirestore();

      } else {
        // User is signed out
        setUserData(null);
        setIsAdmin(false);
        setLoading(false); // Set loading to false when user is signed out
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  // Show loading skeleton while authentication state is being determined
  if (loading) {
     return (
      <div className="flex items-center justify-center h-screen">
         {/* You can replace this with a more sophisticated loading screen or spinner */}
         <Skeleton className="h-12 w-1/2 rounded-md" />
       </div>
     );
  }


  return (
    <AuthContext.Provider value={{ user, userData, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
