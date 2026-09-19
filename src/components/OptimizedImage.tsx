import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  /** Image name without extension, e.g. "CAPA RECRUITER" or "avatarnovo" */
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  imgRef?: React.RefObject<HTMLImageElement | null>;
}

const BASE = import.meta.env.BASE_URL;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  imgRef,
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgElRef = useRef<HTMLImageElement | null>(null);

  const setRef = (el: HTMLImageElement | null) => {
    imgElRef.current = el;
    if (imgRef) {
      (imgRef as React.MutableRefObject<HTMLImageElement | null>).current = el;
    }
  };

  // Build URLs: src = base name without extension
  const avifSrc = `${BASE}${src}.avif`;
  const webpSrc = `${BASE}${src}.webp`;
  const pngSrc = `${BASE}${src}.png`;
  const placeholderSrc = `${BASE}${src}-placeholder.webp`;

  return (
    <div className="relative overflow-hidden w-full h-full" style={{ lineHeight: 0 }}>
      {/* Blur placeholder */}
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'} ${placeholderClassName}`}
        style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
        loading="lazy"
        decoding="async"
      />

      <picture className="block w-full h-full">
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          ref={setRef}
          src={pngSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full ${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
