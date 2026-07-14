import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GenerateEmail from "./pages/GenerateEmail";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/generate" element={<GenerateEmail />} />

        <Route path="/history" element={<History />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;