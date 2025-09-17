import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Heart, AlertTriangle, Shield, Menu } from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";

type AnimalType = 'pig' | 'chicken' | null;

interface AnimalInfo {
  name: string;
  icon: string;
  preferredFood: string[];
  commonDiseases: Array<{
    name: string;
    severity: 'low' | 'medium' | 'high';
    symptoms: string[];
    treatment: string;
  }>;
  biosecurityPractices: Array<{
    practice: string;
    description: string;
    trainingLink: string;
  }>;
}

const animalData: Record<'pig' | 'chicken', AnimalInfo> = {
  pig: {
    name: 'Pigs',
    icon: '🐖',
    preferredFood: ['Corn-based feed', 'Soybean meal', 'Barley', 'Wheat', 'Fresh vegetables', 'Clean water'],
    commonDiseases: [
      {
        name: 'African Swine Fever',
        severity: 'high',
        symptoms: ['High fever', 'Loss of appetite', 'Red skin patches', 'Diarrhea'],
        treatment: 'No treatment available - prevention through biosecurity is critical'
      },
      {
        name: 'PRRS (Blue Ear Disease)',
        severity: 'high',
        symptoms: ['Respiratory issues', 'Reproductive problems', 'Blue discoloration of ears'],
        treatment: 'Vaccination and supportive care'
      },
      {
        name: 'Salmonella',
        severity: 'medium',
        symptoms: ['Diarrhea', 'Fever', 'Dehydration', 'Loss of appetite'],
        treatment: 'Antibiotics and fluid therapy'
      }
    ],
    biosecurityPractices: [
      {
        practice: 'Quarantine Procedures',
        description: 'Isolate new animals for 30 days before introducing to herd',
        trainingLink: '/training?topic=quarantine&animal=pig'
      },
      {
        practice: 'Disinfection Protocols',
        description: 'Daily disinfection of equipment and facilities',
        trainingLink: '/training?topic=disinfection&animal=pig'
      },
      {
        practice: 'Feed Safety',
        description: 'Proper storage and handling of feed to prevent contamination',
        trainingLink: '/training?topic=feed-safety&animal=pig'
      }
    ]
  },
  chicken: {
    name: 'Poultry (Chickens)',
    icon: '🐔',
    preferredFood: ['Layer/Broiler feed', 'Cracked corn', 'Millet', 'Sunflower seeds', 'Leafy greens', 'Clean water'],
    commonDiseases: [
      {
        name: 'Avian Influenza',
        severity: 'high',
        symptoms: ['Sudden death', 'Respiratory distress', 'Swollen head', 'Blue comb'],
        treatment: 'No treatment - immediate culling and disinfection required'
      },
      {
        name: 'Newcastle Disease',
        severity: 'high',
        symptoms: ['Respiratory issues', 'Nervous signs', 'Diarrhea', 'Egg production drop'],
        treatment: 'Vaccination program and supportive care'
      },
      {
        name: 'Coccidiosis',
        severity: 'medium',
        symptoms: ['Bloody diarrhea', 'Weight loss', 'Lethargy', 'Dehydration'],
        treatment: 'Anticoccidial medication and improved hygiene'
      }
    ],
    biosecurityPractices: [
      {
        practice: 'Visitor Control',
        description: 'Restrict and monitor all farm visitors',
        trainingLink: '/training?topic=visitor-control&animal=chicken'
      },
      {
        practice: 'Wildlife Prevention',
        description: 'Prevent contact with wild birds and rodents',
        trainingLink: '/training?topic=wildlife-control&animal=chicken'
      },
      {
        practice: 'Vaccination Schedule',
        description: 'Maintain proper vaccination protocols',
        trainingLink: '/training?topic=vaccination&animal=chicken'
      }
    ]
  }
};

export const Wiki = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
    }
  };

  if (!selectedAnimal) {
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
              <h1 className="text-2xl font-bold">Animal Wiki</h1>
              <p className="text-primary-foreground/80">Choose an animal to learn more</p>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="grid gap-4">
            <Card className="cursor-pointer hover:bg-accent/5 transition-colors"
                  onClick={() => setSelectedAnimal('pig')}>
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">🐖</div>
                <CardTitle className="text-xl">Pigs</CardTitle>
                <CardDescription>Learn about pig care, diseases, and biosecurity</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/5 transition-colors"
                  onClick={() => setSelectedAnimal('chicken')}>
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">🐔</div>
                <CardTitle className="text-xl">Poultry (Chickens)</CardTitle>
                <CardDescription>Learn about chicken care, diseases, and biosecurity</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const animalInfo = animalData[selectedAnimal];

  return (
    <div className="min-h-screen pb-20">
      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3 justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedAnimal(null)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>{animalInfo.icon}</span>
              {animalInfo.name}
            </h1>
            <p className="text-primary-foreground/80">Comprehensive care guide</p>
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

      <div className="p-4 space-y-6">
        {/* Preferred Food */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-success" />
              <CardTitle>Preferred Food</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {animalInfo.preferredFood.map((food, index) => (
                <Badge key={index} variant="outline" className="justify-center py-2">
                  {food}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Diseases */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle>Common Diseases</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {animalInfo.commonDiseases.map((disease, index) => (
              <Card key={index} className="border-l-4 border-l-warning">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{disease.name}</CardTitle>
                    <Badge className={getSeverityColor(disease.severity)}>
                      {disease.severity.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="font-medium text-sm">Symptoms:</p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Treatment:</p>
                    <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Biosecurity Practices */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Biosecurity Practices</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {animalInfo.biosecurityPractices.map((practice, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{practice.practice}</h4>
                    <Button size="sm" variant="outline" onClick={() => {
                      const params = new URLSearchParams({ animal: selectedAnimal as string, topic: practice.trainingLink.split('topic=')[1]?.split('&')[0] || '' });
                      window.location.href = `/training?${params.toString()}`;
                    }}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Train
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};