'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps an image in a GSAP scrub-based parallax effect.
 *
 * The outer div clips overflow; the image is sized to 130% height to provide
 * headroom for the parallax travel range without revealing empty space.
 *
 * We intentionally use a native `<img>` rather than `next/image`:
 * `next/image` with `fill` requires a statically-sized parent and doesn't
 * forward refs cleanly through its wrapper, which breaks GSAP targeting.
 * The `about-image` class is required by the `useImagesReady` hook.
 */
export const ParallaxImage = ({
  src,
  alt,
  speed = 0.22,
}: {
  src: string;
  alt: string;
  speed?: number;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={wrapRef}
      className="image-container relative w-full overflow-hidden"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="about-image block w-full object-cover brightness-[0.88] saturate-[0.85] will-change-transform"
        style={{ height: '130%' }}
      />
    </div>
  );
};