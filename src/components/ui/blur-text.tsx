"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 100,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <>
      <style jsx>{`
        .blur-text-word {
          display: inline-block;
          filter: blur(10px);
          opacity: 0;
          transform: translateY(${direction === "top" ? "-20px" : "20px"});
          transition: all 0.6s ease-out;
          will-change: transform, filter, opacity;
        }
        
        .blur-text-word.animate {
          filter: blur(0px);
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <p ref={ref} className={cn("blur-text flex flex-wrap justify-center text-center", className)}>
        {elements.map((segment, index) => (
          <span
            key={index}
            className={cn(
              "blur-text-word",
              inView && "animate"
            )}
            style={{
              animationDelay: `${(index * delay)}ms`,
            }}
            onTransitionEnd={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </span>
        ))}
      </p>
    </>
  );
};

export { BlurText };