import React from 'react';
import { ComponentPropsWithRef } from 'react';

// Use the div element props
type DivProps = ComponentPropsWithRef<'div'>;

// Define the component. this is basically a div wrapper with a pulse animation for the skeleton loading
export const SkeletonLoader = ({ children, className, ...props }: DivProps) => {
  return (
    <div className={['animate-pulse', className].join(' ')} {...props}>
      {children}
    </div>
  );
};
