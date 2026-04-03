"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, animate, useScroll } from "framer-motion";
import VaporizeTextCycle, { Tag } from "./vapour-text-effect";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

const MOBILE_IMG_WIDTH = 45;
const MOBILE_IMG_HEIGHT = 65;

function FlipCard({ src, index, phase, target }: FlipCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const width = isMobile ? MOBILE_IMG_WIDTH : IMG_WIDTH;
  const height = isMobile ? MOBILE_IMG_HEIGHT : IMG_HEIGHT;

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: width,
        height: height,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        zIndex: 5,
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`celebration-${index}`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg flex flex-col items-center justify-center p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #dc2626, #f59e0b)",
          }}
        >
          <p className="text-[10px] font-serif text-white">Invite</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Event-themed Unsplash Images (weddings, birthdays, celebrations)
const IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&q=80",
  "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=300&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=80",
  "https://images.unsplash.com/photo-1478145787956-f608bc674f71?w=300&q=80",
  "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=300&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",
  "https://images.unsplash.com/photo-1521478413493-86954f72f63c?w=300&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=300&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=300&q=80",
  "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=300&q=80",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=300&q=80",
  "https://images.unsplash.com/photo-1524824267900-2b6ed433ce32?w=300&q=80",
  "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=300&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&q=80",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80",
];

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80",
];

const QUOTES = [
  "The best thing to hold onto in life is each other. Let us weave your stories into eternal digital memories of love and laughter.",
  "Family is not just an important thing; it is everything that makes our hearts feel at home in this vast, beautiful world.",
  "Celebrate the magic of today, for every moment shared is a beautiful step in the dance of life we perform together.",
  "Friendship is the sweet wine of existence. Let's raise a digital toast to every unforgettable pour and shared secret.",
  "Love looks not with the eyes, but with the soul. We capture that soul in every bespoke invitation we craft for you.",
  "Together is a beautiful place to be, where every shared smile becomes a treasure in our collective vault of memories.",
  "Moments become memories in a blink. Aahvan Link ensures those blinks last for generations to come, bright and true.",
  "May your celebration be as unique as your love story, filled with grace, timeless elegance, and a touch of magic.",
];

export default function IntroAnimation() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const lastTriggerTime = useRef(0);
  const lastTriggerY = useRef(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const now = Date.now();
      if (Math.abs(latest - lastTriggerY.current) > 350 && now - lastTriggerTime.current > 1000) {
        setScrollTrigger(prev => prev + 1);
        lastTriggerY.current = latest;
        lastTriggerTime.current = now;
      }
    });
  }, [scrollY]);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await animate(virtualScroll, 600, { duration: 3, ease: [0.22, 1, 0.36, 1] });
      animate(virtualScroll, 3000, {
        duration: 60,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        from: 600
      });
    };
    sequence();
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 1500,
      rotation: (Math.random() - 0.5) * 360,
      scale: 0.4,
      opacity: 0,
    }));
  }, []);

  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubRotate = scrollRotate.on("change", setRotateValue);
    const unsubParallax = smoothMouseX.on("change", setParallaxValue);
    return () => { unsubRotate(); unsubParallax(); };
  }, [scrollRotate, smoothMouseX]);

  const isMobileView = containerSize.width < 768;
  const imagesToRenderCount = isMobileView ? 12 : 20;

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] overflow-hidden bg-brand-cream">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl z-10" />
        <div className="grid grid-cols-3 h-full opacity-25">
          {BG_IMAGES.map((src, i) => (
            <motion.div 
              key={i} 
              className="h-full w-full bg-cover bg-center"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                delay: i * 3
              }}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ perspective: "1500px" }}>
        
        {/* Vapour Quote Layer - High Z-Index */}
        <div className="relative z-30 w-[95vw] h-[450px] flex items-center justify-center pointer-events-none">
          <VaporizeTextCycle
            texts={QUOTES}
            trigger={scrollTrigger}
            font={{
              fontFamily: "'Pinyon Script', 'Edwardian Script ITC', cursive",
              fontSize: "72px",
              fontWeight: 400
            }}
            colors={["#dc2626", "#f59e0b", "#fcd34d"]}
            spread={5}
            density={7}
            animation={{
              vaporizeDuration: 2,
              fadeInDuration: 1.5,
              waitDuration: 10
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>

        {/* Subtitle Decoration */}
        <motion.div
          style={{ 
            opacity: useTransform(smoothMorph, [0.5, 1], [0.8, 0]),
            y: useTransform(smoothMorph, [0, 1], [20, 0])
          }}
          className="absolute bottom-[10%] z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <div className="w-12 h-1 bg-brand-red rounded-full opacity-40 shadow-[0_0_15px_rgba(220,38,38,0.4)]" />
        </motion.div>

        {/* Cards Formation - Medium Z-Index */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {IMAGES.slice(0, imagesToRenderCount).map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };
            
            if (introPhase === "scatter") {
              target = scatterPositions[i] || scatterPositions[0];
            } else if (introPhase === "line") {
              const lineSpacing = isMobileView ? 50 : 75;
              const lineTotalWidth = imagesToRenderCount * lineSpacing;
              target = { 
                x: i * lineSpacing - lineTotalWidth / 2 + (parallaxValue * 0.5), 
                y: isMobileView ? 150 : 0, 
                rotation: 0, 
                scale: 1, 
                opacity: 1 
              };
            } else {
              const minDimension = Math.min(containerSize.width, containerSize.height);
              const circleRadius = isMobileView ? minDimension * 0.45 : minDimension * 0.45;
              const angleOffset = (i / imagesToRenderCount) * 360 + rotateValue;
              const rad = (angleOffset * Math.PI) / 180;
              const pulse = Math.sin((angleOffset * Math.PI) / 180) * 0.08 + 1.1;

              target = {
                x: Math.cos(rad) * circleRadius + (parallaxValue * 0.3),
                y: Math.sin(rad) * circleRadius,
                rotation: angleOffset + 90,
                scale: pulse,
                opacity: 1.0, 
              };
            }

            return (
              <FlipCard
                key={`${i}-${isMobileView}`}
                src={src}
                index={i}
                total={imagesToRenderCount}
                phase={introPhase}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
