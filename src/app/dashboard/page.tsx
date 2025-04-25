
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserPlus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Checked In Today
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
               <p className="text-xs text-muted-foreground">
                83% of total employees
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Newly Registered
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+5</div>
              <p className="text-xs text-muted-foreground">
                in the last 7 days
              </p>
            </CardContent>
          </Card>
        </div>
         <Card>
            <CardHeader>
              <CardTitle>Welcome to FaceChecker!</CardTitle>
              <CardDescription>
                The employee attendance system powered by facial recognition. Use the sidebar to navigate through different sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                - **Register Face:** Add new employees or update existing facial data. <br />
                - **Attendance Check:** View live camera feed for attendance verification. <br />
                - **Admin Panel:** Manage employees and view attendance reports.
              </p>
            </CardContent>
          </Card>
      </div>
    </AppLayout>
  );
}
