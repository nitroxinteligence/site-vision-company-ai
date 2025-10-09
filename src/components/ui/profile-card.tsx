"use client";

import React, { useRef } from 'react';

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageAlt?: string;
  videoUrl?: string;
  videoScale?: number;
  videoTranslateY?: string;
}

export function ProfileCard({ name, role, description, imageAlt, videoUrl, videoScale = 2.1, videoTranslateY = '20%' }: ProfileCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div 
      className="flex flex-col p-6 sm:p-8 md:p-10 rounded-2xl border h-full min-h-[400px] relative"
      style={{ 
        backgroundColor: '#141414',
        borderColor: '#323232',
        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Container para imagem ou vídeo */}
      <div 
        className="w-full h-64 md:h-80 rounded-lg mb-6 overflow-hidden border relative"
        style={{
          backgroundColor: '#202020',
          borderColor: '#3D3D3D'
        }}
        aria-label={imageAlt || `Vídeo de ${name}`}
      >
        {videoUrl ? (
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted 
            loop 
            playsInline
            preload="metadata"
            style={{
              objectPosition: 'center center',
              transform: `scale(${videoScale}) translateY(${videoTranslateY})`,
              objectFit: 'cover'
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-24 h-24 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <span className="text-sm">Imagem</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Área de Texto */}
      <div className="text-left flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-heading-3 text-white mb-2 font-medium">
            {name}
          </h3>
          <div className="text-body-md font-medium mb-4 text-[#929292]">
            {role}
          </div>
        </div>
        
        <p className="text-body-sm font-medium leading-relaxed text-[#929292]">
          {description}
        </p>
      </div>
    </div>
  );
}
