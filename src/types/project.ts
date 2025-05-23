export interface TeamMember {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamMembers: string[]; // Simplified to array of names for now
  roles: string;
  plannedContributions: string;
  progress: number; // Percentage 0-100
  imageUrl?: string;
  tags?: string[];
}
