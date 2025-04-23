"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white absolute top-0 left-0">
      <p>App is coming soon...</p>
      <DVD />
    </div>
  );
}





const DVD = () => {
  const palette = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
  const speed = 1;

  const dvdRef = useRef(null);
  const svgRef = useRef(null);
  const [prevColorIndex, setPrevColorIndex] = useState(0);
  const positionRef = useRef({ x: 0, y: 0, dirX: 1.5, dirY: 1 });
  const animationRef = useRef();

  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef(null);

useEffect(() => {
    if (!isIdle) return;

    const dvd = dvdRef.current;
    if (!dvd) return;

    const dvdWidth = dvd.offsetWidth;
    const dvdHeight = dvd.offsetHeight;

    function getNewRandomColor() {
      const currentPalette = [...palette];
      currentPalette.splice(prevColorIndex, 1);
      const newIndex = Math.floor(Math.random() * currentPalette.length);
      const realIndex = newIndex < prevColorIndex ? newIndex : newIndex + 1;
      setPrevColorIndex(realIndex);
      return currentPalette[newIndex];
    }

    const animate = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const pos = positionRef.current;

      if (pos.y + dvdHeight >= screenHeight || pos.y < 0) {
        pos.dirY *= -1;
        svgRef.current.setAttribute("fill", getNewRandomColor());
      }
      if (pos.x + dvdWidth >= screenWidth || pos.x < 0) {
        pos.dirX *= -1;
        svgRef.current.setAttribute("fill", getNewRandomColor());
      }

      pos.x += pos.dirX * speed;
      pos.y += pos.dirY * speed;
      dvd.style.left = `${pos.x}px`;
      dvd.style.top = `${pos.y}px`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isIdle]);

  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 3000); // z. B. 3 Sekunden Inaktivität
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("mousedown", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    resetIdleTimer(); // initial starten

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("mousedown", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  if(isIdle){
    return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[rgb(20,20,20)] z-50 transition-all duration-1000 absolute top-0 left-0">
        {isIdle && (
          <div
            className="absolute w-32 h-20 flex items-center justify-center shadow-lg"
            ref={dvdRef}
          >
            <svg width="100%" height="100%" viewBox="0 0 1058.4 465.84" xmlns="http://www.w3.org/2000/svg" fill={palette[0]} ref={svgRef}> 
              <g>
                <path d="m91.053 0-13.719 57.707 102.28 0.039063h24c65.747 0 105.91 26.44 94.746 73.4-12.147 51.133-69.613 73.4-130.67 73.4h-22.947l29.787-125.45h-102.27l-43.521 183.2h145.05c109.07 0 212.76-57.573 231.01-131.15 3.3467-13.507 2.8806-47.253-5.3594-67.359-0.21299-0.787-0.42594-1.4-1.1855-3-0.293-0.653-0.56012-3.6412 1.1465-4.2812 0.947-0.36 2.7069 1.4944 2.9336 2.041 0.853 2.24 1.5059 3.9062 1.5059 3.9062l92.293 260.6 234.97-265.21 99.535-0.089844h24c65.76 0 106.25 26.44 95.092 73.4-12.147 51.133-69.947 73.4-131 73.4h-22.959l29.799-125.47h-102.27l-43.533 183.21h145.07c109.05 0 213.48-57.4 231-131.15 17.52-73.75-59.107-131.15-168.69-131.15h-216.4s-57.319 67.88-67.959 80.693c-57.12 68.787-67.241 87.226-68.961 91.986 0.24-4.8-1.8138-23.412-26.174-92.959-6.48-18.52-27.359-79.721-27.359-79.721h-389.25zm408.77 324.16c-276.04 0-499.83 31.72-499.83 70.84s223.79 70.84 499.83 70.84c276.04 0 499.83-31.72 499.83-70.84s-223.79-70.84-499.83-70.84zm-18.094 48.627c63.04 0 114.13 10.573 114.13 23.613s-51.095 23.613-114.13 23.613c-63.027 0-114.13-10.573-114.13-23.613s51.106-23.613 114.13-23.613z"/>
                <path d="m963.6 445.05-0.73242 5.1738h13.08l-5.1074 36.32h5.7207l5.1055-36.32h11.68l0.72071-5.1738h-30.467zm41.215 0-13.693 41.494h5.4785l10.215-31.76h0.1328l7.1718 31.76 16.668-31.453h0.1191v31.453h5.4805v-41.494h-5.4805l-14.906 28.107-6.4395-28.107h-4.746z" display="none"/>
              </g>
            </svg>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[rgb(20,20,20)] opacity-0 z-50 transition-all duration-300 absolute top-0 left-0">
        
      </div>
    )
  }
}