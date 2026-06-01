"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartPoint {
  month: number
  debt: number
}

export default function Chart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] md:h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(11,26,44,0.1)" />
        <XAxis
          dataKey="month"
          stroke="rgba(11,26,44,0.55)"
          tick={{ fontSize: 10, fill: "rgba(11,26,44,0.55)" }}
          label={{ value: "Month", position: "insideBottom", offset: -5, style: { fontSize: 10, fill: "rgba(11,26,44,0.55)" } }}
        />
        <YAxis
          stroke="rgba(11,26,44,0.55)"
          tick={{ fontSize: 10, fill: "rgba(11,26,44,0.55)" }}
          label={{ value: "Debt ($)", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "rgba(11,26,44,0.55)" } }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(label) => `Month ${label}`}
          contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(11,26,44,0.1)", borderRadius: 12, fontSize: "12px", boxShadow: "0 18px 40px rgba(11,26,44,0.09)" }}
          labelStyle={{ color: "#0B1A2C" }}
          itemStyle={{ color: "#0B1A2C" }}
          cursor={{ fill: "rgba(11,26,44,0.04)" }}
        />
        <Bar dataKey="debt" fill="#0B1A2C" name="Remaining Debt" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
