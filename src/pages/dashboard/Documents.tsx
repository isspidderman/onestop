import { useState, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useStudent, Document } from '@/contexts/StudentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DigiLockerModal from '@/components/documents/DigiLockerModal';
import {
  FolderOpen,
  Upload,
  FileText,
  Image,
  File,
  Trash2,
  Download,
  Eye,
  Plus,
  Shield,
  Lock,
  Landmark,
} from 'lucide-react';

const documentTypes = [
  'Marksheet',
  'Certificate',
  'ID Proof',
  'Admit Card',
  'Fee Receipt',
  'Photo',
  'Other',
];

const Documents = () => {
  const { documents, addDocument, removeDocument } = useStudent();
  const [dragActive, setDragActive] = useState(false);
  const [digiLockerOpen, setDigiLockerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDigiLockerFetch = () => {
    // Add mock documents from DigiLocker
    const digiLockerDocs: Document[] = [
      {
        id: 'digi_' + Math.random().toString(36).substr(2, 9),
        name: 'Class X Marksheet (CBSE)',
        type: 'application/pdf',
        uploadedDate: new Date().toISOString().split('T')[0],
        size: '245 KB',
      },
      {
        id: 'digi_' + Math.random().toString(36).substr(2, 9),
        name: 'Class XII Marksheet (CBSE)',
        type: 'application/pdf',
        uploadedDate: new Date().toISOString().split('T')[0],
        size: '312 KB',
      },
      {
        id: 'digi_' + Math.random().toString(36).substr(2, 9),
        name: 'Aadhaar Card',
        type: 'application/pdf',
        uploadedDate: new Date().toISOString().split('T')[0],
        size: '156 KB',
      },
    ];

    digiLockerDocs.forEach((doc) => addDocument(doc));

    toast({
      title: 'Documents Imported',
      description: 'Documents from DigiLocker have been added to your DocuSafe.',
    });
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-6 h-6 text-blue-600" />;
    if (type.includes('pdf')) return <FileText className="w-6 h-6 text-red-600" />;
    return <File className="w-6 h-6 text-muted-foreground" />;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const newDoc: Document = {
        id: 'doc_' + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type || 'application/octet-stream',
        uploadedDate: new Date().toISOString().split('T')[0],
        size: formatFileSize(file.size),
      };
      addDocument(newDoc);
    });

    toast({
      title: 'Documents Uploaded',
      description: `${files.length} file(s) uploaded successfully to DocuSafe.`,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = (id: string) => {
    removeDocument(id);
    toast({
      title: 'Document Deleted',
      description: 'The document has been removed from DocuSafe.',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">DocuSafe</h1>
              <Badge className="bg-green-100 text-green-700">
                <Lock className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Upload and store your documents securely. Reuse them for all your applications.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setDigiLockerOpen(true)}>
              <Landmark className="w-4 h-4 mr-2" />
              DigiLocker
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* DigiLocker Modal */}
        <DigiLockerModal
          open={digiLockerOpen}
          onOpenChange={setDigiLockerOpen}
          onDocumentsFetched={handleDigiLockerFetch}
        />

        {/* Security Notice */}
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Your Documents are Secure</h3>
                <p className="text-sm text-green-700 mt-1">
                  All documents are encrypted and stored securely. Only you and authorized universities can access them.
                  This is a demo - documents are stored in your browser only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card>
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-secondary/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
              />
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Drag and drop your documents here
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click the button below to browse
              </p>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supported: PDF, JPG, PNG, DOC (Max 10MB each)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Document Types */}
        <div className="flex flex-wrap gap-2">
          {documentTypes.map((type) => (
            <Badge key={type} variant="outline" className="px-3 py-1">
              {type}
            </Badge>
          ))}
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>
              {documents.length} document(s) stored in DocuSafe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No documents yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your marksheets, certificates, and IDs to get started.
                </p>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload First Document
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Preview">
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download">
                        <Download className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        onClick={() => handleDelete(doc.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
