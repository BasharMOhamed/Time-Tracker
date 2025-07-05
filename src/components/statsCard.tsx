import React from "react";

const StatsCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 font-sans">
      <h2 className="text-2xl font-normal mb-1 text-gray-900">{title}</h2>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
};

export default StatsCard;
