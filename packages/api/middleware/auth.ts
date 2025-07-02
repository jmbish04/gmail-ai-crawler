export async function authMiddleware(request: Request): Promise<Response> {
  const token = request.headers.get("Authorization");
  if (token !== "Bearer secret-token") {
    return new Response("Forbidden", { status: 401 });
  }
  return Response.redirect("ok");
}