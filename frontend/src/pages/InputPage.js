import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputPage() {

  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [specimen, setSpecimen] = useState("");
  const [antibiotic, setAntibiotic] = useState("");

  return (

    <div style={{ textAlign:"center", marginTop:"120px" }}>

      <h1>AMR Resistance Predictor</h1>

      <div style={{ marginTop:"40px" }}>

        <input
          placeholder="Year"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Country"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Specimen Type"
          value={specimen}
          onChange={(e)=>setSpecimen(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Antibiotic"
          value={antibiotic}
          onChange={(e)=>setAntibiotic(e.target.value)}
        />

        <br/><br/>

        <button
        onClick={() =>
            navigate("/dashboard", {
            state: {
                year,
                country,
                specimen,
                antibiotic
            }
            })
        }
        >
            Predict Resistance
        </button>

      </div>

    </div>

  );

}

export default InputPage;