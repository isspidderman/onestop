import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, FileText, CheckCircle2, MessageSquare, Globe, Brain } from 'lucide-react';

const AIAssistance = () => {
  const features = [
    { icon: FileText, title: 'SOP Guidance', description: 'Get AI-powered suggestions for writing compelling Statements of Purpose.' },
    { icon: CheckCircle2, title: 'Eligibility Checks', description: 'Instantly verify if you meet the criteria for different universities.' },
    { icon: MessageSquare, title: 'Application Suggestions', description: 'Receive personalized recommendations based on your profile.' },
    { icon: Globe, title: 'Multilingual Support', description: 'Get assistance in Hindi, English, and regional languages.' },
    { icon: Brain, title: 'Smart Matching', description: 'AI matches you with universities that fit your profile best.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">AI Assistance</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered tools will help you navigate the admission process with personalized guidance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:-translate-y-1 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-12">
            This is a concept demo. AI features are part of our future roadmap.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistance;
