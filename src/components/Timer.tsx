"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

const Timer = () => {
  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM d");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to HH:MM:SS
  const formatTime = (s: number) => {
    const hrs = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Start timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="bg-[#2e4e71] shadow-md p-6 rounded-lg text-center w-full max-w-md min-w-sm mx-auto">
      <h4 className="text-xl text-muted-foreground font-semibold mb-4">
        {formattedDate}
      </h4>
      <div className="text-5xl text-white font-mono my-8">
        {formatTime(seconds)}
      </div>

      {!isRunning ? (
        <button
          onClick={startTimer}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded w-full hover:bg-blue-800 transition-colors"
        >
          Start
        </button>
      ) : (
        <button
          onClick={pauseTimer}
          className="bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded w-full hover:bg-yellow-600 transition-colors"
        >
          Pause
        </button>
      )}
    </div>
  );
};

export default Timer;
