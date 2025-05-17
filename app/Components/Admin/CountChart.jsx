import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

function CountChart() {
  // Static values for now
  const totalCount = 100;
  const maleCount = 60;
  const femaleCount = 40;

  const malePercentage = Math.round((maleCount / totalCount) * 100);
  const femalePercentage = Math.round((femaleCount / totalCount) * 100);

  const data = [
    {
      name: "Total",
      count: totalCount,
      fill: "#8884d8", // optional
    },
    {
      name: "Male",
      count: maleCount,
      fill: "#00C49F",
    },
    {
      name: "Female",
      count: femaleCount,
      fill: "#FFBB28",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full">
      {/* CHART */}
      <div className="w-full h-[70%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="45%"
            cy="55%"
            innerRadius="40%"
            outerRadius="70%"
            barSize={10}
            data={data}
            startAngle={180}
            endAngle={-180}
          >
            <RadialBar minAngle={15} background dataKey="count" clockWise />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex gap-6 justify-center items-center -mt-8">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#00C49F] rounded-full" />
          <h1 className="font-bold">{maleCount}</h1>
          <h2 className="text-gray-400">Male ({malePercentage}%)</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-[#FFBB28] rounded-full" />
          <h1 className="font-bold">{femaleCount}</h1>
          <h2 className="text-gray-400">Female ({femalePercentage}%)</h2>
        </div>
      </div>
      <h1 className="text-md font-semibold text-center p-2">
        Users Distribution
      </h1>
    </div>
  );
}

export default CountChart;
