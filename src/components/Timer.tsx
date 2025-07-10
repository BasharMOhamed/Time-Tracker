"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

const Timer = ({
  isRunning,
  setIsRunning,
}: {
  isRunning: boolean;
  setIsRunning: (v: boolean) => void;
}) => {
  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM d");
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    <div
      className="bg-[#2e4e71] shadow-md p-6 rounded-2xl text-center w-full max-w-md mx-auto font-sans border border-gray-200"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <h4 className="text-lg text-white font-normal mb-6 text-left">
        {formattedDate}
      </h4>
      <div className="text-5xl text-white font-mono font-bold my-10 tracking-widest">
        {formatTime(seconds)}
      </div>
      <button
        onClick={isRunning ? pauseTimer : startTimer}
        className={`${
          isRunning ? "bg-yellow-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white text-xl font-medium rounded-xl w-full py-4 mt-6 transition-colors hover:bg-blue-700 focus:outline-none`}
        style={{ boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)" }}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default Timer;
