import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Bell, CalendarPlus, ExternalLink } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'exam' | 'application' | 'result' | 'opening';
  priority: 'high' | 'medium' | 'low';
  description: string;
  link?: string;
}

const deadlines: Deadline[] = [
  // Application Openings
  {
    id: 'open-1',
    title: 'JEE Main 2026 Session 1 Registration Opens',
    date: '2025-11-01',
    endDate: '2025-11-30',
    type: 'opening',
    priority: 'high',
    description: 'Registration window for JEE Main 2026 Session 1 examination.',
    link: 'https://jeemain.nta.nic.in',
  },
  {
    id: 'open-2',
    title: 'NEET UG 2026 Registration Opens',
    date: '2026-02-01',
    endDate: '2026-03-15',
    type: 'opening',
    priority: 'high',
    description: 'Online registration for NEET UG 2026 begins.',
    link: 'https://neet.nta.nic.in',
  },
  {
    id: 'open-3',
    title: 'CUET UG 2026 Registration Opens',
    date: '2026-02-15',
    endDate: '2026-03-31',
    type: 'opening',
    priority: 'medium',
    description: 'Common University Entrance Test registration window.',
    link: 'https://cuet.samarth.ac.in',
  },
  {
    id: 'open-4',
    title: 'BITSAT 2026 Registration Opens',
    date: '2026-01-15',
    endDate: '2026-03-31',
    type: 'opening',
    priority: 'medium',
    description: 'BITS Pilani admission test registration begins.',
    link: 'https://bitsadmission.com',
  },
  {
    id: 'open-5',
    title: 'VITEEE 2026 Registration Opens',
    date: '2025-11-04',
    endDate: '2026-03-31',
    type: 'opening',
    priority: 'low',
    description: 'VIT Engineering Entrance Exam registration window.',
    link: 'https://viteee.vit.ac.in',
  },
  // Application Deadlines
  {
    id: 'app-1',
    title: 'JEE Main Session 1 Registration Deadline',
    date: '2025-11-30',
    type: 'application',
    priority: 'high',
    description: 'Last date to register for JEE Main 2026 Session 1.',
  },
  {
    id: 'app-2',
    title: 'JEE Main Session 2 Registration Deadline',
    date: '2026-03-15',
    type: 'application',
    priority: 'high',
    description: 'Last date to register for JEE Main 2026 Session 2.',
  },
  {
    id: 'app-3',
    title: 'NEET UG 2026 Registration Deadline',
    date: '2026-03-15',
    type: 'application',
    priority: 'high',
    description: 'Final deadline for NEET UG 2026 registration.',
  },
  {
    id: 'app-4',
    title: 'JoSAA 2026 Registration Deadline',
    date: '2026-06-20',
    type: 'application',
    priority: 'high',
    description: 'Last date for Joint Seat Allocation Authority registration.',
  },
  {
    id: 'app-5',
    title: 'Delhi University Application Deadline',
    date: '2026-06-30',
    type: 'application',
    priority: 'medium',
    description: 'Last date for undergraduate admissions at DU via CUET.',
  },
  // Exams
  {
    id: 'exam-1',
    title: 'JEE Main 2026 Session 1',
    date: '2026-01-22',
    endDate: '2026-01-31',
    type: 'exam',
    priority: 'high',
    description: 'JEE Main Session 1 examination window.',
  },
  {
    id: 'exam-2',
    title: 'JEE Main 2026 Session 2',
    date: '2026-04-01',
    endDate: '2026-04-15',
    type: 'exam',
    priority: 'high',
    description: 'JEE Main Session 2 examination window.',
  },
  {
    id: 'exam-3',
    title: 'JEE Advanced 2026',
    date: '2026-05-25',
    type: 'exam',
    priority: 'high',
    description: 'Joint Entrance Examination Advanced for IIT admissions.',
  },
  {
    id: 'exam-4',
    title: 'NEET UG 2026',
    date: '2026-05-04',
    type: 'exam',
    priority: 'high',
    description: 'National Eligibility cum Entrance Test for medical admissions.',
  },
  {
    id: 'exam-5',
    title: 'CUET UG 2026',
    date: '2026-05-15',
    endDate: '2026-05-31',
    type: 'exam',
    priority: 'medium',
    description: 'Common University Entrance Test examination period.',
  },
  {
    id: 'exam-6',
    title: 'BITSAT 2026',
    date: '2026-05-20',
    endDate: '2026-05-30',
    type: 'exam',
    priority: 'medium',
    description: 'BITS Admission Test examination window.',
  },
  {
    id: 'exam-7',
    title: 'VITEEE 2026',
    date: '2026-04-19',
    endDate: '2026-04-30',
    type: 'exam',
    priority: 'low',
    description: 'VIT Engineering Entrance Examination.',
  },
  // Results
  {
    id: 'result-1',
    title: 'JEE Main Session 1 Results',
    date: '2026-02-12',
    type: 'result',
    priority: 'high',
    description: 'Expected date for JEE Main Session 1 results.',
  },
  {
    id: 'result-2',
    title: 'JEE Main Session 2 Results',
    date: '2026-04-25',
    type: 'result',
    priority: 'high',
    description: 'Expected date for JEE Main Session 2 results.',
  },
  {
    id: 'result-3',
    title: 'NEET UG 2026 Results',
    date: '2026-06-04',
    type: 'result',
    priority: 'high',
    description: 'Expected date for NEET UG 2026 results.',
  },
  {
    id: 'result-4',
    title: 'JEE Advanced 2026 Results',
    date: '2026-06-10',
    type: 'result',
    priority: 'high',
    description: 'Expected date for JEE Advanced results.',
  },
];

const Deadlines = () => {
  const today = new Date();
  const [activeTab, setActiveTab] = useState('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'application':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'result':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'opening':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'opening':
        return 'Opens';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const getDaysRemaining = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const startStr = start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    if (endDate) {
      const end = new Date(endDate);
      const endStr = end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return `${startStr} - ${endStr}`;
    }
    return startStr;
  };

  const filteredDeadlines = deadlines.filter((d) => {
    if (activeTab === 'all') return true;
    return d.type === activeTab;
  });

  const sortedDeadlines = [...filteredDeadlines].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingDeadlines = sortedDeadlines.filter((d) => getDaysRemaining(d.date) > 0);
  const urgentDeadlines = deadlines.filter((d) => {
    const days = getDaysRemaining(d.date);
    return days > 0 && days <= 14 && (d.type === 'application' || d.type === 'exam');
  });

  const openingsNow = deadlines.filter((d) => {
    if (d.type !== 'opening') return false;
    const startDays = getDaysRemaining(d.date);
    const endDays = d.endDate ? getDaysRemaining(d.endDate) : startDays;
    return startDays <= 0 && endDays >= 0;
  });

  const upcomingOpenings = deadlines.filter((d) => {
    if (d.type !== 'opening') return false;
    const days = getDaysRemaining(d.date);
    return days > 0 && days <= 30;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Exam & Deadline Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Stay on top of important exam dates, application deadlines, and result announcements.
          </p>
        </div>

        {/* Currently Open Applications */}
        {openingsNow.length > 0 && (
          <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                  <CalendarPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Applications Open Now!</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    These registrations are currently accepting applications:
                  </p>
                  <div className="mt-3 space-y-2">
                    {openingsNow.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-white/60 dark:bg-green-900/30">
                        <div>
                          <span className="font-medium text-green-800 dark:text-green-300">{d.title.replace(' Opens', '')}</span>
                          <span className="text-sm text-green-600 dark:text-green-500 ml-2">
                            (ends {new Date(d.endDate!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})
                          </span>
                        </div>
                        {d.link && (
                          <a href={d.link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                              Apply <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Urgent Alert */}
        {urgentDeadlines.length > 0 && (
          <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-300">Urgent Deadlines</h3>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    You have {urgentDeadlines.length} deadline(s) within the next 2 weeks!
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {urgentDeadlines.map((d) => (
                      <Badge key={d.id} variant="outline" className="border-red-300 text-red-700 dark:border-red-700 dark:text-red-400">
                        {d.title} ({getDaysRemaining(d.date)} days)
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Openings */}
        {upcomingOpenings.length > 0 && (
          <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Opening Soon</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    These applications will open within the next 30 days:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {upcomingOpenings.map((d) => (
                      <Badge key={d.id} variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400">
                        {d.title.replace(' Opens', '')} (in {getDaysRemaining(d.date)} days)
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('opening')}>
            <CardContent className="p-4 text-center">
              <CalendarPlus className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'opening').length}
              </p>
              <p className="text-sm text-muted-foreground">Openings</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('application')}>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'application').length}
              </p>
              <p className="text-sm text-muted-foreground">Deadlines</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('exam')}>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'exam').length}
              </p>
              <p className="text-sm text-muted-foreground">Exams</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('result')}>
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'result').length}
              </p>
              <p className="text-sm text-muted-foreground">Results</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>All Important Dates</CardTitle>
            <CardDescription>Filter by category and track all important events</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="opening">Opens</TabsTrigger>
                <TabsTrigger value="application">Deadlines</TabsTrigger>
                <TabsTrigger value="exam">Exams</TabsTrigger>
                <TabsTrigger value="result">Results</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="space-y-4">
                  {upcomingDeadlines.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No upcoming events in this category.
                    </div>
                  ) : (
                    upcomingDeadlines.map((deadline) => {
                      const daysRemaining = getDaysRemaining(deadline.date);
                      return (
                        <div
                          key={deadline.id}
                          className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                            <span className="text-xs text-muted-foreground">
                              {new Date(deadline.date).toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                            <span className="text-lg font-bold text-primary">
                              {new Date(deadline.date).getDate()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              {getPriorityIcon(deadline.priority)}
                              <h3 className="font-semibold text-foreground">{deadline.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{deadline.description}</p>
                            {deadline.endDate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                📅 {formatDateRange(deadline.date, deadline.endDate)}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <Badge className={getTypeColor(deadline.type)}>
                                {getTypeLabel(deadline.type)}
                              </Badge>
                              <span
                                className={`text-sm font-medium ${
                                  daysRemaining <= 14 ? 'text-red-600' : 'text-muted-foreground'
                                }`}
                              >
                                {daysRemaining} days remaining
                              </span>
                              {deadline.link && (
                                <a href={deadline.link} target="_blank" rel="noopener noreferrer" className="ml-auto">
                                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                                    Visit <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground">
          * Dates are tentative and based on previous years. Please verify from official sources before applying.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Deadlines;
