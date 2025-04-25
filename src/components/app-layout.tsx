'use client';

import * as React from 'react';
import {
  Home,
  UserPlus,
  Users,
  LogOut,
  Settings,
  Briefcase,
  ShieldCheck, // Icon for Admin
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context'; // Import useAuth hook
import { signOutUser } from '@/lib/auth'; // Import sign out function
import { useToast } from '@/hooks/use-toast'; // Import useToast

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData, loading, isAdmin } = useAuth(); // Use the auth context
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      });
    }
  };


  const isActive = (path: string) => pathname === path;

  // If loading or no user, potentially show loading or redirect, handled by pages typically
  // This layout assumes a user is logged in, protection happens at page level
  // if (loading) return <div>Loading...</div>; // Or a skeleton loader
  // if (!user && !loading) {
  //   // Redirect handled in pages, but could be done here too
  //   // router.push('/login');
  //   return null; // Avoid rendering layout if not authenticated
  // }

  const getInitials = (email: string | undefined | null): string => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };


  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-sidebar-primary"><path d="M12 2a10 10 0 1 0 10 10A10.1 10.1 0 0 0 12 2"/><path d="M10 16s-1-3 1-5 3-3 3-3"/><path d="M8 10h.01"/><path d="M16 10h.01"/></svg>
            <span className="text-lg font-semibold text-sidebar-foreground">
              FaceChecker
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-auto p-2">
          <SidebarMenu>
             {/* Common Links for all users */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard')}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/register')}
                tooltip="Register Face"
              >
                <Link href="/register">
                  <UserPlus />
                  <span>Register Face</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/attendance')}
                tooltip="Attendance"
              >
                <Link href="/attendance">
                  <Briefcase />
                  <span>Attendance Check</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Admin Only Links */}
            {isAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/admin')}
                  tooltip="Admin"
                >
                  <Link href="/admin">
                    <ShieldCheck /> {/* Using a more admin-like icon */}
                    <span>Admin Panel</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <div className="flex items-center gap-3 p-2 border-t border-sidebar-border">
            <Avatar className="h-9 w-9">
              {/* Use placeholder or fetched image */}
              {/* <AvatarImage src={userData?.photoURL || "https://picsum.photos/40/40"} alt="User Avatar" /> */}
              <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground truncate max-w-[120px]">
                {userData?.displayName || user?.email || 'User'}
              </span>
              <span className="text-xs text-sidebar-foreground/70">
                 {userData?.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto text-sidebar-foreground/70 hover:text-sidebar-foreground" onClick={handleLogout} title="Log Out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
         <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
             <SidebarTrigger className="md:hidden" />
             {/* Placeholder for breadcrumbs or page title */}
          </div>
          {/* Placeholder for header actions like notifications or user menu */}
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
