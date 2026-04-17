"use client";
import { useEffect, useRef, useState } from "react";

interface Region {
  id: string;
  name: string;
  count: number;
  centroid: [number, number];
  datasets: string[];
  color: string;
}

interface MapData {
  regions: Region[];
  total: number;
  last_updated: string;
  note: string;
}

export default function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [selected, setSelected] = useState<Region | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [worldGeo, setWorldGeo] = useState<unknown>(null);

  const BASE = process.env.NODE_ENV === "production" ? "/ad-diversity-website" : "";

  useEffect(() => {
    fetch(`${BASE}/data/world-datasets.json`)
      .then((r) => r.json())
      .then(setMapData);
  }, [BASE]);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then(setWorldGeo);
  }, []);

  useEffect(() => {
    if (!mapData || !worldGeo || !svgRef.current) return;

    const drawMap = async () => {
      const d3 = await import("d3");
      const topojson = await import("topojson-client");

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const W = svgRef.current!.clientWidth || 800;
      const H = 420;
      svgRef.current!.setAttribute("height", String(H));

      const projection = d3
        .geoNaturalEarth1()
        .scale(W / 6.5)
        .translate([W / 2, H / 2]);

      const path = d3.geoPath().projection(projection);

      svg.append("rect").attr("width", W).attr("height", H).attr("fill", "#0a0618");

      const graticule = d3.geoGraticule();
      svg.append("path").datum(graticule()).attr("d", path).attr("fill", "none")
        .attr("stroke", "rgba(167,139,250,0.06)").attr("stroke-width", 0.5);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const countries = topojson.feature(worldGeo as any, (worldGeo as any).objects.countries);
      svg.append("g").selectAll("path")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .data((countries as any).features).join("path")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", (d: any) => path(d) || "")
        .attr("fill", "#1a0f35").attr("stroke", "rgba(109,40,217,0.2)").attr("stroke-width", 0.4);

      const maxCount = Math.max(...mapData.regions.map((r) => r.count));
      const radiusScale = d3.scaleSqrt().domain([0, maxCount]).range([0, 55]);

      const bubbleG = svg.append("g");

      mapData.regions.forEach((region) => {
        const [lon, lat] = region.centroid;
        const proj = projection([lon, lat]);
        if (!proj) return;
        const [x, y] = proj;
        const r = radiusScale(region.count);
        const isSelected = selected?.id === region.id;
        const isHovered = hovered === region.id;

        bubbleG.append("circle").attr("cx", x).attr("cy", y).attr("r", r + 8)
          .attr("fill", region.color).attr("opacity", 0.12);

        bubbleG.append("circle").attr("cx", x).attr("cy", y).attr("r", r)
          .attr("fill", region.color).attr("fill-opacity", isSelected || isHovered ? 0.85 : 0.55)
          .attr("stroke", isSelected ? "white" : region.color)
          .attr("stroke-width", isSelected ? 2 : 1).attr("cursor", "pointer")
          .on("mouseenter", () => setHovered(region.id))
          .on("mouseleave", () => setHovered(null))
          .on("click", () => setSelected(selected?.id === region.id ? null : region));

        if (r > 14) {
          bubbleG.append("text").attr("x", x).attr("y", y + 1)
            .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
            .attr("fill", "white").attr("font-size", r > 28 ? "13" : "10")
            .attr("font-weight", "700").attr("pointer-events", "none").text(region.count);
        }

        if (r > 20) {
          bubbleG.append("text").attr("x", x).attr("y", y + r + 14)
            .attr("text-anchor", "middle").attr("fill", "#DDD6FE")
            .attr("font-size", "9").attr("font-weight", "500")
            .attr("pointer-events", "none").text(region.name);
        }
      });
    };

    drawMap();
  }, [mapData, worldGeo, selected, hovered, BASE]);

  return (
    <div className="w-full">
      <div className="relative rounded-xl overflow-hidden border"
        style={{ borderColor: "rgba(167,139,250,0.2)", background: "#0a0618" }}>
        {!mapData || !worldGeo ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-violet-400 text-sm animate-pulse">Loading map…</div>
          </div>
        ) : (
          <svg ref={svgRef} className="w-full" style={{ display: "block" }} />
        )}

        {mapData && (
          <div className="absolute bottom-3 left-3 glass-card rounded-lg p-3 text-xs">
            <p className="text-violet-300 font-semibold mb-2">Bubble size ∝ datasets available</p>
            <div className="flex items-center gap-3">
              {[5, 12, 22].map((n) => (
                <div key={n} className="flex flex-col items-center gap-1">
                  <div className="rounded-full bg-violet-500 opacity-60"
                    style={{ width: `${Math.sqrt(n / 22) * 28 + 8}px`, height: `${Math.sqrt(n / 22) * 28 + 8}px` }} />
                  <span className="text-gray-400">{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="mt-4 glass-card rounded-xl p-5 border" style={{ borderColor: selected.color + "50" }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-base font-bold" style={{ color: selected.color }}>{selected.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{selected.count} documented datasets</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-lg leading-none">×</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selected.datasets.map((ds) => (
              <span key={ds} className="px-2 py-0.5 rounded-md text-xs font-medium text-gray-200"
                style={{ background: selected.color + "25", border: `1px solid ${selected.color}40` }}>
                {ds}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Click a bubble to explore datasets. Full details in the{" "}
            <a href={`${BASE}/part2/datasets`} className="text-violet-400 underline">Dataset Catalogue</a>.
          </p>
        </div>
      )}

      {/* Region summary cards */}
      {mapData && !selected && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mapData.regions.map((r) => (
            <button key={r.id} onClick={() => setSelected(r)}
              className="glass-card rounded-lg p-3 text-left hover:border-violet-600 transition-all text-xs border"
              style={{ borderColor: r.color + "30" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                <span className="font-medium text-gray-300 truncate">{r.name}</span>
              </div>
              <span className="text-lg font-bold" style={{ color: r.color }}>{r.count}</span>
              <span className="text-gray-500 ml-1">datasets</span>
            </button>
          ))}
        </div>
      )}

      {mapData && (
        <p className="text-xs text-gray-600 mt-3 text-center italic">
          {mapData.note} · Last updated {mapData.last_updated}.
        </p>
      )}
    </div>
  );
}
