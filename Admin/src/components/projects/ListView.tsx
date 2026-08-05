import React from "react";
import GlobalHeader from "../headers/GlobalHeader";
import { useGetTasksQuery, type Task } from "../../features/api";
import TaskCard from "../cards/TaskCard";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

export default function ListView({ id, setIsModalNewTaskOpen }: Props) {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading Tasks...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <GlobalHeader name="List" />
      </div>
      {/* tasks area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* task card */}
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
