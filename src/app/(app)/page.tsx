import ProjectCard from '@/components/projects/ProjectCard';
import type { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for now
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Collaborative Code Editor',
    description: 'A real-time collaborative code editor built with modern web technologies. Allows multiple users to edit the same file simultaneously.',
    teamMembers: ['Alice Wonderland', 'Bob The Builder'],
    roles: 'Frontend Dev, Backend Dev',
    plannedContributions: 'Alice: UI/UX, Real-time sync. Bob: API, Database.',
    progress: 75,
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React', 'Node.js', 'WebSockets'],
  },
  {
    id: '2',
    name: 'AI Powered Recipe Generator',
    description: 'An application that suggests recipes based on available ingredients using a machine learning model. Users can input ingredients and get creative recipe ideas.',
    teamMembers: ['Charlie Brown', 'Diana Prince'],
    roles: 'AI/ML Engineer, Fullstack Dev',
    plannedContributions: 'Charlie: ML Model. Diana: Web App.',
    progress: 40,
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Python', 'Flask', 'Next.js', 'AI'],
  },
  {
    id: '3',
    name: 'Gamified Learning Platform',
    description: 'A platform that makes learning new skills fun through gamification elements like points, badges, and leaderboards.',
    teamMembers: ['Edward Scissorhands'],
    roles: 'Solo Developer',
    plannedContributions: 'Full-stack development and game design.',
    progress: 60,
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Gamification', 'Education', 'Ruby on Rails'],
  },
   {
    id: '4',
    name: 'Community Garden Planner',
    description: 'A web app to help local communities organize and manage shared garden spaces, including plot assignments and planting schedules.',
    teamMembers: ['Fiona Apple', 'George Jetson'],
    roles: 'UX Designer, Software Engineer',
    plannedContributions: 'Fiona: User research and design. George: Backend and frontend implementation.',
    progress: 25,
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Community', 'Sustainability', 'Django'],
  },
];

export default function ProjectShowcasePage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Project Showcase</h1>
        <Button asChild>
          <Link href="/submit-project">Submit New Project</Link>
        </Button>
      </div>
      
      {mockProjects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No projects submitted yet.</p>
          <p className="mt-2">Be the first to <Link href="/submit-project" className="text-primary hover:underline">submit a project</Link>!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
