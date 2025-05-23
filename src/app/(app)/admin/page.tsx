import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserPlus, Settings as SettingsIcon, Trash2, Edit3 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock Data
const mockAdminProjects = [
  { id: '1', name: 'Collaborative Code Editor', status: 'Active', teamSize: 2, progress: 75 },
  { id: '2', name: 'AI Powered Recipe Generator', status: 'In Progress', teamSize: 2, progress: 40 },
  { id: '3', name: 'Gamified Learning Platform', status: 'Paused', teamSize: 1, progress: 60 },
];

const mockUsers = [
  { id: 'u1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'Member', projects: 1 },
  { id: 'u2', name: 'Bob The Builder', email: 'bob@example.com', role: 'Member', projects: 1 },
  { id: 'u3', name: 'Admin User', email: 'admin@skillforge.com', role: 'Admin', projects: 0 },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects Overview</CardTitle>
              <CardDescription>View and manage all submitted projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Team Size</TableHead>
                    <TableHead className="hidden md:table-cell">Progress</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>{project.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{project.teamSize}</TableCell>
                      <TableCell className="hidden md:table-cell">{project.progress}%</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user roles and access.</CardDescription>
              </div>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" /> Add User
              </Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Projects</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                       <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'destructive' : 'outline'}>{user.role}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.projects}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Edit Role</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> Remove User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Adjust system-wide settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage automated reminders.</p>
                </div>
                <Button variant="outline"><SettingsIcon className="mr-2 h-4 w-4" /> Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">AI Model Configuration</h3>
                  <p className="text-sm text-muted-foreground">Select AI model for suggestions.</p>
                </div>
                 <Button variant="outline"><SettingsIcon className="mr-2 h-4 w-4" /> Configure</Button>
              </div>
               <p className="text-sm text-muted-foreground p-4 border rounded-lg bg-muted/50">
                More system settings will be available here. (e.g. Theme, API Keys, Feature Flags)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
