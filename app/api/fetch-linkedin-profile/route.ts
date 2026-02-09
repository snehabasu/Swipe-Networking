import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { linkedinUrl } = await request.json();

    if (!linkedinUrl || !linkedinUrl.includes("linkedin.com/in/")) {
      return NextResponse.json(
        { error: "Please provide a valid LinkedIn profile URL" },
        { status: 400 }
      );
    }

    const apiKey = process.env.PROXYCURL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "PROXYCURL_API_KEY not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(linkedinUrl)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Proxycurl error:", res.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch LinkedIn profile. Please try again or enter your details manually." },
        { status: res.status }
      );
    }

    const data = await res.json();

    const profile = {
      name: [data.first_name, data.last_name].filter(Boolean).join(" "),
      title: data.occupation || "",
      company:
        data.experiences?.[0]?.company || "",
      location:
        [data.city, data.state, data.country_full_name]
          .filter(Boolean)
          .join(", ") || "",
      headline: data.headline || "",
      summary: data.summary || "",
      linkedinUrl,
    };

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or enter your details manually." },
      { status: 500 }
    );
  }
}
