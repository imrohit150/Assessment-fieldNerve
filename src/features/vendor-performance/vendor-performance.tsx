import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../../components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

type TrendPoint = {
  month: string;
  value: number;
};

const chartConfigOne = {
  purchaseValue: {
    label: "Vendor Performance Trend",
    color: "#1d4ed8",
  },
} satisfies ChartConfig;

const vendorPerformanceTrendMockData: TrendPoint[] = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 75 },
  { month: 'Mar', value: 77 },
  { month: 'Apr', value: 74 },
  { month: 'May', value: 79 },
  { month: 'Jun', value: 81 },
  { month: 'Jul', value: 83 },
  { month: 'Aug', value: 82 },
  { month: 'Sep', value: 84 },
  { month: 'Oct', value: 86 },
  { month: 'Nov', value: 85 },
  { month: 'Dec', value: 88 },
];

type VendorSummary = {
  id: number;
  vendorName: string;
  vendorCode: string;
  category: string;
  contactPerson: string;
  city: string;
  rating: number;
  status: string;
  lastTransaction: string;
  totalPurchaseValue: number;
};

type LocationState = {
  vendor?: VendorSummary;
};

const performanceData = {
  qualityScore: '92 / 100',
  deliveryScore: '88 / 100',
  responseTime: '3.8 hours average',
  paymentHistory: '27 paid on-time, 2 delayed in last 12 months',
  riskScore: '31 / 100 (Low Risk)',
  vendorRating: '4.4 / 5',
};

const VendorPerformance = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const { state } = useLocation() as { state: LocationState | null };
  const vendor = state?.vendor;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{vendor?.vendorName ?? `Vendor ${vendorId}`}</h1>
          <p className="text-sm text-gray-600">
            {vendor?.vendorCode ?? 'Code unavailable'} | {vendor?.category ?? 'Category unavailable'}
          </p>
        </div>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          onClick={() => navigate('/directory')}
        >
          Back to Directory
        </button>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold">Vendor Performance</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-8">
          <div className="rounded border p-3">
            <p className="text-sm text-gray-600">Quality Score</p>
            <p className="text-base font-semibold text-gray-900">{performanceData.qualityScore}</p>
          </div>
          <div className="rounded border p-3">
            <p className="text-sm text-gray-600">Delivery Score</p>
            <p className="text-base font-semibold text-gray-900">{performanceData.deliveryScore}</p>
          </div>
          <div className="rounded border p-3">
            <p className="text-sm text-gray-600">Response Time</p>
            <p className="text-base font-semibold text-gray-900">{performanceData.responseTime}</p>
          </div>
          <div className="rounded border p-3">
            <p className="text-sm text-gray-600">Payment History</p>
            <p className="text-base font-semibold text-gray-900">{performanceData.paymentHistory}</p>
          </div>
          <div className="rounded border p-3">
            <p className="text-sm text-gray-600">Risk Score</p>
            <p className="text-base font-semibold text-gray-900">{performanceData.riskScore}</p>
          </div>
          <div className="rounded border p-3">
            <p className="text-sm text-gray-600">Vendor Rating</p>
            <p className="text-base font-semibold text-gray-900">{performanceData.vendorRating}</p>
          </div>
        </div>
        <div className="border rounded-2xl p-4">
        <ChartContainer config={chartConfigOne} className="h-[300px] w-full">
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
              domain={[0, 100]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `${Number(value)} / 100`}
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
    </div>
  );
};

export default VendorPerformance;