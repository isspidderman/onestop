import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStudent } from '@/contexts/StudentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, GraduationCap, FileText, Save, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { profile, updateProfile } = useStudent();
  const [localProfile, setLocalProfile] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string | boolean) => {
    setLocalProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateProfile(localProfile);
    setIsSaving(false);
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  };

  const InputField = ({
    label,
    field,
    type = 'text',
    placeholder = '',
    required = false,
  }: {
    label: string;
    field: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={field}
        type={type}
        placeholder={placeholder}
        value={(localProfile as any)[field] || ''}
        onChange={(e) => handleChange(field, e.target.value)}
      />
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              Complete your profile to apply to universities. This information will be shared with all your applications.
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Profile Form */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="personal" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="academic" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Exams</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Details */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Full Name" field="fullName" placeholder="Enter your full name" required />
                  <InputField label="Date of Birth" field="dateOfBirth" type="date" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      className="flex h-12 w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                      value={localProfile.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <InputField label="Phone Number" field="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
                <InputField label="Email Address" field="email" type="email" placeholder="you@example.com" required />
                <InputField label="Address" field="address" placeholder="Enter your address" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField label="City" field="city" placeholder="City" />
                  <InputField label="State" field="state" placeholder="State" />
                  <InputField label="Pincode" field="pincode" placeholder="Pincode" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-12 w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                      value={localProfile.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isEWS"
                        checked={localProfile.isEWS}
                        onCheckedChange={(checked) => handleChange('isEWS', checked as boolean)}
                      />
                      <Label htmlFor="isEWS" className="text-sm">EWS (Economically Weaker Section)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPWD"
                        checked={localProfile.isPWD}
                        onCheckedChange={(checked) => handleChange('isPWD', checked as boolean)}
                      />
                      <Label htmlFor="isPWD" className="text-sm">PwD (Person with Disability)</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Details */}
          <TabsContent value="academic">
            <div className="space-y-6">
              {/* Class 10 */}
              <Card>
                <CardHeader>
                  <CardTitle>Class 10th Details</CardTitle>
                  <CardDescription>Your secondary education details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tenthBoard">Board</Label>
                      <select
                        id="tenthBoard"
                        className="flex h-12 w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                        value={localProfile.tenthBoard}
                        onChange={(e) => handleChange('tenthBoard', e.target.value)}
                      >
                        <option value="">Select Board</option>
                        <option value="cbse">CBSE</option>
                        <option value="icse">ICSE</option>
                        <option value="state">State Board</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <InputField label="School Name" field="tenthSchool" placeholder="Enter school name" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Year of Passing" field="tenthYear" placeholder="2020" />
                    <InputField label="Percentage / CGPA" field="tenthPercentage" placeholder="95%" />
                  </div>
                </CardContent>
              </Card>

              {/* Class 12 */}
              <Card>
                <CardHeader>
                  <CardTitle>Class 12th Details</CardTitle>
                  <CardDescription>Your higher secondary education details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twelfthBoard">Board</Label>
                      <select
                        id="twelfthBoard"
                        className="flex h-12 w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                        value={localProfile.twelfthBoard}
                        onChange={(e) => handleChange('twelfthBoard', e.target.value)}
                      >
                        <option value="">Select Board</option>
                        <option value="cbse">CBSE</option>
                        <option value="icse">ISC</option>
                        <option value="state">State Board</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <InputField label="School Name" field="twelfthSchool" placeholder="Enter school name" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <InputField label="Year of Passing" field="twelfthYear" placeholder="2022" />
                    <InputField label="Percentage / CGPA" field="twelfthPercentage" placeholder="90%" />
                    <div className="space-y-2">
                      <Label htmlFor="stream">Stream</Label>
                      <select
                        id="stream"
                        className="flex h-12 w-full rounded-xl border-2 border-border/50 bg-card px-4 py-3 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                        value={localProfile.stream}
                        onChange={(e) => handleChange('stream', e.target.value)}
                      >
                        <option value="">Select Stream</option>
                        <option value="science">Science (PCM)</option>
                        <option value="science-bio">Science (PCB)</option>
                        <option value="commerce">Commerce</option>
                        <option value="arts">Arts/Humanities</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exam Details */}
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>Entrance Exam Details</CardTitle>
                <CardDescription>Your competitive exam scores (fill applicable fields)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="JEE Main Rank" field="jeeMainRank" placeholder="Enter your JEE Main rank" />
                  <InputField label="JEE Advanced Rank" field="jeeAdvancedRank" placeholder="Enter your JEE Advanced rank" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="NEET Rank" field="neetRank" placeholder="Enter your NEET rank" />
                  <InputField label="CUET Score" field="cuetScore" placeholder="Enter your CUET score" />
                </div>
                <InputField label="Other Exams" field="otherExams" placeholder="Enter other exam scores (e.g., BITSAT, VITEEE)" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              <>Saving...</>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
