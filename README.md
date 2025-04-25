# FaceChecker - Employee Attendance System

This is a Next.js application using Firebase for authentication and data storage, enabling employee attendance tracking via facial recognition.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Firebase:**
    *   Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
    *   Enable **Authentication** (Email/Password provider).
    *   Enable **Firestore Database** (start in test mode for development, configure security rules for production).
    *   Go to Project Settings > General > Your apps > Web app.
    *   Register your app and copy the `firebaseConfig` object.

4.  **Configure Environment Variables:**
    *   Create a file named `.env.local` in the root of your project (or rename the existing `.env` file).
    *   Add your Firebase configuration details from the previous step:
        ```env
        # Firebase SDK Configuration
        NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

        # Optional: Genkit / Google AI API Key (if using Genkit features)
        # GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_AI_API_KEY
        ```
    *   Replace `YOUR_...` placeholders with your actual Firebase config values.
    *   **Important:** Do not commit your `.env.local` file to version control if it contains sensitive keys. Ensure `.env.local` is listed in your `.gitignore` file.

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6.  Open [http://localhost:9002](http://localhost:9002) (or your configured port) with your browser to see the result.

## Features

*   **User Authentication:** Sign up and login using Firebase Authentication (Email/Password).
*   **Role-Based Access:** Differentiates between 'user' and 'admin' roles stored in Firestore.
*   **Face Registration:** Users can register their facial data (placeholder implementation).
*   **Attendance Check:** Users can mark attendance using facial recognition (placeholder implementation).
*   **Admin Dashboard:** Admins can view employee lists and attendance logs (placeholder data).
*   **Protected Routes:** Ensures only authenticated users (and authorized roles) can access specific pages.

## Project Structure

*   `src/app/`: Contains the main application pages (App Router).
    *   `login/`, `signup/`, `dashboard/`, `register/`, `attendance/`, `admin/`: Page components.
    *   `layout.tsx`: Root layout, includes AuthProvider.
    *   `page.tsx`: Root page, redirects to login.
*   `src/components/`: Reusable UI components.
    *   `ui/`: ShadCN UI components.
    *   `app-layout.tsx`: Main application layout with sidebar and header.
    *   `protected-route.tsx`: Component to handle route protection based on auth state and role.
*   `src/context/`: React Context providers.
    *   `auth-context.tsx`: Manages global authentication state and user data.
*   `src/lib/`: Utility functions and configurations.
    *   `firebase.ts`: Firebase SDK initialization.
    *   `auth.ts`: Firebase authentication helper functions (signup, signin, signout).
    *   `utils.ts`: General utility functions (e.g., `cn`).
*   `src/ai/`: Genkit AI related flows (currently includes instruction generation).
*   `public/`: Static assets.
*   `styles/`: Global styles.

## Next Steps & TODOs

*   **Implement Face Recognition:** Integrate a facial recognition service/library (e.g., AWS Rekognition, Azure Face API, face-api.js) for actual registration and attendance checks.
*   **Implement Camera Access:** Use `navigator.mediaDevices.getUserMedia` to access the camera feed in `/register` and `/attendance`.
*   **Firestore Data Fetching:** Replace placeholder data in `/admin` with real-time data fetching from Firestore using `onSnapshot`.
*   **Firestore Security Rules:** Implement robust Firestore security rules to protect user data and restrict access based on roles.
*   **Admin Actions:** Implement functionality for admins (e.g., changing user roles, deleting users, editing employee details, exporting reports).
*   **Error Handling:** Enhance error handling and user feedback across the application.
*   **Styling & UI Refinements:** Improve the overall look and feel.
*   **Testing:** Add unit and integration tests.
