import DashboardWrapper from "./DashboardWrapper";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <Routes>
      <Route element={<DashboardWrapper />}>
        <Route index element={<h1>Home</h1>} />
        <Route path="/timeline" element={<h1>Timeline</h1>} />
        <Route path="/timeline" element={<h1>Search</h1>} />
        <Route path="/timeline" element={<h1>Settings</h1>} />
        <Route path="/timeline" element={<h1>Users</h1>} />
        <Route path="/timeline" element={<h1>Teams</h1>} />

        {/* project dynamic routes */}
        <Route path="projects/:projectId" element={<ProjectsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
