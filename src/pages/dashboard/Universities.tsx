import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStudent, Application } from '@/contexts/StudentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  School,
  MapPin,
  Star,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface University {
  id: string;
  name: string;
  location: string;
  type: string;
  courses: string[];
  fee: number;
  rating: number;
  image: string;
}

const universities: University[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi',
    type: 'Government',
    courses: ['B.Tech', 'M.Tech', 'PhD'],
    fee: 2500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Delhi University',
    location: 'New Delhi',
    type: 'Government',
    courses: ['BA', 'B.Com', 'B.Sc', 'MA', 'M.Sc'],
    fee: 800,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    type: 'Private',
    courses: ['B.E.', 'M.E.', 'MBA'],
    fee: 3500,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    type: 'Private',
    courses: ['B.Tech', 'M.Tech', 'MCA'],
    fee: 2000,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Jamia Millia Islamia',
    location: 'New Delhi',
    type: 'Government',
    courses: ['BA', 'B.Tech', 'MBBS', 'BBA'],
    fee: 600,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    type: 'Private',
    courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA'],
    fee: 2800,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
  },
  {
    id: '7',
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    type: 'Government',
    courses: ['B.E.', 'M.E.', 'BA', 'M.Sc'],
    fee: 500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=300&fit=crop',
  },
  {
    id: '8',
    name: 'Manipal Academy of Higher Education',
    location: 'Manipal, Karnataka',
    type: 'Private',
    courses: ['MBBS', 'B.Tech', 'BDS', 'B.Pharm'],
    fee: 4000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
  },
];

const Universities = () => {
  const { applications, addApplication } = useStudent();
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { toast } = useToast();

  const appliedIds = applications.map((a) => a.universityId);

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setSelectedUniversities((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    selectedUniversities.forEach((uniId) => {
      const uni = universities.find((u) => u.id === uniId);
      if (uni && !appliedIds.includes(uniId)) {
        const newApp: Application = {
          id: 'app_' + Math.random().toString(36).substr(2, 9),
          universityId: uni.id,
          universityName: uni.name,
          course: uni.courses[0],
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'Applied',
          fee: uni.fee,
        };
        addApplication(newApp);
      }
    });

    toast({
      title: 'Applications Submitted!',
      description: `Successfully applied to ${selectedUniversities.length} university(ies).`,
    });

    setSelectedUniversities([]);
    setShowApplyModal(false);
  };

  const totalFee = selectedUniversities.reduce((acc, id) => {
    const uni = universities.find((u) => u.id === id);
    return acc + (uni?.fee || 0);
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Universities</h1>
            <p className="text-muted-foreground mt-1">
              Browse and select universities to apply. Your profile will be shared automatically.
            </p>
          </div>
          {selectedUniversities.length > 0 && (
            <Button onClick={() => setShowApplyModal(true)}>
              Apply to {selectedUniversities.length} Selected
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search universities by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Universities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUniversities.map((uni) => {
            const isSelected = selectedUniversities.includes(uni.id);
            const isApplied = appliedIds.includes(uni.id);

            return (
              <Card
                key={uni.id}
                className={`overflow-hidden cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-primary' : ''
                } ${isApplied ? 'opacity-60' : ''}`}
                onClick={() => !isApplied && handleSelect(uni.id)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={uni.type === 'Government' ? 'secondary' : 'default'}>
                      {uni.type}
                    </Badge>
                  </div>
                  {isApplied && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Applied
                      </Badge>
                    </div>
                  )}
                  {!isApplied && (
                    <div className="absolute top-2 left-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelect(uni.id)}
                        className="bg-card"
                      />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-1">{uni.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" />
                    {uni.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {uni.rating}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {uni.courses.slice(0, 2).map((course) => (
                      <Badge key={course} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {uni.courses.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{uni.courses.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-sm font-medium text-foreground">₹{uni.fee}</p>
                    <p className="text-xs text-muted-foreground">Application Fee</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Apply Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  Confirm Application
                </CardTitle>
                <CardDescription>
                  You are about to apply to {selectedUniversities.length} university(ies) using your OneStop profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {selectedUniversities.map((id) => {
                    const uni = universities.find((u) => u.id === id);
                    return (
                      <div key={id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-primary" />
                          <span className="font-medium text-foreground">{uni?.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">₹{uni?.fee}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Total Application Fee</span>
                    <span className="text-xl font-bold text-primary">₹{totalFee}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  By clicking "Confirm & Pay", you agree to share your profile with the selected universities. 
                  This is a demo - no actual payment will be processed.
                </p>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowApplyModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleApply}>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm & Pay (Demo)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Universities;
