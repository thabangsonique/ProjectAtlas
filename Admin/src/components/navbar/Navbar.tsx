import React from "react";
import { Menu, MenuIcon, Search, Settings, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { setDarkMode, setSidebarCollapsed } from "../../features/globalSlice";

export default function Navbar() {
  const sidebarCollapsed = useSelector(
    (state: RootState) => state.global.sidebarCollapsed,
  );
  const darkMode = useSelector((state: RootState) => state.global.darkMode);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-black py-4 px-3">
      {/* left-side */}
      <div className="flex items-center gap-8">
        {/* menu-icon */}
        {sidebarCollapsed ? (
          <button
            onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
          >
            <MenuIcon />
          </button>
        ) : null}

        {/* searchbar */}
        <div className="relative flex rounded-2xl bg-gray-400 dark:bg-gray-500 w-[220px]">
          <Search className="absolute top-1/2 -translate-y-1/2 left-[4px] w-5 h-5 mr-2 cursor-pointer" />
          <input
            type="search"
            className="w-full p-2 pl-8 border-none focus:outline-none"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* right side */}
      <div className="flex items-center">
        {/* darkmode icon button */}
        <button
          onClick={() => dispatch(setDarkMode(!darkMode))}
          className={`${darkMode ? "rounded-full p-2 dark:hover:bg-gray-700" : "rounded-full p-2 hover:bg-gray-100"}`}
        >
          {darkMode ? (
            <Sun className="h-6 w-6 dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 dark:text-white" />
          )}
        </button>
        <Link
          to="/settings"
          className="h-min w-min p-2 hover:bg-gray-600 rounded-full flex items-center justify-center"
        >
          <Settings className="w-6 h-6 dark:text-white" />
        </Link>
      </div>
    </div>
  );
}
