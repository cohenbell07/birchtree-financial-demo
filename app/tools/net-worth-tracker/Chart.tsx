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
        <CartesianGrid strokeDasharray="3 3" stroke="#1B2A3D" opacity={0.2} />
        <XAxis
          dataKey="month"
          stroke="#0B1A2C"
          tick={{ fontSize: 10 }}
          label={{ value: "Month", position: "insideBottom", offset: -5, style: { fontSize: 10 } }}
        />
        <YAxis
          stroke="#0B1A2C"
          tick={{ fontSize: 10 }}
          label={{ value: "Debt ($)", angle: -90, position: "insideLeft", style: { fontSize: 10 } }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(label) => `Month ${label}`}
          contentStyle={{ backgroundColor: "#F5F7FA", border: "1px solid #1B2A3D", fontSize: "12px" }}
        />
        <Bar dataKey="debt" fill="#1B2A3D" name="Remaining Debt" />
      </BarChart>
    </ResponsiveContainer>
  )
}
