import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';

interface Props {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm text-white/60 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#e94560] transition-colors"
          placeholder="vous@exemple.com"
        />
      </div>
      <div>
        <label className="block text-sm text-white/60 mb-1">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#e94560] transition-colors"
          placeholder="••••••••"
        />
      </div>

      {login.error && (
        <p className="text-red-400 text-sm">Identifiants invalides. Réessayez.</p>
      )}

      <button
        type="submit"
        disabled={login.isPending}
        className="w-full py-3 rounded-lg bg-[#e94560] text-white font-semibold hover:bg-[#c73652] disabled:opacity-50 transition-colors mt-2"
      >
        {login.isPending ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}
