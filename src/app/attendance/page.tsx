'use client';

import * as React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, UserCheck, UserX, Clock, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AttendancePage() {
  const [isChecking, setIsChecking] = React.useState(false);
  const [result, setResult] = React.useState<'success' | 'fail' | 'checking' | null>(null);
  const [employeeName, setEmployeeName] = React.useState<string | null>(null);
  const [checkTime, setCheckTime] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleCheckAttendance = async () => {
    setIsChecking(true);
    setResult('checking');
    setEmployeeName(null);
    setCheckTime(null);
    console.log('Checking attendance...');

    // Placeholder for face detection and liveness check logic
    // Simulate API call and result
    await new Promise(resolve => setTimeout(resolve, 2500));

    const success = Math.random() > 0.3; // Simulate success/failure

    if (success) {
      const name = "Jane Doe"; // Placeholder name
      const time = new Date().toLocaleTimeString();
      setResult('success');
      setEmployeeName(name);
      setCheckTime(time);
      toast({
        title: "Attendance Checked In",
        description: `${name} checked in at ${time}.`,
      });
    } else {
      setResult('fail');
       toast({
        title: "Attendance Check Failed",
        description: "Could not recognize face or liveness check failed. Please try again or enter ID manually.",
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
              You can also try entering your ID manually if issues persist.
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
    <AppLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold">Attendance Check</h1>
         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
           <Card>
             <CardHeader>
               <CardTitle>Live Camera Feed</CardTitle>
               <CardDescription>Position your face clearly in the frame.</CardDescription>
             </CardHeader>
             <CardContent>
               {/* Placeholder for actual camera feed */}
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
                 {/* Option for manual ID entry */}
                 {result === 'fail' && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Having trouble?</p>
                        <Button variant="outline" size="sm">Enter ID Manually</Button>
                    </div>
                 )}
             </CardContent>
           </Card>
         </div>
      </div>
    </AppLayout>
  );
}
