import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useEffect, useState } from "react";
import axios from "axios";

const geoUrl =
"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const colorScale = scaleLinear()
  .domain([0, 80])
  .range(["#dbeafe", "#1e3a8a"]);

function ResistanceMap() {

  const [mapData, setMapData] = useState({});
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/map-data")
      .then((res) => {
        setMapData(res.data);
      });

  }, []);

  return (

    <div>

      <ComposableMap projectionConfig={{ scale: 160 }}>

        <Geographies geography={geoUrl}>

          {({ geographies }) =>
            geographies.map((geo) => {

              const country = geo.properties.name;
              const value = mapData[country];

              return (

                <Geography
                  key={geo.rsmKey}
                  geography={geo}

                  fill={value ? colorScale(value) : "#2a2f45"}

                  stroke="#0f1117"

                  onMouseEnter={() => {
                    setTooltip(
                      value
                        ? `${country} — ${value.toFixed(1)}% resistance`
                        : `${country} — no data`
                    );
                  }}

                  onMouseLeave={() => {
                    setTooltip("");
                  }}

                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#5b7cfa", outline: "none" },
                    pressed: { outline: "none" }
                  }}

                />

              );

            })
          }

        </Geographies>

      </ComposableMap>
      <div style={{
        display:"flex",
        justifyContent:"center",
        marginTop:"20px",
        gap:"10px",
        alignItems:"center"
        }}>

        <span style={{fontSize:"12px"}}>Low</span>

        <div style={{
        width:"200px",
        height:"10px",
        background:"linear-gradient(to right,#dbeafe,#1e3a8a)",
        borderRadius:"10px"
        }}></div>

        <span style={{fontSize:"12px"}}>High</span>

        </div>

      <div style={{
        textAlign:"center",
        marginTop:"20px",
        fontSize:"18px",
        fontWeight:"500",
        minHeight:"30px"
        }}>
        {tooltip}
        </div>

    </div>

  );

}

export default ResistanceMap;