import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { createPortal } from 'react-dom';

interface TutorialPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Create a component that mounts to document.body
const Portal: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Create the portal element only on client
    if (typeof document !== 'undefined') {
      portalRef.current = document.createElement('div');
      portalRef.current.id = 'tutorial-portal';
      document.body.appendChild(portalRef.current);
      setMounted(true);
      
      return () => {
        if (portalRef.current) {
          document.body.removeChild(portalRef.current);
        }
      };
    }
  }, []);
  
  return mounted && portalRef.current ? createPortal(children, portalRef.current) : null;
};

const TutorialPopup = ({ isOpen, onClose }: TutorialPopupProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);
  
  // Handle body scroll locking
  useEffect(() => {
    // Skip first render to avoid flash of content
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      height: document.body.style.height
    };
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.height = '100%';
      setIsAnimating(true);
    } else if (!isFirstRender.current) {
      setIsAnimating(true);
      
      // Delay restoring body styles until animation completes
      closeTimeoutRef.current = setTimeout(() => {
        document.body.style.overflow = originalStyle.overflow;
        document.body.style.paddingRight = originalStyle.paddingRight;
        document.body.style.height = originalStyle.height;
        setIsAnimating(false);
      }, 300);
    }
    
    return () => {
      // Clean up
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      
      // Always restore body styles when component unmounts
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
      document.body.style.height = originalStyle.height;
    };
  }, [isOpen]);
  
  // Don't render anything if not open and not animating
  if (!isOpen && !isAnimating) return null;
  
  return (
    <Portal>
      <div
        className="tutorial-popup-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          backdropFilter: 'blur(3px)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) onClose();
        }}
      >
        <div
          className="tutorial-popup-content"
          style={{
            backgroundColor: '#000000',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #333333',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            willChange: 'transform, opacity',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ marginBottom: '16px' }}>
            <h2 
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Te ajudarei em todas as etapas
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px', marginBottom: '16px' }}>
              Tudo que você precisa saber para preencher corretamente todos os campos e nos entregar o melhor material e mais completo possível para criarmos o seu Agente de I.A personalizado.
            </p>

            {/* Divider */}
            <div 
              style={{
                height: '1px',
                width: '100%',
                backgroundColor: '#272727',
                margin: '0 0 16px 0'
              }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              borderRadius: '8px',
              marginBottom: '16px',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/C4GrZ3Ce4zI"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Tutorial"
              allowFullScreen
            ></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                padding: '8px 16px',
                borderRadius: '999px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: 'scale(1)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (isOpen) onClose();
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(88, 232, 119, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export function TutorialButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Wait until component is mounted to render popup
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={openPopup}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: '#FFFFFF',
          border: '1px solid #333333',
          borderRadius: '999px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          zIndex: 9998, // Lower than popup
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.9)';
          e.currentTarget.style.transform = 'translateY(2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Play size={14} color="#000000" />
        </div>
        <span style={{ fontWeight: '500' }}>Tutorial</span>
      </button>

      {isMounted && <TutorialPopup isOpen={isPopupOpen} onClose={closePopup} />}
    </>
  );
}