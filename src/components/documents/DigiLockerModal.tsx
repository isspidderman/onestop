import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  FileCheck,
  Download,
  ArrowRight,
  CheckCircle2,
  Shield,
  Smartphone,
} from 'lucide-react';

interface DigiLockerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDocumentsFetched: () => void;
}

const availableDocuments = [
  { name: 'Class X Marksheet', issuer: 'CBSE', type: 'Marksheet' },
  { name: 'Class XII Marksheet', issuer: 'CBSE', type: 'Marksheet' },
  { name: 'Aadhaar Card', issuer: 'UIDAI', type: 'ID Proof' },
  { name: 'PAN Card', issuer: 'Income Tax Dept', type: 'ID Proof' },
  { name: 'Driving License', issuer: 'Transport Dept', type: 'ID Proof' },
];

const DigiLockerModal = ({ open, onOpenChange, onDocumentsFetched }: DigiLockerModalProps) => {
  const [step, setStep] = useState<'intro' | 'connecting' | 'select' | 'importing' | 'success'>('intro');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const handleConnect = () => {
    setStep('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setStep('select');
    }, 2000);
  };

  const handleImport = () => {
    setStep('importing');
    // Simulate import delay
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  const handleComplete = () => {
    onDocumentsFetched();
    onOpenChange(false);
    // Reset for next time
    setTimeout(() => {
      setStep('intro');
      setSelectedDocs([]);
    }, 300);
  };

  const toggleDoc = (docName: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docName) ? prev.filter((d) => d !== docName) : [...prev, docName]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>DigiLocker</DialogTitle>
              <DialogDescription>Access your government-issued documents</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {step === 'intro' && (
          <div className="space-y-6 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What is DigiLocker?</h3>
              <p className="text-sm text-blue-800">
                DigiLocker is an initiative by the Government of India to provide a secure cloud-based
                platform for storing and sharing digital documents like Aadhaar, PAN, marksheets, and more.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Documents you can import:</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Aadhaar Card', 'PAN Card', 'Class X Marksheet', 'Class XII Marksheet', 'Driving License', 'Birth Certificate'].map((doc) => (
                  <div key={doc} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileCheck className="w-4 h-4 text-green-600" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4">
              <Smartphone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Aadhaar-linked mobile required</p>
                <p className="text-xs text-muted-foreground">
                  You'll receive an OTP on your Aadhaar-linked mobile number for verification.
                </p>
              </div>
            </div>

            <Button className="w-full" onClick={handleConnect}>
              Connect to DigiLocker
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 'connecting' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto animate-pulse">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Connecting to DigiLocker...</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please wait while we establish a secure connection
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {step === 'select' && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Select documents to import</h3>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableDocuments.map((doc) => (
                <div
                  key={doc.name}
                  onClick={() => toggleDoc(doc.name)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedDocs.includes(doc.name)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      selectedDocs.includes(doc.name)
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground/30'
                    }`}>
                      {selectedDocs.includes(doc.name) && (
                        <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Issued by {doc.issuer}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              disabled={selectedDocs.length === 0}
              onClick={handleImport}
            >
              <Download className="w-4 h-4 mr-2" />
              Import {selectedDocs.length} Document{selectedDocs.length !== 1 ? 's' : ''}
            </Button>
          </div>
        )}

        {step === 'importing' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Download className="w-8 h-8 text-primary animate-bounce" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Importing documents...</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Fetching {selectedDocs.length} document{selectedDocs.length !== 1 ? 's' : ''} from DigiLocker
              </p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Documents Imported!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDocs.length} document{selectedDocs.length !== 1 ? 's have' : ' has'} been added to your DocuSafe
              </p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-3 text-left">
              {selectedDocs.map((doc, i) => (
                <div key={doc} className="flex items-center gap-2 py-1">
                  <FileCheck className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-foreground">{doc}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={handleComplete}>
              Done
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 pt-2 border-t">
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
          <a
            href="https://digilocker.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Learn more about DigiLocker
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DigiLockerModal;
