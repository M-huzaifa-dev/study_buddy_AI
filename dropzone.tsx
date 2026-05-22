import React, { useRef, useState } from 'react';

interface DropZoneProps {
  onFileLoaded: (text: string) => void;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileLoaded, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setFileDetails({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB"
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onFileLoaded(e.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFileDetails(null);
    onFileLoaded("");
  };

  
};