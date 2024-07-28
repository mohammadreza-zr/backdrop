'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Bar = () => {
  const [isDrag, setIsDrag] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);
  const isOnlyOnClient = typeof window !== 'undefined';
  const containerRef = useRef<HTMLDivElement | null>(
    isOnlyOnClient ? document.querySelector('#container') : null,
  );
  const backdropRef = useRef<HTMLDivElement | null>(
    isOnlyOnClient ? document.querySelector('#backdrop') : null,
  );
  const foregroundRef = useRef<HTMLDivElement | null>(
    isOnlyOnClient ? document.querySelector('#foreground') : null,
  );

  return (
    <div
      id="container"
      ref={containerRef}
      className="relative min-h-svh w-full overflow-hidden bg-red-200"
    >
      <div
        ref={backdropRef}
        id="backdrop"
        className="sticky top-0 h-svh w-full bg-blue-300"
      >
        backdrop
      </div>
      <motion.div
        id="foreground"
        className="absolute top-32 z-10 h-svh w-full bg-green-300"
        drag={isDrag ? 'y' : false}
        dragMomentum={false}
        onDrag={(e: PointerEvent) => {
          //   if (e.offsetY === e.pageY) {
          //     setIsDrag(false);
          //   } else {
          //     setIsDrag(true);
          //   }
          if (e.screenY / 2 > e.pageY) {
            if (foregroundRef.current) {
              foregroundRef.current.scrollTo({
                top: 0,
              });
            }
          }

          if (e.offsetY + 25 > e.pageY) {
            // setIsScrollable(true);
            // setIsDrag(false);
          }
          if (e.offsetY + 24 <= e.pageY) {
            // setIsScrollable(false);
            // setIsDrag(true);
          }
        }}
        dragConstraints={{
          top: 0 - 128,
          bottom: (containerRef.current?.clientHeight || 0) - 250,
        }}
      >
        <div className="h-6 w-full bg-red-500"></div>
        <div
          className={cn(
            'h-full w-full bg-white',
            isScrollable ? 'overflow-y-auto' : 'overflow-y-auto',
          )}
          onScroll={(e) => {
            if (e.currentTarget.scrollTop <= 24) {
              //   setIsDrag(true);
              //   setIsScrollable(false);
            } else {
              // setIsDrag(false);
              // setIsScrollable(true);
            }
          }}
          id="foreground-inner"
        >
          <div className="flex h-[250vh] flex-col items-center justify-between pb-20">
            <p className="w-full bg-green-500 p-1 text-center">1</p>
            <p className="w-full bg-green-500 p-1 text-center">2</p>
            <p className="w-full bg-green-500 p-1 text-center">3</p>
            <p className="w-full bg-green-500 p-1 text-center">4</p>
            <p className="w-full bg-green-500 p-1 text-center">5</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Bar;
