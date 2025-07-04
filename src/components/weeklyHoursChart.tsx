"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  //   CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Saturday",
    hours: 4,
  },
  {
    name: "Sunday",
    hours: 4,
  },
  {
    name: "Monday",
    hours: 0,
  },
  {
    name: "Tuesday",
    hours: 5,
  },
  {
    name: "Wednesday",
    hours: 12,
  },
  {
    name: "Thursday",
    hours: 7,
  },
  {
    name: "Friday",
    hours: 2,
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={35}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 25, right: 25 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Bar dataKey="hours" fill="blue" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
