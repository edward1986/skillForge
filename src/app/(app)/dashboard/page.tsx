import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ListChecks, Zap } from "lucide-react";

// Mock Data
const userProjects = [
  { id: '1', name: 'Collaborative Code Editor', progress: 75, role: 'Frontend Developer' },
  { id: '5', name: 'Personal Portfolio Site', progress: 100, role: 'Full Stack Developer' },
];

const userContributions = [
  { id: 'c1', projectId: '1', description: 'Implemented real-time text synchronization feature.' },
  { id: 'c2', projectId: '1', description: 'Designed user interface for settings panel.' },
  { id: 'c3', projectId: '5', description: 'Deployed site to Vercel.' },
];

const skillsGained = ['React', 'TypeScript', 'WebSockets', 'Next.js', 'Tailwind CSS', 'Project Management'];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              My Projects
            </CardTitle>
            <CardDescription>Overview of your active projects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProjects.length > 0 ? userProjects.map(project => (
              <div key={project.id} className="p-3 border rounded-md bg-muted/50">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">Role: {project.role}</p>
                <Progress value={project.progress} className="h-2 mt-1" aria-label={`${project.name} progress ${project.progress}%`} />
                <p className="text-xs text-muted-foreground mt-1 text-right">{project.progress}% complete</p>
              </div>
            )) : <p className="text-sm text-muted-foreground">No active projects.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              My Contributions
            </CardTitle>
            <CardDescription>Track your contributions across projects.</CardDescription>
          </CardHeader>
          <CardContent>
            {userContributions.length > 0 ? (
              <ul className="space-y-2 text-sm list-disc list-inside">
                {userContributions.slice(0, 5).map(contrib => ( // Show max 5 contributions
                  <li key={contrib.id}>{contrib.description} (Project ID: {contrib.projectId})</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No contributions logged yet.</p>
            )}
             {userContributions.length > 5 && <p className="text-xs text-muted-foreground mt-2">And {userContributions.length - 5} more...</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Skills Gained
            </CardTitle>
            <CardDescription>Skills you're developing.</CardDescription>
          </CardHeader>
          <CardContent>
            {skillsGained.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skillsGained.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills tracked yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
