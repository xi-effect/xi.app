import React from 'react';

// Define the props
type SkeletonRectangleProps = {
    lines?: number;
    gap?: number;
    height?: number;
    className?: string;
    unEqualWidth?: boolean;
};
// Add prop defaults
export const SkeletonRectangle = ({
    gap = 4, //4px
    lines = 1,
    height = 20, //20px
    className = '',
    unEqualWidth,
}: SkeletonRectangleProps) => {
    const items = new Array(lines || 1).fill('x');
    return (
        <div className="w-full flex flex-col" style={{ rowGap: gap }}>
            {items.map((_, index) => {
                const len = items.length;
                const isLast = index === len - 1;
                const moreThanOne = len > 1;
                // use half-width if it's the last element
                const width = isLast && unEqualWidth && moreThanOne ? 'w-1/2' : 'w-full';
                return (
                    <div key={index} style={{ height }} className={[width, className].join(' ')} />
                );
            })}
        </div>
    );
};
