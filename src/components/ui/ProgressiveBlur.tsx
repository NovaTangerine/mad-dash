import React from 'react';

interface ProgressiveBlurProps {
  position?: 'top' | 'bottom';
  height?: string;
  className?: string;
}

export function ProgressiveBlur({ position = 'bottom', height = '12%', className = '' }: ProgressiveBlurProps) {
  const isTop = position === 'top';
  
  // Using standard absolute positioning with the masking logic from the progressive-blur skill
  return (
    <div 
      className={`fixed z-10 pointer-events-none ${isTop ? 'inset-x-0 top-0' : 'inset-x-0 bottom-0'} ${className}`} 
      style={{ height }}
    >
      <div className="absolute inset-0 z-[1] backdrop-blur-[0.5px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)` }}></div>
      <div className="absolute inset-0 z-[2] backdrop-blur-[1px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)` }}></div>
      <div className="absolute inset-0 z-[3] backdrop-blur-[2px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)` }}></div>
      <div className="absolute inset-0 z-[4] backdrop-blur-[4px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)` }}></div>
      <div className="absolute inset-0 z-[5] backdrop-blur-[8px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)` }}></div>
      <div className="absolute inset-0 z-[6] backdrop-blur-[16px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)` }}></div>
      <div className="absolute inset-0 z-[7] backdrop-blur-[32px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)` }}></div>
      <div className="absolute inset-0 z-[8] backdrop-blur-[64px]" style={{ mask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)`, WebkitMask: `linear-gradient(to ${isTop ? 'top' : 'bottom'}, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)` }}></div>
    </div>
  );
}
