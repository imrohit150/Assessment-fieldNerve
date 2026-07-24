const Cards = () => {

    const mockData = [
        { cardName: 'Total Vendors', val: 100, id: 1 },
        { cardName: 'Active Vendors', val: 80, id: 2 },
        { cardName: 'Blacklisted Vendors', val: 10, id: 3 },
        { cardName: 'Pending Approvals', val: 5, id: 4 },
        { cardName: 'Average Vendor Rating', val: 4.5, id: 5 },
        { cardName: 'Active Purchase Orders', val: 20, id: 6 },
    ]

    return (
        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockData.map((item) => (
                <div className="flex flex-col gap-2 border rounded-2xl p-2" key={item.id}>
                    <p className="text-base font-medium">{item.cardName}</p>
                    <p className="text-base font-semibold">{item.val}</p>
                </div>
            ))}
        </div>
    )
}

export default Cards