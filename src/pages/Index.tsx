import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  GraduationCap,
  FileText,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Repeat,
  FileWarning,
  FolderOpen,
  Clock,
  Sparkles,
  Shield,
  Users,
  Zap,
} from 'lucide-react';

const Index = () => {
  const problems = [
    {
      icon: Repeat,
      title: 'Repeated Form Filling',
      description: 'Filling the same information for every university application is exhausting and error-prone.',
    },
    {
      icon: FileWarning,
      title: 'Different Formats',
      description: 'Each college requires different document formats and application structures.',
    },
    {
      icon: FolderOpen,
      title: 'Scattered Documents',
      description: 'Managing marksheets, certificates, and IDs across multiple applications is chaotic.',
    },
    {
      icon: Clock,
      title: 'Missed Deadlines',
      description: 'Keeping track of various application deadlines is overwhelming and stressful.',
    },
  ];

  const solutions = [
    {
      icon: FileText,
      title: 'One Unified Profile',
      description: 'Create once, apply everywhere. Your academic and personal details in one place.',
    },
    {
      icon: Zap,
      title: 'Auto-Filled Applications',
      description: 'Your profile data automatically populates university applications instantly.',
    },
    {
      icon: Shield,
      title: 'Secure Document Storage',
      description: 'Upload documents once, reuse them for all applications with DocuSafe.',
    },
    {
      icon: CheckCircle2,
      title: 'Track Everything',
      description: 'Monitor application status, deadlines, and exam dates from one dashboard.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Fill in your personal, academic, and exam details just once.',
    },
    {
      number: '02',
      title: 'Select Universities',
      description: 'Browse and choose from hundreds of universities across India.',
    },
    {
      number: '03',
      title: 'Apply with One Click',
      description: 'Submit applications to multiple universities instantly.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              <span>Simplifying College Admissions in India</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Apply to Multiple Indian Universities with{' '}
              <span className="text-gradient">One Profile</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              OneStop simplifies college admissions by letting students apply to multiple universities 
              using a single verified profile. No more repetitive forms.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=signup">
                  Create Student Profile
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="#how-it-works">
                  View How It Works
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <Card className="max-w-4xl mx-auto overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-border/30">
              <div className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  <span className="ml-4 text-sm text-muted-foreground">Student Dashboard Preview</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-card shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">Profile</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">85%</div>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">Applications</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">5</div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">Saved</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">₹2,500</div>
                    <p className="text-sm text-muted-foreground">in fees</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Problem with College Applications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every year, millions of students face the same frustrating challenges 
              when applying to colleges in India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="group hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How <span className="text-gradient">OneStop</span> Helps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've reimagined the application process to make it simpler, 
              faster, and stress-free for every student.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps and apply to your dream universities today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-primary/10 absolute -top-4 left-0">
                  {step.number}
                </div>
                <div className="relative pt-8 pl-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="xl" asChild>
              <Link to="/auth?mode=signup">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden bg-gradient-to-br from-primary to-accent">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Simplify Your Applications?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already saving time and stress with OneStop. 
                Create your profile today and start applying smarter.
              </p>
              <Button variant="hero-outline" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0" asChild>
                <Link to="/auth?mode=signup">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
