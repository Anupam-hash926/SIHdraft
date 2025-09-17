import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Bell, Clock, MapPin, Syringe, Droplets, Utensils, Settings, Menu } from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";

interface Alert {
  id: string;
  type: 'outbreak' | 'feeding' | 'cleaning' | 'vaccination';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  time: string;
  isRead: boolean;
}

interface AlertSettings {
  outbreakAlerts: boolean;
  feedingReminders: boolean;
  cleaningReminders: boolean;
  vaccinationReminders: boolean;
  locationRadius: number;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'outbreak',
    title: 'Avian Flu Outbreak Alert',
    description: 'H5N1 strain detected in commercial poultry farm 15km from your location',
    severity: 'critical',
    location: 'Sector 7, Agricultural Zone',
    time: '2 hours ago',
    isRead: false
  },
  {
    id: '2',
    type: 'vaccination',
    title: 'Vaccination Due Reminder',
    description: 'Newcastle Disease vaccination due for Poultry Block A (150 birds)',
    severity: 'high',
    time: '6 hours ago',
    isRead: false
  },
  {
    id: '3',
    type: 'feeding',
    title: 'Feeding Time Reminder',
    description: 'Evening feeding scheduled for Pig Block B at 6:00 PM',
    severity: 'medium',
    time: '1 day ago',
    isRead: true
  },
  {
    id: '4',
    type: 'cleaning',
    title: 'Cleaning Schedule Alert',
    description: 'Deep cleaning due for Poultry Houses 1-3 this weekend',
    severity: 'medium',
    time: '2 days ago',
    isRead: true
  }
];

export const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showSettings, setShowSettings] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [settings, setSettings] = useState<AlertSettings>({
    outbreakAlerts: true,
    feedingReminders: true,
    cleaningReminders: true,
    vaccinationReminders: true,
    locationRadius: 25
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'outbreak': return <AlertTriangle className="h-5 w-5" />;
      case 'vaccination': return <Syringe className="h-5 w-5" />;
      case 'cleaning': return <Droplets className="h-5 w-5" />;
      case 'feeding': return <Utensils className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low': return 'bg-muted text-muted-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-accent text-accent-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
    }
  };

  const getAlertTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'outbreak': return 'text-destructive';
      case 'vaccination': return 'text-primary';
      case 'cleaning': return 'text-accent';
      case 'feeding': return 'text-success';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  if (showSettings) {
    return (
      <div className="min-h-screen bg-background">
        <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <header className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-heading font-bold">Alert Settings</h1>
                <p className="text-primary-foreground/80 font-body">Manage your notifications</p>
              </div>
            </div>
            <Button
              variant="ghost" 
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>Choose which alerts you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium">Disease Outbreak Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical disease outbreaks in your area</p>
                  </div>
                </div>
                <Switch
                  checked={settings.outbreakAlerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, outbreakAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Utensils className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">Feeding Reminders</p>
                    <p className="text-sm text-muted-foreground">Scheduled feeding time notifications</p>
                  </div>
                </div>
                <Switch
                  checked={settings.feedingReminders}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, feedingReminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">Cleaning Reminders</p>
                    <p className="text-sm text-muted-foreground">Scheduled cleaning and disinfection</p>
                  </div>
                </div>
                <Switch
                  checked={settings.cleaningReminders}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, cleaningReminders: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Syringe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Vaccination Reminders</p>
                    <p className="text-sm text-muted-foreground">Due dates for animal vaccinations</p>
                  </div>
                </div>
                <Switch
                  checked={settings.vaccinationReminders}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, vaccinationReminders: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Settings</CardTitle>
              <CardDescription>Set your alert radius for outbreak notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Alert Radius</span>
                  <span className="text-sm text-muted-foreground">{settings.locationRadius} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">5km</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(settings.locationRadius - 5) / 45 * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">50km</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-bold flex items-center gap-2">
              <Bell className="h-6 w-6" />
              BioFence Alerts
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-destructive text-destructive-foreground font-accent">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-primary-foreground/80 font-body">Stay informed about your farm</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
            aria-label="Alert settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-3">
        {alerts.map((alert) => (
          <Card 
            key={alert.id}
            className={`${!alert.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''} cursor-pointer hover:shadow-md transition-all duration-200`}
            onClick={() => markAsRead(alert.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className={`${getAlertTypeColor(alert.type)} mt-1`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-tight font-heading">{alert.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity) + " font-accent"}>
                        {alert.severity}
                      </Badge>
                      {!alert.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2 font-body">{alert.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
                {alert.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};