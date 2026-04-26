"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartPoint {
  year: number
  savings: number
  contributions: number
}

export default function Chart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1B2A3D" opacity={0.2} />
        <XAxis
          dataKey="year"
          stroke="#0B1A2C"
          tick={{ fontSize: 10 }}
          label={{
            value: "Year",
            position: "insideBottom",
            offset: -5,
            style: { fontSize: 10 },
          }}
        />
        <YAxis
          stroke="#0B1A2C"
          tick={{ fontSize: 10 }}
          label={{ value: "Amount ($)", angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(label) => `Year: ${label}`}
          contentStyle={{ backgroundColor: "#F5F7FA", border: "1px solid #1B2A3D", fontSize: "12px" }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#1B2A3D"
          strokeWidth={2}
          dot={{ fill: "#1B2A3D", r: 3 }}
          name="Total Savings"
        />
        <Line
          type="monotone"
          dataKey="contributions"
          stroke="#D7C38A"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="Your Contributions"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
