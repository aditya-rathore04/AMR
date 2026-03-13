import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
);

function AntibioticAnalysis(){

const navigate = useNavigate();

return(

<div style={{
background:"#0f1117",
color:"white",
minHeight:"100vh",
padding:"40px"
}}>

{/* Header */}
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
padding:"8px 16px",
borderRadius:"20px",
color:"white",
cursor:"pointer"
}}
>
← Dashboard
</button>

<h2>Antibiotic Resistance Comparison</h2>

<button style={{
background:"#2a2f45",
border:"none",
padding:"8px 16px",
borderRadius:"20px",
color:"white"
}}>
Data
</button>

</div>


{/* Antibiotic bars */}

<div style={{marginBottom:"40px"}}>

<p>Ciprofloxacin</p>

<div style={{
height:"18px",
background:"#2a2f45",
borderRadius:"20px",
marginBottom:"20px"
}}>
<div style={{
width:"32%",
height:"100%",
background:"#5b7cfa",
borderRadius:"20px"
}}></div>
</div>

<p>Levofloxacin</p>

<div style={{
height:"18px",
background:"#2a2f45",
borderRadius:"20px"
}}>
<div style={{
width:"29%",
height:"100%",
background:"#8e94a8",
borderRadius:"20px"
}}></div>
</div>

</div>


{/* Chart */}

<div style={{
background:"#1e1e2f",
padding:"30px",
borderRadius:"20px"
}}>

<Line
data={{
labels:["2016","2017","2018","2019","2020","2021","2022","2023","2024"],
datasets:[
{
label:"Ciprofloxacin",
data:[28,30,31,33,34,36,38,40,42],
borderColor:"#5b7cfa",
tension:0.4
},
{
label:"Levofloxacin",
data:[24,26,27,28,29,30,31,32,33],
borderColor:"#8e94a8",
tension:0.4
}
]
}}
options={{
plugins:{
legend:{labels:{color:"white"}}
},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}}
/>

</div>

</div>

);

}

export default AntibioticAnalysis;