import type { IncomingMessage, ServerResponse } from "http";

export function sendJson(response: ServerResponse, statusCode: number, payload: unknown) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  response.end(JSON.stringify(payload));
}

export function sendNoContent(response: ServerResponse) {
  response.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  response.end();
}

export async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new Error("INVALID_JSON");
  }
}

export function matchesRoute(method: string, pathname: string, routePattern: string) {
  if (method === "OPTIONS") {
    return false;
  }

  const routeParts = routePattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  if (routeParts.length !== pathParts.length) {
    return false;
  }

  return routeParts.every((part, index) => {
    return part.startsWith(":") || part === pathParts[index];
  });
}

export function getRouteParams(pathname: string, routePattern: string) {
  const routeParts = routePattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  return routeParts.reduce<Record<string, string>>((params, part, index) => {
    if (part.startsWith(":")) {
      params[part.slice(1)] = pathParts[index] || "";
    }

    return params;
  }, {});
}
