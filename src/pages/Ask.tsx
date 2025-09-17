import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  UserCheck, 
  Send, 
  Sparkles, 
  MessageSquare,
  Clock,
  CheckCircle,
  Menu
} from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai' | 'expert';
  timestamp: Date;
}

export const Ask = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your BioFence AI assistant. I can help you with biosecurity questions, livestock health, compliance requirements, and more. What would you like to know?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [expertMessages, setExpertMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to expert consultation! Our team of veterinarians and biosecurity specialists are here to help. Please describe your question or concern in detail.',
      sender: 'expert',
      timestamp: new Date()
    }
  ]);
  
  const [aiInput, setAiInput] = useState('');
  const [expertInput, setExpertInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: aiInput,
      sender: 'user',
      timestamp: new Date()
    };

    setAiMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setIsAiLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Based on your question about "${aiInput}", here are some key recommendations:\n\n• Ensure proper biosecurity protocols are in place\n• Monitor livestock health indicators regularly\n• Follow compliance guidelines for your region\n• Consider implementing additional safety measures\n\nWould you like me to elaborate on any of these points?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setAiMessages(prev => [...prev, aiResponse]);
      setIsAiLoading(false);
    }, 2000);
  };

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: expertInput,
      sender: 'user',
      timestamp: new Date()
    };

    setExpertMessages(prev => [...prev, userMessage]);
    setExpertInput('');

    // Simulate expert response
    setTimeout(() => {
      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your question. A veterinary specialist will review your case and respond within 2-4 hours. Your consultation ID is #EXP-${Date.now().toString().slice(-6)}.`,
        sender: 'expert',
        timestamp: new Date()
      };
      setExpertMessages(prev => [...prev, expertResponse]);
    }, 1000);
  };

  const renderMessages = (messages: Message[]) => (
    <div className="space-y-4 h-64 overflow-y-auto p-4 bg-muted/20 rounded-lg">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.sender !== 'user' && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              {message.sender === 'ai' ? (
                <Bot className="h-4 w-4 text-primary-foreground" />
              ) : (
                <UserCheck className="h-4 w-4 text-primary-foreground" />
              )}
            </div>
          )}
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-primary text-primary-foreground ml-auto'
                : 'bg-card text-card-foreground'
            }`}
          >
            <p className="text-sm font-body whitespace-pre-line">{message.content}</p>
            <p className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
          {message.sender === 'user' && (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-4 w-4 text-accent-foreground" />
            </div>
          )}
        </div>
      ))}
      {isAiLoading && (
        <div className="flex gap-3 justify-start">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="bg-card text-card-foreground px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
            <h1 className="text-2xl font-heading font-bold">Ask BioFence</h1>
            <p className="text-primary-foreground/80 font-body">Get help from AI or expert consultants</p>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        <Tabs defaultValue="ai" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai" className="flex items-center gap-2 font-body">
              <Bot className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="expert" className="flex items-center gap-2 font-body">
              <UserCheck className="h-4 w-4" />
              Expert Consultation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-info" />
                  <CardTitle className="font-heading">AI Assistant</CardTitle>
                </div>
                <CardDescription className="font-body">
                  Get instant answers to your biosecurity and livestock questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderMessages(aiMessages)}
                
                <form onSubmit={handleAiSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Ask about biosecurity, livestock health, compliance..."
                      className="flex-1 font-body"
                      disabled={isAiLoading}
                    />
                    <Button 
                      type="submit" 
                      disabled={!aiInput.trim() || isAiLoading}
                      className="px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['Biosecurity protocols', 'Disease prevention', 'Compliance requirements'].map((suggestion) => (
                      <Badge 
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors font-accent"
                        onClick={() => setAiInput(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expert" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-accent" />
                  <CardTitle className="font-heading">Expert Consultation</CardTitle>
                </div>
                <CardDescription className="font-body">
                  Connect with veterinarians and biosecurity specialists
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderMessages(expertMessages)}
                
                <form onSubmit={handleExpertSubmit} className="space-y-3">
                  <Textarea
                    value={expertInput}
                    onChange={(e) => setExpertInput(e.target.value)}
                    placeholder="Describe your situation, symptoms, or concerns in detail..."
                    className="font-body min-h-[100px]"
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                      <Clock className="h-4 w-4" />
                      Response time: 2-4 hours
                    </div>
                    <Button type="submit" disabled={!expertInput.trim()}>
                      Submit Consultation
                    </Button>
                  </div>
                </form>
                
                <div className="bg-info/10 p-3 rounded-lg border border-info/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-info" />
                    <span className="font-medium text-sm font-body">Expert Network</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    Our network includes licensed veterinarians, biosecurity consultants, 
                    and agricultural specialists available 24/7.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};