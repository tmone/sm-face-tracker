'use client';

import * as React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateInstructionSet } from '@/ai/flows/generate-instruction-set'; // Import the Genkit flow
import { ProtectedRoute } from '@/components/protected-route'; // Import ProtectedRoute
import { useAuth } from '@/context/auth-context'; // Import useAuth

export default function RegisterPage() {
  const [instructions, setInstructions] = React.useState<string>('');
  const [isLoadingInstructions, setIsLoadingInstructions] = React.useState<boolean>(true);
  const [errorInstructions, setErrorInstructions] = React.useState<string | null>(null);
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useAuth(); // Get the logged-in user

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


  const handleStartRegistration = async () => {
     if (!user) {
       toast({ title: "Error", description: "You must be logged in to register.", variant: "destructive" });
       return;
     }
    setIsRegistering(true);
    // Placeholder for face capture & registration logic
    // This logic would typically involve:
    // 1. Accessing the camera feed (useEffect hook needed)
    // 2. Capturing multiple images/video frames based on instructions
    // 3. Sending the captured data (e.g., as base64 or blobs) along with the user.uid
    //    to a backend function (e.g., Firebase Cloud Function) or API endpoint.
    // 4. The backend function would then interact with a Face Recognition service
    //    (like AWS Rekognition, Azure Face API, or a self-hosted model) to store the facial embeddings
    //    associated with the user.uid in a database (e.g., Firestore).
    console.log(`Starting registration for user: ${user.uid}`);
    // Simulate API call for registration process
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate capture and processing time
    console.log('Registration process complete (simulated).');
    setIsRegistering(false);
    toast({
      title: "Registration Started",
      description: "Follow the prompts on the camera feed to complete registration.",
       // Potentially update status based on actual backend response
    });
    // Update UI to show registration steps/progress if applicable
  };

  return (
     <ProtectedRoute> {/* Ensure user is logged in */}
      <AppLayout>
        <div className="grid gap-6">
          <h1 className="text-2xl font-semibold">Register Your Face</h1>
          <CardDescription>Register your face for attendance verification. This only needs to be done once.</CardDescription>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Camera Feed</CardTitle>
                <CardDescription>Position your face within the frame and follow prompts.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* TODO: Implement actual camera feed and capture logic */}
                <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center text-muted-foreground">
                  <Camera className="h-16 w-16 mb-2" />
                   <p>Camera feed will appear here.</p>
                   {isRegistering && <p className="mt-2 text-sm animate-pulse">Capturing face data...</p>}
                   {/* Add overlay elements for guidance (e.g., "Turn Left", "Look Up") */}
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
                    <AlertDescription className="whitespace-pre-line"> {/* Preserve line breaks */}
                      {instructions || "Ensure good lighting and a clear background.\nLook directly at the camera.\nSlowly turn your head slightly left, then right.\nTilt your head slightly up, then down.\nStay still until the capture is complete."}
                    </AlertDescription>
                  </Alert>
                )}
                 {/* Removed Employee ID/Name fields - registration is tied to the logged-in user */}
              </CardContent>
               <CardFooter className="flex justify-end">
                   <Button onClick={handleStartRegistration} disabled={isRegistering || isLoadingInstructions || !!errorInstructions}>
                     {isRegistering ? 'Processing...' : 'Start Registration'}
                   </Button>
               </CardFooter>
            </Card>
          </div>
        </div>
      </AppLayout>
     </ProtectedRoute>
  );
}
