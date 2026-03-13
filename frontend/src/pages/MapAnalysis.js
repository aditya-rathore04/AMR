import { useNavigate } from "react-router-dom";
import ResistanceMap from "../components/ResistanceMap";

function MapAnalysis(){

const navigate = useNavigate();

return(

<div style={{
background:"#0f1117",
minHeight:"100vh",
padding:"40px",
color:"white",
display:"flex",
justifyContent:"center"
}}>

{/* CENTER CONTAINER */}

<div style={{
width:"1100px",
maxWidth:"95%"
}}>

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

<h2 style={{textAlign:"center"}}>
Global AMR Resistance Map
</h2>

<button style={{
background:"#2a2f45",
border:"none",
padding:"10px 18px",
borderRadius:"20px",
color:"white"
}}>
Data </button>

</div>

{/* MAP CARD */}

<div style={{
background:"#1e1e2f",
padding:"30px",
borderRadius:"20px",
display:"flex",
justifyContent:"center"
}}>

<div style={{
width:"900px",
maxWidth:"100%"
}}>
<ResistanceMap/>
</div>

</div>

{/* EXPLANATION CARD */}

<div style={{
marginTop:"30px",
background:"#1e1e2f",
padding:"25px",
borderRadius:"20px"
}}>

<h3>About this Map</h3>

<p style={{
opacity:0.8,
lineHeight:"1.6"
}}>

This visualization displays predicted antimicrobial resistance levels
for fluoroquinolone antibiotics across different countries.

Darker colors represent higher predicted resistance rates based on
historical surveillance data and machine learning forecasting.

This helps identify geographic regions where resistance trends
are increasing and where antimicrobial stewardship interventions
may be required.

</p>

</div>

</div>

</div>

);

}

export default MapAnalysis;
