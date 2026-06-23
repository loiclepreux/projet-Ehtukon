import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { authInputStyle, authBtnStyle } from '../../lib/styles';

interface Props { onSuccess: () => void; }

export function LoginForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        required placeholder="Email" style={authInputStyle} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        required placeholder="Mot de passe" style={authInputStyle} />
      {login.error && <p className="text-red-400 text-sm mt-2">Identifiants invalides.</p>}
      <button type="submit" disabled={login.isPending} style={authBtnStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ce5867')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#95acc4')}
      >
        {login.isPending ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}
