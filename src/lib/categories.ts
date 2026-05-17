export const IT_CATEGORIES = [
  "IT-Dienstleistungen",
  "Softwareentwicklung",
  "Webdesign / Webentwicklung",
  "Systemadministration",
  "IT-Beratung",
  "Cloud Services",
  "Cybersecurity / IT-Sicherheit",
  "App-Entwicklung",
  "EDV-Service",
  "Netzwerktechnik",
  "KI / Artificial Intelligence",
  "Digitalisierung",
  "E-Commerce",
  "Hosting / Servermanagement",
] as const;

export const HW_CATEGORIES = [
  "Elektriker",
  "Schreiner / Tischler",
  "Maler & Lackierer",
  "Sanitär / Heizung / Klima",
  "Fliesenleger",
  "Maurer",
  "Dachdecker",
  "Metallbau",
  "Kfz-Werkstatt",
  "Garten- und Landschaftsbau",
  "Gebäudereinigung",
  "Trockenbau",
] as const;

export type ITCategory = (typeof IT_CATEGORIES)[number];
export type HWCategory = (typeof HW_CATEGORIES)[number];
