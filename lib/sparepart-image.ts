// Themed stock automotive photos keyed by part category.
//
// Uses loremflickr (keyword-matched Creative-Commons photos) so every part shows
// a real, relevant image without an API key. `source.unsplash.com` is no longer
// available (503) and the Unsplash API needs a server-side key — if one is added
// later, swap `urlFor` to hit images.unsplash.com. The <img onError> handlers in
// the cards still fall back to a placeholder if a fetch ever fails.

const categories: { match: RegExp; kw: string }[] = [
  { match: /oli|oil|pelumas/i, kw: "motor,oil" },
  { match: /ban\b|tire|tyre/i, kw: "car,tire" },
  { match: /aki|accu|batter/i, kw: "car,battery" },
  { match: /busi|spark/i, kw: "spark,plug" },
  { match: /rem|brake|cakram|disc|kampas rem/i, kw: "brake,disc" },
  { match: /filter/i, kw: "engine,filter" },
  { match: /lampu|light|led|headlight/i, kw: "car,headlight" },
  { match: /rantai|chain/i, kw: "motorcycle,chain" },
  { match: /shock|suspensi|suspension|sokbreker|shockbreaker/i, kw: "car,suspension" },
  { match: /kopling|clutch/i, kw: "car,clutch" },
  { match: /radiator|coolant/i, kw: "car,radiator" },
  { match: /velg|wheel|pelek/i, kw: "car,wheel" },
  { match: /knalpot|exhaust|muffler/i, kw: "car,exhaust" },
]

const DEFAULT_KW = "car,spare,parts"

// Deterministic per-id so the same part always renders the same photo.
function lockFor(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 100000
  return h + 1
}

export function sparepartImage(nama: string, id = nama): string {
  const found = categories.find((c) => c.match.test(nama))
  const kw = found ? found.kw : DEFAULT_KW
  return `https://loremflickr.com/400/300/${kw}?lock=${lockFor(id)}`
}
