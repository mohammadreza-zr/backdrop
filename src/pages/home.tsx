'use client';

import Article from '@/components/core/article';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

export function isScrollable(node: Element): boolean {
  let style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(
    style.overflow + style.overflowX + style.overflowY,
  );
}

const Home = () => {
  const [elementPosition, setElementPosition] = useState<
    'top' | 'center' | 'bottom'
  >('center');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeOut = useRef<boolean>(false);

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/core/map'), {
        loading: () => (
          <p className="mt-10 w-full text-center">نقشه در حال لود شدن...</p>
        ),
        ssr: false,
      }),
    [],
  );

  useEffect(() => {
    window.addEventListener('wheel', (e) => {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

      //   if (scrollTop === 0) {
      //     if (!isAtTop) {
      //       setIsAtTop(true);
      //     }
      //     if (elementPosition === 'top') {
      //       setElementPosition('center');
      //     } else if (elementPosition === 'center') {
      //       setElementPosition('bottom');
      //     }
      //   } else {
      //     setElementPosition('top');
      //     if (isAtTop) {
      //       setIsAtTop(false);
      //     }
      //   }
    });
    window.addEventListener('touchmove', (e) => {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

      //   if (scrollTop === 0) {
      //     if (!isAtTop) {
      //       setIsAtTop(true);
      //     }
      //     if (elementPosition === 'top') {
      //       setElementPosition('center');
      //     } else if (elementPosition === 'center') {
      //       setElementPosition('bottom');
      //     }
      //   } else {
      //     setElementPosition('top');
      //     if (isAtTop) {
      //       setIsAtTop(false);
      //     }
      //   }
    });
    return () => {
      window.removeEventListener('wheel', () => {});
      window.removeEventListener('touchmove', () => {});
    };
  }, [elementPosition]);

  useEffect(() => {
    setTimeout(() => {
      timeOut.current = true;
    }, 700);

    return () => {};
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex w-full justify-center bg-white py-3">
        <Image
          src={'/logo-name.svg'}
          alt="لوگو امضا"
          width={60}
          height={24}
          className="object-contain"
        />
      </div>
      <div className="map fixed left-0 top-12 z-0 mx-auto w-full bg-white">
        <Map
          posix={[4.79029, -75.69003]}
          onClick={() => {
            setElementPosition('bottom');
          }}
          onMove={() => {
            if (timeOut.current) {
              setElementPosition('bottom');
            }
          }}
        />
      </div>

      <div
        className={cn(
          'absolute bottom-0 z-10 w-full overflow-y-auto overflow-x-hidden bg-white transition-all duration-700',
          elementPosition === 'center'
            ? 'h-3/4 max-h-[75%]'
            : elementPosition === 'top'
              ? 'h-[95%] max-h-[95%]'
              : 'h-8 max-h-8 overflow-hidden',
        )}
        ref={containerRef}
        onScroll={(e) => {
          const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
          if (scrollTop === 0) {
            if (elementPosition !== 'center') {
              setElementPosition('center');
            }
          } else {
            if (elementPosition === 'center') {
              setElementPosition('top');
            }
          }
        }}
      >
        <div
          className="sticky top-0 z-50 flex h-10 w-full justify-center bg-white pb-3 pt-1"
          onClick={() => {
            if (elementPosition === 'bottom') {
              setElementPosition('center');
            }
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const elementRect = document.body.getBoundingClientRect();
            const touchY = touch.clientY;

            const elementMidY = elementRect.top + elementRect.height / 2;

            if (touchY < elementMidY) {
              if (elementPosition === 'top') {
                setElementPosition('center');
              }
            } else {
              if (elementPosition === 'bottom') {
                setElementPosition('center');
              }
            }
          }}
        >
          <div className="mt-2 h-1 w-9 rounded-sm bg-[#D9D9D9]"></div>
        </div>
        <div className="mt-2 flex flex-col gap-2 pb-24 text-base">
          {new Array(10).fill(2).map((el, i) => {
            return (
              <div key={i}>
                <h2 className="pr-3 font-bold">ارزان</h2>
                <p className="pr-3 font-normal">
                  پایین ترین قیمت ها در دسته بندی های مختلف
                </p>
                <Carousel
                  opts={{
                    direction: 'rtl',
                    dragFree: true,
                    align: 'start',
                  }}
                >
                  <CarouselContent className="-ml-2 py-2 md:-ml-4">
                    {new Array(50).fill(1).map((item, i) => {
                      return (
                        <CarouselItem
                          key={i}
                          className="basis-[60%] pr-2 md:pr-4"
                        >
                          <Article />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          'suggestion fixed bottom-0 z-50 h-[90px] pb-4 shadow-xl transition-all duration-700',
          elementPosition === 'bottom' ? 'h-0 overflow-hidden' : '',
        )}
      >
        <div className="shadow-custom absolute right-4 top-2 z-10 max-w-fit rounded-[8px] bg-white p-4">
          سفارش
        </div>
        <Carousel
          opts={{
            direction: 'rtl',
            dragFree: true,
            align: 'start',
          }}
          setApi={(api) => {
            api?.on('slideFocus', (e) => {
              console.log(e);
            });
          }}
          className="mr-24"
        >
          <CarouselContent className="-ml-2 py-2 md:-ml-4">
            {new Array(50).fill(1).map((item, i) => {
              return (
                <CarouselItem key={i} className="basis-auto pr-2 md:pr-4">
                  <div className="shadow-custom max-w-fit rounded-[8px] bg-white p-4">
                    {i % 2 === 0 ? 'سفارش غذا از رستوران یملی' : 'سفارش'}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
