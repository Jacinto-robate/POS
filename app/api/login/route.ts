import { NextRequest, NextResponse } from "next/server";
import { setLoginSession } from "../../../lib/session";

const USUARIO_EXEMPLO = {
  email: "admin@teste.com",
  senha: "123456",
};

export async function POST(req: NextRequest) {
  const { email, senha } = await req.json();
  if (!email || !senha) {
    return NextResponse.json({ mensagem: "Email e senha são obrigatórios" }, { status: 400 });
  }
  if (email === USUARIO_EXEMPLO.email && senha === USUARIO_EXEMPLO.senha) {
    const res = NextResponse.json({ sucesso: true });
    await setLoginSession(res, { email });
    return res;
  }
  return NextResponse.json({ mensagem: "Email ou senha inválidos" }, { status: 401 });
} 