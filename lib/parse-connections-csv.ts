import { Profile, ProfileCategory } from "@/lib/types/swipe";

interface LinkedInConnection {
  firstName: string;
  lastName: string;
  url: string;
  email: string;
  company: string;
  position: string;
  connectedOn: string;
}

const FOUNDER_KEYWORDS = [
  "founder",
  "co-founder",
  "cofounder",
  "ceo",
  "cto",
  "coo",
  "cfo",
  "chief of staff",
  "cos",
  "managing director",
  "general partner",
  "partner",
  "owner",
  "president",
];

const PRODUCT_KEYWORDS = [
  "product",
  "pm",
  "product manager",
  "product lead",
  "product director",
  "vp product",
  "vp of product",
  "head of product",
  "group product manager",
  "senior product manager",
  "principal product manager",
  "product owner",
  "product strategy",
];

const GRADIENTS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-blue-500",
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-cyan-500 to-sky-500",
  "from-purple-500 to-indigo-500",
  "from-teal-500 to-cyan-500",
  "from-red-500 to-rose-500",
  "from-fuchsia-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-lime-500 to-green-500",
];

function categorize(position: string): ProfileCategory | null {
  const lower = position.toLowerCase();

  for (const keyword of FOUNDER_KEYWORDS) {
    if (lower.includes(keyword)) return "founders";
  }

  for (const keyword of PRODUCT_KEYWORDS) {
    if (lower.includes(keyword)) return "product";
  }

  return null;
}

function getInitials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseConnectionsCsv(csvText: string): Profile[] {
  const lines = csvText.split("\n").filter((line) => line.trim());

  // LinkedIn CSVs often have notes/headers before the actual data
  // Find the header row that contains "First Name"
  let headerIndex = -1;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    if (lines[i].toLowerCase().includes("first name")) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) {
    throw new Error(
      "Could not find header row. Make sure this is a LinkedIn Connections CSV file."
    );
  }

  const headers = parseCsvLine(lines[headerIndex]).map((h) =>
    h.toLowerCase().trim()
  );

  const firstNameIdx = headers.findIndex((h) => h.includes("first name"));
  const lastNameIdx = headers.findIndex((h) => h.includes("last name"));
  const urlIdx = headers.findIndex((h) => h === "url" || h.includes("profile"));
  const companyIdx = headers.findIndex((h) => h.includes("company"));
  const positionIdx = headers.findIndex((h) => h.includes("position"));

  if (firstNameIdx === -1 || lastNameIdx === -1) {
    throw new Error("CSV is missing required columns (First Name, Last Name).");
  }

  const connections: LinkedInConnection[] = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    if (fields.length <= 1) continue;

    connections.push({
      firstName: fields[firstNameIdx] || "",
      lastName: fields[lastNameIdx] || "",
      url: urlIdx >= 0 ? fields[urlIdx] || "" : "",
      email: "",
      company: companyIdx >= 0 ? fields[companyIdx] || "" : "",
      position: positionIdx >= 0 ? fields[positionIdx] || "" : "",
      connectedOn: "",
    });
  }

  // Filter and convert to Profile format
  const profiles: Profile[] = [];

  for (const conn of connections) {
    if (!conn.firstName || !conn.position) continue;

    const category = categorize(conn.position);
    if (!category) continue;

    const name = `${conn.firstName} ${conn.lastName}`.trim();

    profiles.push({
      id: `csv-${profiles.length}`,
      name,
      title: conn.position,
      company: conn.company,
      location: "",
      headline: `${conn.position}${conn.company ? ` at ${conn.company}` : ""}`,
      summary: `${conn.position}${conn.company ? ` at ${conn.company}` : ""}. Connected on LinkedIn.`,
      category,
      mutualConnections: 0,
      connectionDegree: 2,
      initials: getInitials(conn.firstName, conn.lastName),
      avatarGradient: GRADIENTS[profiles.length % GRADIENTS.length],
      linkedinUrl: conn.url || `https://linkedin.com/in/${conn.firstName.toLowerCase()}-${conn.lastName.toLowerCase()}`,
    });
  }

  return profiles;
}
