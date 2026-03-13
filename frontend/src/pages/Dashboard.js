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
const [alerts,setAlerts] = useState([]);

const [filters,setFilters] = useState({
year: year || 2025,
country: country || "India",
specimen: specimen || "Blood",
antibiotic: antibiotic || "Ciprofloxacin"
});

/* Hover animation */

const hoverEnter = (e)=>{
e.currentTarget.style.transform="scale(1.03)";
e.currentTarget.style.boxShadow="0 15px 35px rgba(0,0,0,0.45)";
};

const hoverLeave = (e)=>{
e.currentTarget.style.transform="scale(1)";
e.currentTarget.style.boxShadow="none";
};

/* Fetch predictions */

useEffect(() => {

const fetchPrediction = async () => {

const years = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];
let predictions = [];

for (let y of years){

const result = await predictResistance({
Year: y,
CountryTerritoryArea: filters.country,
Specimen: filters.specimen,
AntibioticName: filters.antibiotic,
InterpretableAST: 150 + Math.random()*100,
PrevResistance: 20 + Math.random()*20
});

predictions.push(result.predicted_resistance);

}

setPrediction(predictions[predictions.length-1]);
setTrendData(predictions);

};

fetchPrediction();

}, [filters]);

/* Fetch alerts */

useEffect(()=>{

fetch("http://127.0.0.1:8000/alerts")
.then(res=>res.json())
.then(data=>{
setAlerts(data);
});

},[]);

return (

<div style={{
background:"#0f1117",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
color:"white"
}}>

<div style={{
width:"100%",
maxWidth:"1400px",
padding:"40px"
}}>

{/* HEADER */}

<div style={{marginBottom:"40px"}}>

<h1>AMR Forecasting Dashboard</h1>

<div style={{display:"flex",alignItems:"center",gap:"10px",marginTop:"15px"}}>

<button
onClick={()=>setShowFilters(!showFilters)}
style={{
padding:"10px 18px",
borderRadius:"20px",
border:"none",
background:"#5b7cfa",
color:"white",
cursor:"pointer"
}}
>
Filter
</button>

{showFilters && (

<div style={{display:"flex",gap:"10px"}}>

<select
value={filters.country}
onChange={(e)=>setFilters({...filters,country:e.target.value})}
style={{padding:"8px",borderRadius:"10px"}}
>
<option value="India">India</option>
<option value="USA">USA</option>
<option value="Brazil">Brazil</option>
</select>

<select
value={filters.specimen}
onChange={(e)=>setFilters({...filters,specimen:e.target.value})}
style={{padding:"8px",borderRadius:"10px"}}
>
<option value="Blood">Blood</option>
<option value="Urine">Urine</option>
</select>

<select
value={filters.antibiotic}
onChange={(e)=>setFilters({...filters,antibiotic:e.target.value})}
style={{padding:"8px",borderRadius:"10px"}}
>
<option value="Ciprofloxacin">Ciprofloxacin</option>
<option value="Levofloxacin">Levofloxacin</option>
</select>

<select
value={filters.year}
onChange={(e)=>setFilters({...filters,year:Number(e.target.value)})}
style={{padding:"8px",borderRadius:"10px"}}
>
<option value="2020">2020</option>
<option value="2021">2021</option>
<option value="2022">2022</option>
<option value="2023">2023</option>
<option value="2024">2024</option>
<option value="2025">2025</option>
</select>

</div>

)}

</div>

</div>

{/* DASHBOARD GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 2fr 1fr",
gap:"20px",
alignItems:"stretch"
}}>

{/* LEFT COLUMN */}

<div style={{
display:"flex",
flexDirection:"column",
gap:"20px"
}}>

{/* ALERT CARD */}

<div
onMouseEnter={hoverEnter}
onMouseLeave={hoverLeave}
style={{
padding:"22px",
borderRadius:"16px",
background:"#1e1e2f",
transition:"all 0.2s"
}}
>

<h3 style={{opacity:0.8}}>Emerging Resistance Alerts</h3>

{alerts.length===0 ? (
<p style={{opacity:0.6}}>No significant resistance spikes detected.</p>
) : (

alerts.map((alert,index)=>(

<div key={index} style={{marginTop:"10px"}}>

<div style={{
display:"flex",
alignItems:"center",
gap:"10px",
fontSize:"20px",
fontWeight:"600"
}}>

<span style={{fontSize:"22px"}}>⚠</span>
<span>Alert</span>

</div>

<p style={{marginTop:"10px",lineHeight:"1.5",opacity:0.85}}>
Fluoroquinolone resistance predicted to exceed
<b> 35% by {alert.year}</b>.
</p>

<p style={{marginTop:"6px"}}>
Projected increase: <b>+{alert.increase}%</b>
</p>

</div>

))

)}

</div>

{/* MAP CARD */}

<div
onClick={()=>navigate("/map-analysis")}
onMouseEnter={hoverEnter}
onMouseLeave={hoverLeave}
style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f",
cursor:"pointer",
transition:"all 0.2s"
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
onClick={()=>navigate("/prediction-analysis",{state:{...filters}})}
onMouseEnter={hoverEnter}
onMouseLeave={hoverLeave}
style={{
padding:"40px",
borderRadius:"20px",
background:"#1e1e2f",
textAlign:"center",
cursor:"pointer",
transition:"all 0.2s"
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
datasets:[{
label:"Resistance %",
data:trendData,
borderColor:"#5b7cfa",
backgroundColor:"rgba(91,124,250,0.2)",
tension:0.4
}]
}}
options={{
plugins:{legend:{display:false}},
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
gap:"20px",
height:"100%"
}}>

{/* SPECIMEN CARD */}

<div
onClick={()=>navigate("/specimen-analysis")}
onMouseEnter={hoverEnter}
onMouseLeave={hoverLeave}
style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f",
cursor:"pointer",
transition:"all 0.2s",
flex:1
}}
>

<h3>Specimen Comparison</h3>

<div style={{marginTop:"15px"}}>

<p style={{fontSize:"13px"}}>Bloodstream</p>

<div style={{height:"8px",background:"#2a2f45",borderRadius:"10px",marginBottom:"8px"}}>
<div style={{width:"36%",height:"100%",background:"#5b7cfa",borderRadius:"10px"}}></div>
</div>

<p style={{fontSize:"13px"}}>Urinary</p>

<div style={{height:"8px",background:"#2a2f45",borderRadius:"10px"}}>
<div style={{width:"30%",height:"100%",background:"#8e94a8",borderRadius:"10px"}}></div>
</div>

</div>

</div>

{/* ANTIBIOTIC CARD */}

<div
onClick={()=>navigate("/antibiotic-analysis")}
onMouseEnter={hoverEnter}
onMouseLeave={hoverLeave}
style={{
padding:"20px",
borderRadius:"16px",
background:"#1e1e2f",
cursor:"pointer",
transition:"all 0.2s",
flex:1
}}
>

<h3>Antibiotic Comparison</h3>

<div style={{marginTop:"15px"}}>

<p style={{fontSize:"13px"}}>Ciprofloxacin</p>

<div style={{height:"8px",background:"#2a2f45",borderRadius:"10px",marginBottom:"8px"}}>
<div style={{width:"32%",height:"100%",background:"#5b7cfa",borderRadius:"10px"}}></div>
</div>

<p style={{fontSize:"13px"}}>Levofloxacin</p>

<div style={{height:"8px",background:"#2a2f45",borderRadius:"10px"}}>
<div style={{width:"29%",height:"100%",background:"#8e94a8",borderRadius:"10px"}}></div>
</div>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;