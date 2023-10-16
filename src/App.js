import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBroad from "./pages/DashBroad";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashbroad" element={<DashBroad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
