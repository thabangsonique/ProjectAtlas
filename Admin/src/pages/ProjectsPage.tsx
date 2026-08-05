import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectHeader from "../components/headers/ProjectHeader";
import BoardView from "../components/projects/BoardView";
import ListView from "../components/projects/ListView";

export default function projectsPage() {
  const { projectId } = useParams(); //grabs the project id from the URL as a string
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* conditional boardView rendar */}
      {activeTab === "Board" && (
        <BoardView
          id={projectId!}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "List" && (
        <ListView
          id={projectId!}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
}
