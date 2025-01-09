export const category_choices: string[] = [
  "Critical NCO",
  "Critical NCO Product safety related",
  "First Time occurence NCP",
  "Internal Claim",
  "Less Critical NCO",
  "Material Quality Issue (IQC Detection)",
  "Material Quality Issue (Process Detection)",
  "Material Shortage",
  "Measuring Equipment Failure",
  "Mid Inspection Claim",
  "OQC Claim",
  "Planning Lapse",
  "Production Lapse",
  "Production Machine Failure",
  "Purchasing Lapse",
  "QC Lapse",
  "Server, IPOS failure",
  "System Deviation",
  "Trigger Limit",
  "WH Lapse",
];

export const area_choices: string[] = [
  "IP Line 1",
  "IP Line 2",
  "IP-CBF",
  "IP-ELement",
  "IP Prep",
  "IQC",
  "OQC",
  "MID QC",
  "WH",
];

export const area_colors: { [key: string]: string[] } = {
  "IP Line 1": ["#2f4f4f", "rgb(255,255,255)"],
  "IP Line 2": ["#228b22", "rgb(255,255,255)"],
  "IP-CBF": ["#7f0000", "rgb(255,255,255)"],
  "IP-ELement": ["#000080", "rgb(255,255,255)"],
  "IP Prep": ["#ff8c00", "rgb(255,255,255)"],
  IQC: ["#ffff00", "rgb(0,0,0)"],
  OQC: ["#00ff00", "rgb(255,255,255)"],
  "MID QC": ["#00ffff", "rgb(0,0,0)"],
  WH: ["#ff00ff", "rgb(255,255,255)"],
};

export const area_colors_ip: { [key: string]: string[] } = {
  "20CY": ["#2f4f4f", "rgb(255,255,255)"],
  "21MY": ["#228b22", "rgb(255,255,255)"],
  CT1: ["#7f0000", "rgb(255,255,255)"],
  CT2: ["#000080", "rgb(255,255,255)"],
  CT3: ["#ff8c00", "rgb(255,255,255)"],
  CT4: ["#ffff00", "rgb(0,0,0)"],
  OT: ["#00ff00", "rgb(255,255,255)"],
  PNT: ["#00ffff", "rgb(0,0,0)"],
  PZT: ["#ff00ff", "rgb(255,255,255)"],
  WH: ["#1e90ff", "rgb(255,255,255)"],
  IQC: ["#ffe4b5", "rgb(0,0,0)"],
  OQC: ["#ff69b4", "rgb(255,255,255)"],
};

export const status: string[] = [
  "CAR CREATION",
  "UNDER REVIEW",
  "APPROVED",
  "IMPLEMENTATION",
  "VALIDATION",
  "OPEN",
  "CLOSED",
];

export const SRorCAR: string[] = ["SELF RESOLVE", "FOR CAR"];
