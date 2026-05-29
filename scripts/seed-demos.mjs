// scripts/seed-demos.mjs
// Two-stage per variant: Stage 1 = JSON data, Stage 2 = SVG schematic
// Total: 18 API calls (3 prompts × 3 variants × 2 stages)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Run: $env:OPENAI_API_KEY="sk-proj-..."; node scripts/seed-demos.mjs
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
if (!OPENAI_API_KEY) { console.error("[seed] ERROR: OPENAI_API_KEY not set."); process.exit(1); }

const OUT_FILE = path.join(__dirname, "../src/lib/demo-cache.json");

// ── DEMO PROMPTS ──────────────────────────────────────────────────────────────
const DEMO_PROMPTS = [
  {
    label: "48V 100Ah Rack-Mount Battery Pack",
    prompt: "Design a 48V 100Ah rack-mount battery pack for telecom backup power (BTS/tower). Integrated BMS with 100A continuous discharge, MCB 125A, WiFi remote monitoring, LCD display, 19-inch rack-mount enclosure. Outdoor telecom cabinet, -48V DC UPS backup.",
  },
  {
    label: "72V Heavy-Duty Electric Motorcycle",
    prompt: "Design a 72V battery pack and BMS for a heavy-duty electric motorcycle. 150+ km highway range. 8.0 kW nominal motor, 18 kW peak surges. ~6.0 kWh energy. Under 35 kg total pack weight. Forced air cooling. CAN bus for vehicle ECU integration.",
  },
  {
    label: "48V Swappable Delivery Scooter Pack",
    prompt: "Design a 48V swappable battery pack for a light-duty delivery scooter. 80 km urban range. 1.5 kW hub motor, 3.5 kW peak. ~2.0 kWh. Strictly under 12 kg for manual swapping. Passive cooling only.",
  },
];

// ── VARIANT MANDATES ──────────────────────────────────────────────────────────
const VARIANT_MANDATES = {
  "Cost Optimized": {
    cells: "LiFePO4 prismatic (EVE LF280K or CATL LiFePO4) — lower energy density but >3000 cycles, safest chemistry",
    bms: "TI BQ76952 with passive balancing (100mA/cell, dissipative)",
    cooling: "Passive aluminum heat spreader plate only — no fans, no liquid",
    mosfets: "Standard N-ch power MOSFETs (IRFB4115PBF or STF60N65M5)",
    comms: "ESP32-WROOM-32E (WiFi 802.11n) + RS485 Modbus RTU",
    enclosure: "Standard off-the-shelf aluminum 19-inch rack enclosure",
    focus: "MINIMUM cost. Use commodity components. Sacrifice energy density for cost and cycle life.",
  },
  "Performance Optimized": {
    cells: "NMC 21700 cylindrical (Samsung INR21700-50E or LG INR21700-M50LT) — 250+ Wh/kg, 5A max continuous per cell",
    bms: "Analog Devices ADBMS1818 with active balancing (inductor-based, 500mA+ per cell)",
    cooling: "Active forced-air: dual 120mm fans + extruded aluminum heatsink fins OR liquid cold plate",
    mosfets: "SiC MOSFETs or ultra-low-Rds devices (Infineon IPT60R022G7 or ON Semi NVHL080N65S3)",
    comms: "Multi-protocol: CAN 2.0B (MCP2562) + WiFi ESP32 + LTE-M modem (SIM7080G)",
    enclosure: "Custom precision-machined 6061-T6 aluminum with integrated cooling channels",
    focus: "MAXIMUM performance. Highest energy density, fastest charge, lowest internal resistance. Cost is secondary.",
  },
  "Space Optimized": {
    cells: "NMC pouch cells (Samsung SDI 94Ah prismatic pouch or LG Chem LGX E78) OR high-density 18650 in slim arrangement — minimum volume priority",
    bms: "Compact modular BMS — Renesas ISL94212IRTZ (SMD, tiny footprint) or Maxim MAX17843",
    cooling: "Phase-change material (PCM) pads between cells + thin 2mm aluminum thermal spreader. No fans.",
    mosfets: "Ultra-compact SMD MOSFETs in QFN/LGA packages (Infineon BSC010NE2LS5I or CSD18543Q3A)",
    comms: "BLE 5.0 (nRF52840 module) + CAN bus only — no bulky WiFi antenna module",
    enclosure: "Custom thin-wall (1.5mm) 5052 aluminum sheet metal box, minimum clearance design",
    focus: "MINIMUM weight and volume. Accept slightly lower capacity. Every gram and mm matters.",
  },
};

// ── STAGE 1: FETCH VARIANT DATA (no SVG) ──────────────────────────────────────
async function fetchVariantData(appPrompt, variantName) {
  const m = VARIANT_MANDATES[variantName];

  const system = `You are AEDI, a professional battery pack design AI. Generate ONLY the "${variantName}" design variant.

MANDATORY COMPONENT CHOICES FOR THIS VARIANT:
- Cells: ${m.cells}
- BMS IC: ${m.bms}
- Cooling: ${m.cooling}
- Power MOSFETs: ${m.mosfets}
- Communication: ${m.comms}
- Enclosure: ${m.enclosure}
- Design focus: ${m.focus}

Respond with ONLY a JSON object (no markdown, no preamble):
{
  "variant_name": "${variantName}",
  "variant_description": "one sentence core philosophy",
  "project_summary": "4 sentences: design approach, key component decisions, suitability for application",
  "key_highlights": ["Cell model + config", "BMS IC + balancing type", "Cooling approach + key spec", "Total cost estimate"],
  "cell": {
    "manufacturer": "exact name",
    "model": "exact part number",
    "chemistry": "LiFePO4 / NMC / NCA",
    "form_factor": "Prismatic / Cylindrical 21700 / Pouch / Cylindrical 18650",
    "nominal_voltage": "X.XV",
    "capacity": "XXXAh",
    "max_continuous_discharge": "X.XC = XXXA",
    "max_charge_rate": "0.XC",
    "cycle_life": ">XXXX cycles at 80% DoD",
    "operating_temp": "-XX°C to +XX°C",
    "energy_density": "XXX Wh/kg",
    "internal_resistance_dc": "<X.XmΩ per cell"
  },
  "pack_configuration": {
    "series_cells": "XS",
    "parallel_cells": "XP",
    "total_cells": "XX",
    "nominal_voltage": "XXV",
    "max_charge_voltage": "XX.XXV",
    "min_cutoff_voltage": "XXV",
    "total_capacity": "XXXAh",
    "energy_content": "XX.X kWh",
    "usable_energy": "XX.X kWh at 90% DoD",
    "pack_weight_kg": "~XX kg",
    "dimensions_mm": "XXX x XXX x XXX mm"
  },
  "bms": {
    "ic_model": "exact part number from mandate",
    "ic_manufacturer": "manufacturer",
    "topology": "Centralized / Distributed / Modular",
    "max_cell_count": "up to XX series",
    "continuous_current_A": "XXA",
    "peak_current_A": "XXXA for Xs",
    "cell_balancing": "Passive XXmA dissipative / Active XXXmA inductor-based",
    "balancing_threshold_mV": "±XmV",
    "ovp_threshold": "X.XXV per cell",
    "uvp_threshold": "X.XXV per cell",
    "ocp_threshold": "XXXA hardware cutoff",
    "otp_threshold": "XX°C cell cutoff",
    "scp_response_time": "<Xms",
    "communication_interfaces": "exact interfaces",
    "pcb_layers": "X-layer, Xoz copper",
    "isolation": "galvanic isolation on comms / none"
  },
  "cooling": {
    "method": "exact cooling type",
    "primary_component": "specific material/product with dimensions",
    "thermal_interface_material": "specific TIM product + thickness",
    "max_cell_temp_full_load_C": "XX°C",
    "max_ambient_C": "XX°C",
    "thermal_runaway_mitigation": "description",
    "pressure_relief": "yes/no + method"
  },
  "electrical_specs": [
    {"parameter": "Nominal Pack Voltage", "value": "XX", "unit": "V", "notes": "XS config"},
    {"parameter": "Max Charge Voltage", "value": "XX.XX", "unit": "V", "notes": "X.XXV/cell"},
    {"parameter": "Min Discharge Cutoff", "value": "XX", "unit": "V", "notes": "X.XXV/cell"},
    {"parameter": "Continuous Discharge", "value": "XXX", "unit": "A"},
    {"parameter": "Peak Discharge", "value": "XXX", "unit": "A", "notes": "Xs burst"},
    {"parameter": "Max Charge Current", "value": "XX", "unit": "A", "notes": "X.XC rate"},
    {"parameter": "Total Energy", "value": "XX.X", "unit": "kWh"},
    {"parameter": "Usable Energy", "value": "XX.X", "unit": "kWh", "notes": "90% DoD"},
    {"parameter": "Pack Internal Resistance", "value": "<X", "unit": "mΩ"},
    {"parameter": "Round-Trip Efficiency", "value": ">XX", "unit": "%"},
    {"parameter": "Self-Discharge", "value": "<X", "unit": "% per month"}
  ],
  "design_choices": [
    {"topic": "Cell Selection", "decision": "specific decision", "rationale": "2-sentence technical rationale", "trade_offs": "what is sacrificed vs other variants"},
    {"topic": "BMS IC & Balancing", "decision": "specific decision", "rationale": "2-sentence rationale", "trade_offs": "cost/complexity trade-off"},
    {"topic": "Thermal Management", "decision": "specific decision", "rationale": "thermal analysis rationale", "trade_offs": "what is compromised"},
    {"topic": "Protection MOSFETs", "decision": "specific MOSFET type", "rationale": "current rating and Rds(on) selection rationale", "trade_offs": "SMD vs through-hole, cost vs size"},
    {"topic": "Communication Stack", "decision": "specific protocols chosen", "rationale": "application requirement matching", "trade_offs": "complexity vs capability"}
  ],
  "bom_table": [
    {"item_number": 1, "component_name": "name", "part_number": "exact PN", "description": "full description", "quantity": 1, "specifications": "key specs", "estimated_unit_cost_usd": "$X.XX", "supplier": "mfr/distributor"},
    // MUST have exactly 15 items: cells, BMS IC, discharge MOSFET(s), charge MOSFET(s), current shunt, fuse/MCB, pre-charge resistor, main contactor, DC-DC converter for BMS, communication module, display, thermistors (qty 5), busbars/interconnects, enclosure, output connector/terminal block
  ],
  "total_estimated_cost_usd": "$XXX - $XXX",
  "notes": [
    "Specific engineering note 1",
    "Specific engineering note 2",
    "Testing/commissioning recommendation",
    "Safety standard compliance (UN38.3, IEC 62133-2, etc.)"
  ],
  "certifications": ["UN 38.3", "IEC 62133-2", "UL 1973"]
}

RULES: Return ONLY the JSON. No markdown. Use real part numbers and 2024 market prices. Calculate all values from the actual cell model.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 6000,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Application: ${appPrompt}\n\nGenerate complete ${variantName} design data.` },
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const api = await res.json();
  console.log(`    Data tokens: ${api.usage?.prompt_tokens}p + ${api.usage?.completion_tokens}c`);
  const raw = api.choices?.[0]?.message?.content ?? "";
  const clean = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  const fb = clean.indexOf("{"); const lb = clean.lastIndexOf("}");
  return JSON.parse(clean.slice(fb, lb + 1));
}

// ── STAGE 2: FETCH SVG SCHEMATIC ONLY ─────────────────────────────────────────
async function fetchVariantSVG(appPrompt, variantName, designData) {
  const m = VARIANT_MANDATES[variantName];

  const prompt = `Draw a professional battery pack electrical circuit schematic as an SVG for a "${variantName}" design.

Application: ${appPrompt}
Cell: ${designData.cell?.model ?? m.cells.split("(")[0].trim()} — ${designData.pack_configuration?.series_cells ?? "15S"}${designData.pack_configuration?.parallel_cells ?? "1P"} configuration
BMS IC: ${designData.bms?.ic_model ?? "BMS IC"}
Main MOSFET: from design — ${m.mosfets.split("(")[1]?.replace(")", "") ?? "Power MOSFET"}
Cooling: ${designData.cooling?.method ?? m.cooling.split("—")[0].trim()}
Nominal Voltage: ${designData.pack_configuration?.nominal_voltage ?? "48V"}
Continuous Current: ${designData.bms?.continuous_current_A ?? "100A"}

Return ONLY the raw SVG XML string. No JSON wrapper. No markdown. No explanation. Start with <svg and end with </svg>.

SVG REQUIREMENTS:
- viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg"
- Background: <rect width="900" height="520" fill="#12100e"/>
- Title text at top: "Battery Pack Circuit — ${variantName}" in fill="#EAC97C" font-size="13" font-family="monospace" font-weight="bold" x="20" y="22"

DRAW THESE CIRCUIT ELEMENTS using proper electrical schematic symbols:

1. CELL STACK (left side, x=40-140, y=120-400):
   Draw 4 battery cell symbols stacked vertically. Each cell = two horizontal lines: long line (positive, length 20) and short line (negative, length 12), centered on x=90. Space them 55px apart. Label first one "+${designData.pack_configuration?.nominal_voltage ?? "48V"}" and last one "GND" in fill="#EAC97C" font-size="10". Add bracket "}" and label "${designData.pack_configuration?.series_cells ?? "15S"}${designData.pack_configuration?.parallel_cells ?? "1P"} Cell Stack\n${designData.cell?.model ?? "Cell"}" to the right of cells in fill="#EAC97C" font-size="9".

2. MAIN FUSE (x=200, y=180):
   Draw fuse symbol: rectangle 30x14 with horizontal line through center. Label "F1\n125A" below in fill="#ff9f43" font-size="9".

3. MAIN CONTACTOR / RELAY (x=280, y=170):
   Draw contactor: two circles (radius 6) connected by a gap with a line above (switch symbol). Label "K1\nContactor" below in fill="#C8BAA6" font-size="9".

4. PRE-CHARGE (x=280, y=240):
   Small resistor (zigzag: 5 peaks, width 30px) + small circle (NO contact) in series. Label "R_pre\n10Ω 50W" in fill="#C8BAA6" font-size="9".

5. DISCHARGE MOSFET Q1 (x=380, y=150):
   Draw N-channel MOSFET symbol: vertical line x=395 from y=130 to y=210. Horizontal line from x=380 to x=395 at y=170 (drain). Arrow pointing right from x=380 to x=392 at y=185 with vertical line from y=175 to y=195 at x=392 (body diode implied). Gate horizontal line at x=365 to x=378 at y=180 with vertical at x=378 from y=155 to y=205. Source horizontal at x=380 to x=395 at y=200. 
   Actually: use a simplified MOSFET symbol — draw a rectangle 24x44 at (371,158), inside write "Q1" in fill="#fff" font-size="8". Three leads: Gate (left, at y=180), Drain (top, at x=383), Source (bottom, at x=383). Label part number below: "${m.mosfets.split("(")[1]?.split(")")[0] ?? "MOSFET"}" in fill="#EAC97C" font-size="8". Label "DSG FET" above in fill="#0E7490" font-size="9".

6. CHARGE MOSFET Q2 (x=380, y=250):
   Same simplified MOSFET rectangle 24x44. Label "Q2" inside, "CHG FET" above in fill="#059669" font-size="9". Part number below.

7. CURRENT SHUNT (x=480, y=180):
   Zigzag resistor symbol (6 peaks, width=35) horizontal. Label "R_shunt\n0.1mΩ" above in fill="#C8BAA6" font-size="9". Label "SRP  SRN" below the two terminals in fill="#0E7490" font-size="8".

8. BMS IC (center-bottom, x=300-580, y=320-440):
   Large rectangle. Fill with slight tint. Label "${designData.bms?.ic_model ?? "BMS IC"}\n${designData.bms?.ic_manufacturer ?? ""}" centered in fill="#fff" font-size="10" font-weight="bold". 
   Left-side pins (small horizontal lines extending left, labeled right-to-left): "VC1" "VC2" "VC3" "VCN" "GND" — in fill="#0E7490" font-size="8"
   Right-side pins: "GATE_DSG" "GATE_CHG" "TEMP1" "TEMP2" — in fill="#0E7490" font-size="8"
   Top pins: "VCC" "SRP" "SRN" — in fill="#0E7490" font-size="8"
   Bottom pin: "COMM (${designData.bms?.communication_interfaces?.split("+")[0] ?? "CAN/WiFi"})" in fill="#059669" font-size="8"
   Label "BMS Controller" above rect in fill="#0E7490" font-size="11" font-weight="bold".

9. THERMISTORS (3x NTC, near cell stack):
   Three small squares (8x8) at y=150, y=220, y=290 at x=145. Label "NTC" in fill="#8F7E5E" font-size="7" each. Dashed lines going to BMS TEMP pins.

10. COMMUNICATION MODULE (top-right, x=680-820, y=60-130):
    Rectangle with label "${m.comms.split("(")[0].trim()}" in fill="#059669" font-size="9". Label "COMM\nMODULE" centered in fill="#fff" font-size="10". Antenna symbol (vertical line + 3 curved arcs) on top if WiFi.

11. OUTPUT TERMINALS (far right, x=820-870):
    Two rectangles: one at y=170 labeled "+" in fill="#EAC97C" and "LOAD +" in fill="#EAC97C" font-size="9". One at y=300 labeled "—" in fill="#C8BAA6" and "LOAD —" font-size="9".

12. CHARGER PORT (right side, x=820, y=420):
    Rectangle labeled "J_CHG" and "CHARGER\nINPUT" in fill="#059669" font-size="9".

WIRES:
- Main power bus: stroke="#EAC97C" stroke-width="2.5" (positive rail at y=165, negative rail at y=310)
- Positive rail: horizontal line from cell+ (x=140) → fuse → contactor → Q1 drain → shunt → OUTPUT+
- Negative rail: horizontal line from cell- (x=140) → Q2 source → OUTPUT-
- BMS signal wires (cell voltage sensing): stroke="#0E7490" stroke-width="1" stroke-dasharray="3,2" from BMS left pins up to cell tap points on vertical
- Gate drive wires: stroke="#059669" stroke-width="1" from BMS GATE_DSG/CHG pins to Q1/Q2 gates
- Communication wire: stroke="#059669" stroke-width="1" stroke-dasharray="4,2" from BMS COMM pin up to COMM MODULE
- Ground return: stroke="#C8BAA6" stroke-width="1.5" at bottom (y=400) connecting cell- to BMS GND to output GND

VOLTAGE LABELS on rails:
- Near cell+: "${designData.pack_configuration?.max_charge_voltage ?? "54.75V"} max" fill="#EAC97C" font-size="9"
- Near output+: "${designData.pack_configuration?.nominal_voltage ?? "48V"} nominal" fill="#EAC97C" font-size="9"
- Near shunt: "${designData.bms?.continuous_current_A ?? "100A"} cont." fill="#C8BAA6" font-size="8"

LEGEND (bottom-right corner x=650, y=460):
Small legend box showing: yellow line = "Power conductors", teal dashed = "BMS signals", green = "Control/Comms"`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 6000,
      temperature: 0.1,
      messages: [
        { role: "system", content: "You are an expert SVG circuit schematic generator. Return ONLY raw SVG XML code. No JSON, no markdown, no explanation. Start your response with <svg and end with </svg>." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenAI SVG ${res.status}: ${await res.text()}`);
  const api = await res.json();
  console.log(`    SVG tokens: ${api.usage?.prompt_tokens}p + ${api.usage?.completion_tokens}c`);
  let svg = api.choices?.[0]?.message?.content?.trim() ?? "";
  // Strip any markdown wrappers
  svg = svg.replace(/^```(?:svg|xml)?\s*/i, "").replace(/\s*```\s*$/, "");
  const si = svg.indexOf("<svg"); const ei = svg.lastIndexOf("</svg>");
  if (si !== -1 && ei !== -1) svg = svg.slice(si, ei + 6);
  console.log(`    SVG length: ${svg.length} chars | Valid: ${svg.startsWith("<svg") ? "✓" : "✗"}`);
  return svg;
}

// ── SHARED REASONING STEPS ─────────────────────────────────────────────────────
const REASONING_STEPS = [
  { step_number: 1, title: "Parsing Requirements", description: "Extracting and validating all key parameters: nominal voltage, energy and capacity targets, peak and continuous current demands, weight and size constraints, environmental conditions, and communication requirements." },
  { step_number: 2, title: "Cell Chemistry Evaluation", description: "Comparing LiFePO4, NMC 811, NCA, and LTO electrochemistries across energy density (Wh/kg), cycle life, max C-rate capability, thermal stability, operating temperature range, and 2024 unit cost per Wh." },
  { step_number: 3, title: "Pack Configuration Synthesis", description: "Computing optimal series (S) and parallel (P) cell arrangement to achieve target pack voltage and energy content. Verifying cell-level current demand stays within max continuous discharge with adequate thermal derating margin." },
  { step_number: 4, title: "BMS Architecture Selection", description: "Evaluating BMS IC families — TI BQ76xxx, Analog Devices ADBMS18xx, Renesas ISL94xxx, Maxim MAX178xx — for cell count support, balancing current capability, protection response times, and communication peripheral compatibility." },
  { step_number: 5, title: "Protection Circuit Design", description: "Sizing protection MOSFETs for worst-case short-circuit current and Rds(on) conduction losses. Specifying OVP, UVP, OCP, SCP, and OTP thresholds. Calculating pre-charge resistor and main contactor specifications." },
  { step_number: 6, title: "Thermal Analysis & Cooling Design", description: "Modeling I²R heat dissipation in cells, busbars, and MOSFETs at peak load. Selecting cooling strategy (passive plate, forced air, liquid cold plate, or phase-change material) to maintain cell temperature below chemistry-specific safety limit." },
  { step_number: 7, title: "BOM Generation & Cost Optimisation", description: "Sourcing real components from Mouser, Digi-Key, and manufacturer channels with exact part numbers. Cross-referencing 2024 distributor pricing for all 15+ line items. Optimizing total pack cost per variant philosophy." },
  { step_number: 8, title: "Circuit Schematic Generation", description: "Producing a detailed electrical circuit schematic for each variant showing the complete protection topology: cell stack → fuse → pre-charge → contactors → discharge and charge MOSFETs → current shunt → output terminals, with BMS IC signal routing and communication module integration." },
];

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("[seed] Two-stage seed: Stage1=Data, Stage2=SVG (18 total API calls)");
  console.log(`[seed] Output: ${OUT_FILE}\n`);

  const VARIANTS = ["Cost Optimized", "Performance Optimized", "Space Optimized"];
  const cache = [];

  for (let pi = 0; pi < DEMO_PROMPTS.length; pi++) {
    const { label, prompt } = DEMO_PROMPTS[pi];
    console.log(`\n=== Prompt ${pi + 1}/3: "${label}" ===`);
    const designs = [];

    for (let vi = 0; vi < VARIANTS.length; vi++) {
      const vname = VARIANTS[vi];
      console.log(`\n  [Variant ${vi + 1}/3] ${vname}`);

      // Stage 1: data
      console.log("  Stage 1: Fetching design data...");
      const data = await fetchVariantData(prompt, vname);
      data.variant_name = vname; // ensure correct

      // Stage 2: SVG
      console.log("  Stage 2: Generating circuit schematic SVG...");
      const svg = await fetchVariantSVG(prompt, vname, data);
      data.schematic_svg = svg;

      const bomOk = (data.bom_table?.length ?? 0);
      const specsOk = (data.electrical_specs?.length ?? 0);
      const svgOk = svg.startsWith("<svg");
      console.log(`  ✓ ${vname}: BOM=${bomOk} | Specs=${specsOk} | SVG=${svgOk ? "✓" : "✗"}`);

      designs.push(data);

      if (vi < VARIANTS.length - 1) { console.log("  Waiting 2s..."); await new Promise(r => setTimeout(r, 2000)); }
    }

    cache.push({ index: pi, label, prompt, response: { reasoning_steps: REASONING_STEPS, designs }, cached_at: new Date().toISOString() });
    if (pi < DEMO_PROMPTS.length - 1) { console.log("\n[seed] Waiting 4s before next prompt..."); await new Promise(r => setTimeout(r, 4000)); }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(cache, null, 2), "utf-8");
  console.log(`\n[seed] ✅ Done! Wrote ${cache.length} demos to ${OUT_FILE}`);

  // Final summary
  console.log("\n[seed] FINAL VERIFICATION:");
  cache.forEach(e => {
    console.log(`  Prompt ${e.index}: ${e.label}`);
    e.response.designs.forEach(d => {
      console.log(`    • ${d.variant_name}: BOM=${d.bom_table?.length ?? 0} | SVG=${d.schematic_svg?.startsWith("<svg") ? "✓" : "✗"} (${d.schematic_svg?.length ?? 0} chars) | Cell=${d.cell?.model ?? "?"}`);
    });
  });
}

main().catch(err => { console.error("[seed] FATAL:", err.message); process.exit(1); });
