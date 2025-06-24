import { NextRequest, NextResponse } from "next/server";

const ROTAS_LIVRES = ["/login", "/api/login", "/_next", "/public"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Permitir acesso livre a rotas públicas
  if (ROTAS_LIVRES.some((rota) => pathname.startsWith(rota))) {
    return NextResponse.next();
  }
  const sessao = req.cookies.get("sessao_pos");
  if (!sessao) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|public).*)"],
}; 