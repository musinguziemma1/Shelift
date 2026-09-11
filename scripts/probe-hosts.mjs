/* Probe raw CDN hosts for the four candidate photo IDs. */
const ids = [
  "photo-1661719530029-99f37f8b700d",
  "photo-1683121523671-9617aba661d7",
  "photo-1616805765352-beedbad46b2a",
  "photo-1661301214463-bdd017b73253",
];
const queries = [
  "black+businesswoman+office",
  "black+businessman+suit",
  "african+businessman+suit",
  "african+man+suit+portrait",
  "african+businesswoman+corporate",
];
for (const q of queries) {
  const r = await fetch("https://unsplash.com/napi/search/photos?query=" + q + "&per_page=20");
  if (!r.ok) {
    console.log(q + " HTTP " + r.status);
    continue;
  }
  const j = await r.json();
  for (const p of j.results) {
    const raw = p.urls.raw || "";
    const hit = ids.find((id) => raw.includes(id));
    if (hit) {
      console.log("FOUND " + hit + " via " + q);
      console.log("  raw=" + raw.slice(0, 160));
      console.log("  alt=" + (p.alt_description || "").slice(0, 100) + " | by " + p.user.name);
    }
  }
}
console.log("probe done");
