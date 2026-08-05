import React from "react";
import type { Task } from "../../features/api";

type TaskProp = {
  task: Task;
};
export default function TaskCard({ task }: TaskProp) {
  return <div>Task card</div>;
}
