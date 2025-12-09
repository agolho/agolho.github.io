"use client";

import { useEffect, useRef } from "react";

export default function CoinRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let coins: Coin[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        class Coin {
            x: number;
            y: number;
            vy: number;
            vx: number;
            radius: number;
            color: string;
            bounceCount: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = -50 - Math.random() * 500; // Start above screen
                this.vy = Math.random() * 5 + 5; // Fast falling
                this.vx = Math.random() * 2 - 1; // Slight drift
                this.radius = Math.random() * 10 + 10;
                this.color = Math.random() > 0.5 ? "#FFD700" : "#FFA500"; // Gold or Orange
                this.bounceCount = 0;
            }

            update() {
                this.y += this.vy;
                this.x += this.vx;

                // Gravity effect on velocity
                this.vy += 0.2;

                // Bounce off bottom
                if (this.y + this.radius > canvas!.height) {
                    this.y = canvas!.height - this.radius;
                    this.vy *= -0.5; // Lose energy
                    this.bounceCount++;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.strokeStyle = "#DAA520";
                ctx.lineWidth = 2;
                ctx.stroke();

                // Shine effect
                ctx.beginPath();
                ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.fill();
            }
        }

        // Create initial batch
        for (let i = 0; i < 100; i++) {
            coins.push(new Coin());
        }

        // Spawner
        const spawnInterval = setInterval(() => {
            if (coins.length < 300) {
                coins.push(new Coin());
            }
        }, 50);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            coins.forEach((coin, index) => {
                coin.update();
                coin.draw();

                // Remove if stopped bouncing or off screen
                if (coin.y > canvas.height + 100 || (Math.abs(coin.vy) < 0.5 && coin.y >= canvas.height - coin.radius - 1)) {
                    // Slowly drift them out? Or just keep piling?
                    // For now let's keep them there or remove them to save perf
                    // Let's remove them if they stop moving to avoid overcrowding
                    if (Math.abs(coin.vy) < 0.1) {
                        // Maybe fade out logic later
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
            clearInterval(spawnInterval);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
