"use client";
import React, { useState, useEffect } from "react";

const AnimatedText = ({
  text,
  delay = 50,
  restartDelay = 3000,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]); // Resets on text change

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // Restart animation after `restartDelay`
      const restartTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, restartDelay);

      return () => clearTimeout(restartTimeout);
    }
  }, [index, text, delay, restartDelay]);

  return (
    <span
      className={`text-2xl font-family: 'Playfair Display',serif  md:text-4xl font-bold text-red-500 ${className}`}
    >
      {displayedText}
    </span>
  );
};

export default AnimatedText;
