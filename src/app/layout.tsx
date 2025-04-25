'use client'; // Add this directive

import * as React from 'react'; // Import React for hooks
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { AuthProvider } from '@/context/auth-context'; // Import AuthProvider
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation'; // Now allowed due to 'use client'
import { getDictionary } from '@/lib/utils'; // Keep this import, but note getDictionary might need adjustments if it relies on server-only features directly

// Revalidate might not be needed or work as expected in a client component root layout.
// Consider data fetching strategies if dynamic data is needed here.
// export const revalidate = 0; // Commenting out as it's less relevant in a client root layout

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata generation should ideally happen in Server Components,
// but basic static metadata can still be defined.
// export const metadata: Metadata = {
//   title: 'FaceChecker',
//   description: 'Employee Attendance System using Face Recognition',
// };
// Consider moving dynamic metadata generation to specific page components if needed.


// Note: RootLayout is now a Client Component.
// Data fetching that requires server context (like getDictionary)
// needs careful handling. It might be better to fetch dictionary
// data within the AuthProvider or pass it down from a parent Server Component if possible,
// or fetch it client-side within a useEffect.
// For this fix, we assume getDictionary can run client-side or its usage is adjusted.
export default function RootLayout({
                                     children,
                                     params: {
                                       locale = 'vi' // Provide a default locale if needed
                                     }
                                   }: Readonly<{
  children: React.ReactNode,
  params: {
    locale?: 'en' | 'vi' // Make locale potentially optional if fetched client-side
  }
}>) {

  const router = useRouter()
  const pathname = usePathname()
  // State to hold the dictionary, fetched client-side
  const [dictionary, setDictionary] = React.useState<any>(null); // Use 'any' for simplicity, refine type later

  React.useEffect(() => {
    async function loadDictionary() {
      try {
        // Determine the locale. Use pathname or default.
        const currentLocale = pathname.split('/')[1] as 'en' | 'vi' || locale || 'vi';
        const dict = await getDictionary(currentLocale);
        setDictionary(dict);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
        // Handle error, maybe load a default dictionary or show an error message
      }
    }
    loadDictionary();
  }, [pathname, locale]); // Reload dictionary if pathname or initial locale changes


  const switchLocale = (newLocale: string) => {
    // Logic to extract the path after the locale segment
    const segments = pathname.split('/');
    const basePath = segments.slice(2).join('/'); // Get path after locale
    const newPathname = `/${newLocale}/${basePath}`;
    router.push(newPathname);
  };

  const getCurrentLocaleFromPath = () => {
     const segments = pathname.split('/');
     if (segments.length > 1 && ['en', 'vi'].includes(segments[1])) {
        return segments[1] as 'en' | 'vi';
     }
     return locale || 'vi'; // Fallback to initial or default
  }

  const currentLocale = getCurrentLocaleFromPath();

  if (!dictionary) {
    // Optionally return a loading state while the dictionary loads
    return <div>Loading locale...</div>; // Or a skeleton loader
  }


  return (
    // Ensure lang attribute updates correctly if locale changes
    <html lang={currentLocale}>
      <head>
         {/* Add basic static metadata here if needed */}
         <title>FaceChecker</title>
         <meta name="description" content="Employee Attendance System using Face Recognition" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <div className='absolute top-4 right-4 z-50'>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-background text-foreground border rounded px-2 py-1' asChild>
               <button>{dictionary.DropdownMenu[currentLocale] || currentLocale.toUpperCase()}</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-background text-foreground border'>
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => switchLocale('vi')} className="cursor-pointer">
                {dictionary.DropdownMenu.vietnamese || 'Vietnamese'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLocale('en')} className="cursor-pointer">
                {dictionary.DropdownMenu.english || 'English'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* AuthProvider remains crucial */}
        <AuthProvider>
          <main>
             {children}
             <Toaster />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
