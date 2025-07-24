import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 8 + 2,
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * -1 - 0.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((bubble) => {
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.fill();
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none"
      }}
    />
  );
}
