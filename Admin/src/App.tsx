import DashboardWrapper from "./DashboardWrapper";
import "./index.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <DashboardWrapper>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/timeline" element={<h1>Timeline</h1>} />
        <Route path="/timeline" element={<h1>Search</h1>} />
        <Route path="/timeline" element={<h1>Settings</h1>} />
        <Route path="/timeline" element={<h1>Users</h1>} />
        <Route path="/timeline" element={<h1>Teams</h1>} />
      </Routes>
    </DashboardWrapper>
  );
}

export default App;
