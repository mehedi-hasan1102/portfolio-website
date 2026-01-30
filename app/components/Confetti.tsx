// Creative confetti for Awwwards award
import { useEffect, useRef } from "react";
export function Confetti({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;
    const colors = ["#FEC601", "#06B6D4", "#fff", "#FF6A00", "#0668E1"];
    const confetti = Array.from({ length: 32 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      r: 6 + Math.random() * 10,
      d: 8 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.d);
        ctx.stroke();
      });
      update();
      animationFrameId = requestAnimationFrame(draw);
    }
    function update() {
      confetti.forEach(c => {
        c.y += (Math.cos(c.d) + 3 + c.d / 2) / 2;
        c.x += Math.sin(0.01 * c.d);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > window.innerHeight) {
          c.x = Math.random() * window.innerWidth;
          c.y = -10;
        }
      });
    }
    draw();
    window.addEventListener("resize", resize);
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 1 }} />;
}