import { motion, useInView, useAnimate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -80px 0px" });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || dimensions.width === 0 || !scope.current) return;

    const run = async () => {
      // Start: cursor off-screen to the bottom-right, box invisible
      await animate(".ph-cursor", {
        opacity: 0,
        x: dimensions.width + 220,
        y: dimensions.height + 120,
      }, { duration: 0 });

      await animate(".ph-box", { width: 0, opacity: 0 }, { duration: 0 });

      // Wait 1s after load
      await new Promise((r) => setTimeout(r, 1000));

      // Phase 1: cursor travels from far bottom-right to top-left corner of the word
      await animate(".ph-cursor", {
        opacity: 1,
        x: -10,
        y: -8,
      }, { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] });

      // Phase 2: cursor sweeps diagonally to bottom-right corner, box draws left-to-right behind it
      await Promise.all([
        animate(".ph-cursor", {
          x: dimensions.width + 8,
          y: dimensions.height + 6,
        }, { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }),
        animate(".ph-box", {
          width: dimensions.width,
          opacity: 1,
        }, { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }),
      ]);

      // Cursor fades out
      await animate(".ph-cursor", { opacity: 0 }, { duration: 0.45, ease: "easeOut" });
    };

    run();
  }, [isInView, dimensions.width, dimensions.height]);

  return (
    <span
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
      className={containerClassName}
    >
      {children}

      <span ref={scope} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>

        {/* Box anchored to the right, grows leftward as cursor sweeps */}
        <motion.span
          className={`ph-box ${rectangleClassName || ""}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: dimensions.height,
            width: 0,
            border: "2px solid currentColor",
            borderRadius: 6,
            display: "block",
            opacity: 0,
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* Cursor */}
        <motion.span
          className={`ph-cursor ${pointerClassName || ""}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "block",
            rotate: -90,
            opacity: 0,
            x: dimensions.width + 220,
            y: dimensions.height + 120,
          }}
        >
          <Pointer />
        </motion.span>

      </span>
    </span>
  );
}

function Pointer({ className }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
}
