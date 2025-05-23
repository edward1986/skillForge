import Link from 'next/link';
import { Logo } from '@/components/Logo';
import AppSidebarNav from './AppSidebarNav';

export default function AppSidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-8 w-auto" />
            <span className="sr-only">Skill Forge</span>
          </Link>
        </div>
        <div className="flex-1">
          <AppSidebarNav />
        </div>
        {/* Optional: Footer content for sidebar */}
        {/* <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
