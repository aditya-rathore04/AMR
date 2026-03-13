import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputPage(){

const navigate = useNavigate();

const [year,setYear] = useState("");
const [country,setCountry] = useState("");
const [specimen,setSpecimen] = useState("Blood");
const [antibiotic,setAntibiotic] = useState("Ciprofloxacin");

const handleSubmit = (e)=>{
e.preventDefault();

navigate("/dashboard",{
state:{
year:Number(year),
country,
specimen,
antibiotic
}
});

};

return(

<div style={{
background:"#0f1117",
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
color:"white"
}}>

<div style={{
background:"#1e1e2f",
padding:"50px",
borderRadius:"20px",
width:"400px",
boxShadow:"0 15px 40px rgba(0,0,0,0.45)"
}}>

<h1 style={{
textAlign:"center",
marginBottom:"35px"
}}>
AMR Resistance Predictor
</h1>

<form
onSubmit={handleSubmit}
style={{
display:"flex",
flexDirection:"column",
gap:"18px"
}}
>

{/* YEAR */}

<input
type="number"
placeholder="Year"
value={year}
onChange={(e)=>setYear(e.target.value)}
required
style={{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"#2a2f45",
color:"white"
}}
/>

{/* COUNTRY */}

<input
type="text"
placeholder="Country"
value={country}
onChange={(e)=>setCountry(e.target.value)}
required
style={{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"#2a2f45",
color:"white"
}}
/>

{/* SPECIMEN DROPDOWN */}

<select
value={specimen}
onChange={(e)=>setSpecimen(e.target.value)}
style={{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"#2a2f45",
color:"white"
}}
>

<option value="Blood">Blood</option>
<option value="Urine">Urine</option>

</select>

{/* ANTIBIOTIC DROPDOWN */}

<select
value={antibiotic}
onChange={(e)=>setAntibiotic(e.target.value)}
style={{
padding:"12px",
borderRadius:"10px",
border:"none",
background:"#2a2f45",
color:"white"
}}
>

<option value="Ciprofloxacin">Ciprofloxacin</option>
<option value="Levofloxacin">Levofloxacin</option>

</select>

{/* BUTTON */}

<button
type="submit"
style={{
marginTop:"10px",
padding:"12px",
borderRadius:"12px",
border:"none",
background:"#5b7cfa",
color:"white",
fontWeight:"bold",
cursor:"pointer",
fontSize:"16px"
}}
>
Predict Resistance
</button>

</form>

</div>

</div>

);

}

export default InputPage;