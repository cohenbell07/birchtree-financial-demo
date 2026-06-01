"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartPoint {
  year: number
  principal: number
  interest: number
  balance: number
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
          label={{ value: "Year", position: "insideBottom", offset: -5, style: { fontSize: 10, fill: "rgba(11,26,44,0.55)" } }}
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
        <Line type="monotone" dataKey="principal" stroke="#0B1A2C" strokeWidth={2} dot={false} name="Principal Paid" />
        <Line type="monotone" dataKey="interest" stroke="#C4B076" strokeWidth={2} dot={false} name="Interest Paid" />
        <Line type="monotone" dataKey="balance" stroke="#9AA7B4" strokeWidth={2} dot={false} name="Remaining Balance" />
      </LineChart>
    </ResponsiveContainer>
  )
}
