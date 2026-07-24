import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../main-layout/main-layout.tsx";
import Dashboard from "../features/dashboard/dashboard.tsx";
import VendorDetails from "../features/vendor-details";
import VenderPerformance from "../features/vendor-performance";
import { Suspense } from "react"
import Directory from "../features/directory/lazy-directory.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
       {
        path: "/directory",
        element: (
          <Suspense fallback={<div className="p-4">Loading directory...</div>}>
            <Directory />
          </Suspense>
        ),
      },
      {
        path: "/directory/:vendorId",
        element: <VendorDetails />,
      },
      {
        path: "/performance/:vendorId",
        element: <VenderPerformance />,
      },
    ]
  },
  
]);