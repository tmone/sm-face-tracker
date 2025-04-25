'use server'; // Marking functions potentially used in Server Components/Actions

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserCredential } from 'firebase/auth';

// --- Sign Up ---
export async function signUpWithEmailPassword(email: string, password: string): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document after successful sign up
    await createUserDocument(userCredential.user.uid, email);
    return userCredential;
  } catch (error: any) {
    console.error("Error signing up:", error);
    // Rethrow or handle specific error codes (e.g., 'auth/email-already-in-use')
    throw new Error(error.message || "Failed to sign up");
  }
}

// --- Create User Document ---
async function createUserDocument(userId: string, email: string) {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      email: email,
      role: 'user', // Default role for new users
      createdAt: serverTimestamp(),
    });
    console.log("User document created for:", userId);
  } catch (error) {
    console.error("Error creating user document:", error);
    // Handle error (e.g., log it, notify admin)
    // Depending on requirements, you might want to roll back the user creation
    // or just log the failure to create the Firestore doc.
    throw new Error("Failed to create user profile data.");
  }
}


// --- Sign In ---
export async function signInWithEmailPassword(email: string, password: string): Promise<UserCredential> {
   try {
     const userCredential = await signInWithEmailAndPassword(auth, email, password);
     return userCredential;
   } catch (error: any) {
     console.error("Error signing in:", error);
     // Rethrow or handle specific error codes (e.g., 'auth/user-not-found', 'auth/wrong-password')
     throw new Error(error.message || "Failed to sign in");
   }
}

// --- Sign Out ---
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw new Error(error.message || "Failed to sign out");
  }
}

// --- Get User Data (Example - can be expanded) ---
// This is often better handled client-side with onSnapshot for real-time updates
// but provided here as a server-side example if needed.
import { getDoc } from 'firebase/firestore';

export async function getUserData(userId: string) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw new Error("Failed to retrieve user data.");
  }
}

// --- Update User Role (Admin Action) ---
export async function updateUserRole(userId: string, newRole: 'user' | 'admin'): Promise<void> {
    // IMPORTANT: Add server-side validation here to ensure only admins can call this function!
    // This could involve checking the caller's role via their token or another mechanism.
    // For simplicity in this example, validation is omitted, but CRUCIAL for production.

    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { role: newRole }, { merge: true }); // Use merge to avoid overwriting other fields
        console.log(`User role updated for ${userId} to ${newRole}`);
    } catch (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role.");
    }
}
