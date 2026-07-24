import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"

const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-y-auto p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;