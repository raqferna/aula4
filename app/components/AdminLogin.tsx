"use client";

import { useState, type FormEvent } from "react";
import { X } from "./icons";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AdminLogin({ onClose, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(data?.error ?? "No se pudo entrar");
        return;
      }
      onSuccess();
    } catch {
      setError("No se pudo entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => void submit(e)}
        className="glass-strong w-full max-w-sm rounded-3xl p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Entrar como admin</h2>
            <p className="mt-1 text-sm text-white/60">
              Solo hace falta para añadir o modificar canciones.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="block text-xs text-white/50" htmlFor="admin-password">
          Contraseña
        </label>
        <input
          id="admin-password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-violet-400/60 focus:bg-white/10"
        />

        {error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}

        <button
          type="submit"
          disabled={loading || password.length === 0}
          className="mt-4 w-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
