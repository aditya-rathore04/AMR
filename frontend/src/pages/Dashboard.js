import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { predictResistance } from "../services/api";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import ResistanceMap from "../components/ResistanceMap";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip
);

function Dashboard() {

const location = useLocation();
const navigate = useNavigate();

const { year, country, specimen, antibiotic } = location.state || {};

const [prediction, setPrediction] = useState(null);
const [trendData, setTrendData] = useState([]);
const [showFilters, setShowFilters] = useState(false);

useEffect(() => {

const fetchPrediction = async () => {

const years = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];
let predictions = [];

for (let y of years){

const result = await predictResistance({
Year: y,
CountryTerritoryArea: country,
Specimen: specimen,
AntibioticName: antibiotic,
InterpretableAST: 200,
PrevResistance: 30
});

predictions.push(result.predicted_resistance);

}

setPrediction(predictions[predictions.length-1]);
setTrendData(predictions);

};

fetchPrediction();

}, [year, country, specimen, antibiotic]);

return (

<div style={{
padding: "40px",
background: "#0f1117",
minHeight: "100vh",
color: "white"
}}>

{/* HEADER */}

<div style={{marginBottom:"40px"}}>

<h1>AMR Forecasting Dashboard</h1>

<div style={{display:"flex", alignItems:"center", gap:"10px", marginTop:"15px"}}>

<button
onClick={() => setShowFilters(!showFilters)}
style={{
padding:"10px 18px",
borderRadius:"20px",
border:"none",
background:"#5b7cfa",
color:"white",
cursor:"pointer"
}}

>

Filter </button>

{showFilters && (

<div style={{
display:"flex",
gap:"10px",
animation:"slideIn 0.3s ease"
}}>

<select style={{padding:"8px", borderRadius:"10px"}}>

<option>Region</option>
</select>

<select style={{padding:"8px", borderRadius:"10px"}}>

<option>Country</option>
</select>

<select style={{padding:"8px", borderRadius:"10px"}}>

<option>Specimen</option>
</select>

<select style={{padding:"8px", borderRadius:"10px"}}>

<option>Antibiotic</option>
</select>

<select style={{padding:"8px", borderRadius:"10px"}}>

<option>Year</option>
</select>

<button style={{
padding:"8px 16px",
borderRadius:"10px",
border:"none",
background:"#5b7cfa",
color:"white"
}}>
Apply </button>

</div>

)}

</div>

</div>

{/* MAIN DASHBOARD GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 2fr 1fr",
gap:"20px"
}}>

{/* LEFT COLUMN */}

<div style={{
display:"flex",
flexDirection:"column",
gap:"20px"
}}>

{/* ALERT CARD */}

<div style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f"
}}>

<h3>Emerging Resistance Alert</h3>

<p>
Monitoring fluoroquinolone resistance
trends for early warning signals.
</p>

</div>

{/* MAP CARD */}

<div
onClick={()=>navigate("/map-analysis")}
style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f",
cursor:"pointer"
}}
>

<h3>Global Resistance Overview</h3>

<div style={{marginTop:"15px"}}>

<ResistanceMap/>

</div>

<p style={{
marginTop:"10px",
fontSize:"12px",
opacity:0.6
}}>
Click to explore global resistance trends
</p>

</div>

</div>

{/* CENTER COLUMN */}

<div
onClick={() =>
navigate("/prediction-analysis", {
state:{ year, country, specimen, antibiotic }
})
}
style={{
padding:"40px",
borderRadius:"20px",
background:"#1e1e2f",
textAlign:"center",
cursor:"pointer",
transition:"transform 0.2s"
}}
>

<h3>Predicted Resistance Trend</h3>

<h1 style={{fontSize:"48px"}}>
{prediction ? `${prediction.toFixed(2)}%` : "Loading..."}
</h1>

<p>Projected increase based on historical AMR trends</p>

<div style={{marginTop:"30px"}}>

<Line
data={{
labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],
datasets:[
{
label:"Resistance %",
data: trendData,
borderColor:"#5b7cfa",
backgroundColor:"rgba(91,124,250,0.2)",
tension:0.4
}
]
}}
options={{
plugins:{
legend:{display:false}
},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}}
/>

</div>

</div>

{/* RIGHT COLUMN */}

<div style={{
display:"flex",
flexDirection:"column",
gap:"20px"
}}>

{/* SPECIMEN CARD */}

<div
onClick={()=>navigate("/specimen-analysis")}
style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f",
cursor:"pointer"
}}
>

<h3>Specimen Comparison</h3>

<div style={{marginTop:"15px"}}>

<p>Bloodstream</p>

<div style={{height:"10px", background:"#2a2f45", borderRadius:"10px", marginBottom:"10px"}}>
<div style={{
width:"36%",
height:"100%",
background:"#5b7cfa",
borderRadius:"10px"
}}></div>
</div>

<p>Urinary</p>

<div style={{height:"10px", background:"#2a2f45", borderRadius:"10px"}}>
<div style={{
width:"30%",
height:"100%",
background:"#8e94a8",
borderRadius:"10px"
}}></div>
</div>

</div>

</div>

{/* ANTIBIOTIC CARD */}

<div
onClick={()=>navigate("/antibiotic-analysis")}
style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f",
cursor:"pointer"
}}
>

<h3>Antibiotic Comparison</h3>

<div style={{marginTop:"15px"}}>

<p>Ciprofloxacin</p>

<div style={{height:"10px", background:"#2a2f45", borderRadius:"10px", marginBottom:"10px"}}>
<div style={{
width:"32%",
height:"100%",
background:"#5b7cfa",
borderRadius:"10px"
}}></div>
</div>

<p>Levofloxacin</p>

<div style={{height:"10px", background:"#2a2f45", borderRadius:"10px"}}>
<div style={{
width:"29%",
height:"100%",
background:"#8e94a8",
borderRadius:"10px"
}}></div>
</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;
