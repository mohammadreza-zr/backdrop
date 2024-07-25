'use client';

import Article from '@/components/core/article';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Map } from '@neshan-maps-platform/ol';
import { NeshanMapRef } from '@neshan-maps-platform/react-openlayers';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const Home = () => {
  const [elementPosition, setElementPosition] = useState<
    'top' | 'center' | 'bottom' | 'fixed-top'
  >('center');
  const containerRef = useRef<HTMLDivElement>(null);
  const timeOut = useRef<boolean>(false);
  const { scrollY } = useScroll({
    container: containerRef,
  });
  const lastScroll = useRef(0);
  const headerHeight = 50;
  const footerHeight = 120;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > lastScroll.current) {
      if (elementPosition === 'center') {
        setElementPosition('top');
      } else if (elementPosition === 'top') {
        setElementPosition('fixed-top');
      }
    } else {
      if (latest === 0) {
        if (elementPosition === 'top') {
          setElementPosition('center');
        }
      } else {
        if (elementPosition === 'fixed-top') {
          setElementPosition('top');
        }
      }
    }
    lastScroll.current = latest;
  });

  const NeshanMap = useMemo(
    () =>
      dynamic(() => import('@neshan-maps-platform/react-openlayers'), {
        loading: () => (
          <p className="mt-10 w-full text-center">نقشه در حال لود شدن...</p>
        ),
        ssr: false,
      }),
    [],
  );
  const mapRef = useRef<NeshanMapRef | null>(null);

  const onInit = (map: Map) => {
    map.setMapType('osm-bright');
    map.switchTrafficLayer(true);
  };

  useEffect(() => {
    if (mapRef.current?.map) {
      mapRef.current?.map.switchTrafficLayer(true);
      mapRef.current?.map.setMapType('standard-night');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      timeOut.current = true;
    }, 1000);

    return () => {};
  }, []);

  return (
    <>
      <div className="sticky left-0 top-0 z-10 flex w-full justify-center bg-white py-3">
        <Image
          src={'/logo-name.svg'}
          alt="لوگو امضا"
          width={60}
          height={24}
          className="object-contain"
        />
      </div>
      <div
        className="map sticky left-0 top-12 z-0 mx-auto w-full bg-white"
        onClick={() => {
          setElementPosition('bottom');
        }}
        onTouchMove={() => {
          setElementPosition('bottom');
        }}
      >
        <NeshanMap
          mapKey={process.env.NEXT_PUBLIC_MAP_KEY || ''}
          defaultType="neshan"
          center={{ latitude: 35.7665394, longitude: 51.4749824 }}
          style={{ height: '100%', width: '100%' }}
          onInit={onInit}
          zoom={13}
          traffic={false}
          poi={false}
        ></NeshanMap>
      </div>

      <motion.div
        className={cn(
          'absolute bottom-0 top-14 z-10 h-full w-full overflow-y-auto overflow-x-hidden bg-mainGray',
          elementPosition === 'top' || elementPosition === 'fixed-top'
            ? ''
            : 'rounded-t-3xl',
        )}
        ref={containerRef}
        variants={{
          'fixed-top': {
            top: `0`,
            height: `100%`,
            overflow: 'auto',
            maxHeight: `100%`,
            transitionDuration: '300ms',
          },
          top: {
            top: `${headerHeight}px`,
            height: `100%`,
            overflow: 'auto',
            maxHeight: `100%`,
            transitionDuration: '700ms',
          },
          center: {
            top: '25%',
            height: '75%',
            overflow: 'auto',
            maxHeight: '100%',
            transitionDuration: '700ms',
            animationName: 'centerPosition',
            animationDuration: '700ms',
          },
          bottom: {
            top: `calc(100% - ${footerHeight}px)`,
            height: `calc(100% - ${footerHeight}px)`,
            maxHeight: `${footerHeight}px`,
            overflow: 'hidden',
            transitionDuration: '700ms',
          },
        }}
        animate={elementPosition}
      >
        <div
          className="sticky top-0 z-50 grid h-9 w-full place-content-center justify-center bg-mainGray"
          onClick={() => {
            if (elementPosition !== 'center') {
              setElementPosition('center');
            }
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const elementRect = document.body.getBoundingClientRect();
            const touchY = touch.clientY;

            const elementMidY = elementRect.top + elementRect.height / 2;

            if (touchY < elementMidY) {
              if (
                elementPosition === 'top' ||
                elementPosition === 'fixed-top'
              ) {
                setElementPosition('center');
              }
            } else {
              if (elementPosition === 'bottom') {
                setElementPosition('center');
              }
            }
          }}
        >
          <div className="h-1 w-14 rounded-sm bg-[#D9D9D9] transition-opacity duration-200"></div>
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
      </motion.div>
      <div
        className={cn(
          'suggestion fixed bottom-0 z-50 h-[90px] pb-4 shadow-xl transition-all duration-700',
        )}
      >
        <div className="absolute right-4 top-0 z-10 max-w-fit rounded-[8px] bg-white p-4 shadow-custom">
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
          <CarouselContent className="-ml-2 pb-2 md:-ml-4">
            {new Array(50).fill(1).map((item, i) => {
              return (
                <CarouselItem key={i} className="basis-auto pr-2 md:pr-4">
                  <div className="max-w-fit rounded-[8px] bg-white p-4 shadow-custom">
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
