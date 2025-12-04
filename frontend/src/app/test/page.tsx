"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import Silk from "@/components/effects/Silk";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Cinematic sequence: Start immediately
    setIsVisible(true);
    controls.start("visible");
  }, [controls]);

  // Cinematic container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  // Image cinematic entrance - MORE DRAMATIC
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      x: -150,
      filter: "blur(30px)",
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
      rotateY: 0,
      transition: {
        duration: 1.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.2,
      },
    },
  };

  // Title cinematic reveal - MORE DRAMATIC
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.7,
      filter: "blur(20px)",
      x: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.8,
      },
    },
  };

  // Subtitle cinematic reveal - MORE DRAMATIC
  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(15px)",
      x: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 1.2,
      },
    },
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8"
      style={{
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
      }}
    >
      {/* Silk Background - Luxury Gold Colors with Light Sky Blue Transition */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Silk 
          speed={5}
          scale={1}
          color={theme === "dark" ? "#C6A667" : "#E1C07A"}
          color2="#87CEEB"
          noiseIntensity={theme === "dark" ? 1.5 : 1.2}
          rotation={0}
        />
      </motion.div>
      
      {/* Content Container - Image and Text Side by Side */}
      <motion.div
        className="relative z-20 w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Hero Image - Cinematic Entrance */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          variants={imageVariants}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={theme === "dark" ? "/dark_hero.png" : "/light_hero.png"}
              alt="Hero"
              width={500}
              height={800}
              className="w-auto h-auto max-w-full object-contain drop-shadow-2xl"
              priority
              style={{
                maxHeight: "clamp(70vh, 85vh, 90vh)",
                filter: theme === "dark"
                  ? "drop-shadow(0 20px 60px rgba(212, 175, 55, 0.3))"
                  : "drop-shadow(0 20px 60px rgba(147, 123, 66, 0.2))",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Luxury Welcome Text - Right of Image */}
        <motion.div
          className="relative z-20 flex flex-col justify-center text-left md:text-left"
        >
          <motion.h1
            className="font-serif font-bold mb-4 sm:mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              background: theme === "dark"
                ? "linear-gradient(135deg, #FFFFFF 0%, #D4AF37 30%, #FFFFFF 60%, #87CEEB 100%)"
                : "linear-gradient(135deg, #000000 0%, #937B42 30%, #000000 60%, #4A90E2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 8s ease infinite",
            }}
            variants={titleVariants}
          >
            Welcome
          </motion.h1>
          
          <motion.p
            className="font-sans font-light leading-relaxed max-w-md"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              lineHeight: "1.7",
              color: theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.75)",
              letterSpacing: "0.02em",
            }}
            variants={subtitleVariants}
          >
            Crafting digital excellence with precision and elegance
          </motion.p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
