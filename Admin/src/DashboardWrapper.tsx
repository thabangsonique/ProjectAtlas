import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../src/app/store";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarCollapsed = useSelector(
    (state: RootState) => state.global.sidebarCollapsed,
  );
  const darkMode = useSelector((state: RootState) => state.global.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    console.log("darkMode:", darkMode);
    console.log("html classes:", document.documentElement.className);
  }, [darkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex flex-col w-full dark:bg-dark-bg bg-gray-50 ${sidebarCollapsed ? "" : "md:pl-64"}`}
      >
        {/* Navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}
