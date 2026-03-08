import React from 'react';

interface AsteriskLogoProps {
  size?: number;
  className?: string;
}

export default function AsteriskLogo({ size = 24, className = "" }: AsteriskLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/>
    </svg>
  );
}
