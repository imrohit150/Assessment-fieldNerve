import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getVendors } from '../../services/vendors.service'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppDrawer from '../../components/ui/app-drawer';
import FormData from './components/form-data';

interface Vendor {
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
}

interface VendorsResponse {
    data: Vendor[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

const sortableHeaders: Record<string, string> = {
    'Vendor Name': 'vendorName',
    'Vender Code': 'vendorCode',
    'Category': 'category',
    'Contact Person': 'contactPerson',
    'City': 'city',
    'Rating': 'rating',
    'Status': 'status',
    'Last Transaction': 'lastTransaction',
    'Total Purchase Value': 'totalPurchaseValue',
};

const Directory = () => {
    const navigate = useNavigate();

    const headers = [
        "Vendor Name",
        "Vender Code",
        "Category",
        "Contact Person",
        "City",
        "Rating",
        "Status",
        "Last Transaction",
        "Total Purchase Value"
    ];

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sortBy, setSortBy] = useState<string>('');
    const [order, setOrder] = useState<string>('asc');
    const [status] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);


    const { data: vendorsResponse, isLoading, error, isFetching } = useQuery<VendorsResponse>({
        queryKey: ['vendors', page, limit, sortBy, order, status, search],
        queryFn: async () => getVendors(page, limit, sortBy, order, status, search),
        placeholderData: keepPreviousData,
    })

    const vendors: Vendor[] = vendorsResponse?.data ?? []
    const meta = vendorsResponse?.meta
    const hasNextPage = meta?.hasNextPage ?? false
    const hasPrevPage = meta?.hasPrevPage ?? false

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const sortingFunc = (header: string) => {
        const nextSortBy = sortableHeaders[header];

        if (!nextSortBy) {
            return;
        }

        setPage(1);

        if (sortBy === nextSortBy) {
            setOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'));
            return;
        }

        setSortBy(nextSortBy);
        setOrder('asc');
    }

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const handleVendorNavigation = (vendor: Vendor) => {
        navigate(`/directory/${vendor.id}`, {
            state: {
                vendor,
            },
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <AppDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                title="Add New Vendor"
                description=""
            >
                <FormData onClose={() => setIsDrawerOpen(false)} />
            </AppDrawer>
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-2xl font-bold mb-4">Directory</h1>
                <div>
                    <input type="text" placeholder="Search vendors..." className="border rounded px-4 py-2 mr-2" value={searchInput} onChange={(e) => handleInput(e)} />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" onClick={openDrawer} >
                        Add New Vendor
                    </button>
                </div>
            </div>
            <div className="h-[calc(100vh-240px)] overflow-y-auto rounded-lg border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="sticky top-0 bg-gray-100 py-2 px-4 border-b text-left cursor-pointer select-none" onClick={() => sortingFunc(header)} >{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td className="py-4 px-4" colSpan={headers.length}>
                                    Loading vendors...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td className="py-4 px-4 text-red-600" colSpan={headers.length}>
                                    Failed to load vendors.
                                </td>
                            </tr>
                        ) : vendors.length === 0 ? (
                            <tr>
                                <td className="py-4 px-4" colSpan={headers.length}>
                                    No vendors found.
                                </td>
                            </tr>
                        ) : vendors.map((vendor: Vendor) => (
                            <tr
                                key={vendor.id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleVendorNavigation(vendor)}
                            >
                                <td className="py-4 px-4 border-b">{vendor.vendorName}</td>
                                <td className="py-4 px-4 border-b">{vendor.vendorCode}</td>
                                <td className="py-4 px-4 border-b">{vendor.category}</td>
                                <td className="py-4 px-4 border-b">{vendor.contactPerson}</td>
                                <td className="py-4 px-4 border-b">{vendor.city}</td>
                                <td className="py-4 px-4 border-b">{vendor.rating}</td>
                                <td className="py-4 px-4 border-b">{vendor.status}</td>
                                <td className="py-4 px-4 border-b">{vendor.lastTransaction}</td>
                                <td className="py-4 px-4 border-b">{vendor.totalPurchaseValue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePrevPage}
                    disabled={!hasPrevPage || isFetching}
                >
                    Previous
                </button>
                <span>
                    Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNextPage}
                    disabled={!hasNextPage || isFetching}
                >
                    Next
                </button>
            </div>
        </div>)
}

export default Directory