"use client";
import { Camera } from 'lucide-react';
import { useRef } from 'react';

interface DifferentialCardProps {
  title: string;
  description: string;
  videoUrl?: string;
}

export const DifferentialCard = ({ title, description, videoUrl }: DifferentialCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  return (
    <div 
      className="w-full p-12 rounded-2xl border relative min-h-80 flex flex-col"
      style={{ 
        backgroundColor: '#141414',
        borderColor: '#323232',
        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Caixa de imagem/vídeo */}
      <div 
        className="w-full h-64 mb-6 rounded-lg border overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: '#202020',
          borderColor: '#3D3D3D'
        }}
      >
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center',
              filter: 'grayscale(100%)'
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/50">
            <Camera size={32} />
            <span className="text-sm">Imagem será adicionada</span>
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="flex-1 flex flex-col justify-center text-center">
        <h3 className="title-card text-white mb-4 font-medium text-xl">
          {title}
        </h3>
        <p className="text-card text-white/70 font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};