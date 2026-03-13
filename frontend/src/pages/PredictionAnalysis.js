import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { predictResistance } from "../services/api";

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

function PredictionAnalysis(){

const navigate = useNavigate();
const location = useLocation();

const { year, country, specimen, antibiotic } = location.state || {};

const [prediction,setPrediction] = useState(null);
const [trendData,setTrendData] = useState([]);

useEffect(()=>{

const fetchTrend = async()=>{

const years=[2016,2017,2018,2019,2020,2021,2022,2023,2024,2025];
let preds=[];

for(let y of years){

const res = await predictResistance({
Year:y,
CountryTerritoryArea:country,
Specimen:specimen,
AntibioticName:antibiotic,
InterpretableAST:200,
PrevResistance:30
});

preds.push(res.predicted_resistance);

}

setPrediction(preds[preds.length-1]);
setTrendData(preds);

};

fetchTrend();

},[country,specimen,antibiotic]);

return(

<div style={{
background:"#0f1117",
minHeight:"100vh",
padding:"40px",
color:"white",
display:"flex",
justifyContent:"center"
}}>

<div style={{width:"1100px",maxWidth:"95%"}}>

{/* HEADER */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"40px"
}}>

<button
onClick={()=>navigate("/dashboard")}
style={{
background:"#2a2f45",
border:"none",
padding:"10px 18px",
borderRadius:"20px",
color:"white",
cursor:"pointer"
}}

>

← Dashboard </button>

<h2>Prediction Analysis</h2>

<div></div>

</div>

{/* MAIN PREDICTION CARD */}

<div style={{
background:"#1e1e2f",
padding:"40px",
borderRadius:"20px",
textAlign:"center"
}}>

<h3>Predicted Resistance</h3>

<h1 style={{fontSize:"48px"}}>
{prediction ? prediction.toFixed(2)+"%" : "..."}
</h1>

<p style={{opacity:0.7}}>
Machine learning forecast based on historical AMR surveillance data
</p>

</div>

{/* TREND CHART */}

<div style={{
marginTop:"30px",
background:"#1e1e2f",
padding:"30px",
borderRadius:"20px"
}}>

<h3 style={{marginBottom:"20px"}}>Resistance Forecast Trend</h3>

<Line
data={{
labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],
datasets:[
{
label:"Resistance %",
data:trendData,
borderColor:"#5b7cfa",
backgroundColor:"rgba(91,124,250,0.2)",
tension:0.4
}
]
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

{/* INFO PANELS */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginTop:"30px"
}}>

{/* MODEL INFO */}

<div style={{
background:"#1e1e2f",
padding:"25px",
borderRadius:"20px"
}}>

<h3>Model Information</h3>

<p style={{marginTop:"15px"}}><b>Algorithm:</b> Random Forest</p>
<p><b>Purpose:</b> Predict antimicrobial resistance trends</p>
<p><b>Training Data:</b> Global AMR Surveillance Dataset</p>

</div>

{/* INPUT DATA */}

<div style={{
background:"#1e1e2f",
padding:"25px",
borderRadius:"20px"
}}>

<h3>Prediction Inputs</h3>

<p style={{marginTop:"15px"}}><b>Country:</b> {country}</p>
<p><b>Specimen:</b> {specimen}</p>
<p><b>Antibiotic:</b> {antibiotic}</p>
<p><b>Year:</b> {year}</p>

</div>

</div>

</div>

</div>

);

}

export default PredictionAnalysis;
