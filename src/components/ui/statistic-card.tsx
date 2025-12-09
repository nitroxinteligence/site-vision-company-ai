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
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl border min-h-[280px] sm:h-80 w-full relative transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#e5e5e5',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Container do Ícone */}
      <div 
        className="p-4 border"
        style={{
          backgroundColor: '#f8f9fa',
          borderColor: '#d1d5db',
          borderRadius: '3px'
        }}
      >
        <IconComponent size={32} className="text-gray-700" />
      </div>

      {/* Área de Texto */}
      <div className="text-center">
        <h3
          className="title-statistic text-black mb-3 sm:mb-4 font-medium"
          style={{
            fontSize: /\d/.test(statistic) ? 'clamp(40px, 8vw, 58px)' : 'clamp(24px, 5vw, 30px)'
          }}
        >
          <CountUpNumber value={statistic} shouldStart={isInView} />
        </h3>
        <p className="text-card font-medium leading-relaxed text-sm sm:text-base px-2" style={{ color: '#6b7280' }}>
          {description}
        </p>
      </div>
    </div>
  );
}