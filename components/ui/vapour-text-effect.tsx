"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, useCallback, memo } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  colors?: string[];
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
  trigger?: any;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

export default function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font = {
    fontFamily: "'Pinyon Script', 'Edwardian Script ITC', cursive",
    fontSize: "72px",
    fontWeight: 400,
  },
  colors = ["#dc2626", "#f59e0b", "#fcd34d"],
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1.5,
    waitDuration: 10, 
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
  trigger = 0,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const isInView = useIsInView(wrapperRef as React.RefObject<HTMLElement>);
  
  // Memoize stable versions of props to prevent infinite update loops
  const memoTexts = useMemo(() => texts, [JSON.stringify(texts)]);
  const memoFont = useMemo(() => font, [JSON.stringify(font)]);
  const memoColors = useMemo(() => colors, [JSON.stringify(colors)]);

  const stateRef = useRef(animationState);
  useEffect(() => { stateRef.current = animationState; }, [animationState]);

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") return Math.min(window.devicePixelRatio || 1, 2);
    return 1;
  }, []);

  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1.5) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 10) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const fontConfig = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const baseSize = parseInt(memoFont.fontSize?.replace("px", "") || "72");
    // Dynamic resizing for mobile screens
    const fontSize = isMobile ? Math.min(baseSize, 32) : baseSize;
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
    return {
      fontSize,
      MULTIPLIED_VAPORIZE_SPREAD: VAPORIZE_SPREAD * spread,
      font: `${memoFont.fontWeight ?? 400} ${fontSize * globalDpr}px ${memoFont.fontFamily}`,
    };
  }, [memoFont.fontSize, memoFont.fontWeight, memoFont.fontFamily, spread, globalDpr]);

  // Sync canvas size explicitly
  useEffect(() => {
    if (canvasRef.current && wrapperSize.width > 0) {
      canvasRef.current.width = Math.floor(wrapperSize.width * globalDpr);
      canvasRef.current.height = Math.floor(wrapperSize.height * globalDpr);
    }
  }, [wrapperSize, globalDpr]);

  // Update effect for manual trigger
  useEffect(() => {
    if (trigger > 0 && (stateRef.current === "waiting" || stateRef.current === "static")) {
        setAnimationState("vaporizing");
        vaporizeProgressRef.current = 0;
        if (canvasRef.current && wrapperSize.width > 10) {
          prepareParticles({ framerProps: { texts: memoTexts, font: memoFont, colors: memoColors, alignment }, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, fontConfig });
        }
    }
  }, [trigger, wrapperSize.width]);

  // Initial Draw & Font Sync
  useEffect(() => {
    let active = true;
    const init = async () => {
        if (typeof document !== "undefined") {
            await document.fonts.ready;
        }
        if (active) {
            setAnimationState("waiting");
            // Only draw if we have meaningful dimensions to avoid stretched/huge text
            if (canvasRef.current && wrapperSize.width > 50) {
                 const canvas = canvasRef.current;
                 const ctx = canvas.getContext("2d");
                 if (ctx) drawSharpText(ctx, memoTexts[currentTextIndex], { font: memoFont, colors: memoColors, alignment, fontConfig }, canvas, globalDpr);
            }
        }
    };
    init();
    return () => { active = false; };
  }, [wrapperSize.width, globalDpr, fontConfig.fontSize, memoFont, memoTexts, currentTextIndex, memoColors, alignment, fontConfig]);

  useEffect(() => {
    if (!isInView || wrapperSize.width < 50) return;
    let lastTime = performance.now();
    let frameId: number;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: true });
      if (!canvas || !ctx) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (stateRef.current) {
        case "static":
        case "waiting":
          drawSharpText(ctx, memoTexts[currentTextIndex], { font: memoFont, colors: memoColors, alignment, fontConfig }, canvas, globalDpr);
          break;
          
        case "vaporizing":
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);
          let boundaries = (canvas as any).textBoundaries;
          if (!boundaries) {
            drawSharpText(ctx, memoTexts[currentTextIndex], { font: memoFont, colors: memoColors, alignment, fontConfig }, canvas, globalDpr);
            boundaries = (canvas as any).textBoundaries;
          }
          
          if (boundaries) {
            const progress = Math.min(100, vaporizeProgressRef.current);
            const vaporizeX = direction === "left-to-right" 
               ? boundaries.left + boundaries.width * progress / 100
               : boundaries.right - boundaries.width * progress / 100;
            
            updateParticles(
              particlesRef.current, vaporizeX, deltaTime, fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
              animationDurations.VAPORIZE_DURATION, direction, transformedDensity
            );
          }
          
          renderParticles(ctx, particlesRef.current, globalDpr);
          
          if (vaporizeProgressRef.current >= 100) {
            setCurrentTextIndex(prev => {
              const count = memoTexts.length;
              if (count <= 1) return prev;
              let next = prev;
              while (next === prev) next = Math.floor(Math.random() * count);
              return next;
            });
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
          break;
          
        case "fadingIn":
          fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;
          const alpha = Math.min(fadeOpacityRef.current, 1);
          
          ctx.save();
          ctx.globalAlpha = alpha;
          drawSharpText(ctx, memoTexts[currentTextIndex], { font: memoFont, colors: memoColors, alignment, fontConfig }, canvas, globalDpr);
          ctx.restore();
          
          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(() => {
                if (stateRef.current === "waiting") {
                    setAnimationState("vaporizing");
                    vaporizeProgressRef.current = 0;
                    if (canvasRef.current && wrapperSize.width > 50) {
                        prepareParticles({ framerProps: { texts: memoTexts, font: memoFont, colors: memoColors, alignment }, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, fontConfig });
                    }
                }
            }, animationDurations.WAIT_DURATION);
          }
          break;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, direction, globalDpr, fontConfig, animationDurations, transformedDensity, currentTextIndex, wrapperSize.width, alignment, memoFont, memoTexts, memoColors]);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        if (width > 0 && height > 0) {
            setWrapperSize({ width, height });
        }
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", pointerEvents: "none", visibility: wrapperSize.width > 50 ? "visible" : "hidden" }} />
      <SeoElement tag={tag} texts={memoTexts} />
    </div>
  );
}

// Helpers
const SeoElement = memo(({ tag = Tag.P, texts }: any) => {
  const style = { position: "absolute" as const, width: "0", height: "0", overflow: "hidden", userSelect: "none" as const, pointerEvents: "none" as const };
  return createElement(tag, { style }, texts.join(" "));
});

const drawSharpText = (ctx: CanvasRenderingContext2D, text: string, props: any, canvas: HTMLCanvasElement, globalDpr: number) => {
    const { colors, alignment, fontConfig } = props;
    const fontSize = fontConfig.fontSize;
    
    if (canvas.width === 0 || canvas.height === 0) return;

    ctx.font = `${props.font.fontWeight ?? 400} ${fontSize * globalDpr}px ${props.font.fontFamily}`;
    ctx.textAlign = alignment;
    ctx.textBaseline = "middle";
    
    // Safety check on wrapping width to avoid massive un-wrapped text
    const maxWidth = Math.max(100, canvas.width * 0.9);
    const lines = wrapText(ctx, text, maxWidth);
    const lineHeight = fontSize * 1.25 * globalDpr;
    const totalHeight = lines.length * lineHeight;
    let startY = canvas.height / 2 - totalHeight / 2 + lineHeight / 2;

    let minX = canvas.width, maxX = 0;

    ctx.save();
    ctx.shadowColor = "rgba(220, 38, 38, 0.2)";
    ctx.shadowBlur = 10 * globalDpr;

    lines.forEach((line, i) => {
      const x = alignment === "center" ? canvas.width/2 : (alignment === "left" ? 40 : canvas.width - 40);
      const metrics = ctx.measureText(line);
      const l = alignment === "center" ? x - metrics.width/2 : (alignment === "left" ? x : x - metrics.width);
      minX = Math.min(minX, l);
      maxX = Math.max(maxX, l + metrics.width);
      
      const gradient = ctx.createLinearGradient(l, 0, l + metrics.width, 0);
      colors.forEach((c: string, idx: number) => {
        gradient.addColorStop(idx / (colors.length - 1), c);
      });
      ctx.fillStyle = gradient;
      ctx.fillText(line, x, startY + i * lineHeight);
    });
    ctx.restore();

    (canvas as any).textBoundaries = { left: minX, right: maxX, width: maxX - minX };
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

const prepareParticles = ({ framerProps, canvasRef, wrapperSize, particlesRef, globalDpr, currentTextIndex, fontConfig }: any) => {
  const canvas = canvasRef.current; if (!canvas || !wrapperSize.width) return;
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  
  canvas.width = Math.floor(wrapperSize.width * globalDpr);
  canvas.height = Math.floor(wrapperSize.height * globalDpr);
  
  drawSharpText(ctx, framerProps.texts[currentTextIndex], { ...framerProps, fontConfig }, canvas, globalDpr);
  
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const sample = Math.max(2, Math.round(globalDpr * 1.15)); 
  const parts: any[] = [];
  
  for(let y=0; y<canvas.height; y+=sample) {
    for(let x=0; x<canvas.width; x+=sample) {
      const i = (y*canvas.width + x)*4;
      if(data[i+3] > 15) {
        const a = data[i+3]/255;
        parts.push({ 
            x, y, originalX: x, originalY: y, 
            color: `rgba(${data[i]},${data[i+1]},${data[i+2]},${a})`, 
            opacity: a, originalAlpha: a, velocityX: 0, velocityY: 0, angle: 0, speed: 0 
        });
      }
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesRef.current = parts;
};

const updateParticles = (particles: any[], vaporizeX: number, deltaTime: number, spread: number, duration: number, direction: string, density: number) => {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const dxFromBound = direction === "left-to-right" ? vaporizeX - p.originalX : p.originalX - vaporizeX;
    const isVaporized = dxFromBound > 0;
    
    if(isVaporized) {
      if(p.speed === 0) {
        p.angle = Math.random()*Math.PI*2; p.speed = (Math.random()*1+1.5)*spread;
        p.velocityX = Math.cos(p.angle)*p.speed; p.velocityY = Math.sin(p.angle)*p.speed;
        p.shouldFadeQuickly = Math.random() > density;
      }
      if(p.shouldFadeQuickly) {
        p.opacity = Math.max(0, p.opacity - deltaTime * 1.8);
      } else {
        const dx = p.originalX - p.x, dy = p.originalY - p.y;
        const damp = 0.93;
        p.velocityX = (p.velocityX + (Math.random()-0.5)*spread*6 + dx*0.006)*damp;
        p.velocityY = (p.velocityY + (Math.random()-0.5)*spread*6 + dy*0.006)*damp;
        p.x += p.velocityX*deltaTime*30; p.y += p.velocityY*deltaTime*20;
        p.opacity = Math.max(0, p.opacity - deltaTime*(0.45*(2000/duration)));
      }
    }
  }
};

const renderParticles = (ctx: any, particles: any[], dpr: any) => {
  ctx.save(); ctx.scale(dpr, dpr);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if(p.opacity > 0.05) {
      ctx.fillStyle = p.color.replace(/[\d.]+\)$/, p.opacity.toFixed(3) + ")");
      ctx.fillRect(p.x/dpr, p.y/dpr, 1.3, 1.3);
    }
  }
  ctx.restore();
};

const calculateVaporizeSpread = (s: number) => {
  const pts = [{s:20,v:0.2},{s:50,v:0.5},{s:100,v:1.5}];
  if(s<=pts[0].s) return pts[0].v; if(s>=pts[2].s) return pts[2].v;
  let i = 0; while(i<1 && pts[i+1].s < s) i++;
  return pts[i].v + (s-pts[i].s)*(pts[i+1].v-pts[i].v)/(pts[i+1].s-pts[i].s);
};

const transformValue = (v: number, iR: number[], oR: number[], c = false) => {
  const p = (v-iR[0])/(iR[1]-iR[0]); let r = oR[0] + p*(oR[1]-oR[0]);
  if(c) r = oR[1]>oR[0] ? Math.min(Math.max(r,oR[0]),oR[1]) : Math.min(Math.max(r,oR[1]),oR[0]);
  return r;
};

const useIsInView = (ref: any) => {
  const [v, setV] = useState(false);
  useEffect(() => {
    if(!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0, rootMargin: '50px' });
    obs.observe(ref.current); return () => obs.disconnect();
  }, [ref]);
  return v;
};
