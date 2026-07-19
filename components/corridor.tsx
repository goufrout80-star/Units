"use client";

import { Move3d } from "lucide-react";
import { useEffect, useRef } from "react";

const colors = ["#ad4cf0", "#ff5700", "#ffbd00", "#00b147", "#0879ea", "#ef3340"];

export function Corridor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = canvas.getBoundingClientRect();
      canvas.width = bounds.width * ratio;
      canvas.height = bounds.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pointer = pointerRef.current;
      pointer.x += (pointer.tx - pointer.x) * 0.065;
      pointer.y += (pointer.ty - pointer.y) * 0.065;
      const centerX = width * (0.5 + pointer.x * 0.035);
      const centerY = height * (0.5 + pointer.y * 0.035);
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f5ece5";
      context.fillRect(0, 0, width, height);

      const rings = 8;
      const points: { left: number; top: number; right: number; bottom: number }[] = [];
      for (let index = 0; index < rings; index += 1) {
        const progress = index / (rings - 1);
        const eased = Math.pow(progress, 1.7);
        points.push({
          left: centerX - 52 - eased * (centerX - 52),
          right: centerX + 52 + eased * (width - centerX - 52),
          top: centerY - 70 - eased * (centerY - 70),
          bottom: centerY + 70 + eased * (height - centerY - 70),
        });
      }

      for (let index = rings - 1; index > 0; index -= 1) {
        const outer = points[index];
        const inner = points[index - 1];
        const pulse = (Math.sin(time * 0.0012 + index * 1.7) + 1) / 2;
        const colorIndex = (index + Math.floor(time / 1500)) % colors.length;
        if (index % 2 === 0) {
          context.fillStyle = colors[colorIndex];
          context.globalAlpha = 0.85 + pulse * 0.15;
          context.beginPath();
          context.moveTo(outer.left, outer.top);
          context.lineTo(outer.right, outer.top);
          context.lineTo(inner.right, inner.top);
          context.lineTo(inner.left, inner.top);
          context.closePath();
          context.fill();
        }
        if (index === 7 || index === 4 || index === 2) {
          context.fillStyle = colors[(colorIndex + 3) % colors.length];
          context.beginPath();
          context.moveTo(outer.left, outer.top);
          context.lineTo(inner.left, inner.top);
          context.lineTo(inner.left, inner.bottom);
          context.lineTo(outer.left, outer.bottom);
          context.closePath();
          context.fill();
        }
      }
      context.globalAlpha = 1;
      context.strokeStyle = "#0a0a0a";
      context.lineWidth = 1.25;
      points.forEach((point) => context.strokeRect(point.left, point.top, point.right - point.left, point.bottom - point.top));
      const outer = points[points.length - 1];
      const inner = points[0];
      [
        [outer.left, outer.top, inner.left, inner.top], [outer.right, outer.top, inner.right, inner.top],
        [outer.left, outer.bottom, inner.left, inner.bottom], [outer.right, outer.bottom, inner.right, inner.bottom],
        [width * 0.25, 0, centerX - 26, centerY - 70], [width * 0.75, 0, centerX + 26, centerY - 70],
        [0, height * 0.5, centerX - 52, centerY], [width, height * 0.5, centerX + 52, centerY],
      ].forEach(([x1, y1, x2, y2]) => { context.beginPath(); context.moveTo(x1, y1); context.lineTo(x2, y2); context.stroke(); });
      context.fillStyle = "#f5ece5";
      context.fillRect(inner.left, inner.top, inner.right - inner.left, inner.bottom - inner.top);
      context.strokeRect(inner.left, inner.top, inner.right - inner.left, inner.bottom - inner.top);
      frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frame = requestAnimationFrame(draw);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div
      className="corridor"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerRef.current.tx = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointerRef.current.ty = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      }}
      onPointerLeave={() => { pointerRef.current.tx = 0; pointerRef.current.ty = 0; }}
    >
      <canvas ref={canvasRef} />
      <div className="corridor-photo corridor-photo-one" />
      <div className="corridor-photo corridor-photo-two" />
      <div className="corridor-prompt"><Move3d /> Move to explore</div>
    </div>
  );
}
