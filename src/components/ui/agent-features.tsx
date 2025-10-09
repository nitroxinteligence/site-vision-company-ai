"use client";

import Image from 'next/image';

interface AgentFeaturesProps {
  description: string;
  features: string[];
  layout?: "grid" | "single";
  imageUrl?: string;
}

export const AgentFeatures = ({ description, features, layout = "grid", imageUrl }: AgentFeaturesProps) => {
  return (
    <div>
      {/* Caixa para imagem */}
      <div 
        className="w-full mb-6 bg-neutral-800 border border-neutral-600 rounded-lg flex items-center justify-center overflow-hidden h-[200px] md:h-[300px]"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#404040'
        }}
      >
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt="Agent illustration" 
            width={400}
            height={300}
            className="w-4/5 h-full object-contain"
          />
        ) : (
          <div className="text-neutral-500 text-center">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-sm">Imagem será adicionada aqui</p>
          </div>
        )}
      </div>
      
      <p className="text-body-md text-neutral-300 mb-4">
        {description}
      </p>
      <div className={`grid ${layout === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-2 mb-4`}>
        {features.map((feature, index) => (
          <div
            className="bg-neutral-800 p-3 border border-neutral-700 flex items-center justify-start"
            key={`feature-${feature.replace(/\s+/g, '-').toLowerCase()}-${index}`} 
            style={{
              backgroundColor: '#141414',
              borderColor: '#323232',
              boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)',
              height: '45px',
              maxWidth: '520px',
              borderRadius: '6px'
            }}
          >
            <svg 
              className="w-4 h-4 mr-3 flex-shrink-0" 
              viewBox="0 0 20 20"
            >
              <defs>
                <linearGradient id="checkboxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
              </defs>
              <rect 
                x="2" 
                y="2" 
                width="16" 
                height="16" 
                rx="3" 
                ry="3" 
                fill="url(#checkboxGradient)" 
                stroke="url(#checkboxGradient)" 
                strokeWidth="1"
              />
              <path 
                d="M6 10l2 2 6-6" 
                stroke="#000000" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-body-sm text-white font-medium">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};