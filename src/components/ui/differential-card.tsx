"use client";
import { Camera } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from "@/components/providers/language-provider";

interface DifferentialCardProps {
  title: string;
  description: string;
  videoUrl?: string;
}

export const DifferentialCard = ({ title, description, videoUrl }: DifferentialCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const copy = useTranslations();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // Video plays when 50% is visible
    triggerOnce: false,
  });

  // Effect to play/pause video based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (inView) {
        video.play().catch(error => {
          console.error(`Video play failed for ${title}:`, error);
        });
      } else {
        video.pause();
        video.currentTime = 0; // Rewind when out of view
      }
    }
  }, [inView, title]);

  // Effect to ensure video loops
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(error => {
        console.error(`Loop play failed for ${title}:`, error);
      });
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [title]);

  return (
    <div 
      ref={inViewRef}
      className="w-full p-6 sm:p-8 md:p-12 rounded-2xl border relative min-h-80 flex flex-col"
      style={{ 
        backgroundColor: '#141414',
        borderColor: '#323232',
        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Caixa de imagem/vídeo */}
      <div 
        className="w-full h-48 sm:h-56 md:h-64 mb-6 rounded-lg border overflow-hidden flex items-center justify-center"
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
            preload="metadata"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center center',
              filter: 'grayscale(100%)'
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-white/50">
            <Camera size={32} />
            <span className="text-sm">{copy.common.imagePlaceholder}</span>
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="flex-1 flex flex-col justify-center text-center">
        <h3 className="title-card text-white mb-4 font-medium text-[clamp(1.1rem,3vw,1.25rem)]">
          {title}
        </h3>
        <p className="text-card text-white/70 font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
