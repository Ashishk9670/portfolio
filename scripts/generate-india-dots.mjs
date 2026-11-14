// One-off: builds src/lib/geo/indiaLandDots.json — a grid of land dots over the Indian
// subcontinent for the biodata map. Input is Natural Earth land (world-atlas land-50m.json,
// public domain): land only, no country borders.
// Usage: node scripts/generate-india-dots.mjs /path/to/land-50m.json
import fs from "node:fs";

const [input] = process.argv.slice(2);
if (!input) throw new Error("Pass the path to land-50m.json");

const BOUNDS = { west: 67.5, east: 97.5, south: 7.5, north: 36.5 };
const STEP = 0.5;

const topo = JSON.parse(fs.readFileSync(input, "utf8"));
const { scale, translate } = topo.transform;

// Delta-decoded, quantization-reversed arcs.
const arcs = topo.arcs.map((arc) => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
});

function ring(indexes) {
  const points = [];
  for (const i of indexes) {
    const arc = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
    points.push(...(points.length ? arc.slice(1) : arc));
  }
  return points;
}

const polygons = [];
for (const geom of topo.objects.land.geometries) {
  const polys = geom.type === "Polygon" ? [geom.arcs] : geom.type === "MultiPolygon" ? geom.arcs : [];
  for (const poly of polys) polygons.push(poly.map(ring));
}

// Keep only polygons whose bounding box touches the map area.
const nearby = polygons
  .map((rings) => {
    const xs = rings[0].map((p) => p[0]);
    const ys = rings[0].map((p) => p[1]);
    return { rings, minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
  })
  .filter((p) => p.maxX >= BOUNDS.west && p.minX <= BOUNDS.east && p.maxY >= BOUNDS.south && p.minY <= BOUNDS.north);

function inRing([x, y], pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const isLand = (pt) =>
  nearby.some(
    (p) =>
      pt[0] >= p.minX && pt[0] <= p.maxX && pt[1] >= p.minY && pt[1] <= p.maxY && inRing(pt, p.rings[0]) && !p.rings.slice(1).some((hole) => inRing(pt, hole))
  );

const dots = [];
for (let lat = BOUNDS.south; lat <= BOUNDS.north + 1e-9; lat += STEP) {
  for (let lon = BOUNDS.west; lon <= BOUNDS.east + 1e-9; lon += STEP) {
    const pt = [Math.round(lon * 100) / 100, Math.round(lat * 100) / 100];
    if (isLand(pt)) dots.push(pt);
  }
}

fs.writeFileSync("src/lib/geo/indiaLandDots.json", JSON.stringify({ bounds: BOUNDS, step: STEP, dots }) + "\n");
console.log(`wrote ${dots.length} dots to src/lib/geo/indiaLandDots.json`);
