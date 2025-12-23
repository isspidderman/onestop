import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Target, Users, Rocket, Heart, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About OneStop</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simplifying college admissions for every student in India.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                  <p className="text-muted-foreground">One profile. Many universities.</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                OneStop aims to become India's common application platform, making college admissions accessible, 
                transparent, and stress-free for millions of students. We believe every student deserves a 
                fair chance at their dream education without the burden of repetitive paperwork.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Target, title: 'Vision', text: 'To be the unified gateway for higher education in India.' },
              { icon: Users, title: '10,000+', text: 'Students trust OneStop for their applications.' },
              { icon: Globe, title: '500+', text: 'Universities across India on our platform.' },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            This platform is an MVP demonstrating the admissions flow and system design. 
            Backend integrations and verification are part of the future roadmap.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
