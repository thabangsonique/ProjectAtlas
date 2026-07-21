import { Lock } from "lucide-react";
import React from "react";

export default function Sidebar() {
  const sidebarClasses = `fixed flex flex-col justify-between h-[100%] bg-white dark:bg-black shadow-lg overflow-y-auto z-40 w-64`;
  return (
    <div className={sidebarClasses}>
      <div className="flex flex-col justify-start">
        {/* LOGO */}
        <div className="flex min-h-[56px] px-6 pt-3 w-64 items-center justify-between dark:bg-black bg-white">
          <h1 className="dark:text-white text-xl font-bold">EDLIST</h1>
          {/* x-icon */}
        </div>

        {/* TEAM */}
        <div className="flex gap-8 items-center border-y-[1.5px] border-gray-200 dark:border-gray-700 py-4 px-8">
          {/* logo */}
          <img src="/logo.png" alt="logo" className="w-[40px] h-[40px]" />
          {/* text */}
          <div>
            <h3 className="dark:text-white text-black text-md font-bold tracking-wide">
              THABANG TEAM
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <Lock className="text-gray-400 h-3 w-3" />
              <p className="text-gray-500">Private</p>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT SECTION */}
    </div>
  );
}
