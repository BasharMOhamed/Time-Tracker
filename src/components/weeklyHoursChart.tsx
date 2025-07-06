"use client";
import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export const data = [
  { name: "Mon", hours: 8 },
  { name: "Tue", hours: 7 },
  { name: "Wed", hours: 9 },
  { name: "Thu", hours: 10 },
  { name: "Fri", hours: 6 },
  { name: "Sat", hours: 5 },
  { name: "Sun", hours: 7 },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
          barSize={32}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 18,
              fill: "#64748b",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 16,
              fill: "#64748b",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            width={30}
            domain={[0, 12]}
            ticks={[0, 2, 4, 6, 8, 10, 12]}
          />
          <Bar dataKey="hours" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
