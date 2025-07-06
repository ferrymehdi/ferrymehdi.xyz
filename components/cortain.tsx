"use client";
import { useState, useEffect } from "react";
import { setTimeout } from "timers";

interface CurtainProps {
  children: React.ReactNode;
}

export function Curtain({ children }: CurtainProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [animationComplet, setAnimationComplet] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(false);
    }, 500);
    setTimeout(() => {
      setAnimationComplet(true);
    }, 1400);
  }, []);

  return (
    <div
      className={
        animationComplet ? "" : "relative w-full h-screen overflow-hidden"
      }
    >
      <div
        style={{
          backgroundColor: animationComplet ? "transparent" : "#1c1c1c",
          animation: isMounted
            ? "none"
            : "curtainAnimationFromBottomToTop 1s ease-in-out",
        }}
        className={
          animationComplet
            ? "hidden"
            : "absolute top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center"
        }
      >
        <div className="opacity-5 select-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
          {[1, 2, 3].map((i) => {
            return (
              <h1
                key={i}
                style={{
                  fontSize: "15.625rem",
                  color: "#1c1c1c",
                  whiteSpace: "nowrap",
                  fontFamily: "OPTIEinstein Black,serif",
                  textShadow:
                    "-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff",
                  lineHeight: "0.9",
                }}
              >
                Ferry M. Portfolio Ferry M. Portfolio
              </h1>
            );
          })}
        </div>
        {/* Main content - positioned bottom right */}
        <div className="absolute bottom-8 right-8 text-white text-right">
          <h2 className="text-lg mb-2">Portfolio</h2>
          <h1
            style={{
              animation: "fadeIn 0.4s ease-in-out",
              fontFamily: "OPTIEinstein Black,serif",
              color: "#1c1c1c",
              textShadow:
                "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
            }}
            className="text-5xl lg:text-7xl "
          >
            Ferry M.
          </h1>
        </div>

        <style jsx>{`
          @keyframes curtainAnimationFromBottomToTop {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-100%);
            }
          }
        `}</style>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
