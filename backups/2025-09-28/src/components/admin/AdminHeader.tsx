// Backup of src/components/admin/AdminHeader.tsx - 2025-09-28
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { ThemeToggle } from '../ui/theme-toggle';
import { LogOut, User, Menu } from 'lucide-react';

export function AdminHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="tg-admin-header">
      <div className="header-left">
        <SidebarTrigger className="tg-sidebar-toggle">
          <Menu size={20} />
        </SidebarTrigger>
      </div>
      
      <div className="header-right">
        <ThemeToggle />
        
        <div className="user-info">
          <User className="user-icon" />
          <span className="hidden sm:inline-block">
            {user?.email}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="tg-admin-btn btn-sm gap-2"
          style={{
            background: 'none',
            border: '1px solid var(--tg-border-1)',
            color: 'var(--tg-grey-2)',
            padding: '8px 12px'
          }}
        >
          <LogOut size={16} />
          <span className="hidden sm:inline-block">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
