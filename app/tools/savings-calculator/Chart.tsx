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
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,26,44,0.1)" />
        <XAxis
          dataKey="year"
          stroke="rgba(11,26,44,0.55)"
          tick={{ fontSize: 10, fill: "rgba(11,26,44,0.55)" }}
          label={{
            value: "Year",
            position: "insideBottom",
            offset: -5,
            style: { fontSize: 10, fill: "rgba(11,26,44,0.55)" },
          }}
        />
        <YAxis
          stroke="rgba(11,26,44,0.55)"
          tick={{ fontSize: 10, fill: "rgba(11,26,44,0.55)" }}
          label={{ value: "Amount ($)", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "rgba(11,26,44,0.55)" } }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(label) => `Year: ${label}`}
          contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(11,26,44,0.1)", borderRadius: 12, fontSize: "12px", boxShadow: "0 18px 40px rgba(11,26,44,0.09)" }}
          labelStyle={{ color: "#0B1A2C" }}
          itemStyle={{ color: "#0B1A2C" }}
        />
        <Legend wrapperStyle={{ fontSize: "12px", color: "#0B1A2C" }} />
        <Line
          type="monotone"
          dataKey="savings"
          stroke="#0B1A2C"
          strokeWidth={2}
          dot={{ fill: "#0B1A2C", r: 3 }}
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
