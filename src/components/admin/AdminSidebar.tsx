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
    <Sidebar className={`tg-admin-sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <SidebarHeader className="tg-admin-sidebar-header">
        <div className="logo">
          P
        </div>
        {!collapsed && (
          <div className="brand-info">
            <h4>PingPe Admin</h4>
            <p>Jungle Resort</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <div className="tg-admin-nav">
          {navigationItems.map((section) => (
            <div key={section.title} className="nav-section">
              {!collapsed && (
                <div className="section-label">{section.title}</div>
              )}
              <ul className="nav-list">
                {section.items.map((item) => (
                  <li key={item.title} className="nav-item">
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: navActive }) => 
                        `nav-link ${isActive(item.url) || navActive ? 'active' : ''}`
                      }
                    >
                      <item.icon className="nav-icon" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter style={{ padding: '16px', borderTop: '1px solid var(--tg-border-1)' }}>
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--tg-grey-4)', 
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {!collapsed && 'PingPe Admin v1.0'}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}