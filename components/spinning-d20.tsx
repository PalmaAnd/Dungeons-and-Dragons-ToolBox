/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";

const SpinningD20 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let rotation = 0;

        // Create 4 dice with random positions
        const dice = Array(4)
            .fill()
            .map(() => ({
                x: Math.random() * 0.8 + 0.1, // Keep dice away from extreme edges (10%-90% of screen)
                y: Math.random() * 0.8 + 0.1,
                size: Math.random() * 0.04 + 0.08, // Size between 8-12% of screen
                rotationSpeed:
                    (Math.random() * 0.001 + 0.001) *
                    (Math.random() > 0.5 ? 1 : -1), // Random speed and direction
                rotationOffset: Math.random() * Math.PI * 2, // Random starting rotation
            }));

        // Resize handler for responsive canvas
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        // Function to draw an accurate D20 (icosahedron)
        const drawD20 = (ctx, x, y, size, rotation, themeClass) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            // Set colors based on theme
            const strokeColor = themeClass.includes("dark")
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)";

            // Define the key points of the D20 shape
            const top = { x: 0, y: -size };
            const bottom = { x: 0, y: size };
            const midTop = { x: 0, y: -size * 0.33 };
            const midBottom = { x: 0, y: size * 0.33 };

            const leftUpper = { x: -size * 0.87, y: -size * 0.33 };
            const leftLower = { x: -size * 0.87, y: size * 0.33 };
            const rightUpper = { x: size * 0.87, y: -size * 0.33 };
            const rightLower = { x: size * 0.87, y: size * 0.33 };

            // Draw the D20 outline - just the lines, keeping it simple
            ctx.lineWidth = size / 30;
            ctx.strokeStyle = strokeColor;

            // Draw outer hexagon
            ctx.beginPath();
            ctx.moveTo(leftUpper.x, leftUpper.y);
            ctx.lineTo(leftLower.x, leftLower.y);
            ctx.lineTo(bottom.x, bottom.y);
            ctx.lineTo(rightLower.x, rightLower.y);
            ctx.lineTo(rightUpper.x, rightUpper.y);
            ctx.lineTo(top.x, top.y);
            ctx.closePath();
            ctx.stroke();

            // Draw middle horizontal line
            ctx.beginPath();
            ctx.moveTo(leftUpper.x, leftUpper.y);
            ctx.lineTo(rightUpper.x, rightUpper.y);
            ctx.stroke();

            // Draw from top to middle points
            ctx.beginPath();
            ctx.moveTo(top.x, top.y);
            ctx.lineTo(midTop.x, midTop.y);
            ctx.stroke();

            // Draw from bottom to middle points
            ctx.beginPath();
            ctx.moveTo(bottom.x, bottom.y);
            ctx.lineTo(midBottom.x, midBottom.y);
            ctx.stroke();

            // Draw middle vertical line
            ctx.beginPath();
            ctx.moveTo(midTop.x, midTop.y);
            ctx.lineTo(midBottom.x, midBottom.y);
            ctx.stroke();

            // Draw diagonal lines from middle to left and right
            ctx.beginPath();
            ctx.moveTo(midTop.x, midTop.y);
            ctx.lineTo(leftUpper.x, leftUpper.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(midTop.x, midTop.y);
            ctx.lineTo(rightUpper.x, rightUpper.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(midBottom.x, midBottom.y);
            ctx.lineTo(leftLower.x, leftLower.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(midBottom.x, midBottom.y);
            ctx.lineTo(rightLower.x, rightLower.y);
            ctx.stroke();

            ctx.restore();
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Get current theme
            const isDarkTheme =
                document.documentElement.classList.contains("dark");
            const themeClass = isDarkTheme ? "dark" : "light";

            // Draw all dice
            dice.forEach((die) => {
                const diceX = canvas.width * die.x;
                const diceY = canvas.height * die.y;
                const diceSize =
                    Math.min(canvas.width, canvas.height) * die.size;
                const diceRotation =
                    rotation * die.rotationSpeed + die.rotationOffset;

                drawD20(ctx, diceX, diceY, diceSize, diceRotation, themeClass);
            });

            // Faster rotation speed
            rotation += 0.01;
            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
};

export default SpinningD20;
