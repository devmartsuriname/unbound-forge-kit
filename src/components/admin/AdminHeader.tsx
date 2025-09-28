import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { LogOut, User } from 'lucide-react';

export function AdminHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-6">
        <SidebarTrigger className="-ml-1" />
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline-block">
              {user?.email}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline-block">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}