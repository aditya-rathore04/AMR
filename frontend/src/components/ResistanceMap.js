import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useState } from "react";

const geoUrl =
"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const resistanceData = {
  India: 34,
  Pakistan: 38,
  Norway: 12,
  Qatar: 21,
  Indonesia: 30,
  Myanmar: 28,
  Australia: 15,
  Argentina: 22
};

const colorScale = scaleLinear()
  .domain([0, 50])
  .range(["#dbeafe", "#1e3a8a"]);

function ResistanceMap() {

  const [tooltip, setTooltip] = useState("");

  return (

    <div style={{ position:"relative", width:"100%", height:"500px" }}>

      {/* Tooltip */}

      {tooltip && (

        <div style={{
          position:"absolute",
          top:"10px",
          left:"10px",
          background:"#1e1e2f",
          padding:"10px 14px",
          borderRadius:"10px",
          fontSize:"14px"
        }}>
          {tooltip}
        </div>

      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140 }}
        style={{ width:"100%", height:"100%" }}
      >

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {

              const country = geo.properties.name;
              const value = resistanceData[country];

              return (

                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={value ? colorScale(value) : "#2a2f45"}
                  stroke="#0f1117"

                  onMouseEnter={() => {
                    setTooltip(
                      value
                        ? `${country} — Resistance: ${value}%`
                        : `${country} — No Data`
                    );
                  }}

                  onMouseLeave={() => {
                    setTooltip("");
                  }}

                  style={{
                    default: { outline:"none" },
                    hover: { fill:"#5b7cfa", outline:"none" },
                    pressed: { outline:"none" }
                  }}

                />

              );

            })
          }
        </Geographies>

      </ComposableMap>

    </div>

  );

}

export default ResistanceMap;