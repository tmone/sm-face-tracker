
import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Download, Search, Edit, Trash2 } from 'lucide-react';

// Sample Data - Replace with actual data fetching from Firestore
const employees = [
  { id: 'EMP001', name: 'Alice Johnson', department: 'Engineering', position: 'Software Engineer', status: 'Registered' },
  { id: 'EMP002', name: 'Bob Smith', department: 'Marketing', position: 'Marketing Manager', status: 'Registered' },
  { id: 'EMP003', name: 'Charlie Brown', department: 'Sales', position: 'Sales Representative', status: 'Pending' },
  { id: 'EMP004', name: 'Diana Prince', department: 'Engineering', position: 'Frontend Developer', status: 'Registered' },
];

const attendanceLogs = [
  { id: 'LOG001', employeeId: 'EMP001', name: 'Alice Johnson', date: '2024-07-30', time: '08:55 AM', status: 'Checked In' },
  { id: 'LOG002', employeeId: 'EMP002', name: 'Bob Smith', date: '2024-07-30', time: '09:05 AM', status: 'Checked In' },
  { id: 'LOG003', employeeId: 'EMP004', name: 'Diana Prince', date: '2024-07-30', time: '08:45 AM', status: 'Checked In' },
   { id: 'LOG004', employeeId: 'EMP001', name: 'Alice Johnson', date: '2024-07-29', time: '09:01 AM', status: 'Checked In' },
];

export default function AdminPage() {
  return (
    <AppLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>

        {/* Employee Management Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>View, add, edit, or remove employee information.</CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <div className="relative">
                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="Search employees..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
                </div>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Employee
                </Button>
             </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                   <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                       <Badge variant={employee.status === 'Registered' ? 'default' : 'secondary'} className={employee.status === 'Registered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}>
                         {employee.status}
                       </Badge>
                    </TableCell>
                     <TableCell>
                       <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                         </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
           <CardFooter className="flex justify-end">
            {/* Placeholder for pagination */}
            <span className="text-sm text-muted-foreground">Showing 1-4 of {employees.length} employees</span>
          </CardFooter>
        </Card>

        {/* Attendance Reports Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <div>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>View and export attendance logs.</CardDescription>
             </div>
            <Button size="sm" variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Log ID</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.employeeId}</TableCell>
                    <TableCell className="font-medium">{log.name}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.time}</TableCell>
                     <TableCell>
                       <Badge variant={log.status === 'Checked In' ? 'default' : 'destructive'} className={log.status === 'Checked In' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}>
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
           <CardFooter className="flex justify-end">
             {/* Placeholder for date filtering/pagination */}
              <span className="text-sm text-muted-foreground">Showing recent logs</span>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
