import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Search, Clock, Eye, Menu } from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";

interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
  relevanceScore: number;
}

interface SearchFilters {
  animalType: string;
  diseaseOrConcern: string;
  topicFocus: string;
  farmScale: string;
  contentFormat: string;
  language: string;
}

const mockVideos: TrainingVideo[] = [
  {
    id: '1',
    title: 'Biosecurity Basics for Poultry Farms',
    description: 'Essential biosecurity measures every poultry farmer should implement to prevent disease outbreaks...',
    duration: '12:34',
    views: '45K',
    thumbnail: 'https://placehold.co/320x180/22c55e/ffffff?text=Biosecurity',
    relevanceScore: 95
  },
  {
    id: '2',
    title: 'African Swine Fever Prevention Strategies',
    description: 'Comprehensive guide on preventing ASF through proper farm management and biosecurity protocols...',
    duration: '18:42',
    views: '32K',
    thumbnail: 'https://placehold.co/320x180/ef4444/ffffff?text=ASF+Prevention',
    relevanceScore: 88
  },
  {
    id: '3',
    title: 'Proper Disinfection Techniques for Livestock Facilities',
    description: 'Step-by-step demonstration of effective disinfection methods for farm buildings and equipment...',
    duration: '15:20',
    views: '28K',
    thumbnail: 'https://placehold.co/320x180/3b82f6/ffffff?text=Disinfection',
    relevanceScore: 82
  }
];

export const Training = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    animalType: '',
    diseaseOrConcern: '',
    topicFocus: '',
    farmScale: '',
    contentFormat: '',
    language: ''
  });
  
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Preselect from query params
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    const qpAnimal = params.get('animal');
    const qpTopic = params.get('topic');
    if (qpAnimal) {
      setFilters(prev => ({ ...prev, animalType: qpAnimal }));
    }
    if (qpAnimal) {
      setVideos(mockVideos);
      setHasSearched(true);
    }
    return undefined;
  });

  const handleSearch = () => {
    if (!filters.animalType) {
      alert('Please select an animal type');
      return;
    }
    
    setVideos(mockVideos);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setFilters({
      animalType: '',
      diseaseOrConcern: '',
      topicFocus: '',
      farmScale: '',
      contentFormat: '',
      language: ''
    });
    setVideos([]);
    setHasSearched(false);
  };

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
            <h1 className="text-2xl font-bold">Training Center</h1>
            <p className="text-primary-foreground/80">Find relevant training videos</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Training Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Required Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Animal Type (Required) *
              </label>
              <Select value={filters.animalType} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, animalType: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select animal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poultry">🐔 Poultry</SelectItem>
                  <SelectItem value="pigs">🐖 Pigs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Disease / Health Concern
                </label>
                <Select value={filters.diseaseOrConcern} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, diseaseOrConcern: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select concern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avian-flu">Avian Influenza</SelectItem>
                    <SelectItem value="newcastle">Newcastle Disease</SelectItem>
                    <SelectItem value="asf">African Swine Fever</SelectItem>
                    <SelectItem value="prrs">PRRS</SelectItem>
                    <SelectItem value="salmonella">Salmonella</SelectItem>
                    <SelectItem value="biosecurity">General Biosecurity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Training Focus
                </label>
                <Select value={filters.topicFocus} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, topicFocus: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basics">Biosecurity Basics</SelectItem>
                    <SelectItem value="entry">Farm Entry Protocols</SelectItem>
                    <SelectItem value="cleaning">Cleaning & Disinfection</SelectItem>
                    <SelectItem value="feed">Feed & Water Safety</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="worker">Worker Training</SelectItem>
                    <SelectItem value="wildlife">Wildlife Control</SelectItem>
                    <SelectItem value="transport">Transport Biosecurity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Farm Scale
                </label>
                <Select value={filters.farmScale} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, farmScale: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smallholder">Smallholder / Backyard</SelectItem>
                    <SelectItem value="medium">Medium Commercial</SelectItem>
                    <SelectItem value="large">Large Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Content Format
                </label>
                <Select value={filters.contentFormat} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, contentFormat: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="animated">Animated Explainer</SelectItem>
                    <SelectItem value="demo">Practical Farm Demo</SelectItem>
                    <SelectItem value="lecture">Expert Talk / Lecture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Language
              </label>
              <Select value={filters.language} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, language: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search Training Videos
              </Button>
              {hasSearched && (
                <Button variant="outline" onClick={clearSearch}>
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Training Videos ({videos.length})</h2>
              <Badge variant="outline">{filters.animalType}</Badge>
            </div>
            
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-80 bg-muted flex items-center justify-center">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {video.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views} views
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          {video.relevanceScore}% match
                        </Badge>
                      </div>
                      <Button size="sm" className="mt-2">
                        <Play className="h-3 w-3 mr-1" />
                        Watch Video
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};