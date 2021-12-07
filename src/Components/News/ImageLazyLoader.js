import React, { useEffect, useState, useRef } from 'react';

const ImageLazyLoader = ({
  src,
  reservedHeight = '0px',
  observerOptions = { rootMargin: '0px', threshold: 0.0 },
}) => {
  const [visible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const onChange = (entries) => {
      const el = entries[0];

      if (el.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    };
    const observer = new IntersectionObserver(onChange, observerOptions);

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: reservedHeight,
      }}>
      {visible ? <img alt="" src={src} width="320" /> : null}
    </div>
  );
};

export default ImageLazyLoader;
