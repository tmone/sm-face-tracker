'use client';

import * as React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, UserCheck, UserX, Clock, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProtectedRoute } from '@/components/protected-route'; // Import ProtectedRoute
import { useAuth } from '@/context/auth-context'; // Import useAuth

export default function AttendancePage() {
  const [isChecking, setIsChecking] = React.useState(false);
  const [result, setResult] = React.useState<'success' | 'fail' | 'checking' | null>(null);
  const [employeeName, setEmployeeName] = React.useState<string | null>(null); // Or fetch from user context
  const [checkTime, setCheckTime] = React.useState<string | null>(null);
  const { toast } = useToast();
  const { user, userData } = useAuth(); // Get user info

  const handleCheckAttendance = async () => {
     if (!user) {
      toast({ title: "Error", description: "Authentication error.", variant: "destructive" });
      return;
    }
    setIsChecking(true);
    setResult('checking');
    setEmployeeName(null);
    setCheckTime(null);
    console.log('Checking attendance...');

    // Placeholder for face detection, liveness check, and recognition logic
    // This would involve:
    // 1. Capturing an image/frame from the camera feed.
    // 2. Sending this image to a backend function/API.
    // 3. The backend performs:
    //    a. Liveness check (to prevent spoofing with photos).
    //    b. Face detection and feature extraction.
    //    c. Comparison against stored facial embeddings (e.g., in Firestore/Vector DB).
    //    d. If a match is found above a certain threshold, identify the user (retrieve user.uid).
    //    e. Record the attendance log in Firestore (e.g., collection 'attendance_logs') with userId, timestamp, status ('checked-in').
    // 4. Return the result (success/fail, username if success) to the frontend.

    await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate API call

    const success = Math.random() > 0.3; // Simulate success/failure

    if (success) {
      // On successful recognition, use the logged-in user's data
      const name = userData?.displayName || user.email || 'User'; // Use display name or email
      const time = new Date().toLocaleTimeString();
      setResult('success');
      setEmployeeName(name);
      setCheckTime(time);
      toast({
        title: "Attendance Checked In",
        description: `${name} checked in at ${time}.`,
      });
       // TODO: Record attendance in Firestore (ideally done server-side)
    } else {
      setResult('fail');
       toast({
        title: "Attendance Check Failed",
        description: "Could not recognize face or liveness check failed. Please try again.",
        variant: "destructive",
      });
    }

    setIsChecking(false);
  };

  const renderResult = () => {
    switch (result) {
      case 'success':
        return (
          <Alert variant="default" className="bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700">
             <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-200">Check-in Successful!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              Welcome, {employeeName}! Checked in at {checkTime}.
            </AlertDescription>
          </Alert>
        );
      case 'fail':
        return (
          <Alert variant="destructive">
            <UserX className="h-4 w-4" />
            <AlertTitle>Check-in Failed</AlertTitle>
            <AlertDescription>
              Face not recognized or liveness check failed. Please ensure good lighting and try again.
            </AlertDescription>
          </Alert>
        );
       case 'checking':
         return (
           <Alert>
             <Clock className="h-4 w-4 animate-spin" />
             <AlertTitle>Checking...</AlertTitle>
             <AlertDescription>
               Detecting face and verifying identity. Please hold still.
             </AlertDescription>
           </Alert>
         );
      default:
        return (
           <Alert variant="default">
            <Info className="h-4 w-4"/>
             <AlertTitle>Ready to Scan</AlertTitle>
             <AlertDescription>
               Position your face in the camera frame and click "Check Attendance".
             </AlertDescription>
           </Alert>
        );
    }
  };


  return (
     <ProtectedRoute> {/* Ensure user is logged in */}
      <AppLayout>
        <div className="grid gap-6">
          <h1 className="text-2xl font-semibold">Attendance Check</h1>
          <CardDescription>Verify your identity using the camera to mark your attendance.</CardDescription>
           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
             <Card>
               <CardHeader>
                 <CardTitle>Live Camera Feed</CardTitle>
                 <CardDescription>Position your face clearly in the frame.</CardDescription>
               </CardHeader>
               <CardContent>
                 {/* TODO: Implement actual camera feed */}
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                   <Camera className="h-16 w-16" />
                   <p className="mt-2">Camera feed for attendance</p>
                 </div>
                 <Button
                   onClick={handleCheckAttendance}
                   disabled={isChecking}
                   className="w-full mt-4"
                 >
                   {isChecking ? <><Clock className="mr-2 h-4 w-4 animate-spin" /> Checking...</> : 'Check Attendance'}
                 </Button>
               </CardContent>
             </Card>
             <Card>
               <CardHeader>
                 <CardTitle>Attendance Status</CardTitle>
                 <CardDescription>Real-time results of the attendance check.</CardDescription>
               </CardHeader>
               <CardContent>
                  {renderResult()}
                   {/* Manual ID entry removed as check-in is tied to logged-in user */}
               </CardContent>
             </Card>
           </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
