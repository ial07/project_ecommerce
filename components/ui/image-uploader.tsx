"use client";

import * as React from "react";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  onFileChange?: (file: File | null) => void;
  defaultPreview?: string;
  className?: string;
}

export function ImageUploader({
  label = "Upload Image",
  onFileChange,
  defaultPreview,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(defaultPreview || null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      onFileChange?.(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onFileChange?.(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(droppedFile);
      onFileChange?.(droppedFile);
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition hover:bg-muted/50",
          preview ? "border-muted-foreground/30" : "border-muted-foreground/10"
        )}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <div className="relative w-full h-48">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
            <Upload className="h-6 w-6" />
            <p className="text-sm">
              Drag and drop your image here, or click to upload
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
