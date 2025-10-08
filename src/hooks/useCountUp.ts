import { useEffect, useState, useRef, useCallback } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  enableScrollTrigger?: boolean;
  threshold?: number;
  scrollTriggerElement?: React.RefObject<HTMLElement | null>;
}

export const useCountUp = ({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  enableScrollTrigger = true,
  threshold = 0.1,
  scrollTriggerElement
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Função para formatar números com separador de milhares
  const formatNumber = (num: number): string => {
    const fixedNum = num.toFixed(decimals);
    const parts = fixedNum.split('.');
    
    // Adiciona separador de milhares
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return parts.join(',');
  };

  // Função de animação usando requestAnimationFrame para performance
  const animateCount = useCallback(() => {
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (totalChange * easedProgress);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCount);
  }, [start, end, duration]);

  // Intersection Observer para detectar quando o elemento entra na viewport
  useEffect(() => {
    if (!enableScrollTrigger || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold }
    );

    // Usar scrollTriggerElement se fornecido, caso contrário usar elementRef
    const targetElement = scrollTriggerElement?.current || elementRef.current;

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [enableScrollTrigger, threshold, hasStarted, scrollTriggerElement]);

  // Para casos onde não queremos scroll trigger
  useEffect(() => {
    if (!enableScrollTrigger && !hasStarted) {
      setHasStarted(true);
    }
  }, [enableScrollTrigger, hasStarted]);

  // Iniciar animação quando hasStarted se torna true
  useEffect(() => {
    if (hasStarted) {
      animateCount();
    }
  }, [hasStarted, animateCount]);

  const formattedValue = `${prefix}${formatNumber(count)}${suffix}`;

  const startAnimation = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  return {
    value: formattedValue,
    rawValue: count,
    ref: elementRef,
    reset: () => {
      setCount(start);
      setHasStarted(false);
    },
    start: startAnimation
  };
};