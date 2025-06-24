import { SessionOptions, getIronSession } from "iron-session";
import { NextResponse } from "next/server";

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieName: "sessao_pos",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

export async function setLoginSession(res: NextResponse, sessionData: any) {
  // iron-session não suporta NextResponse diretamente, então usamos workaround
  // https://github.com/vvo/iron-session/issues/671
  const cookieOptions = sessionOptions.cookieOptions || {};
  res.cookies.set(sessionOptions.cookieName, JSON.stringify(sessionData), {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 dia
  });
}

export async function getSession(req: any) {
  // Para uso futuro: recuperar sessão do cookie
  const cookie = req.cookies.get(sessionOptions.cookieName)?.value;
  if (!cookie) return null;
  try {
    return JSON.parse(cookie);
  } catch {
    return null;
  }
} 