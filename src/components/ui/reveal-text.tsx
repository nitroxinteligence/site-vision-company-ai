"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const MinimalistTextEffect = ({
    text,
    duration,
}: {
    text: string;
    duration?: number;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [ripplePosition, setRipplePosition] = useState({ cx: "50%", cy: "50%" });


    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;

            setRipplePosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    // Linear gradient from white to black
    const gradientStops = [
        <stop key="0" offset="0%" stopColor="#ffffff" />,    // White
        <stop key="1" offset="100%" stopColor="#000000" />   // Black
    ];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
            className="w-full h-full"
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 300 100"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                className="select-none"
                style={{ display: "block", margin: "0 auto" }}
            >
                <defs>
                    {/* Linear gradient from white to black */}
                    <linearGradient
                        id="linearGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientUnits="objectBoundingBox"
                    >
                        {gradientStops}
                    </linearGradient>

                    {/* Inverse ripple mask */}
                    <motion.radialGradient
                        id="inverseMask"
                        gradientUnits="userSpaceOnUse"
                        r="30%"
                        animate={ripplePosition}
                        transition={{
                            duration: duration ?? 0.4,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 150,
                            damping: 20
                        }}
                    >
                        <stop offset="0%" stopColor="black" />
                        <stop offset="80%" stopColor="white" />
                        <stop offset="100%" stopColor="white" />
                    </motion.radialGradient>

                    <mask id="revealMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#inverseMask)"
                        />
                    </mask>
                </defs>

                {/* Revealing filled text */}
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="url(#linearGradient)"
                    mask="url(#revealMask)"
                    className="font-sans font-semibold tracking-wider"
                    style={{ fontSize: 48 }}
                    animate={{
                        opacity: isHovered ? 1 : 0.1,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                    }}
                >
                    {text}
                </motion.text>
            </svg>
        </div>
    );
};