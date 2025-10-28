import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, LogOut, Menu, Ticket, UserCircle, UsersRound } from 'lucide-react';

import { Button } from '@/components/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useMobile } from '@/hooks/use-mobile';

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/tickets', label: 'Tickets', icon: Ticket },
  { to: '/customers', label: 'Customers', icon: UsersRound },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/account', label: 'Account', icon: UserCircle }
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const isMobile = useMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside
        className={cn(
          'border-r border-slate-800 bg-slate-900/80 backdrop-blur transition md:static md:w-64',
          {
            'absolute inset-y-0 left-0 z-30 w-64 shadow-xl md:shadow-none': isMobile && menuOpen,
            'hidden md:block': isMobile && !menuOpen,
            'w-64': !isMobile
          }
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link to="/dashboard" className="text-lg font-semibold tracking-tight">
            Tiketing Pro
          </Link>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setMenuOpen(false)}>
              Close
            </Button>
          )}
        </div>
        <nav className="space-y-1 px-3 pb-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-800/60',
                    isActive ? 'bg-slate-800/80 text-white' : 'text-slate-300'
                  )
                }
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={() => setMenuOpen((prev) => !prev)}>
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <span className="text-sm text-slate-400">{location.pathname}</span>
            </div>
            <div className="flex items-center gap-3">
              {user && (
                <div className="text-right text-xs">
                  <p className="font-medium text-slate-100">{user.name}</p>
                  <p className="text-slate-400">{user.role}</p>
                </div>
              )}
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
