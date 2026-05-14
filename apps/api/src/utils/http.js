export function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  response.end(JSON.stringify(payload));
}

export function sendNoContent(response) {
  response.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  response.end();
}

export async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
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

export function matchesRoute(method, pathname, routePattern) {
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

export function getRouteParams(pathname, routePattern) {
  const routeParts = routePattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  return routeParts.reduce((params, part, index) => {
    if (part.startsWith(":")) {
      params[part.slice(1)] = pathParts[index];
    }

    return params;
  }, {});
}
