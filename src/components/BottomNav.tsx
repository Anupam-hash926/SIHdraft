import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Bell, 
  ShieldCheck, 
  User 
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Livestock', href: '/livestock', icon: Users },
  { name: 'Wiki', href: '/wiki', icon: BookOpen },
  { name: 'Training', href: '/training', icon: GraduationCap },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Compliance', href: '/compliance', icon: ShieldCheck },
  { name: 'Profile', href: '/profile', icon: User },
];

export const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Don't show bottom nav on auth page or if user is not authenticated
  if (!user || location.pathname === '/auth') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-7 h-16">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-1 px-1 transition-colors ${
                isActive 
                  ? 'text-primary bg-secondary/50' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};