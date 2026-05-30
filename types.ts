export interface ReasoningStep {
  step_number: number;
  title: string;
  description: string;
}

export interface BOMComponent {
  item_number: number;
  component_name: string;
  part_number?: string;
  description: string;
  quantity: number | string;
  specifications: string;
  estimated_unit_cost_usd?: string;
  supplier?: string;
}

export interface DesignChoice {
  topic: string;
  decision: string;
  rationale: string;
  trade_offs?: string;
}

export interface ElectricalSpec {
  parameter: string;
  value: string;
  unit: string;
  notes?: string;
}

export interface DesignVariant {
  variant_name: string;
  variant_description: string;
  project_summary: string;
  key_highlights: string[];
  cell: Record<string, string | number>;
  pack_configuration: Record<string, string | number>;
  bms: Record<string, string | number | string[]>;
  cooling: Record<string, string | string[]>;
  electrical_specs: ElectricalSpec[];
  design_choices: DesignChoice[];
  bom_table: BOMComponent[];
  total_estimated_cost_usd?: string;
  schematic_svg: string;
  notes: string[];
  certifications?: string[];
}

export interface MultiDesignResponse {
  reasoning_steps: ReasoningStep[];
  designs: DesignVariant[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  data?: MultiDesignResponse;
  isError?: boolean;
}
