import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container flex items-center justify-between">
                <div className="text-white font-bold text-xl">Vendor Management System</div>
                <div className="space-x-4">
                    <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                    <Link to="/directory" className="text-white hover:text-gray-300 ">Vendors Directory</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;