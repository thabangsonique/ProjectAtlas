import React from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main className="flex flex-col w-full md:pl-64 dark:bg-dark-bg bg-gray-50">
        {/* Navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}
