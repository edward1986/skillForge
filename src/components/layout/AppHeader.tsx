import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Search, UserCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import AppSidebarNav from './AppSidebarNav'; // We'll create this to share nav logic

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Logo className="h-8 w-auto" />
          <span className="sr-only">Skill Forge</span>
        </Link>
        <Link href="/" className="text-foreground transition-colors hover:text-foreground/80">
          Showcase
        </Link>
        <Link
          href="/submit-project"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          Submit Project
        </Link>
        <Link
          href="/ai-suggestions"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          AI Suggestions
        </Link>
        <Link
          href="/dashboard"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          Dashboard
        </Link>
        <Link
          href="/admin"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          Admin
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-full max-h-screen flex-col">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <AppSidebarNav mobile={true} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          {/* Search can be implemented later */}
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div> */}
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle2 className="h-6 w-6" />
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
}
