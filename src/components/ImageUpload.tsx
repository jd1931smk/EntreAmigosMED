import { ChangeEvent, useRef, useState } from 'react';
import { Button } from './ui/Button';
import { ImageStorage } from '../services/imageStorage';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  defaultImage?: string;
}

export const ImageUpload = ({ onImageSelect, defaultImage }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const imageUrl = await ImageStorage.uploadImage(file);
        onImageSelect(imageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {defaultImage && (
        <img
          src={defaultImage}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      <div className="flex items-center justify-center">
        <input
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading 
            ? 'Uploading...' 
            : defaultImage 
              ? 'Change Image' 
              : 'Upload Image'
          }
        </Button>
      </div>
    </div>
  );
};