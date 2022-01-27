import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = (props) => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  function setTooltip(geo) {
    const countryName = geo.properties.NAME
    const population = geo.properties.POP_EST
    const popYear = geo.properties.POP_YEAR

    const content = (
      <div>
        <b>{countryName}</b>
        <p>Population ({popYear}): {population.toLocaleString()}</p>
      </div>)

    props.setTooltipContent(content);
  }

  return (
    <ComposableMap
      projection="geoMercator"
      width={vw}
      height={vh - 50}
      style={{ paddingTop: 50 }}
      data-tip=""
    >
      <ZoomableGroup zoom={1}>
        {(
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = props.data.find((s) => s === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#A1A1A1"
                    onMouseEnter={() => setTooltip(geo)}
                    onMouseLeave={() => props.setTooltipContent("")}
                    style={{
                      default: {
                        fill: d ? "#76BA1B" : "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: d ? "#7DC916" : "#e4e4e4",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default memo(MapChart);