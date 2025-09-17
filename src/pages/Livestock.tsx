import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, Syringe, Droplets, Utensils, Menu } from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Animal {
  id: string;
  name: string;
  type: 'pig' | 'chicken';
  age: string;
  lastVaccination: string;
  lastCleaned: string;
  lastFed: string;
  healthStatus: 'healthy' | 'caution' | 'sick';
}

const mockAnimals: Animal[] = [
  {
    id: '001',
    name: 'Pen A - Chickens',
    type: 'chicken',
    age: '12 weeks',
    lastVaccination: '2024-10-15',
    lastCleaned: '2024-11-10',
    lastFed: '2024-11-12',
    healthStatus: 'healthy'
  },
  {
    id: '002',
    name: 'Pig Block B',
    type: 'pig',
    age: '6 months',
    lastVaccination: '2024-09-20',
    lastCleaned: '2024-11-11',
    lastFed: '2024-11-12',
    healthStatus: 'caution'
  }
];

export const Livestock = () => {
  const [animals, setAnimals] = useState<Animal[]>(mockAnimals);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showHealthLogDialog, setShowHealthLogDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);

  const [updateForm, setUpdateForm] = useState({
    lastVaccination: '',
    lastCleaned: '',
    lastFed: '',
    notes: '',
  });

  const [createForm, setCreateForm] = useState({
    name: '',
    type: 'chicken' as Animal['type'],
    age: '',
    lastVaccination: '',
    lastCleaned: '',
    lastFed: '',
  });

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Animal['healthStatus']) => {
    switch (status) {
      case 'healthy': return 'bg-success text-success-foreground';
      case 'caution': return 'bg-warning text-warning-foreground';
      case 'sick': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: Animal['type']) => {
    return type === 'pig' ? '🐖' : '🐔';
  };

  const openUpdate = (animal: Animal) => {
    setActiveAnimal(animal);
    setUpdateForm({
      lastVaccination: animal.lastVaccination,
      lastCleaned: animal.lastCleaned,
      lastFed: animal.lastFed,
      notes: '',
    });
    setShowUpdateDialog(true);
  };

  const saveUpdate = () => {
    if (!activeAnimal) return;
    setAnimals(prev => prev.map(a => a.id === activeAnimal.id ? {
      ...a,
      lastVaccination: updateForm.lastVaccination || a.lastVaccination,
      lastCleaned: updateForm.lastCleaned || a.lastCleaned,
      lastFed: updateForm.lastFed || a.lastFed,
    } : a));
    setShowUpdateDialog(false);
  };

  const openHealthLog = (animal: Animal) => {
    setActiveAnimal(animal);
    setShowHealthLogDialog(true);
  };

  const openCreate = () => {
    setCreateForm({ name: '', type: 'chicken', age: '', lastVaccination: '', lastCleaned: '', lastFed: '' });
    setShowCreateDialog(true);
  };

  const saveCreate = () => {
    const newAnimal: Animal = {
      id: Math.random().toString().slice(2, 6),
      name: createForm.name || 'New Pen',
      type: createForm.type,
      age: createForm.age || '0 weeks',
      lastVaccination: createForm.lastVaccination || '—',
      lastCleaned: createForm.lastCleaned || '—',
      lastFed: createForm.lastFed || '—',
      healthStatus: 'healthy',
    };
    setAnimals(prev => [newAnimal, ...prev]);
    setShowCreateDialog(false);
  };

  return (
    <div className="min-h-screen">
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
            <h1 className="text-2xl font-heading font-bold">Livestock Tracker</h1>
            <p className="text-primary-foreground/80 font-body">Monitor your animals and biosecurity</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Search and Add */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search livestock..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button size="icon" className="shrink-0" onClick={openCreate} aria-label="Create new record">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Livestock Cards */}
        <div className="space-y-3">
          {filteredAnimals.map((animal) => (
            <Card key={animal.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(animal.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{animal.name}</CardTitle>
                      <CardDescription>Age: {animal.age}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(animal.healthStatus)}>
                    {animal.healthStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                    <Syringe className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Last Vaccination</p>
                      <p className="text-xs text-muted-foreground">{animal.lastVaccination}</p>
                    </div>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                    <Droplets className="h-4 w-4 text-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Last Cleaned</p>
                      <p className="text-xs text-muted-foreground">{animal.lastCleaned}</p>
                    </div>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                    <Utensils className="h-4 w-4 text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Last Fed</p>
                      <p className="text-xs text-muted-foreground">{animal.lastFed}</p>
                    </div>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openUpdate(animal)}>
                    Update Records
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openHealthLog(animal)}>
                    Health Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Update Records Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Records{activeAnimal ? ` — ${activeAnimal.name}` : ''}</DialogTitle>
            <DialogDescription>Modify recent activity for this group.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Last Vaccination</label>
                <Input type="date" value={updateForm.lastVaccination} onChange={(e) => setUpdateForm({ ...updateForm, lastVaccination: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Last Cleaned</label>
                <Input type="date" value={updateForm.lastCleaned} onChange={(e) => setUpdateForm({ ...updateForm, lastCleaned: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Last Fed</label>
                <Input type="date" value={updateForm.lastFed} onChange={(e) => setUpdateForm({ ...updateForm, lastFed: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Notes</label>
                <Textarea rows={3} value={updateForm.notes} onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
            <Button onClick={saveUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Health Log Dialog */}
      <Dialog open={showHealthLogDialog} onOpenChange={setShowHealthLogDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Health Log{activeAnimal ? ` — ${activeAnimal.name}` : ''}</DialogTitle>
            <DialogDescription>Recent activity and observations.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-md bg-muted/40">
              <div className="font-medium">2024-11-12 • Feeding</div>
              <div>Evening feed completed. Water lines flushed.</div>
            </div>
            <div className="p-3 rounded-md bg-muted/40">
              <div className="font-medium">2024-11-10 • Cleaning</div>
              <div>Deep clean performed. Disinfectant: QAC-based.</div>
            </div>
            <div className="p-3 rounded-md bg-muted/40">
              <div className="font-medium">2024-10-15 • Vaccination</div>
              <div>Administered ND + IB per schedule. No adverse reactions.</div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHealthLogDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Record Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Record</DialogTitle>
            <DialogDescription>Add a new group or pen to your tracker.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Name</label>
                <Input value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} placeholder="e.g. Pen C - Growers" />
              </div>
              <div>
                <label className="text-sm">Type</label>
                <select className="h-10 w-full rounded-md border border-input px-3 text-sm bg-background" value={createForm.type} onChange={(e) => setCreateForm({ ...createForm, type: e.target.value as Animal['type'] })}>
                  <option value="chicken">Poultry</option>
                  <option value="pig">Pig</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm">Age</label>
                <Input value={createForm.age} onChange={(e) => setCreateForm({ ...createForm, age: e.target.value })} placeholder="e.g. 8 weeks" />
              </div>
              <div>
                <label className="text-sm">Last Vaccination</label>
                <Input type="date" value={createForm.lastVaccination} onChange={(e) => setCreateForm({ ...createForm, lastVaccination: e.target.value })} />
              </div>
              <div>
                <label className="text-sm">Last Cleaned</label>
                <Input type="date" value={createForm.lastCleaned} onChange={(e) => setCreateForm({ ...createForm, lastCleaned: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Last Fed</label>
                <Input type="date" value={createForm.lastFed} onChange={(e) => setCreateForm({ ...createForm, lastFed: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={saveCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};