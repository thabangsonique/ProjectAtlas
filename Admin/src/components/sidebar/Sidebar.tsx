import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  Lock,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setSidebarCollapsed } from "../../features/globalSlice";
import { useState } from "react";

export default function Sidebar() {
  // local states
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  //import sidebar collapsed value from the state.
  const sidebarCollapsed = useSelector(
    (state: RootState) => state.global.sidebarCollapsed,
  );

  const dispatch = useDispatch();

  const sidebarClasses = `fixed flex flex-col justify-between h-[100%] bg-white dark:bg-black shadow-lg overflow-y-auto z-40 transition-all duration-300
  ${sidebarCollapsed ? "w-0" : "w-64"} `;
  return (
    <div className={sidebarClasses}>
      {/* TOP SECTION */}
      <div className="flex flex-col justify-start">
        {/* LOGO */}
        <div className="flex min-h-[56px] px-6 pt-3 w-64 items-center justify-between dark:bg-black bg-white">
          <h1 className="dark:text-white text-xl font-bold">EDLIST</h1>
          {/* x-icon */}
          {sidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}
            >
              <X className="text-gray-800 dark:text-white h-6 w-6" />
            </button>
          )}
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
        {/* NAVLINKS */}
        <nav className="w-full z-10">
          <SideBarLinks icon={Home} label="Home" href="/" />
          <SideBarLinks icon={Briefcase} label="Timeline" href="/timeline" />
          <SideBarLinks icon={Search} label="Search" href="/search" />
          <SideBarLinks icon={Settings} label="Settings" href="/settings" />
          <SideBarLinks icon={User} label="Users" href="/users" />
          <SideBarLinks icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* PROJECTS SECTION */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex items-center text-gray-500 w-full justify-between px-8 py-3"
        >
          <span>Projects</span>
          {/* icon */}
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {/* PRIORITIES LINKS SECTION */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex items-center text-gray-500 w-full justify-between px-8 py-3"
        >
          <span>Priority</span>
          {/* icon */}
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {/* project items */}
        <div
          className={`transition-all duration-300 ease-in-out  ${showPriority ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <SideBarLinks
            icon={AlertCircle}
            label="Urgent"
            href="/priority/urgent"
          />
          <SideBarLinks icon={ShieldAlert} label="Home" href="/priority/high" />
          <SideBarLinks
            icon={AlertTriangle}
            label="Home"
            href="/priority/medium"
          />
          <SideBarLinks icon={AlertOctagon} label="Home" href="/priority/low" />
          <SideBarLinks icon={Layers3} label="Home" href="/priority/backlog" />
        </div>
      </div>

      {/* LOGOUT-BOTTOM SECTION */}
    </div>
  );
}

//types for props.
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  //   isCollapsed: boolean;
}
//component for sidebar links.
const SideBarLinks = ({
  href,
  icon: Icon,
  label,
  //   isCollapsed,
}: SidebarLinkProps) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  const screenWidth = window.innerWidth; //stores window size width in the

  const dispatch = useDispatch();
  //grab the sidebar collapsed state.
  const sidebarCollapsed = useSelector(
    (state: RootState) => state.global.sidebarCollapsed,
  );

  return (
    <Link to={href} className="w-full">
      <div
        className={`relative flex items-center py-3 px-8 justify-start gap-3 cursor-pointer transition-colors duration-300 group hover:bg-gray-100 hovor:dark:bg-gray-700
      ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""}`}
      >
        {" "}
        {/* Line */}
        {isActive ? (
          <div className="absolute top-0 left-0 h-[100%] bg-blue-400 w-[5px] " />
        ) : null}
        {/* icon */}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100  group-hover:dark:text-gray-800" />
        {/* label */}
        <span className="font-medium text-gray-800 dark:text-gray-100  group-hover:dark:text-gray-800">
          {label}
        </span>
      </div>
    </Link>
  );
};
