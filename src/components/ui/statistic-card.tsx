"use client";
import React, { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp, BarChart3, Users } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

interface StatisticCardProps {
  statistic: string;
  description: string;
}

const getIcon = (description: string) => {
  if (description.includes('custos')) return TrendingDown;
  if (description.includes('taxa de resposta') || description.includes('receita')) return TrendingUp;
  if (description.includes('receita')) return BarChart3;
  if (description.includes('Empresários')) return Users;
  return BarChart3;
};

const CountUpNumber = ({ value, shouldStart }: { value: string; shouldStart: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, shouldStart]);
  
  const hasNumber = /\d/.test(value);
  if (!hasNumber) return <span>{value}</span>;
  
  const prefix = value.includes('-') ? '-' : value.includes('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : '';
  
  return <span>{prefix}{count}{suffix}</span>;
};

export function StatisticCard({ statistic, description }: StatisticCardProps) {
  const IconComponent = getIcon(description);
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <div 
      ref={ref}
      className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl border h-80 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
      style={{ 
        backgroundColor: '#141414',
        borderColor: '#323232',
        boxShadow: 'inset 30px 30px 60px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Container do Ícone */}
      <div 
        className="p-4 border"
        style={{
          backgroundColor: '#202020',
          borderColor: '#3D3D3D',
          borderRadius: '3px'
        }}
      >
        <IconComponent size={32} className="text-white" />
      </div>

      {/* Área de Texto */}
      <div className="text-center">
        <h3 
          className="title-statistic text-white mb-4 font-medium" 
          style={{ 
            fontSize: /\d/.test(statistic) ? '58px' : '30px' // 58px para números, 30px para texto
          }}
        >
          <CountUpNumber value={statistic} shouldStart={isInView} />
        </h3>
        <p className="text-card font-medium leading-relaxed text-base" style={{ color: '#929292' }}>
          {description}
        </p>
      </div>
    </div>
  );
}