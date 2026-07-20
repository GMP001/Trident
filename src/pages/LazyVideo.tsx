import React, { useState, useEffect, useRef } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  fallback?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className,
  style,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  fallback,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className={className} style={style}>
      {isInView && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
          onLoadedData={handleLoadedData}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={style}
        >
          <source src={src} type="video/mp4" />
          {fallback && <source src={fallback} type="video/webm" />}
          Your browser does not support the video tag.
        </video>
      )}
      {!isInView && poster && (
        <img
          src={poster}
          alt="Video placeholder"
          className="w-full h-full object-cover"
          style={style}
        />
      )}
    </div>
  );
};

export default LazyVideo;
