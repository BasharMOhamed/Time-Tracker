"use client";
import React, { useRef } from "react";

const RemainingCard = ({ isRunning }: { isRunning: boolean }) => {
  const [remainingTime, setRemainingTime] = React.useState(108000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);
  return (
    <div className="bg-[#2e4e71] border border-gray-200 shadow-md rounded-2xl px-8 py-6 flex flex-col items-center justify-between font-sans max-w-xs w-full mx-auto">
      <span className="text-white text-base font-medium mb-2 tracking-wide">
        Remaining Time
      </span>
      <span className="text-4xl md:text-5xl font-mono font-bold text-white tracking-widest mb-1">
        {formatTime(remainingTime)}
      </span>
      <span className="text-sm text-blue-100 mt-2">
        {isRunning ? "Counting down..." : "Paused"}
      </span>
    </div>
  );
};

export default RemainingCard;
