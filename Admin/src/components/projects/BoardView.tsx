import React from "react";
import { useGetTasksQuery } from "../../features/api";
import { useUpdateTasksMutation } from "../../features/api";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { Task as TaskType } from "../../features/api";
import { MessageSquare, MoreVertical, Plus } from "lucide-react";
import { format } from "date-fns";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
export default function BoardView({ id, setIsModalNewTaskOpen }: BoardProps) {
  console.log("BoardView id:", id);
  console.log("Number(id):", Number(id));
  //grab the tasks by passing the project ID.
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });
  //grab the function to update status.
  const [updateTaskStatus] = useUpdateTasksMutation();

  //function for moving the task.
  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div className="text-xl text-white">Loading...</div>;
  if (error)
    return (
      <div className="text-xl text-white">
        An error occured while fetching the tasks.
      </div>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-col-1 md:grid-cols-2 gap-4 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks ?? []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
}

//CREATING THE TASK COLUMNS component.
//defining the types.
type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

//the component.
const TaskColumn = ({
  tasks,
  status,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  //drag and drop functionality.
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task", //labeling
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({ isOver: !!monitor.isOver() }), // checks whether the item is dropped or is still hovering.
  }));

  //count the number of tasks inside this column,
  const tasksCount = tasks.filter((task) => task.status === status).length;

  //task status colors.
  const statusColor: any = {
    "To Do": "#2563eb",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  // THE TASK COLUMN ITSELF
  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sm:py-4 py-2 xl:py-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      {/* To-do section */}
      <div className="flex items-center rounded-xl w-full dark:bg-gray-800/60 bg-gray-300/60 py-5 pl-2 pr-5 mb-5">
        {/* status color line */}
        <div
          className={`w-2 h-15 mr-3 !bg-[${statusColor[status]}] rounded-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />

        {/* To-Do text left side */}

        <div className="flex items-center space-x-2">
          <h3 className="dark:text-white text-gray-900 text-xl font-medium">
            {status}
          </h3>
          {/* task count */}
          <div className=" flex items-center justify-center rounded-full h-8 w-8 bg-gray-500 text-white text-sm">
            {tasksCount}
          </div>
        </div>

        {/* cta add task button right-side */}
        <div className="flex items-center ml-auto">
          {/* dot icon */}
          <MoreVertical className="dark:text-white text-gray-900" />
          {/* add button */}
          <button className="flex items-center justify-center rounded h-8 w-8 bg-gray-500 hover:cursor-pointer">
            <Plus className="text-white" />
          </button>
        </div>
      </div>

      {/* all actual tasks display */}
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

// TASK COMPONENT
type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  //drag and drop feature
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task", //labeling
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // checks whether the item is dropped or is still hovering.
  }));

  // split tags for each task
  const taskTagSplit = task.tags ? task.tags.split(",") : [];

  //format dates.
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formttedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  //grap number of comments.
  const numberOfComments = (task.comments && task.comments.length) || 0;

  const Priority = ({ priority }: { priority: TaskType["priority"] }) => {
    return (
      <div
        className={`${priority === "Urgent" ? "bg-red-400" : priority === "High" ? "bg-yellow-700" : priority === "Medium" ? "bg-green-700" : priority === "Low" ? "bg-blue-400" : "bg-gray-500"} rounded-full p-2 text-xl`}
      >
        {priority}
      </div>
    );
  };

  //make task item draggable
  console.log("attachments:", task.attachments);
  console.log("is array:", Array.isArray(task.attachments));
  console.log("number:", task.attachments?.length);
  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`rounded-xl dark:bg-gray-800/50 shadow-lg ${isDragging ? "opacity-50 border border-blue-400/50" : "opacity-100"}`}
    >
      {/* image attachment */}
      {task.attachments && task.attachments.length > 0 && (
        <img
          src="/i1.png" //TO_DO: to fetch from backend
          alt={task.attachments[0].fileName}
          className="rounded-xl h-[200px] w-full object-cover"
        />
      )}

      {/* priority and task content */}
      <div className="p-4">
        {/* priority and tags */}
        <div className="flex justify-between">
          {/* left side */}
          <div className="flex items-center gap-4">
            {/* priority */}
            <Priority priority={task.priority} />
            {/* multiple tags map-each task can have multiple tags*/}
            {taskTagSplit.map((tag, idx) => (
              <div className="bg-gray-300 p-2 rounded-full p- text-xl">
                {task.tags}
              </div>
            ))}
          </div>

          {/* right-side */}
          <button>
            <MoreVertical className="dark:text-gray-400" />
          </button>
        </div>

        {/* task details */}
        <div className="mt-4">
          <p className="text-xl dark:text-gray-400 font-bold">{task.title}</p>
          <div className="mt-4">
            <p className="dark:text-gray-400 text-lg">
              {formattedStartDate}-{formttedDueDate}
            </p>
            {task.comments?.map((comment) => (
              <p key={comment.id} className="dark:text-gray-400 text-lg">
                {comment.text}
              </p>
            ))}
          </div>
        </div>

        {/* User profile image + comments */}
        <div className="mt-5 flex items-center justify-between">
          {/* left side */}
          <div className="flex">
            {task.assignee && (
              <img
                key={task.assignee.userId}

                src="/bob.png" // TO-DO: fetch from backend
                alt={`${task.assignee.username}`}
                className="rounded-full h-15 w-15 object-cover"
              />
            )}
            {task.author && (
              <img
                key={task.author.userId}
                src="/stan.png"
                alt={`${task.author.username}`}
                className="h-15 w-15 rounded-full object-cover"
              />
            )}
          </div>
          {/* right-side */}
          <div className="flex gap-3">
            {/* icon */}
            <MessageSquare className="dark:text-white hover:cursor-pointer hover:scale-110 transitioon-all duration-300" />
            <p className="dark:text-white text-xl">{numberOfComments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
