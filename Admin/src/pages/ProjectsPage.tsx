import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectHeader from "../components/headers/ProjectHeader";

export default function projectsPage() {
  const { id } = useParams();
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Board");

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
