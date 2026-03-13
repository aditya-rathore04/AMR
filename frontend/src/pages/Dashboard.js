import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { predictResistance } from "../services/api";

function Dashboard() {

  const location = useLocation();

  const { year, country, specimen, antibiotic } = location.state || {};

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {

    const fetchPrediction = async () => {

      const result = await predictResistance({
        Year: year,
        CountryTerritoryArea: country,
        Specimen: specimen,
        AntibioticName: antibiotic,
        InterpretableAST: 200,
        PrevResistance: 30
      });
      console.log(result);

      setPrediction(result.predicted_resistance);

    };

    fetchPrediction();

  }, [year, country, specimen, antibiotic]);

  return (

    <div style={{ textAlign:"center", marginTop:"120px" }}>

      <h1>AMR Forecasting Dashboard</h1>

      <p><b>Year:</b> {year}</p>
      <p><b>Country:</b> {country}</p>
      <p><b>Specimen:</b> {specimen}</p>
      <p><b>Antibiotic:</b> {antibiotic}</p>

      <br/>

      <h2>
        Predicted Resistance:
        {prediction ? ` ${prediction.toFixed(2)}%` : " Loading..."}
      </h2>

    </div>

  );

}

export default Dashboard;