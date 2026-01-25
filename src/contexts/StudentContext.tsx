import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StudentProfile {
  // Personal Details
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Academic Details
  tenthBoard: string;
  tenthSchool: string;
  tenthYear: string;
  tenthPercentage: string;
  twelfthBoard: string;
  twelfthSchool: string;
  twelfthYear: string;
  twelfthPercentage: string;
  stream: string;

  // Exam Details
  jeeMainRank: string;
  jeeAdvancedRank: string;
  neetRank: string;
  cuetScore: string;
  otherExams: string;

  // Category
  category: string;
  isEWS: boolean;
  isPWD: boolean;
}

export interface Application {
  id: string;
  universityId: string;
  universityName: string;
  course: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Submitted' | 'Accepted' | 'Rejected';
  fee: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedDate: string;
  size: string;
}

interface StudentContextType {
  profile: StudentProfile;
  applications: Application[];
  documents: Document[];
  updateProfile: (profile: Partial<StudentProfile>) => void;
  addApplication: (application: Application) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  addDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
  resetStudent: () => void;
}

const defaultProfile: StudentProfile = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  tenthBoard: '',
  tenthSchool: '',
  tenthYear: '',
  tenthPercentage: '',
  twelfthBoard: '',
  twelfthSchool: '',
  twelfthYear: '',
  twelfthPercentage: '',
  stream: '',
  jeeMainRank: '',
  jeeAdvancedRank: '',
  neetRank: '',
  cuetScore: '',
  otherExams: '',
  category: '',
  isEWS: false,
  isPWD: false,
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const stored = localStorage.getItem('onestop_profile');
    return stored ? JSON.parse(stored) : defaultProfile;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem('onestop_applications');
    return stored ? JSON.parse(stored) : [];
  });

  const [documents, setDocuments] = useState<Document[]>(() => {
    const stored = localStorage.getItem('onestop_documents');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('onestop_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('onestop_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('onestop_documents', JSON.stringify(documents));
  }, [documents]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addApplication = (application: Application) => {
    setApplications(prev => [...prev, application]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status } : app))
    );
  };

  const addDocument = (document: Document) => {
    setDocuments(prev => [...prev, document]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const resetStudent = () => {
    setProfile(defaultProfile);
    setApplications([]);
    setDocuments([]);
    localStorage.removeItem('onestop_profile');
    localStorage.removeItem('onestop_applications');
    localStorage.removeItem('onestop_documents');
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        applications,
        documents,
        updateProfile,
        addApplication,
        updateApplicationStatus,
        addDocument,
        removeDocument,
        resetStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
