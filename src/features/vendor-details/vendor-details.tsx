import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

const tabs = [
  'Overview',
  'Contacts',
  'Performance',
  'Purchase History',
  'Documents',
  'Payments',
  'Projects Associated',
  'Issues Raised',
  'Audit Timeline',
] as const;

type VendorDetailsTab = (typeof tabs)[number];

type VendorDetailsData = Record<VendorDetailsTab, Array<Record<string, string>>>;

const vendorDetailsMockData: VendorDetailsData = {
  Overview: [
    { label: 'Onboarding Date', value: '2024-04-10' },
    { label: 'Current Contract', value: 'Annual Supply Agreement' },
    { label: 'Risk Tier', value: 'Low' },
    { label: 'Preferred Vendor', value: 'Yes' },
  ],
  Contacts: [
    { name: 'Maya Sharma', role: 'Key Account Manager', email: 'maya@vendor.com', phone: '+91-98765-11111' },
    { name: 'Amit Rao', role: 'Finance Contact', email: 'amit@vendor.com', phone: '+91-98765-22222' },
  ],
  Performance: [
    { metric: 'On-time Delivery', value: '96%' },
    { metric: 'Quality Acceptance', value: '98%' },
    { metric: 'Response Time', value: '4 hrs avg' },
  ],
  'Purchase History': [
    { date: '2026-07-20', poNumber: 'PO-88321', amount: '$45,000' },
    { date: '2026-06-28', poNumber: 'PO-87410', amount: '$31,500' },
    { date: '2026-06-09', poNumber: 'PO-86144', amount: '$52,900' },
  ],
  Documents: [
    { name: 'MSA Agreement.pdf', type: 'Contract', updatedOn: '2026-07-01' },
    { name: 'GST Certificate.pdf', type: 'Compliance', updatedOn: '2026-05-14' },
  ],
  Payments: [
    { invoice: 'INV-22091', dueDate: '2026-08-05', status: 'Pending', amount: '$12,400' },
    { invoice: 'INV-21873', dueDate: '2026-07-08', status: 'Paid', amount: '$9,850' },
  ],
  'Projects Associated': [
    { project: 'Warehouse Expansion', owner: 'Procurement Team', status: 'Active' },
    { project: 'Packaging Revamp', owner: 'Operations', status: 'Completed' },
  ],
  'Issues Raised': [
    { ticket: 'ISS-1043', summary: 'Shipment delay', severity: 'Medium', status: 'Resolved' },
    { ticket: 'ISS-1091', summary: 'Invoice mismatch', severity: 'Low', status: 'Open' },
  ],
  'Audit Timeline': [
    { date: '2026-07-22', event: 'Quarterly vendor audit completed', actor: 'Audit Team' },
    { date: '2026-05-15', event: 'Compliance documents verified', actor: 'Compliance Officer' },
  ],
};

const VendorDetails = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const { state } = useLocation() as { state: LocationState | null };
  const vendor = state?.vendor;

  const [activeTab, setActiveTab] = useState<VendorDetailsTab>('Overview');

  const activeTabData = useMemo(() => {
    return vendorDetailsMockData[activeTab] ?? [];
  }, [activeTab]);

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
          onClick={() => navigate(`/performance/${vendorId}`, { state: { vendor } })}
        >
          Vender Performance 
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          onClick={() => navigate('/directory')}
        >
          Back to Directory
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`whitespace-nowrap rounded px-3 py-2 text-sm transition-colors ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">{activeTab}</h2>
        <div className="space-y-2">
          {activeTabData.map((row, index) => (
            <div key={index} className="rounded border p-3">
              {Object.entries(row).map(([key, value]) => (
                <p key={key} className="text-sm">
                  <span className="font-medium text-gray-700">{key}: </span>
                  <span className="text-gray-900">{value}</span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;