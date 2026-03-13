import { BrowserRouter, Routes, Route } from "react-router-dom";

import InputPage from "./pages/InputPage";
import Dashboard from "./pages/Dashboard";
import SpecimenAnalysis from "./pages/SpecimenAnalysis";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<InputPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/specimen-analysis" element={<SpecimenAnalysis />} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;