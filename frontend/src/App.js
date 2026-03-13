import { BrowserRouter, Routes, Route } from "react-router-dom";

import InputPage from "./pages/InputPage";
import Dashboard from "./pages/Dashboard";
import SpecimenAnalysis from "./pages/SpecimenAnalysis";
import AntibioticAnalysis from "./pages/AntibioticAnalysis";
import MapAnalysis from "./pages/MapAnalysis";
import PredictionAnalysis from "./pages/PredictionAnalysis";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<InputPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/specimen-analysis" element={<SpecimenAnalysis />} />
        <Route path="/antibiotic-analysis" element={<AntibioticAnalysis />} />
        <Route path="/map-analysis" element={<MapAnalysis />} />
        <Route path="/prediction-analysis" element={<PredictionAnalysis />} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;