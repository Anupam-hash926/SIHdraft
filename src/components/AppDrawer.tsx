import { 
  BarChart3, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Bell, 
  ShieldCheck, 
  MessageCircle,
  User,
  X
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3, description: 'Overview & status' },
  { name: 'Livestock', href: '/livestock', icon: Users, description: 'Manage animals' },
  { name: 'Wiki', href: '/wiki', icon: BookOpen, description: 'Knowledge base' },
  { name: 'Training', href: '/training', icon: GraduationCap, description: 'Learning modules' },
  { name: 'Alerts', href: '/alerts', icon: Bell, description: 'Risk notifications' },
  { name: 'Compliance', href: '/compliance', icon: ShieldCheck, description: 'Biosecurity check' },
  { name: 'Ask', href: '/ask', icon: MessageCircle, description: 'AI & Expert help' },
  { name: 'Profile', href: '/profile', icon: User, description: 'Account settings' },
];

export const AppDrawer = ({ isOpen, onClose }: AppDrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 h-full w-80 bg-background shadow-2xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-heading font-bold">BioFence</h2>
            <p className="text-primary-foreground/80 font-body text-sm mt-1">
              Farm Biosecurity Management
            </p>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="space-y-1 px-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "text-foreground hover:bg-muted hover:shadow-sm"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    <div className="flex-1">
                      <div className={cn(
                        "font-medium font-body",
                        isActive ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {item.name}
                      </div>
                      <div className={cn(
                        "text-xs font-body",
                        isActive 
                          ? "text-primary-foreground/80" 
                          : "text-muted-foreground group-hover:text-muted-foreground"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-muted/20">
            <p className="text-xs text-muted-foreground text-center font-body">
              BioFence v1.0 • Secure Farm Management
            </p>
          </div>
        </div>
      </div>
    </>
  );
};