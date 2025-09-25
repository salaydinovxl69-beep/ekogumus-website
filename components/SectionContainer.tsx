import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  fullWidth?: boolean;
  background?: 'glass' | 'glass-green' | 'glass-subtle' | 'glass-card' | 'transparent';
  compact?: boolean;
}

export function SectionContainer({ 
  children, 
  className = '',
  noPadding = false,
  fullWidth = false,
  background = 'glass-card',
  compact = false
}: SectionContainerProps) {
  const outerPaddingClass = noPadding ? '' : compact ? 'py-8 sm:py-12 lg:py-16' : 'py-12 sm:py-16 lg:py-20';
  const innerPaddingClass = noPadding ? '' : compact ? 'p-6 sm:p-8 lg:p-10' : 'p-8 sm:p-10 lg:p-12';
  const widthClass = fullWidth ? 'w-full' : 'container mx-auto px-4 sm:px-6 lg:px-8';
  
  const backgroundClass = {
    'glass': 'bg-glass',
    'glass-green': 'bg-glass-green', 
    'glass-subtle': 'bg-glass-subtle',
    'glass-card': 'bg-glass-card',
    'transparent': 'bg-transparent'
  }[background];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`${outerPaddingClass} ${className}`}
    >
      <div className={`${backgroundClass} rounded-xl lg:rounded-2xl ${innerPaddingClass} mx-4 sm:mx-6 lg:mx-8`}>
        <div className={widthClass.replace('px-4 sm:px-6 lg:px-8', '')}>
          {children}
        </div>
      </div>
    </motion.section>
  );
}