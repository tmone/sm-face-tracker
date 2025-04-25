// Add 'use client' directive if using client-side hooks for data fetching or state later
// 'use client';
// import React from 'react';
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from '@/lib/firebase';

import { AppLayout } from '@/components/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Download, Search, Edit, Trash2 } from 'lucide-react';
import { ProtectedRoute } from '@/components/protected-route'; // Import ProtectedRoute

// Sample Data - Replace with actual data fetching from Firestore
// TODO: Fetch this data using Firestore queries, likely within a useEffect hook if client-side
const employees = [
  { id: 'EMP001', name: 'Alice Johnson', department: 'Engineering', position: 'Software Engineer', status: 'Registered', firestoreId: 'user123' }, // Add Firestore user ID if needed
  { id: 'EMP002', name: 'Bob Smith', department: 'Marketing', position: 'Marketing Manager', status: 'Registered', firestoreId: 'user456' },
  { id: 'EMP003', name: 'Charlie Brown', department: 'Sales', position: 'Sales Representative', status: 'Pending', firestoreId: 'user789' },
  { id: 'EMP004', name: 'Diana Prince', department: 'Engineering', position: 'Frontend Developer', status: 'Registered', firestoreId: 'user101' },
];

const attendanceLogs = [
  { id: 'LOG001', employeeId: 'EMP001', name: 'Alice Johnson', date: '2024-07-30', time: '08:55 AM', status: 'Checked In', firestoreUserId: 'user123' },
  { id: 'LOG002', employeeId: 'EMP002', name: 'Bob Smith', date: '2024-07-30', time: '09:05 AM', status: 'Checked In', firestoreUserId: 'user456' },
  { id: 'LOG003', employeeId: 'EMP004', name: 'Diana Prince', date: '2024-07-30', time: '08:45 AM', status: 'Checked In', firestoreUserId: 'user101' },
   { id: 'LOG004', employeeId: 'EMP001', name: 'Alice Johnson', date: '2024-07-29', time: '09:01 AM', status: 'Checked In', firestoreUserId: 'user123' },
];

export default function AdminPage() {
   // If fetching data client-side:
   // const [employees, setEmployees] = React.useState([]);
   // const [attendanceLogs, setAttendanceLogs] = React.useState([]);
   // const [loading, setLoading] = React.useState(true);

   // React.useEffect(() => {
   //   // Fetch employees (users collection)
   //   const qUsers = query(collection(db, "users"));
   //   const unsubscribeUsers = onSnapshot(qUsers, (querySnapshot) => {
   //     const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   //     // Map Firestore data to your 'employees' structure if needed
   //     setEmployees(usersData);
   //     setLoading(false); // Set loading false after fetching employees
   //   });

   //   // Fetch attendance logs (attendance_logs collection)
   //   const qAttendance = query(collection(db, "attendance_logs")); // Add sorting/filtering later
   //   const unsubscribeAttendance = onSnapshot(qAttendance, (querySnapshot) => {
   //     const logsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   //      // Map Firestore data to your 'attendanceLogs' structure if needed
   //     setAttendanceLogs(logsData);
   //     // Consider setting loading false only after both fetches complete or handle separately
   //   });


   //   return () => {
   //      unsubscribeUsers();
   //      unsubscribeAttendance();
   //   }
   // }, []);

   // if (loading) {
   //   return <ProtectedRoute requiredRole="admin"><AppLayout><div>Loading admin data...</div></AppLayout></ProtectedRoute>; // Show loading state
   // }


  return (
    <ProtectedRoute requiredRole="admin"> {/* Wrap with ProtectedRoute and require 'admin' role */}
      <AppLayout>
        <div className="grid gap-6">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <CardDescription>Manage employees and review attendance records.</CardDescription>


          {/* Employee Management Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>View and manage employee accounts and roles.</CardDescription>
              </div>
               <div className="flex items-center gap-2">
                  {/* TODO: Implement search functionality */}
                  <div className="relative">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                     <Input placeholder="Search employees..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
                  </div>
                  {/* TODO: Implement Add Employee functionality (maybe invite?) */}
                  {/* <Button size="sm" className="gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Add Employee
                  </Button> */}
               </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead> {/* Consider using Firestore UID or custom ID */}
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead> {/* Fetch from user doc */}
                    <TableHead>Position</TableHead> {/* Fetch from user doc */}
                    <TableHead>Reg. Status</TableHead> {/* Check if face data exists */}
                     <TableHead>Role</TableHead> {/* Fetch role from user doc */}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* TODO: Replace with fetched employee data */}
                  {employees.map((employee) => (
                    <TableRow key={employee.firestoreId}> {/* Use Firestore ID as key */}
                      <TableCell className="font-mono text-xs">{employee.firestoreId}</TableCell>
                      <TableCell className="font-medium">{employee.name || employee.firestoreId}</TableCell> {/* Display name or ID */}
                      <TableCell>{employee.department || 'N/A'}</TableCell>
                      <TableCell>{employee.position || 'N/A'}</TableCell>
                      <TableCell>
                         {/* TODO: Determine status based on actual face registration data */}
                         <Badge variant={employee.status === 'Registered' ? 'default' : 'secondary'} className={employee.status === 'Registered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}>
                           {employee.status}
                         </Badge>
                      </TableCell>
                       <TableCell>
                           {/* TODO: Fetch role from Firestore user document */}
                           <Badge variant={employee.id === 'EMP001' ? 'outline' : 'secondary'} className={employee.id === 'EMP001' ? 'border-blue-500 text-blue-700' : ''}>
                              {employee.id === 'EMP001' ? 'Admin' : 'User'} {/* Placeholder role */}
                           </Badge>
                       </TableCell>
                       <TableCell>
                         <div className="flex gap-1">
                            {/* TODO: Implement Edit (role change?) and Delete functionality */}
                           <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit User Role">
                              <Edit className="h-4 w-4" />
                           </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Delete User">
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
              {/* TODO: Implement pagination */}
              <span className="text-sm text-muted-foreground">Showing 1-{employees.length} of {employees.length} employees</span>
            </CardFooter>
          </Card>

          {/* Attendance Reports Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <div>
                  <CardTitle>Attendance Reports</CardTitle>
                  <CardDescription>View and export attendance logs.</CardDescription>
               </div>
               {/* TODO: Implement Export functionality */}
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
                    <TableHead>Employee ID</TableHead> {/* Should be Firestore User ID */}
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {/* TODO: Replace with fetched attendance data */}
                  {attendanceLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.id}</TableCell>
                      <TableCell className="font-mono text-xs">{log.firestoreUserId}</TableCell>
                      <TableCell className="font-medium">{log.name}</TableCell> {/* Fetch name based on firestoreUserId */}
                      <TableCell>{log.date}</TableCell> {/* Format timestamp */}
                      <TableCell>{log.time}</TableCell> {/* Format timestamp */}
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
               {/* TODO: Implement date filtering/pagination */}
                <span className="text-sm text-muted-foreground">Showing recent logs</span>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
