import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_FRONTEND_URL || "https://letwatch.net";

  const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
