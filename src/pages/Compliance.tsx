import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Clock, CheckCircle, AlertCircle, FileText, ArrowLeft, Menu } from "lucide-react";
import { AppDrawer } from "@/components/AppDrawer";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ChecklistItem {
  id: string;
  category: string;
  requirement: string;
  description: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

const poultryQuiz: QuizQuestion[] = [
  {
    id: '1',
    question: 'How often should poultry houses be thoroughly disinfected?',
    options: ['Once a month', 'Every two weeks', 'Between flocks', 'Only when disease is detected'],
    correctAnswer: 2
  },
  {
    id: '2',
    question: 'What is the minimum quarantine period for new birds before introducing them to existing flocks?',
    options: ['7 days', '14 days', '21 days', '30 days'],
    correctAnswer: 3
  },
  {
    id: '3',
    question: 'Which of the following is most important for preventing Avian Influenza?',
    options: ['Regular feeding', 'Controlling wild bird access', 'Providing clean water', 'Adequate ventilation'],
    correctAnswer: 1
  }
];

const pigQuiz: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the recommended frequency for cleaning pig pens?',
    options: ['Daily', 'Weekly', 'Monthly', 'Only when soiled'],
    correctAnswer: 0
  },
  {
    id: '2',
    question: 'How long should feed be stored before use to ensure safety?',
    options: ['Use immediately', 'Maximum 1 week', 'Maximum 1 month', 'Maximum 3 months'],
    correctAnswer: 2
  },
  {
    id: '3',
    question: 'What is the most effective method to prevent African Swine Fever?',
    options: ['Vaccination', 'Strict biosecurity measures', 'Regular medication', 'Improved nutrition'],
    correctAnswer: 1
  }
];

const checklistItems: ChecklistItem[] = [
  {
    id: '1',
    category: 'Access Control',
    requirement: 'Visitor Log and Screening',
    description: 'Maintain a log of all visitors and screen them for recent contact with other farms',
    isCompleted: true,
    priority: 'high'
  },
  {
    id: '2',
    category: 'Biosecurity',
    requirement: 'Dedicated Farm Clothing',
    description: 'Provide clean farm-specific clothing for all workers and visitors',
    isCompleted: true,
    priority: 'high'
  },
  {
    id: '3',
    category: 'Sanitization',
    requirement: 'Hand Washing Stations',
    description: 'Install and maintain hand washing stations at all entry points',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: '4',
    category: 'Feed Safety',
    requirement: 'Feed Storage Security',
    description: 'Store feed in rodent-proof containers away from livestock areas',
    isCompleted: true,
    priority: 'medium'
  },
  {
    id: '5',
    category: 'Waste Management',
    requirement: 'Proper Carcass Disposal',
    description: 'Establish protocols for safe disposal of dead animals',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: '6',
    category: 'Documentation',
    requirement: 'Health Records Maintenance',
    description: 'Keep detailed records of vaccinations, treatments, and health monitoring',
    isCompleted: true,
    priority: 'medium'
  }
];

type ViewMode = 'main' | 'quiz' | 'checklist';
type AnimalType = 'poultry' | 'pig';

export const Compliance = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('poultry');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistItems);

  const currentQuiz = selectedAnimal === 'poultry' ? poultryQuiz : pigQuiz;

  const startQuiz = (animalType: AnimalType) => {
    setSelectedAnimal(animalType);
    setViewMode('quiz');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === currentQuiz[index].correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizCompleted(true);
  };

  const toggleChecklistItem = (itemId: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const completedItems = checklist.filter(item => item.isCompleted).length;
  const compliancePercentage = Math.round((completedItems / checklist.length) * 100);

  const getPriorityColor = (priority: ChecklistItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
    }
  };

  if (viewMode === 'quiz') {
    if (quizCompleted) {
      const percentage = Math.round((quizScore / currentQuiz.length) * 100);
      return (
        <div className="min-h-screen pb-20">
          <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          <header className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center gap-3 justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('main')}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Quiz Results</h1>
                <p className="text-primary-foreground/80">{selectedAnimal} biosecurity assessment</p>
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
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>Your biosecurity knowledge assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-primary">{percentage}%</div>
                    <p className="text-muted-foreground">
                      {quizScore} out of {currentQuiz.length} correct
                    </p>
                  </div>
                  <div className="text-sm">
                    {percentage >= 80 ? (
                      <Badge className="bg-success text-success-foreground">Excellent Knowledge</Badge>
                    ) : percentage >= 60 ? (
                      <Badge className="bg-warning text-warning-foreground">Good Knowledge</Badge>
                    ) : (
                      <Badge className="bg-destructive text-destructive-foreground">Needs Improvement</Badge>
                    )}
                  </div>
                  {percentage < 80 && (
                    <div className="p-4 bg-accent/10 rounded-lg text-left">
                      <p className="text-sm font-medium mb-2">Recommendations:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Review biosecurity protocols</li>
                        <li>• Complete additional training modules</li>
                        <li>• Consult with veterinary experts</li>
                      </ul>
                    </div>
                  )}
                  <Button onClick={() => setViewMode('main')} className="w-full">
                    Return to Compliance Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    const question = currentQuiz[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;

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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('main')}
            className="text-primary-foreground hover:bg-primary-foreground/20"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Biosecurity Quiz</h1>
            <p className="text-primary-foreground/80">
              Question {currentQuestion + 1} of {currentQuiz.length}
            </p>
          </div>
        </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </header>

        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion]?.toString()}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="flex-1"
                >
                  {currentQuestion === currentQuiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (viewMode === 'checklist') {
    return (
      <div className="min-h-screen bg-background pb-20">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('main')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Compliance Checklist</h1>
              <p className="text-primary-foreground/80">
                {compliancePercentage}% completed ({completedItems}/{checklist.length})
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={compliancePercentage} className="h-2" />
          </div>
        </header>

        <div className="p-4 space-y-4">
          {checklist.map((item) => (
            <Card key={item.id} className={item.isCompleted ? 'bg-success/5 border-success/20' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={item.isCompleted}
                    onCheckedChange={() => toggleChecklistItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {item.requirement}
                      </h4>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <header className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              Compliance Center
            </h1>
            <p className="text-primary-foreground/80">Assess and maintain biosecurity standards</p>
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
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{compliancePercentage}%</div>
                <p className="text-sm text-muted-foreground">Checklist Complete</p>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">A</div>
                <p className="text-sm text-muted-foreground">Overall Grade</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-accent" />
              <CardTitle>Biosecurity Assessment Quiz</CardTitle>
            </div>
            <CardDescription>
              Test your knowledge of biosecurity practices and protocols
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={() => startQuiz('poultry')}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🐔</div>
                  <div className="text-left">
                    <div className="font-medium">Poultry Biosecurity Quiz</div>
                    <div className="text-sm text-muted-foreground">
                      {poultryQuiz.length} questions • 5-10 minutes
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={() => startQuiz('pig')}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🐖</div>
                  <div className="text-left">
                    <div className="font-medium">Pig Biosecurity Quiz</div>
                    <div className="text-sm text-muted-foreground">
                      {pigQuiz.length} questions • 5-10 minutes
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Checklist Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <CardTitle>Compliance Checklist</CardTitle>
            </div>
            <CardDescription>
              Track your adherence to biosecurity regulations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedItems}/{checklist.length} completed
                </span>
              </div>
              <Progress value={compliancePercentage} className="h-2" />
              <Button 
                className="w-full"
                onClick={() => setViewMode('checklist')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Review Checklist
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Compliance Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="font-medium">Feed Storage Assessment</p>
                <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
              <Clock className="h-5 w-5 text-warning" />
              <div className="flex-1">
                <p className="font-medium">Worker Training Update</p>
                <p className="text-sm text-muted-foreground">Due in 5 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-accent" />
              <div className="flex-1">
                <p className="font-medium">Facility Inspection</p>
                <p className="text-sm text-muted-foreground">Scheduled for next week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};