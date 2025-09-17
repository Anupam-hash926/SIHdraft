import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle,
  LogOut,
  Edit,
  Camera,
  Loader2,
  Menu
} from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";

interface UserProfile {
  full_name: string;
  farm_name: string;
  phone: string;
  farm_location: string;
  role: string;
}

interface AppSettings {
  notifications: boolean;
  locationServices: boolean;
  darkMode: boolean;
  autoBackup: boolean;
  offlineMode: boolean;
}

export const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    full_name: '',
    farm_name: '',
    phone: '',
    farm_location: '',
    role: 'farmer'
  });

  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    locationServices: true,
    darkMode: false,
    autoBackup: true,
    offlineMode: false
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          farm_name: data.farm_name || '',
          phone: data.phone || '',
          farm_location: data.farm_location || '',
          role: data.role || 'farmer'
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile changes",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateSetting = (setting: keyof AppSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const farmStats = [
    { label: 'Total Animals', value: '552', icon: '🐾' },
    { label: 'Compliance Score', value: '94%', icon: '🛡️' },
    { label: 'Days Active', value: user ? Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)).toString() : '0', icon: '📅' },
    { label: 'Training Hours', value: '45', icon: '🎓' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDrawerOpen(true)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              Profile & Settings
            </h1>
            <p className="text-primary-foreground/80">Manage your account and preferences</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4 relative">
              <User className="h-12 w-12 text-primary" />
              <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-xl">{profile.full_name || user?.email}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.farm_location || 'Location not set'}
            </CardDescription>
            <Badge variant="outline" className="mx-auto">
              Member since {user ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
            </Badge>
          </CardHeader>
        </Card>

        {/* Farm Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Farm Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {farmStats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (isEditing) {
                    saveProfile();
                  } else {
                    setIsEditing(true);
                  }
                }}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Edit className="h-4 w-4 mr-1" />
                )}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.full_name}
                  onChange={(e) => updateProfile('full_name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  value={profile.farm_name}
                  onChange={(e) => updateProfile('farm_name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled={true}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Farm Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={profile.farm_location}
                    onChange={(e) => updateProfile('farm_location', e.target.value)}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts and reminders</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => updateSetting('notifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Location Services</p>
                  <p className="text-sm text-muted-foreground">For outbreak alerts in your area</p>
                </div>
              </div>
              <Switch
                checked={settings.locationServices}
                onCheckedChange={(checked) => updateSetting('locationServices', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Auto Backup</p>
                  <p className="text-sm text-muted-foreground">Automatically backup your data</p>
                </div>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Offline Mode</p>
                  <p className="text-sm text-muted-foreground">Access app without internet</p>
                </div>
              </div>
              <Switch
                checked={settings.offlineMode}
                onCheckedChange={(checked) => updateSetting('offlineMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <HelpCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Help & Support</div>
                <div className="text-sm text-muted-foreground">Get help or report issues</div>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <Settings className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Data Export</div>
                <div className="text-sm text-muted-foreground">Download your farm data</div>
              </div>
            </Button>

            <Button 
              variant="destructive" 
              className="w-full justify-start h-auto p-4"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Sign Out</div>
                <div className="text-sm text-destructive-foreground/80">Log out of your account</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground py-4">
          Farm Portal v1.2.3 • Built with ❤️ for farmers
        </div>
      </div>
    </div>
  );
};