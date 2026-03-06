import type { APIContext } from "astro";

export const prerender = false;

export async function GET(_context: APIContext) {
  const strapiUrl = import.meta.env.STRAPI_URL ?? "http://localhost:1337";
  const strapiToken = import.meta.env.STRAPI_API_TOKEN;

  const res = await fetch(`${strapiUrl}/api/articles`, {
    headers: { Authorization: `bearer ${strapiToken}` },
  });

  if (!res.ok) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const json = await res.json();

  const index = json.data
    .map((item: any) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? "",
      date: new Date(item.createdAt).toISOString(),
      body: (item.content ?? "")
        .replace(/<[^>]*>/g, "")
        .replace(/[#*`\[\]()>_~|\\]/g, "")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    }))
    .sort((a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
