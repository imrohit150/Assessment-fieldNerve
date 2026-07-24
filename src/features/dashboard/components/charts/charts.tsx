import { monthlyvalueMockData, vendorPerformanceTrendMockData } from '../../mock-data/monthly-purchase-value'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../../../../components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfigOne = {
  purchaseValue: {
    label: "Monthly Purchase Value",
    color: "#1d4ed8",
  },
} satisfies ChartConfig

const chartConfigTwo = {
  purchaseValue: {
    label: "Vendor Performance Trend",
    color: "#1d4ed8",
  },
} satisfies ChartConfig

const Charts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-2xl p-4">
        <ChartContainer config={chartConfigOne} className="h-[300px] w-full">
          <BarChart data={monthlyvalueMockData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />
            <Bar
              dataKey="value"
              fill="var(--color-purchaseValue)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="border rounded-2xl p-4" >
        <ChartContainer config={chartConfigTwo} className="h-[300px] w-full">
          <BarChart data={vendorPerformanceTrendMockData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />
            <Bar
              dataKey="value"
              fill="var(--color-purchaseValue)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

export default Charts

