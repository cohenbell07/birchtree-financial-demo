"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartPoint {
  age: number
  savings: number
}

export default function Chart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] md:h-[300px]">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1B2A3D" opacity={0.2} />
        <XAxis
          dataKey="age"
          stroke="#0B1A2C"
          tick={{ fontSize: 10 }}
          label={{
            value: "Age",
            position: "insideBottom",
            offset: -5,
            style: { fontSize: 10 },
          }}
        />
        <YAxis
          stroke="#0B1A2C"
          tick={{ fontSize: 10 }}
          label={{ value: "Savings ($)", angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(label) => `Age: ${label}`}
          contentStyle={{ backgroundColor: "#F5F7FA", border: "1px solid #1B2A3D", fontSize: "12px" }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#1B2A3D"
          strokeWidth={2}
          dot={{ fill: "#1B2A3D", r: 3 }}
          name="Projected Savings"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
