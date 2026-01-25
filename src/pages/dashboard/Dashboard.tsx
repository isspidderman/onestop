import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useStudent } from '@/contexts/StudentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  User,
  FileText,
  School,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderOpen,
  GraduationCap,
  CalendarClock,
} from 'lucide-react';

// Mock upcoming exams data
const upcomingExams = [
  {
    id: 'jee-main-2025',
    name: 'JEE Main 2025',
    date: '2025-04-10',
    type: 'exam',
    category: 'Engineering',
  },
  {
    id: 'neet-2025',
    name: 'NEET UG 2025',
    date: '2025-05-04',
    type: 'exam',
    category: 'Medical',
  },
  {
    id: 'cuet-2025',
    name: 'CUET UG 2025',
    date: '2025-05-15',
    type: 'exam',
    category: 'Central Universities',
  },
  {
    id: 'bitsat-2025',
    name: 'BITSAT 2025',
    date: '2025-05-22',
    type: 'exam',
    category: 'Engineering',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, applications, documents } = useStudent();

  // Calculate profile completion
  const profileFields = Object.values(profile).filter(
    (val) => typeof val === 'string' && val.trim() !== ''
  ).length;
  const totalFields = Object.keys(profile).filter(
    (key) => !['isEWS', 'isPWD'].includes(key)
  ).length;
  const profileCompletion = Math.round((profileFields / totalFields) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
      case 'Accepted':
        return 'text-green-600 bg-green-100';
      case 'Under Review':
        return 'text-yellow-600 bg-yellow-100';
      case 'Applied':
        return 'text-blue-600 bg-blue-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const quickActions = [
    {
      icon: User,
      title: 'Complete Profile',
      description: 'Fill in your details',
      href: '/dashboard/profile',
      color: 'bg-blue-500',
    },
    {
      icon: School,
      title: 'Browse Universities',
      description: 'Find your dream college',
      href: '/dashboard/universities',
      color: 'bg-purple-500',
    },
    {
      icon: FolderOpen,
      title: 'Upload Documents',
      description: 'Store in DocuSafe',
      href: '/dashboard/documents',
      color: 'bg-green-500',
    },
    {
      icon: Calendar,
      title: 'View Deadlines',
      description: 'Track exam dates',
      href: '/dashboard/deadlines',
      color: 'bg-orange-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your application journey.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/universities">
              Apply to Universities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profile</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{profileCompletion}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <Progress value={profileCompletion} className="mt-4 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{applications.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {applications.filter((a) => a.status === 'Submitted').length} submitted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{documents.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Stored in DocuSafe</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-3xl font-bold text-foreground mt-1">3</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">Deadlines this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams & Deadlines */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-primary" />
              Upcoming Exams & Deadlines
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/deadlines">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Upcoming Exams */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Upcoming Exams
                </h4>
                <div className="space-y-2">
                  {upcomingExams.slice(0, 3).map((exam) => {
                    const examDate = new Date(exam.date);
                    const today = new Date();
                    const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{exam.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {examDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <Badge variant={daysLeft <= 30 ? "destructive" : "secondary"} className="text-xs">
                          {daysLeft} days
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Latest Application Deadline */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Your Application Deadlines
                </h4>
                {applications.length === 0 ? (
                  <div className="p-4 rounded-lg bg-secondary/30 text-center">
                    <p className="text-sm text-muted-foreground">No applications yet</p>
                    <Button variant="link" size="sm" asChild className="mt-1">
                      <Link to="/dashboard/universities">Apply Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {applications.slice(0, 3).map((app) => {
                      const appliedDate = new Date(app.appliedDate);
                      const deadlineDate = new Date(appliedDate);
                      deadlineDate.setDate(deadlineDate.getDate() + 30); // Mock deadline: 30 days after application
                      const today = new Date();
                      const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                              <School className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">{app.universityName}</p>
                              <p className="text-xs text-muted-foreground">
                                Deadline: {deadlineDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant={daysLeft <= 7 ? "destructive" : daysLeft <= 14 ? "outline" : "secondary"} 
                            className="text-xs"
                          >
                            {daysLeft > 0 ? `${daysLeft} days` : 'Expired'}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/applications">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <School className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No applications yet</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/dashboard/universities">Browse Universities</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <School className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{app.universityName}</p>
                        <p className="text-sm text-muted-foreground">{app.course}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Completion Alert */}
        {profileCompletion < 100 && (
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile is {profileCompletion}% complete. Fill in the remaining details to apply to universities.
                  </p>
                  <Button className="mt-4" size="sm" asChild>
                    <Link to="/dashboard/profile">
                      Complete Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
