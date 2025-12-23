import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Bell } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'application' | 'result';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

const deadlines: Deadline[] = [
  {
    id: '1',
    title: 'JEE Main Session 2 Registration Ends',
    date: '2024-02-15',
    type: 'application',
    priority: 'high',
    description: 'Last date to register for JEE Main Session 2 examination.',
  },
  {
    id: '2',
    title: 'NEET UG 2024 Exam',
    date: '2024-05-05',
    type: 'exam',
    priority: 'high',
    description: 'National Eligibility cum Entrance Test for medical admissions.',
  },
  {
    id: '3',
    title: 'CUET UG Registration',
    date: '2024-03-01',
    type: 'application',
    priority: 'medium',
    description: 'Common University Entrance Test registration begins.',
  },
  {
    id: '4',
    title: 'JEE Advanced 2024',
    date: '2024-05-26',
    type: 'exam',
    priority: 'high',
    description: 'Joint Entrance Examination Advanced for IIT admissions.',
  },
  {
    id: '5',
    title: 'BITSAT 2024 Exam Window',
    date: '2024-05-20',
    type: 'exam',
    priority: 'medium',
    description: 'BITS Admission Test examination period starts.',
  },
  {
    id: '6',
    title: 'Delhi University Application Deadline',
    date: '2024-06-30',
    type: 'application',
    priority: 'medium',
    description: 'Last date for undergraduate admissions at DU.',
  },
  {
    id: '7',
    title: 'JEE Main Session 1 Results',
    date: '2024-02-20',
    type: 'result',
    priority: 'high',
    description: 'Expected date for JEE Main Session 1 results.',
  },
  {
    id: '8',
    title: 'VITEEE 2024',
    date: '2024-04-19',
    type: 'exam',
    priority: 'low',
    description: 'VIT Engineering Entrance Examination.',
  },
];

const Deadlines = () => {
  const today = new Date();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-blue-100 text-blue-700';
      case 'application':
        return 'bg-green-100 text-green-700';
      case 'result':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-muted text-muted-foreground';
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

  const sortedDeadlines = [...deadlines].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingDeadlines = sortedDeadlines.filter((d) => getDaysRemaining(d.date) > 0);
  const urgentDeadlines = upcomingDeadlines.filter((d) => getDaysRemaining(d.date) <= 7);

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

        {/* Urgent Alert */}
        {urgentDeadlines.length > 0 && (
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Urgent Deadlines</h3>
                  <p className="text-sm text-red-700 mt-1">
                    You have {urgentDeadlines.length} deadline(s) within the next 7 days!
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {urgentDeadlines.map((d) => (
                      <Badge key={d.id} variant="outline" className="border-red-300 text-red-700">
                        {d.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'exam').length}
              </p>
              <p className="text-sm text-muted-foreground">Exams</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'application').length}
              </p>
              <p className="text-sm text-muted-foreground">Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {deadlines.filter((d) => d.type === 'result').length}
              </p>
              <p className="text-sm text-muted-foreground">Results</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>All important dates sorted by urgency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => {
                const daysRemaining = getDaysRemaining(deadline.date);
                return (
                  <div
                    key={deadline.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {new Date(deadline.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {new Date(deadline.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(deadline.priority)}
                        <h3 className="font-semibold text-foreground">{deadline.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{deadline.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTypeColor(deadline.type)}>
                          {deadline.type.charAt(0).toUpperCase() + deadline.type.slice(1)}
                        </Badge>
                        <span
                          className={`text-sm font-medium ${
                            daysRemaining <= 7 ? 'text-red-600' : 'text-muted-foreground'
                          }`}
                        >
                          {daysRemaining} days remaining
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Deadlines;
