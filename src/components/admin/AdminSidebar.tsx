import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  CreditCard,
  MessageSquare,
  Users,
  ShoppingBag,
  Images,
  Settings,
  HelpCircle,
  BarChart3,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '../ui/sidebar';

const navigationItems = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Bookings',
    items: [
      { title: 'Tours', url: '/admin/tours', icon: MapPin },
      { title: 'Bookings', url: '/admin/bookings', icon: CalendarDays },
      { title: 'Payments', url: '/admin/payments', icon: CreditCard },
    ]
  },
  {
    title: 'Content',
    items: [
      { title: 'Team', url: '/admin/team', icon: Users },
      { title: 'FAQ', url: '/admin/faq', icon: HelpCircle },
      { title: 'Contact', url: '/admin/contact', icon: MessageSquare },
      { title: 'Gallery', url: '/admin/gallery', icon: Images },
    ]
  },
  {
    title: 'E-commerce',
    items: [
      { title: 'Shop', url: '/admin/shop', icon: ShoppingBag },
    ]
  },
  {
    title: 'System',
    items: [
      { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
      { title: 'Settings', url: '/admin/settings', icon: Settings },
    ]
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            P
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">PingPe Admin</p>
              <p className="text-xs text-muted-foreground">Jungle Resort</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => 
                          isActive 
                            ? "bg-accent text-accent-foreground font-medium" 
                            : "hover:bg-accent/50"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground text-center">
          {!collapsed && 'PingPe Admin v1.0'}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}