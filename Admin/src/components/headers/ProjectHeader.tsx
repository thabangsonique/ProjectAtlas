import React from "react";
import GlobalHeader from "./GlobalHeader";
import {
  Clock,
  Filter,
  Grid,
  List,
  Share,
  Share2,
  Table,
  type LucideIcon,
} from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export default function ProjectHeader({ activeTab, setActiveTab }: Props) {
  return (
    <div className="px-4 xl:p-6">
      <div className="pt-6 xl:pt-8 pb-6 xl:pb-8">
        <GlobalHeader name="Project Design Development" />
      </div>

      {/* tab buttons */}
      <div className="flex items-center py-4 justify-between w-full border-y dark:border-gray-400 border-gray-300">
        {/* left-side */}
        <div className="flex ml-4 gap-6">
          <TabButton
            name="Board"
            Icon={Grid}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            Icon={List}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            Icon={Clock}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            Icon={Table}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        {/* right-side */}
        <div className="flex items-center gap-4">
          <button>
            <Filter className="h-5 w-5 dark:text-gray-500 text-gray-900" />
          </button>
          <button>
            <Share2 className="h-5 w-5 dark:text-gray-500 text-gray-900" />
          </button>
          {/* search bar */}
          <div className="flex items-center rounded-lg bg-gray-500/10 py-2 px-2 gap-3  focus-within:ring-blue-500/30 focus-within:ring-2">
            <Grid className="h-4 w-4 dark:text-gray-500" />
            <input
              placeholder="Search Task"
              className="text-white placeholder:dark:text-gray-500 placeholder:font-medium w-full border-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// component for each TAb
type TabButtonProps = {
  name: string;
  Icon: LucideIcon;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

//tAb button component.
const TabButton = ({ name, Icon, activeTab, setActiveTab }: TabButtonProps) => {
  return (
    <div
      onClick={() => setActiveTab(name)}
      className={`flex items-center gap-4 py-2 px-4 hover:cursor-pointer hover:dark:text-white dark:text-gray-500  rounded-lg  transition-all duration-300 ${activeTab === name ? "text-gray-900 dark:text-white bg-blue-500/30 shadow-xl" : ""}`}
    >
      <Icon />
      {name}
    </div>
  );
};
