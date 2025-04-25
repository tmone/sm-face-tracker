
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to login page by default.
  // Authentication checks in layout/pages will handle redirection
  // to dashboard if already logged in.
  redirect('/login');
}
