// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';

interface AnimatedLogoProps {
  compact?: boolean;
  className?: string;
}

/**
 * Logo Explorons l'IA avec animations
 */
const BRAND_PLAIN = "Explorons l'";
const BRAND_HIGHLIGHT = 'IA';

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ compact = false, className = '' }) => {
  // Version compacte : "IA" seul. Version complète : "Explorons l'IA", avec "IA" mis en avant.
  const letters = (compact ? BRAND_HIGHLIGHT : BRAND_PLAIN + BRAND_HIGHLIGHT).split('');
  const firstHighlighted = letters.length - BRAND_HIGHLIGHT.length;

  return (
    <div className={`logo-container ${className}`}>
      <span className="inline-flex items-center overflow-hidden">
        {letters.map((letter, index) => {
          const isIA = index >= firstHighlighted;
          const isSpace = letter === ' ';
          
          if (isSpace) {
            return <span key={index} className="w-2" />;
          }
          
          return (
            <span
              key={index}
              className={`
                logo-letter inline-block transition-all duration-300 ease-out
                ${isIA 
                  ? 'text-primary font-bold text-xl md:text-2xl logo-ia-letter' 
                  : 'text-foreground font-semibold text-lg md:text-xl'
                }
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              {letter}
            </span>
          );
        })}
      </span>
      
      <style>
        {`
        .logo-container:hover .logo-letter {
          transform: translateY(-2px);
        }
        
        .logo-container:hover .logo-ia-letter {
          transform: translateY(-2px) scale(1.05);
          text-shadow: 0 0 8px hsl(var(--primary) / 0.3);
        }
        
        .logo-letter {
          animation: logoEnter 0.6s ease-out;
        }
        
        .logo-ia-letter {
          position: relative;
        }
        
        .logo-ia-letter::after {
          content: '';
          position: absolute;
          inset: 0;
          background: hsl(var(--primary) / 0.1);
          border-radius: 4px;
          transform: scale(0);
          transition: transform 0.3s ease-out;
          z-index: -1;
        }
        
        .logo-container:hover .logo-ia-letter::after {
          transform: scale(1.2);
        }
        
        @keyframes logoEnter {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .logo-letter {
            animation: none;
          }
          
          .logo-container:hover .logo-letter,
          .logo-container:hover .logo-ia-letter {
            transform: none;
            text-shadow: none;
          }
          
          .logo-ia-letter::after {
            display: none;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AnimatedLogo;
