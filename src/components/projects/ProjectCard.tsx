import Image from 'next/image';
import type { Project } from '@/types/project';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={project.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(project.name)}`}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="technology project"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="mb-2 text-xl">{project.name}</CardTitle>
        <CardDescription className="mb-4 text-sm line-clamp-3">{project.description}</CardDescription>
        
        <div className="mb-3">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Team Members</h4>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{project.teamMembers.join(', ') || 'N/A'}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Roles</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.roles || 'N/A'}</p>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="mb-4 space-x-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="w-full">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} aria-label={`${project.name} progress ${project.progress}%`} />
        </div>
      </CardFooter>
    </Card>
  );
}
