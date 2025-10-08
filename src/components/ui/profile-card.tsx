import React from 'react';

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
  return (
    <div 
      className="flex flex-col p-10 rounded-2xl border h-full min-h-[400px] relative"
      style={{ 
        backgroundColor: '#141414',
        borderColor: '#323232',
        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Container para imagem ou vídeo */}
      <div 
        className="w-full h-80 rounded-lg mb-6 overflow-hidden border relative"
        style={{
          backgroundColor: '#202020',
          borderColor: '#3D3D3D'
        }}
        aria-label={imageAlt || `Foto de ${name}`}
      >
        {videoUrl ? (
          <video 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
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
          <h3 className="text-white mb-4 font-medium text-2xl">
            {name}
          </h3>
          <div className="font-medium mb-4" style={{ color: '#929292', fontSize: '16px' }}>
            {role}
          </div>
        </div>
        
        <p className="font-medium leading-relaxed" style={{ color: '#929292', fontSize: '16px' }}>
          {description}
        </p>
      </div>
    </div>
  );
}