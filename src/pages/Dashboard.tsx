import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Shield, Activity, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppDrawer } from "@/components/AppDrawer";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen">
      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <header className="bg-primary text-primary-foreground p-4 shadow-sm">
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
            <h1 className="text-2xl font-heading font-bold">BioFence</h1>
            <p className="text-primary-foreground/80 font-body text-sm">Farm Biosecurity Dashboard</p>
          </div>
        </div>
      </header>
      <main className="container-app">
        {/* Hero */}
        <section className="section-spacing">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="hero-headline text-gradient-apple">BioFence</h2>
            <p className="subheadline mt-4">Smart biosecurity and livestock insights. Designed to be effortless, powerful, and beautifully simple.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button onClick={() => handleCardClick('/livestock')}>Explore Livestock</Button>
              <Button variant="outline" onClick={() => handleCardClick('/alerts')}>View Alerts</Button>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 section-spacing">
          <Card className="glass">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-success" />
                <CardTitle className="text-lg">Health at a glance</CardTitle>
              </div>
              <CardDescription>Live health scores across your herds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Poultry Health</span>
                  <span className="text-success font-semibold">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Pig Health</span>
                  <span className="text-success font-semibold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass cursor-pointer" onClick={() => handleCardClick('/alerts') }>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-warning" />
                <CardTitle className="text-lg">Critical alerts</CardTitle>
              </div>
              <CardDescription>Stay ahead of outbreaks and risks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <div>
                  <p className="font-medium">Avian Flu Outbreak</p>
                  <p className="text-sm text-muted-foreground">15km from your location</p>
                </div>
                <Badge variant="destructive">High Risk</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <div>
                  <p className="font-medium">Vaccination Due</p>
                  <p className="text-sm text-muted-foreground">Poultry Block A - 3 days overdue</p>
                </div>
                <Badge variant="secondary">Overdue</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="glass cursor-pointer" onClick={() => handleCardClick('/compliance') }>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Compliance</CardTitle>
              </div>
              <CardDescription>Audit-ready, always</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">94%</div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">3</div>
                  <p className="text-sm text-muted-foreground">Areas to Improve</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">Tap to view full report</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-info" />
                <CardTitle className="text-lg">This month</CardTitle>
              </div>
              <CardDescription>Performance at a glance</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted/40">
                <div className="text-xl font-bold text-success">98.5%</div>
                <p className="text-xs text-muted-foreground">Survival Rate</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40">
                <div className="text-xl font-bold text-primary">$12,450</div>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40">
                <div className="text-xl font-bold text-accent">24</div>
                <p className="text-xs text-muted-foreground">Vaccinations</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40">
                <div className="text-xl font-bold text-warning">5</div>
                <p className="text-xs text-muted-foreground">Health Issues</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};