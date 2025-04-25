'use client';

import * as React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateInstructionSet } from '@/ai/flows/generate-instruction-set'; // Import the Genkit flow

export default function RegisterPage() {
  const [instructions, setInstructions] = React.useState<string>('');
  const [isLoadingInstructions, setIsLoadingInstructions] = React.useState<boolean>(true);
  const [errorInstructions, setErrorInstructions] = React.useState<string | null>(null);
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchInstructions = async () => {
      setIsLoadingInstructions(true);
      setErrorInstructions(null);
      try {
        const result = await generateInstructionSet();
        setInstructions(result.instructions);
      } catch (error) {
        console.error("Failed to load instructions:", error);
        setErrorInstructions("Failed to load registration instructions. Please try again later.");
        toast({
          title: "Error",
          description: "Could not load registration instructions.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingInstructions(false);
      }
    };
    fetchInstructions();
  }, [toast]);


  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsRegistering(true);
    // Placeholder for registration logic
    console.log('Starting registration...');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Registration complete.');
    setIsRegistering(false);
    toast({
      title: "Registration Submitted",
      description: "Facial data is being processed.",
    });
    // Reset form or navigate away
  };

  return (
    <AppLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold">Register Employee Face</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Camera Feed</CardTitle>
              <CardDescription>Position your face within the frame.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for actual camera feed */}
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                <Camera className="h-16 w-16" />
                 <p className="mt-2">Camera feed will appear here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Instructions</CardTitle>
               <CardDescription>Follow these steps carefully for successful registration.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingInstructions ? (
                 <div className="space-y-2">
                   <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                   <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                   <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                   <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                 </div>
              ) : errorInstructions ? (
                 <Alert variant="destructive">
                   <AlertCircle className="h-4 w-4" />
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>{errorInstructions}</AlertDescription>
                 </Alert>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Instructions</AlertTitle>
                  <AlertDescription>
                    {instructions || "Ensure good lighting and look directly at the camera. Follow the on-screen prompts for different angles."}
                  </AlertDescription>
                </Alert>
              )}
               <form onSubmit={handleRegister} className="mt-4 space-y-4">
                 <div>
                   <Label htmlFor="employeeId">Employee ID</Label>
                   <Input id="employeeId" placeholder="Enter Employee ID" required disabled={isRegistering} />
                 </div>
                 <div>
                   <Label htmlFor="employeeName">Employee Name</Label>
                   <Input id="employeeName" placeholder="Enter Employee Name" required disabled={isRegistering} />
                 </div>
                  {/* Add more fields like department, position if needed */}
               </form>
            </CardContent>
             <CardFooter className="flex justify-end">
                <Button type="submit" form="registration-form" disabled={isRegistering || isLoadingInstructions || !!errorInstructions}>
                  {isRegistering ? 'Registering...' : 'Start Registration'}
                </Button>
             </CardFooter>
             {/* Need a form element to link the button */}
             <form id="registration-form" onSubmit={handleRegister} className="hidden"></form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
