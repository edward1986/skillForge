'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  PlusSquare,
  Lightbulb,
  User,
  Settings,
  LucideIcon,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Showcase', icon: LayoutGrid },
  { href: '/submit-project', label: 'Submit Project', icon: PlusSquare },
  { href: '/ai-suggestions', label: 'AI Suggestions', icon: Lightbulb },
  { href: '/dashboard', label: 'Dashboard', icon: User },
  { href: '/admin', label: 'Admin', icon: Settings },
];

interface AppSidebarNavProps {
  mobile?: boolean;
}

export default function AppSidebarNav({ mobile = false }: AppSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "grid items-start gap-1 px-2 text-sm font-medium lg:px-4",
      mobile && "flex flex-col gap-2 px-4 text-base"
    )}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === item.href && 'bg-muted text-primary',
            mobile && 'py-3'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
