"use client"
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";

export default function LoginPage() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErro("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      const data = await res.json();
      setErro(data.mensagem || "Erro ao fazer login");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          {erro && <div className="text-red-500 text-sm">{erro}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Card>
    </div>
  );
} 