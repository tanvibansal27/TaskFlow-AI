import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Calendar from "./pages/Calendar/Calendar";
import Team from "./pages/Team/Team";
import AI from "./pages/AI/AI";
import Settings from "./pages/Settings/Settings";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />}/>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/team" element={<Team />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/projects/:id" element={<ProjectDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;